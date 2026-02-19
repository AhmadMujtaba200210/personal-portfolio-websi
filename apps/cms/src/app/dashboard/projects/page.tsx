import { getProjects, deleteProject } from "@/lib/actions/projects";
import { Briefcase, Plus, ExternalLink, Github, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">Project Manager</h2>
                    <p className="text-gray-500 text-sm">Organize and showcase your engineering works.</p>
                </div>
                <Link
                    href="/dashboard/projects/new"
                    className="flex items-center gap-2 bg-accent-blue text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent-blue/20"
                >
                    <Plus size={20} />
                    New Project
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {projects.length === 0 ? (
                    <div className="glass-card p-20 rounded-3xl border border-white/5 bg-white/2 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gray-600">
                            <Briefcase size={32} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-lg font-bold">No projects found</p>
                            <p className="text-sm text-gray-500">Start by creating your first showcase project.</p>
                        </div>
                    </div>
                ) : (
                    <div className="glass-card rounded-3xl border border-white/5 bg-white/2 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/2">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Project</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Category</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Tech Stack</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm flex items-center gap-2">
                                                    {project.title}
                                                    {!project.published && (
                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">Draft</span>
                                                    )}
                                                </span>
                                                <span className="text-xs text-gray-500 truncate max-w-[200px]">{project.description}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-xs font-medium px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-400">
                                                {project.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-wrap gap-1">
                                                {project.techStack.slice(0, 3).map((tech, i) => (
                                                    <span key={i} className="text-[10px] text-gray-500">{tech}{i < 2 && i < project.techStack.length - 1 ? " • " : ""}</span>
                                                ))}
                                                {project.techStack.length > 3 && <span className="text-[10px] text-gray-600">+{project.techStack.length - 3}</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/dashboard/projects/${project.id}`}
                                                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-accent-blue hover:border-accent-blue/30 transition-all"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <form action={async () => {
                                                    "use server";
                                                    await deleteProject(project.id);
                                                }}>
                                                    <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-all">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
