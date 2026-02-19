"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Trash2,
    GripVertical,
    Settings2,
    ChevronDown,
    ChevronUp,
    Save,
    Code2,
    Database,
    Cloud,
    Terminal,
    Zap,
    Globe,
    Cpu,
    Layers,
    Layout,
    Monitor,
    Shield,
    Smartphone,
    Wrench
} from "lucide-react";
import {
    getSkillCategories,
    saveSkillCategory,
    deleteSkillCategory,
    saveSkill,
    deleteSkill,
    reorderSkills
} from "@/lib/actions/skills";

const ICON_MAP: Record<string, any> = {
    Code2, Database, Cloud, Terminal, Zap, Globe, Cpu, Layers, Layout, Monitor, Shield, Smartphone, Wrench
};

const COLOR_OPTIONS = [
    { name: "Blue", class: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Cyan", class: "text-cyan-500", bg: "bg-cyan-500/10" },
    { name: "Purple", class: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Yellow", class: "text-yellow-500", bg: "bg-yellow-500/10" },
    { name: "Orange", class: "text-orange-500", bg: "bg-orange-500/10" },
    { name: "Red", class: "text-red-500", bg: "bg-red-500/10" },
    { name: "Green", class: "text-green-500", bg: "bg-green-500/10" },
    { name: "Pink", class: "text-pink-500", bg: "bg-pink-500/10" },
];

export default function SkillsManager() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingCategory, setEditingCategory] = useState<string | null>(null);
    const [editingSkill, setEditingSkill] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const data = await getSkillCategories();
        setCategories(data);
        setLoading(false);
    }

    async function handleAddCategory() {
        const title = prompt("Category Title (e.g. Frontend, Backend)");
        if (!title) return;
        const formData = new FormData();
        formData.append("title", title);
        await saveSkillCategory(formData);
        fetchData();
    }

    async function handleAddSkill(categoryId: string) {
        const name = prompt("Skill Name (e.g. React)");
        if (!name) return;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("categoryId", categoryId);
        formData.append("icon", "Code2");
        formData.append("color", "text-blue-500");
        formData.append("proficiency", "80");
        await saveSkill(formData);
        fetchData();
    }

    return (
        <div className="space-y-8 max-w-5xl">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold">Tech Stack Hierarchy</h3>
                    <p className="text-sm text-gray-500 mt-1">Manage and categorize your technical ecosystem.</p>
                </div>
                <button
                    onClick={handleAddCategory}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-blue text-black text-sm font-bold hover:bg-accent-blue/90 transition-all shadow-lg shadow-accent-blue/10"
                >
                    <Plus size={18} />
                    Append Category
                </button>
            </div>

            <div className="space-y-6">
                {loading ? (
                    <div className="h-64 flex items-center justify-center text-gray-500 italic">Syncing technical ledger...</div>
                ) : categories.length === 0 ? (
                    <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl text-gray-500 gap-4">
                        <Zap className="w-8 h-8 opacity-20" />
                        <p>No categories defined. Start by appending a new domain.</p>
                    </div>
                ) : categories.map((cat) => (
                    <div key={cat.id} className="glass-card rounded-3xl border border-white/5 bg-white/2 overflow-hidden animate-in slide-in-from-bottom-2 duration-500">
                        <div className="p-6 bg-white/[0.03] border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center">
                                    <Layers size={16} className="text-accent-blue" />
                                </div>
                                <h4 className="font-bold tracking-tight text-lg">{cat.title}</h4>
                                <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{cat.skills.length} Assets</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleAddSkill(cat.id)}
                                    className="p-2 rounded-lg bg-accent-blue/5 hover:bg-accent-blue/20 text-accent-blue transition-all"
                                    title="Add Skill"
                                >
                                    <Plus size={18} />
                                </button>
                                <button
                                    onClick={() => deleteSkillCategory(cat.id).then(fetchData)}
                                    className="p-2 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {cat.skills.map((skill: any) => (
                                    <div key={skill.id} className="group relative flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all shadow-sm">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${COLOR_OPTIONS.find(c => c.class === skill.color)?.bg || 'bg-white/5'}`}>
                                                {(() => {
                                                    const Icon = ICON_MAP[skill.icon] || Code2;
                                                    return <Icon size={22} className={skill.color} />;
                                                })()}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <p className="font-bold text-sm">{skill.name}</p>
                                                    <span className="text-[10px] font-bold text-gray-500">{skill.proficiency}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-accent-blue/40 rounded-full transition-all duration-1000"
                                                        style={{ width: `${skill.proficiency}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                                            <button
                                                onClick={() => setEditingSkill(skill.id)}
                                                className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all"
                                            >
                                                <Settings2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => deleteSkill(skill.id).then(fetchData)}
                                                className="p-2 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        {/* Skill Editor Modal/Dropdown would go here. For now simplified as prompt-based actions */}
                                    </div>
                                ))}
                                {cat.skills.length === 0 && (
                                    <div className="col-span-full py-8 text-center text-gray-600 text-sm italic">
                                        Domain empty. Append your first technical asset.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
