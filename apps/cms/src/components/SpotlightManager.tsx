"use client";

import { useState, useEffect } from "react";
import {
    Award,
    Zap,
    Star,
    Plus,
    Trash2,
    Settings2,
    Calendar,
    ExternalLink,
    ChevronUp,
    ChevronDown
} from "lucide-react";
import {
    getSpotlightItems,
    saveSpotlightItem,
    deleteSpotlightItem,
    reorderSpotlightItems
} from "@/lib/actions/spotlight";

const ICON_OPTIONS = [
    { name: "Award", icon: Award },
    { name: "Zap", icon: Zap },
    { name: "Star", icon: Star },
];

export default function SpotlightManager() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const data = await getSpotlightItems();
        setItems(data);
        setLoading(false);
    }

    async function handleAddItem() {
        const title = prompt("Highlight Title (e.g. Dean's List)");
        if (!title) return;
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", "Enter description here...");
        formData.append("icon", "Award");
        formData.append("published", "true");
        await saveSpotlightItem(formData);
        fetchData();
    }

    return (
        <div className="space-y-8 max-w-5xl">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-white">Milestones & Highlights</h3>
                    <p className="text-sm text-gray-500 mt-1">Curate your high-impact achievements and spotlight items.</p>
                </div>
                <button
                    onClick={handleAddItem}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-blue text-black text-sm font-bold hover:bg-accent-blue/90 transition-all shadow-lg shadow-accent-blue/10"
                >
                    <Plus size={18} />
                    Append Milestone
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    <div className="col-span-full h-64 flex items-center justify-center text-gray-500 italic">Reading chronicle...</div>
                ) : items.length === 0 ? (
                    <div className="col-span-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl text-gray-500 gap-4">
                        <Star className="w-8 h-8 opacity-20" />
                        <p>No spotlights active. Elevate your milestones here.</p>
                    </div>
                ) : items.map((item) => (
                    <div key={item.id} className="glass-card relative group p-8 rounded-3xl border border-white/5 bg-white/2 hover:border-accent-blue/30 transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-accent-blue/10 flex items-center justify-center">
                                {item.icon === "Award" ? <Award className="text-accent-blue" size={28} /> :
                                    item.icon === "Zap" ? <Zap className="text-accent-blue" size={28} /> :
                                        <Star className="text-accent-blue" size={28} />}
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => deleteSpotlightItem(item.id).then(fetchData)}
                                    className="p-2 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h4 className="text-lg font-bold text-white tracking-tight">{item.title}</h4>
                                <span className="text-[10px] font-bold text-accent-blue bg-accent-blue/5 px-2 py-1 rounded-md uppercase tracking-widest">{item.date || "Ongoing"}</span>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{item.description}</p>
                        </div>

                        <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${item.published ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.published ? 'Live' : 'Draft'}</span>
                                </div>
                            </div>
                            <button className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
                                Configure Asset <Settings2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
