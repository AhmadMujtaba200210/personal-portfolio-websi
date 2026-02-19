"use server";

import { auth } from "@/auth";
import prisma from "@portfolio/database";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { writeFile } from "fs/promises";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const ALLOWED_MIME_TYPES = new Set([
    // Images
    "image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml", "image/avif",
    // Videos
    "video/mp4", "video/webm", "video/ogg",
    // Documents
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain", "text/csv",
]);

export async function uploadMedia(formData: FormData) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const file = formData.get("file") as File;
    if (!file) throw new Error("No file uploaded");

    if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
        throw new Error(`File type "${file.type}" is not allowed. Allowed: images, videos, PDF, and documents.`);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Secure filename: strip path separators and special chars
    const timestamp = Date.now();
    const safeName = path.basename(file.name).replace(/[^a-z0-9.]/gi, "_").toLowerCase();
    const filename = `${timestamp}-${safeName}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    // Ensure the resolved path is within UPLOAD_DIR to prevent path traversal
    const uploadRoot = path.resolve(UPLOAD_DIR);
    const resolvedPath = path.resolve(filePath);
    if (!(resolvedPath === uploadRoot || resolvedPath.startsWith(`${uploadRoot}${path.sep}`))) {
        throw new Error("Invalid file path.");
    }

    // Save to disk
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await writeFile(filePath, buffer);

    const url = `/uploads/${filename}`;
    const type = file.type.startsWith("image/") ? "image" :
        file.type.startsWith("video/") ? "video" : "document";

    // Save to database
    const media = await prisma.media.create({
        data: {
            filename,
            url,
            type,
            mimeType: file.type,
            size: file.size,
            alt: safeName.split(".")[0],
        },
    });

    revalidatePath("/dashboard/media");
    return media;
}

export async function getMediaList() {
    return await prisma.media.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function deleteMedia(id: string) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) throw new Error("Media not found");

    // Delete from disk
    const filePath = path.join(UPLOAD_DIR, media.filename);
    const uploadRoot = path.resolve(UPLOAD_DIR);
    const resolvedDeletePath = path.resolve(filePath);
    if (!(resolvedDeletePath === uploadRoot || resolvedDeletePath.startsWith(`${uploadRoot}${path.sep}`))) {
        throw new Error("Invalid file path.");
    }
    try {
        await fs.unlink(filePath);
    } catch (error) {
        console.error("Failed to delete file from disk:", error);
    }

    // Delete from database
    await prisma.media.delete({ where: { id } });

    revalidatePath("/dashboard/media");
}

export async function updateMediaMetadata(id: string, data: { alt?: string }) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const updated = await prisma.media.update({
        where: { id },
        data: { alt: data.alt },
    });

    revalidatePath("/dashboard/media");
    return updated;
}
