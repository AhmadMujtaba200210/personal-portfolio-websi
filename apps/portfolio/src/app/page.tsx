import { HomeClient } from "@/components/HomeClient";
import {
    getHeroData,
    getProjects,
    getSkillCategories,
    getSpotlightItems,
    getSiteSettings
} from "@/lib/data";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    const hero = await getHeroData();

    const title = settings["SEO_TITLE"] ? settings["SEO_TITLE"].replace("%s", hero?.name || "Portfolio") : `${hero?.name || "Ahmad Mujtaba"} | Portfolio`;
    const description = settings["SEO_DESC"] || hero?.bio || "Quantitative Analyst & Developer Portfolio";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
        },
    };
}

export default async function Home() {
    // Fetch all data in parallel
    const [hero, projects, skills, spotlights, settings] = await Promise.all([
        getHeroData(),
        getProjects(),
        getSkillCategories(),
        getSpotlightItems(),
        getSiteSettings(),
    ]);

    return (
        <HomeClient
            hero={hero}
            projects={projects}
            skills={skills}
            spotlights={spotlights}
            settings={settings}
        />
    );
}
