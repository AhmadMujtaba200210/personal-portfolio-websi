"use server";

import { auth } from "@/auth";
import prisma from "@portfolio/database";
import { revalidatePath } from "next/cache";

export async function getHeroSection() {
    return await prisma.heroSection.findFirst();
}

export async function updateHeroSection(formData: FormData) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const id = formData.get("id") as string;
    const name = (formData.get("name") as string)?.trim();
    const title = (formData.get("title") as string)?.trim();
    const bio = (formData.get("bio") as string)?.trim();
    const typewriterText = (formData.getAll("typewriterText") as string[]).filter(t => t.trim().length > 0);
    const githubUrl = (formData.get("githubUrl") as string)?.trim();
    const linkedinUrl = (formData.get("linkedinUrl") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();

    if (!name || !title || !bio) {
        throw new Error("Name, title, and bio are required.");
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Invalid email format.");
    }

    if (githubUrl) {
        try { new URL(githubUrl); } catch { throw new Error("GitHub URL is not a valid URL."); }
    }

    if (linkedinUrl) {
        try { new URL(linkedinUrl); } catch { throw new Error("LinkedIn URL is not a valid URL."); }
    }

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

    // Trigger portfolio revalidation
    const { revalidatePortfolio } = await import("./revalidate");
    await revalidatePortfolio(["/", "/about", "/contact"]);
}
