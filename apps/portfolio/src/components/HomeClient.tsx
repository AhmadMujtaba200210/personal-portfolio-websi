"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { ToolStack } from "@/components/ToolStack";
import { Spotlight } from "@/components/Spotlight";
import { TypewriterWrapper } from "@/components/TypewriterWrapper";

interface HomeClientProps {
    hero: any;
    projects: any[];
    skills: any[];
    spotlights: any[];
    settings: Record<string, string>;
}

export function HomeClient({ hero, projects, skills, spotlights, settings }: HomeClientProps) {
    const typewriterStrings = hero?.typewriterText || ['Ready to Hedge?', 'Analyzing Alpha...', 'All In?', 'Optimizing PnL...'];
    const name = hero?.name || "Ahmad Mujtaba";
    const title = hero?.title || "Quantitative Analyst & Developer";
    const bio = hero?.bio || "Quantitative Analyst & Developer focused on high-frequency trading systems, stochastic modeling, and algorithmic strategy.";
    const email = hero?.email || settings["CONTACT_EMAIL"] || "hello@example.com";
    const github = hero?.githubUrl || settings["SOCIAL_GITHUB"] || "https://github.com";
    const linkedin = hero?.linkedinUrl || settings["SOCIAL_LINKEDIN"] || "https://linkedin.com";

    return (
        <main className="min-h-screen selection:bg-accent-blue/20 overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-32 space-y-40">
                {/* Hero Section */}
                <section id="home" className="space-y-10 relative">
                    <div className="absolute -top-20 -left-20 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl -z-10" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-white dark:border-gray-800 shadow-lg overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
                            </div>
                            <div className="px-4 py-2 rounded-full bg-white dark:bg-white/10 border border-gray-100 dark:border-white/10 shadow-sm text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                System Online
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight leading-[0.9] text-gray-900 dark:text-white">
                                <TypewriterWrapper strings={typewriterStrings} />
                            </h1>
                        </div>

                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed font-medium">
                            I'm <span className="text-gray-900 dark:text-white font-bold border-b-2 border-accent-cyan dark:border-accent-cyan">{name}</span>.
                            <br />
                            {bio}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="flex items-center gap-4"
                    >
                        <a href={`mailto:${email}`} className="h-12 px-6 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium hover:scale-105 transition-transform flex items-center gap-2">
                            <Mail size={18} /> Email Me
                        </a>
                        <div className="h-12 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2" />
                        <a href={github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <Github size={22} className="text-gray-600 dark:text-gray-300" />
                        </a>
                        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <Linkedin size={22} className="text-gray-600 dark:text-gray-300" />
                        </a>
                    </motion.div>
                </section>

                {/* Work Slider Section */}
                <section id="work" className="space-y-12">
                    <div className="flex justify-between items-end">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight dark:text-white">Selected Work</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                title={project.title}
                                description={project.description}
                                category={project.category}
                                techStack={project.techStack}
                                demoUrl={project.demoUrl}
                                githubUrl={project.githubUrl}
                            />
                        ))}
                    </div>
                </section>

                {/* Spotlight Section */}
                <section id="spotlight" className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-gray-900 dark:text-white">Spotlight</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">Highlights from my journey, awards, and recognitions.</p>
                    </div>
                    <div className="space-y-4">
                        <Spotlight items={spotlights} />
                    </div>
                </section>

                {/* Expertise Section */}
                <section id="about" className="space-y-12">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-center text-gray-900 dark:text-white">Technical Arsenal</h2>
                    <ToolStack categories={skills} />
                </section>

                {/* Footer */}
                <footer className="pt-20 pb-10 flex flex-col items-center gap-8 border-t border-gray-100 dark:border-gray-800">
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-center text-gray-900 dark:text-white">
                        Let's build something <br /> <span className="text-accent-cyan dark:text-accent-cyan">extraordinary.</span>
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        {settings["COPYRIGHT"] || `© ${new Date().getFullYear()} ${name}. All rights reserved.`}
                    </p>
                </footer>
            </div>
        </main>
    );
}
