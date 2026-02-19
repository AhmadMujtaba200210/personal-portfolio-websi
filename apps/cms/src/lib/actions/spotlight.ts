"use server";

import { auth } from "@/auth";
import prisma from "@portfolio/database";
import { revalidatePath } from "next/cache";

export async function getSpotlightItems() {
    return await prisma.spotlightItem.findMany({
        orderBy: { order: "asc" },
    });
}

export async function saveSpotlightItem(formData: FormData) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const date = formData.get("date") as string;
    const published = formData.get("published") === "true";

    const data = {
        title,
        description,
        icon,
        imageUrl: imageUrl || null,
        date: date || null,
        published,
    };

    if (id) {
        await prisma.spotlightItem.update({ where: { id }, data });
    } else {
        await prisma.spotlightItem.create({ data });
    }

    revalidatePath("/dashboard/spotlight");
}

export async function deleteSpotlightItem(id: string) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    await prisma.spotlightItem.delete({ where: { id } });
    revalidatePath("/dashboard/spotlight");
}

export async function reorderSpotlightItems(ids: string[]) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const updates = ids.map((id, index) =>
        prisma.spotlightItem.update({
            where: { id },
            data: { order: index },
        })
    );

    await Promise.all(updates);
    revalidatePath("/dashboard/spotlight");
}
