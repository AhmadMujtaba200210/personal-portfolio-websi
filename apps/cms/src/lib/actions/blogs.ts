"use server";

import prisma from "@portfolio/database";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { importDocumentFromFile } from "@/lib/document-import";

export async function getBlogPosts() {
    return await prisma.blogPost.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            author: { select: { name: true } },
            categories: true,
        }
    });
}

export async function getBlogPostById(id: string) {
    return await prisma.blogPost.findUnique({
        where: { id },
        include: {
            categories: true,
            tags: true,
        }
    });
}

export async function saveBlogPost(formData: FormData) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const id = formData.get("id") as string;
    const title = (formData.get("title") as string)?.trim();
    const slug = (formData.get("slug") as string)?.trim();
    const excerpt = (formData.get("excerpt") as string)?.trim();
    const content = (formData.get("content") as string) || "";
    const published = formData.get("published") === "on";
    const featuredImage = (formData.get("featuredImage") as string)?.trim();

    if (!title || !slug) {
        throw new Error("Title and slug are required.");
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        throw new Error("Slug must contain only lowercase letters, numbers, and hyphens.");
    }

    // Calculate reading time (~200 words per minute)
    const plainText = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const wordCount = plainText.split(/\s+/).filter(w => w.length > 0).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const data = {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        published,
        featuredImage: featuredImage || null,
        authorId: session.user.id!,
        publishedAt: published ? new Date() : null,
        readingTime,
    };

    if (id) {
        await prisma.blogPost.update({
            where: { id },
            data,
        });
    } else {
        await prisma.blogPost.create({
            data,
        });
    }

    revalidatePath("/dashboard/blogs");
    revalidatePath("/blogs");

    // Trigger portfolio revalidation
    const { revalidatePortfolio } = await import("./revalidate");
    await revalidatePortfolio(["/blogs"]);
}

export async function deleteBlogPost(id: string) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    await prisma.blogPost.delete({
        where: { id },
    });

    revalidatePath("/dashboard/blogs");
    revalidatePath("/blogs");

    // Trigger portfolio revalidation
    const { revalidatePortfolio } = await import("./revalidate");
    await revalidatePortfolio(["/blogs"]);
    return { success: true };
}

function normalizeSlug(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "imported-document";
}

async function ensureUniqueSlug(baseSlug: string, excludeId?: string) {
    let slug = normalizeSlug(baseSlug);
    let suffix = 2;

    while (true) {
        const existing = await prisma.blogPost.findUnique({
            where: { slug },
            select: { id: true },
        });

        if (!existing || (excludeId && existing.id === excludeId)) {
            return slug;
        }

        slug = `${normalizeSlug(baseSlug)}-${suffix++}`;
    }
}

export async function importBlogDocument(formData: FormData) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const file = formData.get("file");
    if (!(file instanceof File)) {
        throw new Error("Please upload a valid file.");
    }

    const currentId = (formData.get("id") as string | null) || undefined;
    const imported = await importDocumentFromFile(file);
    const uniqueSlug = await ensureUniqueSlug(imported.slug, currentId);

    return {
        title: imported.title,
        slug: uniqueSlug,
        excerpt: imported.excerpt,
        content: imported.content,
        wordCount: imported.wordCount,
        sourceType: imported.sourceType,
        fileName: file.name,
    };
}
