"use client";

import { useState, useEffect } from "react";
import {
    Globe,
    Search,
    Share2,
    LineChart,
    ShieldCheck,
    Save,
    Loader2,
    Check
} from "lucide-react";
import { getSettings, saveSettings } from "@/lib/actions/settings";

export default function SettingsEditor() {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const data = await getSettings();
        setSettings(data);
        setLoading(false);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        try {
            await saveSettings(settings);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error("Save failed:", error);
            alert("Failed to save settings.");
        } finally {
            setSaving(false);
        }
    }

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    if (loading) return <div className="h-64 flex items-center justify-center text-gray-500 italic">Accessing system registry...</div>;

    return (
        <form onSubmit={handleSubmit} className="space-y-12 max-w-4xl pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* SEO Configuration */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                        <Search className="text-accent-blue" size={20} />
                        <h3 className="font-bold tracking-tight">Search Optimization</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global Title Template</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-blue outline-none transition-all"
                                value={settings["SEO_TITLE"] || ""}
                                onChange={(e) => handleChange("SEO_TITLE", e.target.value)}
                                placeholder="e.g. %s | Ahmad Mujtaba"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Meta Description</label>
                            <textarea
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-blue outline-none transition-all resize-none"
                                rows={3}
                                value={settings["SEO_DESC"] || ""}
                                onChange={(e) => handleChange("SEO_DESC", e.target.value)}
                                placeholder="Global description for search engines..."
                            />
                        </div>
                    </div>
                </section>

                {/* Analytics & Metrics */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                        <LineChart className="text-accent-blue" size={20} />
                        <h3 className="font-bold tracking-tight">Performance Metrics</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Google Analytics (G-ID)</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-blue outline-none transition-all"
                                value={settings["GA_ID"] || ""}
                                onChange={(e) => handleChange("GA_ID", e.target.value)}
                                placeholder="G-XXXXXXXXXX"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Posthog API Key</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-blue outline-none transition-all"
                                value={settings["POSTHOG_KEY"] || ""}
                                onChange={(e) => handleChange("POSTHOG_KEY", e.target.value)}
                                placeholder="phc_..."
                            />
                        </div>
                    </div>
                </section>

                {/* Connectivity Handles */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                        <Share2 className="text-accent-blue" size={20} />
                        <h3 className="font-bold tracking-tight">Global Identifiers</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">LinkedIn Handle</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-blue outline-none transition-all"
                                value={settings["SOCIAL_LINKEDIN"] || ""}
                                onChange={(e) => handleChange("SOCIAL_LINKEDIN", e.target.value)}
                                placeholder="ahmad-mujtaba"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Twitter / X</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-blue outline-none transition-all"
                                value={settings["SOCIAL_TWITTER"] || ""}
                                onChange={(e) => handleChange("SOCIAL_TWITTER", e.target.value)}
                                placeholder="@username"
                            />
                        </div>
                    </div>
                </section>

                {/* Legal & Compliance */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                        <ShieldCheck className="text-accent-blue" size={20} />
                        <h3 className="font-bold tracking-tight">System Compliance</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Copyright Statement</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-blue outline-none transition-all"
                                value={settings["COPYRIGHT"] || ""}
                                onChange={(e) => handleChange("COPYRIGHT", e.target.value)}
                                placeholder="© 2026 Ahmad Mujtaba"
                            />
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-accent-blue/5 border border-accent-blue/10">
                            <Globe size={20} className="text-accent-blue shrink-0" />
                            <p className="text-[10px] font-medium text-gray-400">These settings are shared across all micro-services in the portfolio ecosystem.</p>
                        </div>
                    </div>
                </section>
            </div>

            <div className="pt-12 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {success && (
                        <div className="flex items-center gap-2 text-green-400 animate-in fade-in slide-in-from-left-2 transition-all">
                            <Check size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">Registry Updated Successfully</span>
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-3 bg-accent-blue text-black px-10 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent-blue/20 disabled:opacity-50"
                >
                    {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                    {saving ? "Commiting..." : "Commit Registry"}
                </button>
            </div>
        </form>
    );
}
