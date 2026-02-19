import { BlogsClient } from "@/components/BlogsClient";
import { getBlogs, getSiteSettings } from "@/lib/data";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    return {
        title: `Blogs | ${settings["SEO_TITLE"] ? settings["SEO_TITLE"].replace("%s", "Thoughts") : "Thoughts & Ideas"}`,
        description: "Writing about design, code, finance, and everything in between.",
    };
}

export default async function BlogsPage() {
    const blogs = await getBlogs();

    return <BlogsClient blogs={blogs} />;
}
