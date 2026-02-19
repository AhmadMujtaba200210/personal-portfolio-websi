import { getHeroSection, updateHeroSection } from "@/lib/actions/hero";
import { User, Zap, Save, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function HeroPage() {
    const hero = await getHeroSection();

    return (
        <div className="max-w-4xl space-y-12">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">Hero Section</h2>
                    <p className="text-gray-500 text-sm">Update your digital identity and typewriter animations.</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
                    Live Preview Sync
                </div>
            </div>

            <form action={updateHeroSection} className="space-y-8">
                <input type="hidden" name="id" value={hero?.id || ""} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Identity Section */}
                    <section className="space-y-6">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <User size={18} className="text-accent-blue" />
                            Core Identity
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Public Name</label>
                                <input
                                    name="name"
                                    defaultValue={hero?.name || ""}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-blue outline-none transition-all"
                                    placeholder="e.g. Ahmad Mujtaba"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Global Title</label>
                                <input
                                    name="title"
                                    defaultValue={hero?.title || ""}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-blue outline-none transition-all"
                                    placeholder="e.g. Full Stack Developer & Analyst"
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    {/* Social & Contact */}
                    <section className="space-y-6">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <Zap size={18} className="text-accent-blue" />
                            Connectivity
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">GitHub URL</label>
                                <input
                                    name="githubUrl"
                                    defaultValue={hero?.githubUrl || ""}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-blue outline-none transition-all"
                                    placeholder="https://github.com/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Public Email</label>
                                <input
                                    name="email"
                                    defaultValue={hero?.email || ""}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-blue outline-none transition-all"
                                    placeholder="hello@example.com"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Bio Section */}
                <section className="space-y-6">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block">In-Depth Bio</label>
                    <textarea
                        name="bio"
                        defaultValue={hero?.bio || ""}
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-accent-blue outline-none transition-all resize-none"
                        placeholder="Tell the world about your expertise..."
                        required
                    />
                </section>

                {/* Typewriter Section (Needs a Client Component for dynamic inputs, but starting with list) */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Typewriter Hooks</label>
                        <p className="text-[10px] text-gray-600 font-medium">These will cycle in the Hero section.</p>
                    </div>

                    <div className="space-y-3">
                        {/* Initial simple list - will wrap in client component if user needs dynamic add/remove */}
                        {(hero?.typewriterText || ["Ready to build?", "Analyzing Alpha..."]).map((text, i) => (
                            <div key={i} className="flex gap-3">
                                <div className="flex-1">
                                    <input
                                        name="typewriterText"
                                        defaultValue={text}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-accent-blue outline-none transition-all"
                                    />
                                </div>
                                <button type="button" className="p-2 text-gray-600 hover:text-red-400 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                        <button type="button" className="flex items-center gap-2 text-xs font-bold text-accent-blue mt-4 opacity-50 cursor-not-allowed">
                            <Plus size={14} /> Add Hook (Coming Soon)
                        </button>
                    </div>
                </section>

                <div className="pt-8 border-t border-white/5 flex justify-end">
                    <button
                        type="submit"
                        className="flex items-center gap-3 bg-accent-blue text-black px-8 py-3 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent-blue/20"
                    >
                        <Save size={20} />
                        Commit Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
