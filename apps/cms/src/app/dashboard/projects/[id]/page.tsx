import ProjectEditor from "@/components/ProjectEditor";
import { getProjectById } from "@/lib/actions/projects";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
    const project = await getProjectById(params.id);

    if (!project) {
        notFound();
    }

    return <ProjectEditor project={project} />;
}
