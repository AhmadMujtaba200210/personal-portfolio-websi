"use client";

import { motion } from "framer-motion";
import { Music, Disc } from "lucide-react";

const playlists = [
    {
        title: "Late Night Coding",
        description: "Lo-fi beats to focus and relax to.",
        color: "from-indigo-500 to-purple-500",
    },
    {
        title: "Gym Grind",
        description: "High energy tracks for pumping iron.",
        color: "from-red-500 to-orange-500",
    },
    {
        title: "Sunday Morning",
        description: "Acoustic vibes for a slow start.",
        color: "from-yellow-400 to-orange-300",
    },
    {
        title: "Deep Focus",
        description: "Ambient soundscapes for deep work.",
        color: "from-blue-600 to-cyan-500",
    },
];

export default function Songs() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-5xl mx-auto space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="space-y-4"
            >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                    On <span className="text-accent-blue">Repeat</span>.
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl">
                    What I'm listening to right now.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {playlists.map((list, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex flex-col items-center gap-6"
                    >
                        {/* Vinyl Record Animation */}
                        <div className="relative w-64 h-64">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className={`absolute inset-0 rounded-full bg-gradient-to-br ${list.color} shadow-2xl flex items-center justify-center group-hover:scale-105 transition-transform`}
                            >
                                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
                                    <div className="w-6 h-6 bg-white rounded-full opacity-20" />
                                </div>
                                {/* Grooves */}
                                <div className="absolute inset-2 border-2 border-white/10 rounded-full pointer-events-none" />
                                <div className="absolute inset-8 border-2 border-white/10 rounded-full pointer-events-none" />
                            </motion.div>

                            {/* Center Dot */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-inner z-10" />
                        </div>

                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{list.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">{list.description}</p>
                            <button className="mt-4 px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-colors flex items-center justify-center gap-2 mx-auto">
                                <Music size={16} /> Listen on Spotify
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
