"use server";

import { auth } from "@/auth";
import prisma from "@portfolio/database";
import { revalidatePath } from "next/cache";

export async function getSkillCategories() {
    return await prisma.skillCategory.findMany({
        include: {
            skills: {
                orderBy: { order: "asc" },
            },
        },
        orderBy: { order: "asc" },
    });
}

export async function saveSkillCategory(formData: FormData) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const published = formData.get("published") === "true";

    const data = { title, published };

    if (id) {
        await prisma.skillCategory.update({ where: { id }, data });
    } else {
        await prisma.skillCategory.create({ data });
    }

    revalidatePath("/dashboard/skills");
}

export async function deleteSkillCategory(id: string) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    await prisma.skillCategory.delete({ where: { id } });
    revalidatePath("/dashboard/skills");
}

export async function saveSkill(formData: FormData) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const icon = formData.get("icon") as string;
    const color = formData.get("color") as string;
    const proficiency = parseInt(formData.get("proficiency") as string);
    const categoryId = formData.get("categoryId") as string;

    const data = {
        name,
        icon,
        color,
        proficiency: isNaN(proficiency) ? null : proficiency,
        categoryId,
    };

    if (id) {
        await prisma.skill.update({ where: { id }, data });
    } else {
        await prisma.skill.create({ data });
    }

    revalidatePath("/dashboard/skills");
}

export async function deleteSkill(id: string) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    await prisma.skill.delete({ where: { id } });
    revalidatePath("/dashboard/skills");
}

export async function reorderSkills(skillIds: string[]) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const updates = skillIds.map((id, index) =>
        prisma.skill.update({
            where: { id },
            data: { order: index },
        })
    );

    await Promise.all(updates);
    revalidatePath("/dashboard/skills");
}
