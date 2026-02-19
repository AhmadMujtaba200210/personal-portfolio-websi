"use server";

import { auth } from "@/auth";
import prisma from "@portfolio/database";
import { revalidatePath } from "next/cache";

export async function getProjects() {
    return await prisma.project.findMany({
        orderBy: { order: "asc" },
    });
}

export async function getProjectById(id: string) {
    return await prisma.project.findUnique({
        where: { id },
    });
}

export async function saveProject(formData: FormData) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const id = formData.get("id") as string;
    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const category = (formData.get("category") as string)?.trim();
    const techStackRaw = (formData.get("techStack") as string) || "";
    const techStack = techStackRaw.split(",").map(s => s.trim()).filter(s => s.length > 0);
    const githubUrl = (formData.get("githubUrl") as string)?.trim();
    const demoUrl = (formData.get("demoUrl") as string)?.trim();
    const order = parseInt(formData.get("order") as string) || 0;
    const published = formData.get("published") === "on";

    if (!title || !description || !category) {
        throw new Error("Title, description, and category are required.");
    }

    if (githubUrl) {
        try { new URL(githubUrl); } catch { throw new Error("GitHub URL is not a valid URL."); }
    }

    if (demoUrl) {
        try { new URL(demoUrl); } catch { throw new Error("Demo URL is not a valid URL."); }
    }

    const data = {
        title,
        description,
        category,
        techStack,
        githubUrl: githubUrl || null,
        demoUrl: demoUrl || null,
        order,
        published,
    };

    if (id) {
        await prisma.project.update({
            where: { id },
            data,
        });
    } else {
        await prisma.project.create({
            data,
        });
    }

    revalidatePath("/dashboard/projects");
}

export async function deleteProject(id: string) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    await prisma.project.delete({
        where: { id },
    });
    revalidatePath("/dashboard/projects");
    return { success: true };
}
