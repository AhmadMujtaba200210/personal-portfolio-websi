"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { ToolStack } from "@/components/ToolStack";
import { Spotlight } from "@/components/Spotlight";
import Typewriter from 'typewriter-effect';
import { useEffect, useState } from "react";

const projects = [
    {
        title: "Intraday Momentum Strategy",
        description: "Systematic strategy on SPY ETF with 18.2% annualized return and Sharpe 1.0+.",
        category: "Quant Trading",
    },
    {
        title: "PCA vs Autoencoders",
        description: "Comparative framework extracting systematic risk drivers from S&P 500 returns.",
        category: "Machine Learning",
    },
    {
        title: "Quant Data Pipeline",
        description: "Equity dataset construction with alpha features and cross-sectional factor testing.",
        category: "Data Engineering",
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
                            <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-white dark:border-gray-800 shadow-lg overflow-hidden relative">
                                {/* Placeholder for Avatar */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
                            </div>
                            <div className="px-4 py-2 rounded-full bg-white dark:bg-white/10 border border-gray-100 dark:border-white/10 shadow-sm text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                System Online
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="text-black dark:text-white">
                                <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight leading-[0.9]">
                                    <Typewriter
                                        options={{
                                            strings: ['Ready to Hedge?', 'Analyzing Alpha...', 'All In?', 'Optimizing PnL...'],
                                            autoStart: true,
                                            loop: true,
                                            cursor: '_',
                                            delay: 75,
                                        }}
                                    />
                                </h1>
                            </div>
                        </div>

                        <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed font-medium">
                            I'm <span className="text-black dark:text-white font-bold border-b-2 border-accent-blue">Ahmad Mujtaba</span>.
                            <br />
                            Quantitative Analyst & Developer focused on high-frequency trading systems, stochastic modeling, and algorithmic strategy.
                        </p>
                    </motion.div>

                    {/* Social Row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="flex items-center gap-4"
                    >
                        <a href="mailto:mujtaba200210@gmail.com" className="h-12 px-6 rounded-full bg-black text-white font-medium hover:scale-105 transition-transform flex items-center gap-2">
                            <Mail size={18} /> Email Me
                        </a>
                        <div className="h-12 w-[1px] bg-gray-200 mx-2" />
                        <a href="https://github.com/AhmadMujtaba200210" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:bg-gray-100 transition-colors">
                            <Github size={22} className="text-gray-600" />
                        </a>
                        <a href="https://linkedin.com/in/ahmadmujtaba200210" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:bg-gray-100 transition-colors">
                            <Linkedin size={22} className="text-gray-600" />
                        </a>
                    </motion.div>
                </section>

                {/* Work Slider Section */}
                <section id="work" className="space-y-12">
                    <div className="flex justify-between items-end">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight dark:text-white">Selected Work</h2>
                    </div>

                    {/* Grid Container */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, i) => (
                            <ProjectCard key={i} {...project} />
                        ))}
                    </div>
                </section>

                {/* Spotlight Section */}
                <section id="spotlight" className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight dark:text-white">Spotlight</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Highlights from my journey, awards, and recognitions.</p>
                    </div>
                    <div className="space-y-4">
                        <Spotlight />
                    </div>
                </section>

                {/* Expertise Section */}
                <section id="about" className="space-y-12">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-center dark:text-white">Technical Arsenal</h2>
                    <ToolStack />
                </section>

                {/* Footer */}
                <footer className="pt-20 pb-10 flex flex-col items-center gap-8 border-t border-gray-100 dark:border-gray-800">
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-center dark:text-white">
                        Let's build something <br /> <span className="text-accent-cyan dark:text-accent-cyan">extraordinary.</span>
                    </h3>
                    <p className="text-gray-400 font-medium">© 2026 Ahmad Mujtaba. All rights reserved.</p>
                </footer>
            </div>
        </main>
    );
}
