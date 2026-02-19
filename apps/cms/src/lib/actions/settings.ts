"use server";

import { auth } from "@/auth";
import prisma from "@portfolio/database";
import { revalidatePath } from "next/cache";

export async function getSettings() {
    const settings = await prisma.siteSettings.findMany();
    return settings.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {} as Record<string, string>);
}

export async function saveSettings(settings: Record<string, string>) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const ops = Object.entries(settings).map(([key, value]) =>
        prisma.siteSettings.upsert({
            where: { key },
            update: { value },
            create: { key, value },
        })
    );

    await Promise.all(ops);
    revalidatePath("/", "layout");
    revalidatePath("/dashboard/settings");
}
