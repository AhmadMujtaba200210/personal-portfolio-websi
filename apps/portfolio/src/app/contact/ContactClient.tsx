"use client";

import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail } from "lucide-react";

interface ContactClientProps {
    hero: any;
    settings: Record<string, string>;
}

export function ContactClient({ hero, settings }: ContactClientProps) {
    const email = hero?.email || settings["CONTACT_EMAIL"] || "hello@example.com";
    const github = hero?.githubUrl || settings["SOCIAL_GITHUB"] || "";
    const linkedin = hero?.linkedinUrl || settings["SOCIAL_LINKEDIN"] || "";

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-3xl mx-auto space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="text-center space-y-6"
            >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Say <span className="text-accent-blue">Hello!</span>
                </h1>
                <p className="text-xl text-gray-500 max-w-xl mx-auto">
                    I'm always open to new opportunities and collaborations. Let's create something amazing together.
                </p>

                {/* Social Links from CMS */}
                <div className="flex items-center justify-center gap-4 pt-4">
                    <a href={`mailto:${email}`} className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Email">
                        <Mail size={22} className="text-gray-600 dark:text-gray-300" />
                    </a>
                    {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="GitHub">
                            <Github size={22} className="text-gray-600 dark:text-gray-300" />
                        </a>
                    )}
                    {linkedin && (
                        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="LinkedIn">
                            <Linkedin size={22} className="text-gray-600 dark:text-gray-300" />
                        </a>
                    )}
                </div>
            </motion.div>

            <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-6 glass-card p-8 md:p-12 rounded-[2rem]"
            >
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="What's your name?"
                        className="w-full px-6 py-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border-2 border-transparent focus:border-accent-blue focus:bg-white dark:focus:bg-gray-800 outline-none transition-all font-medium text-lg text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Where can I reach you?"
                        className="w-full px-6 py-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border-2 border-transparent focus:border-accent-blue focus:bg-white dark:focus:bg-gray-800 outline-none transition-all font-medium text-lg text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-2">Message</label>
                    <textarea
                        id="message"
                        rows={4}
                        placeholder="Tell me about your project..."
                        className="w-full px-6 py-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border-2 border-transparent focus:border-accent-blue focus:bg-white dark:focus:bg-gray-800 outline-none transition-all font-medium text-lg text-gray-900 dark:text-white resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                </div>

                <button className="w-full py-4 rounded-xl bg-gray-900 dark:bg-white/10 text-white font-bold text-lg hover:bg-accent-blue hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl">
                    Send Message <Send size={20} />
                </button>
            </motion.form>
        </div>
    );
}
