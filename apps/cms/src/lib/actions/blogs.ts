"use server";

import prisma from "@portfolio/database";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

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
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const published = formData.get("published") === "on";
    const featuredImage = formData.get("featuredImage") as string;

    const data = {
        title,
        slug,
        excerpt,
        content,
        published,
        featuredImage: featuredImage || null,
        authorId: session.user.id!,
        publishedAt: published ? new Date() : null,
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
    return { success: true };
}

export async function deleteBlogPost(id: string) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    await prisma.blogPost.delete({
        where: { id },
    });

    revalidatePath("/dashboard/blogs");
    revalidatePath("/blogs");
    return { success: true };
}
