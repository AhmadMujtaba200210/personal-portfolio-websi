import BlogEditor from "@/components/BlogEditor";
import { getBlogPostById } from "@/lib/actions/blogs";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: { id: string } }) {
    const post = await getBlogPostById(params.id);

    if (!post) {
        notFound();
    }

    return <BlogEditor post={post} />;
}
