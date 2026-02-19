import BlogEditor from "@/components/BlogEditor";
import { getBlogPostById } from "@/lib/actions/blogs";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getBlogPostById(id);

    if (!post) {
        notFound();
    }

    return <BlogEditor post={post} />;
}
