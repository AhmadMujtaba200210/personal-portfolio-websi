"use server";

import { auth } from "@/auth";
import prisma from "@portfolio/database";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { writeFile } from "fs/promises";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

export async function uploadMedia(formData: FormData) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const file = formData.get("file") as File;
    if (!file) throw new Error("No file uploaded");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Secure filename
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-z0-9.]/gi, "_").toLowerCase();
    const filename = `${timestamp}-${safeName}`;
    const filePath = path.join(UPLOAD_DIR, filename);

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
    if (!session) throw new Error("Unauthorized");

    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) throw new Error("Media not found");

    // Delete from disk
    const filePath = path.join(UPLOAD_DIR, media.filename);
    try {
        await fs.unlink(filePath);
    } catch (error) {
        console.error("Failed to delete file from disk:", error);
    }

    // Delete from database
    await prisma.media.delete({ where: { id } });

    revalidatePath("/dashboard/media");
}

export async function updateMediaMetadata(id: string, data: { alt?: string; filename?: string }) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const updated = await prisma.media.update({
        where: { id },
        data,
    });

    revalidatePath("/dashboard/media");
    return updated;
}
