import prisma from "@portfolio/database";

export async function getHeroData() {
    try {
        return await prisma.heroSection.findUnique({
            where: { id: "default-hero" },
        });
    } catch (error) {
        console.error("Error fetching hero data:", error);
        return null;
    }
}

export async function getProjects() {
    try {
        return await prisma.project.findMany({
            where: { published: true },
            orderBy: { createdAt: "desc" },
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

export async function getSkillCategories() {
    try {
        return await prisma.skillCategory.findMany({
            where: { published: true },
            include: {
                skills: {
                    orderBy: { order: "asc" },
                },
            },
            orderBy: { order: "asc" },
        });
    } catch (error) {
        console.error("Error fetching skill categories:", error);
        return [];
    }
}

export async function getSpotlightItems() {
    try {
        return await prisma.spotlightItem.findMany({
            where: { published: true },
            orderBy: { createdAt: "desc" },
        });
    } catch (error) {
        console.error("Error fetching spotlight items:", error);
        return [];
    }
}

export async function getBlogs() {
    try {
        return await prisma.blogPost.findMany({
            where: { published: true },
            orderBy: { createdAt: "desc" },
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
    }
}

export async function getBlogBySlug(slug: string) {
    try {
        return await prisma.blogPost.findUnique({
            where: { slug },
        });
    } catch (error) {
        console.error(`Error fetching blog with slug ${slug}:`, error);
        return null;
    }
}

export async function getSiteSettings() {
    try {
        const settings = await prisma.siteSettings.findMany();
        return settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);
    } catch (error) {
        console.error("Error fetching site settings:", error);
        return {};
    }
}
