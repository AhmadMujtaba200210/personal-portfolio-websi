"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { SideNav } from "@/components/SideNav";
import { ProjectCard } from "@/components/ProjectCard";
import { ToolStack } from "@/components/ToolStack";
import { Spotlight } from "@/components/Spotlight";

const projects = [
    {
        title: "EcoDrive Dashboard",
        description: "A real-time telemetry dashboard for electric vehicle monitoring and performance optimization.",
        category: "Automotive Tech",
    },
    {
        title: "Modular Housing System",
        description: "Designing sustainable, low-cost housing using modular engineering principles.",
        category: "Social Impact",
    },
];

export default function Home() {
    return (
        <main className="min-h-screen bg-[#fdfdfd] selection:bg-accent-blue/20">
            <SideNav />

            <div className="max-w-4xl mx-auto px-6 py-20 md:py-32 space-y-32">
                {/* Hero Section */}
                <section id="home" className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-6"
                    >
                        <p className="text-lg md:text-xl font-medium text-gray-400">Hey, I'm Mujtaba 👋</p>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] text-[#1a1a1a]">
                            Crafting digital <br />
                            <span className="text-accent-blue">experiences</span> that feel premium.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 max-w-xl leading-relaxed">
                            Designer & Developer focused on building high-end, animated, and performant web applications.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="flex flex-wrap gap-4 pt-4"
                    >
                        <button className="px-8 py-4 bg-[#1a1a1a] text-white rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-3 shadow-xl hover:shadow-accent-blue/20">
                            Say Hi! <Mail size={20} />
                        </button>
                        <div className="flex gap-3">
                            {[
                                { Icon: Github, href: "#" },
                                { Icon: Linkedin, href: "#" }
                            ].map(({ Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    className="w-14 h-14 glass-card rounded-full flex items-center justify-center hover:scale-110 transition-transform hover:bg-white"
                                >
                                    <Icon size={24} className="text-gray-600" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Work Section */}
                <section id="work" className="space-y-12">
                    <h2 className="text-3xl font-bold tracking-tight">Side Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((project, i) => (
                            <ProjectCard key={i} {...project} />
                        ))}
                    </div>
                </section>

                {/* Spotlight Section */}
                <section id="spotlight">
                    <Spotlight />
                </section>

                {/* Expertise Section */}
                <section id="about">
                    <ToolStack />
                </section>

                {/* Footer Placeholder */}
                <footer id="contact" className="pt-20 pb-10 text-center space-y-6">
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    <p className="text-gray-400 font-medium">© 2024 Mujtaba. All rights reserved.</p>
                </footer>
            </div>
        </main>
    );
}
