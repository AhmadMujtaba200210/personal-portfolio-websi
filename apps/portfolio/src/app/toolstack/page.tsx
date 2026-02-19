import { ToolstackClient } from "./ToolstackClient";
import { getSkillCategories, getSiteSettings } from "@/lib/data";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    return {
        title: `Toolstack | ${settings["SEO_TITLE"] ? settings["SEO_TITLE"].replace("%s", "Technical Arsenal") : "Technical Arsenal"}`,
        description: "A comprehensive suite of languages, libraries, and platforms.",
    };
}

export default async function ToolstackPage() {
    const skills = await getSkillCategories();

    return <ToolstackClient categories={skills} />;
}
