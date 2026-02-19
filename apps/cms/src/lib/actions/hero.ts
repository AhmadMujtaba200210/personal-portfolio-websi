"use server";

import prisma from "@portfolio/database";
import { revalidatePath } from "next/cache";

export async function getHeroSection() {
    return await prisma.heroSection.findFirst();
}

export async function updateHeroSection(formData: FormData) {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const bio = formData.get("bio") as string;
    const typewriterText = formData.getAll("typewriterText") as string[];
    const githubUrl = formData.get("githubUrl") as string;
    const linkedinUrl = formData.get("linkedinUrl") as string;
    const email = formData.get("email") as string;

    if (id) {
        await prisma.heroSection.update({
            where: { id },
            data: {
                name,
                title,
                bio,
                typewriterText,
                githubUrl: githubUrl || null,
                linkedinUrl: linkedinUrl || null,
                email: email || null,
            },
        });
    } else {
        await prisma.heroSection.create({
            data: {
                name,
                title,
                bio,
                typewriterText,
                githubUrl: githubUrl || null,
                linkedinUrl: linkedinUrl || null,
                email: email || null,
            },
        });
    }

    revalidatePath("/dashboard/hero");
    return { success: true };
}
