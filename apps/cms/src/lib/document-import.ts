import { execFile } from "node:child_process";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export type ImportedDocument = {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    wordCount: number;
    sourceType: "pdf" | "docx" | "txt" | "md";
};

const MAX_IMPORT_SIZE = 15 * 1024 * 1024; // 15MB

const SUPPORTED_EXTENSIONS = new Set(["pdf", "docx", "txt", "md", "markdown"]);

const SUPPORTED_MIME_TYPES = new Set([
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "text/markdown",
    "application/octet-stream", // common fallback from browsers/drag-drop
]);

export function assertSupportedFile(file: File) {
    if (!file) throw new Error("No file uploaded.");
    if (file.size <= 0) throw new Error("Uploaded file is empty.");
    if (file.size > MAX_IMPORT_SIZE) throw new Error("File too large. Max allowed is 15MB.");

    const extension = getExtension(file.name);
    if (!SUPPORTED_EXTENSIONS.has(extension)) {
        throw new Error("Unsupported file type. Allowed: PDF, DOCX, TXT, MD.");
    }

    if (file.type && !SUPPORTED_MIME_TYPES.has(file.type)) {
        throw new Error(`Unsupported MIME type: ${file.type}`);
    }
}

export async function importDocumentFromFile(file: File): Promise<ImportedDocument> {
    assertSupportedFile(file);

    const extension = getExtension(file.name);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let plainText = "";
    let sourceType: ImportedDocument["sourceType"] = "txt";

    if (extension === "pdf") {
        sourceType = "pdf";
        plainText = await extractPdfText(buffer);
    } else if (extension === "docx") {
        sourceType = "docx";
        plainText = await extractDocxText(buffer);
    } else if (extension === "md" || extension === "markdown") {
        sourceType = "md";
        plainText = buffer.toString("utf8");
    } else {
        sourceType = "txt";
        plainText = buffer.toString("utf8");
    }

    const cleaned = normalizeText(plainText);
    if (!cleaned) throw new Error("Could not extract readable text from this document.");

    const title = inferTitle(cleaned, file.name);
    const slug = slugify(title);
    const excerpt = buildExcerpt(cleaned, 38);
    const content = convertTextToHtml(cleaned);
    const wordCount = countWords(cleaned);

    return {
        title,
        slug,
        excerpt,
        content,
        wordCount,
        sourceType,
    };
}

function getExtension(filename: string): string {
    const ext = path.extname(filename).toLowerCase().replace(".", "");
    return ext || "txt";
}

async function extractDocxText(buffer: Buffer): Promise<string> {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    return result.value || "";
}

async function extractPdfText(buffer: Buffer): Promise<string> {
    try {
        const pdfParseModule = await import("pdf-parse");
        const pdfParse = (pdfParseModule as unknown as { default?: (data: Buffer) => Promise<{ text?: string }> }).default
            ?? (pdfParseModule as unknown as (data: Buffer) => Promise<{ text?: string }>);
        const parsed = await pdfParse(buffer);
        if (parsed?.text?.trim()) return parsed.text;
    } catch {
        // Fallback below.
    }

    return await extractPdfWithPdftotext(buffer);
}

async function extractPdfWithPdftotext(buffer: Buffer): Promise<string> {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "cms-pdf-import-"));
    const pdfPath = path.join(tempDir, "input.pdf");
    try {
        await fs.writeFile(pdfPath, buffer);
        const { stdout } = await execFileAsync("pdftotext", [pdfPath, "-"]);
        return stdout || "";
    } finally {
        await fs.rm(tempDir, { recursive: true, force: true });
    }
}

function normalizeText(value: string): string {
    return value
        .replace(/\r/g, "\n")
        .replace(/(\w)-\n(\w)/g, "$1$2")
        .replace(/\n{3,}/g, "\n\n")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => !/^page\s+\d+(\s+of\s+\d+)?$/i.test(line))
        .join("\n")
        .trim();
}

function inferTitle(text: string, fallbackName: string): string {
    const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
    const firstCandidate = lines.find((line) => line.length >= 8 && line.length <= 140) || "";
    if (firstCandidate) return titleCase(firstCandidate);

    const base = path.basename(fallbackName, path.extname(fallbackName)).replace(/[_-]+/g, " ").trim();
    return titleCase(base || "Imported Research Note");
}

function titleCase(value: string): string {
    return value
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .replace(/\s+/g, " ")
        .trim();
}

function slugify(value: string): string {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "imported-document";
}

function buildExcerpt(text: string, maxWords: number): string {
    const words = text.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
    if (words.length <= maxWords) return words.join(" ");
    return `${words.slice(0, maxWords).join(" ")}...`;
}

function countWords(text: string): number {
    return text.replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length;
}

function isHeadingCandidate(line: string): boolean {
    if (!line) return false;
    if (line.length > 120) return false;
    if (/^(abstract|introduction|background|method|methodology|results|discussion|conclusion|references)$/i.test(line)) {
        return true;
    }
    if (/^\d+(\.\d+)*\s+[A-Za-z]/.test(line)) return true;
    if (/^[A-Z][A-Z0-9\s/:,&-]{5,}$/.test(line)) return true;
    if (/:$/.test(line) && line.split(" ").length <= 8) return true;
    return false;
}

function convertTextToHtml(text: string): string {
    const lines = text.split("\n");
    const blocks: string[] = [];
    let paragraph: string[] = [];
    let listItems: string[] = [];

    const flushParagraph = () => {
        if (!paragraph.length) return;
        blocks.push(`<p>${escapeHtml(paragraph.join(" "))}</p>`);
        paragraph = [];
    };

    const flushList = () => {
        if (!listItems.length) return;
        const items = listItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
        blocks.push(`<ul>${items}</ul>`);
        listItems = [];
    };

    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) {
            flushParagraph();
            flushList();
            continue;
        }

        const bulletMatch = line.match(/^([*\-•]|\d+\.)\s+(.+)$/);
        if (bulletMatch) {
            flushParagraph();
            listItems.push(bulletMatch[2].trim());
            continue;
        }

        flushList();
        if (isHeadingCandidate(line)) {
            flushParagraph();
            const normalized = line.replace(/:+$/, "");
            blocks.push(`<h2>${escapeHtml(normalized)}</h2>`);
            continue;
        }

        paragraph.push(line);
    }

    flushParagraph();
    flushList();

    if (!blocks.length) {
        return `<p>${escapeHtml(text)}</p>`;
    }

    return blocks.join("\n");
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
