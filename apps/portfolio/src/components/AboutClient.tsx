"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

interface AboutClientProps {
    hero: any;
    settings: Record<string, string>;
    spotlights: any[];
}

export function AboutClient({ hero, settings, spotlights }: AboutClientProps) {
    const name = hero?.name || "Ahmad Mujtaba";
    const bio = hero?.bio || "I bridge the gap between financial theory and computational implementation.";
    const location = settings["LOCATION"] || "Westborough, MA";
    const experienceYears = settings["EXPERIENCE_YEARS"] || "2+ Years";
    const timeline = (spotlights || []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto space-y-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="space-y-8 text-center md:text-left"
            >
                <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto md:mx-0 overflow-hidden relative border-4 border-white dark:border-gray-800 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-400" />
                </div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Hey, I'm <span className="text-accent-blue">{name}</span>.
                </h1>

                <div className="prose prose-lg dark:prose-invert text-gray-500 dark:text-gray-400 leading-relaxed space-y-6">
                    <p>{bio}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
                    <div className="glass-card p-4 rounded-xl flex items-center gap-4">
                        <div className="p-3 rounded-full bg-blue-50 text-accent-blue">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Location</p>
                            <p className="font-medium text-gray-900 dark:text-white">{location}</p>
                        </div>
                    </div>
                    <div className="glass-card p-4 rounded-xl flex items-center gap-4">
                        <div className="p-3 rounded-full bg-orange-50 text-orange-500">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Experience</p>
                            <p className="font-medium text-gray-900 dark:text-white">{experienceYears}</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
            >
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Experience & Milestones</h2>
                <div className="space-y-8">
                    {timeline.length > 0 ? (
                        timeline.map((item) => (
                            <div key={item.id} className="relative pl-8 border-l border-gray-200 dark:border-gray-800 space-y-2">
                                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-accent-blue" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                                {item.date && <p className="text-gray-500">{item.date}</p>}
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Milestones will appear here once added from the CMS Spotlight module.</p>
                    )}
                </div>
            </motion.section>
        </div>
    );
}
