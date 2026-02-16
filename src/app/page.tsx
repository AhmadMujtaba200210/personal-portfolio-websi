"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { SideNav } from "@/components/SideNav";
import { ProjectCard } from "@/components/ProjectCard";
import { ToolStack } from "@/components/ToolStack";
import { Spotlight } from "@/components/Spotlight";
import { FloatingConnect } from "@/components/FloatingConnect";
import { useEffect, useState } from "react";

const projects = [
    {
        title: "EcoDrive Dashboard",
        description: "A real-time telemetry dashboard for electric vehicle monitoring.",
        category: "Automotive Tech",
    },
    {
        title: "Modular Housing",
        description: "Sustainable, low-cost housing using modular engineering principles.",
        category: "Social Impact",
    },
    {
        title: "AI Content Gen",
        description: "Automated social media content generation using GPT-4 and DALL-E.",
        category: "AI & ML",
    }
];

export default function Home() {
    const [day, setDay] = useState("Day");

    useEffect(() => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        setDay(days[new Date().getDay()]);
    }, []);

    return (
        <main className="min-h-screen selection:bg-accent-blue/20 overflow-hidden">
            <SideNav />
            <FloatingConnect />

            <div className="max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-32 space-y-40">
                {/* Hero Section */}
                <section id="home" className="space-y-10 relative">
                    {/* Background Decoration */}
                    <div className="absolute -top-20 -left-20 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl -z-10" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-white shadow-lg overflow-hidden relative">
                                {/* Placeholder for Avatar */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-gray-300" />
                            </div>
                            <div className="px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-sm font-medium text-gray-600">
                                Open to work
                            </div>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-[#1a1a1a]">
                            How's your <br />
                            <span className="text-accent-blue">{day}?</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl leading-relaxed font-medium">
                            I'm <span className="text-black">Mujtaba</span>. A designer & developer focused on building high-end, animated, and performant web experiences.
                        </p>
                    </motion.div>

                    {/* Social Row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="flex items-center gap-4"
                    >
                        <button className="h-12 px-6 rounded-full bg-black text-white font-medium hover:scale-105 transition-transform flex items-center gap-2">
                            <Mail size={18} /> Email Me
                        </button>
                        <div className="h-12 w-[1px] bg-gray-200 mx-2" />
                        {[Github, Linkedin].map((Icon, i) => (
                            <button key={i} className="p-3 rounded-full hover:bg-gray-100 transition-colors">
                                <Icon size={22} className="text-gray-600" />
                            </button>
                        ))}
                    </motion.div>
                </section>

                {/* Work Slider Section */}
                <section id="work" className="space-y-12">
                    <div className="flex justify-between items-end">
                        <h2 className="text-4xl font-bold tracking-tight">Selected Work</h2>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                                <ArrowRight className="rotate-180" size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Horizontal Scroll Container */}
                    <div className="flex gap-6 overflow-x-auto pb-8 -mx-6 px-6 scrollbar-hide snap-x">
                        {projects.map((project, i) => (
                            <div key={i} className="min-w-[85vw] md:min-w-[450px] snap-center">
                                <ProjectCard {...project} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Spotlight Section */}
                <section id="spotlight" className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold tracking-tight">Spotlight</h2>
                        <p className="text-gray-500 text-lg">Highlights from my journey, awards, and recognitions.</p>
                    </div>
                    <div className="space-y-4">
                        <Spotlight />
                    </div>
                </section>

                {/* Expertise Section */}
                <section id="about" className="space-y-12">
                    <h2 className="text-4xl font-bold tracking-tight text-center">Software & Tools</h2>
                    <ToolStack />
                </section>

                {/* Footer */}
                <footer className="pt-20 pb-10 flex flex-col items-center gap-8 border-t border-gray-100">
                    <h3 className="text-3xl font-bold text-center">Let's build something <br /> <span className="text-accent-blue">extraordinary.</span></h3>
                    <p className="text-gray-400 font-medium">© 2024 Mujtaba. All rights reserved.</p>
                </footer>
            </div>
        </main>
    );
}
