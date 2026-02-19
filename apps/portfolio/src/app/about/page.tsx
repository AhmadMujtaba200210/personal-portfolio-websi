import { AboutClient } from "@/components/AboutClient";
import { getHeroData, getSiteSettings, getSpotlightItems } from "@/lib/data";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    const hero = await getHeroData();
    return {
        title: `About | ${hero?.name || "Ahmad Mujtaba"}`,
        description: hero?.bio || "Quantitative Analyst & Developer",
    };
}

export default async function AboutPage() {
    const [hero, settings, spotlights] = await Promise.all([
        getHeroData(),
        getSiteSettings(),
        getSpotlightItems(),
    ]);

    return <AboutClient hero={hero} settings={settings} spotlights={spotlights} />;
}
