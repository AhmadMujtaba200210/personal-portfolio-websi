import { ContactClient } from "./ContactClient";
import { getHeroData, getSiteSettings } from "@/lib/data";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    const hero = await getHeroData();
    return {
        title: `Contact | ${hero?.name || "Ahmad Mujtaba"}`,
        description: "Get in touch for opportunities and collaborations.",
    };
}

export default async function ContactPage() {
    const [hero, settings] = await Promise.all([
        getHeroData(),
        getSiteSettings(),
    ]);

    return <ContactClient hero={hero} settings={settings} />;
}
