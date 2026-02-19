"use server";

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
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const techStack = (formData.get("techStack") as string).split(",").map(s => s.trim());
    const githubUrl = formData.get("githubUrl") as string;
    const demoUrl = formData.get("demoUrl") as string;
    const order = parseInt(formData.get("order") as string) || 0;
    const published = formData.get("published") === "on";

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
    return { success: true };
}

export async function deleteProject(id: string) {
    await prisma.project.delete({
        where: { id },
    });
    revalidatePath("/dashboard/projects");
    return { success: true };
}
