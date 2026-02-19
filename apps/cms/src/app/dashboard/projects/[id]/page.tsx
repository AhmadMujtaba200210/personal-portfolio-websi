import ProjectEditor from "@/components/ProjectEditor";
import { getProjectById } from "@/lib/actions/projects";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProjectById(id);

    if (!project) {
        notFound();
    }

    return <ProjectEditor project={project} />;
}
