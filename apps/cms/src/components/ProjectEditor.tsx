"use client";

import { saveProject } from "@/lib/actions/projects";
import { Save, ArrowLeft, Trash2, Briefcase, Code, Link as LinkIcon, Globe, Github } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProjectFormProps {
    project?: any;
}

export default function ProjectEditor({ project }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            await saveProject(formData);
            router.push("/dashboard/projects");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to save project.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form action={handleSubmit} className="space-y-12">
            <input type="hidden" name="id" value={project?.id || ""} />

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard/projects"
                        className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            {project ? "Edit Project" : "New Project"}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            {project ? `Refining ${project.title}` : "Initialize a new engineering showcase."}
                        </p>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-3 bg-accent-blue text-black px-8 py-3 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent-blue/20 disabled:opacity-50 disabled:scale-100"
                >
                    <Save size={20} />
                    {loading ? "Saving..." : "Commit Project"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="glass-card p-8 rounded-3xl border border-white/5 bg-white/2 space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Project Title</label>
                                <input
                                    name="title"
                                    defaultValue={project?.title || ""}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-blue outline-none transition-all font-bold"
                                    placeholder="e.g. Quant-Vision Dashboard"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Description</label>
                                <textarea
                                    name="description"
                                    defaultValue={project?.description || ""}
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-blue outline-none transition-all resize-none"
                                    placeholder="High-level overview of the project objectives and outcomes..."
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    <section className="glass-card p-8 rounded-3xl border border-white/5 bg-white/2 space-y-6">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <Code size={18} className="text-accent-blue" />
                            Technical Specifications
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Category</label>
                                <input
                                    name="category"
                                    defaultValue={project?.category || "Quantitative Analysis"}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-blue outline-none transition-all"
                                    placeholder="e.g. Full Stack, AI/ML"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tech Stack (comma separated)</label>
                                <input
                                    name="techStack"
                                    defaultValue={project?.techStack?.join(", ") || ""}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-blue outline-none transition-all"
                                    placeholder="React, Typescript, Python"
                                    required
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar Controls */}
                <div className="space-y-8">
                    <section className="glass-card p-8 rounded-3xl border border-white/5 bg-white/2 space-y-6">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <Globe size={18} className="text-accent-blue" />
                            Deployment
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">GitHub Repository</label>
                                <div className="relative">
                                    <Github className="absolute left-4 top-3.5 text-gray-600" size={16} />
                                    <input
                                        name="githubUrl"
                                        defaultValue={project?.githubUrl || ""}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:border-accent-blue outline-none transition-all"
                                        placeholder="https://github.com/..."
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Live Demo URL</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-4 top-3.5 text-gray-600" size={16} />
                                    <input
                                        name="demoUrl"
                                        defaultValue={project?.demoUrl || ""}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:border-accent-blue outline-none transition-all"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="glass-card p-8 rounded-3xl border border-white/5 bg-white/2 space-y-6">
                        <h3 className="text-lg font-bold">Status & Order</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-bold">Publish Visibility</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Visible on Portfolio</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="published"
                                        defaultChecked={project?.published ?? true}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue peer-checked:after:bg-white"></div>
                                </label>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Display Order</label>
                                <input
                                    type="number"
                                    name="order"
                                    defaultValue={project?.order || 0}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-blue outline-none transition-all"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
}
