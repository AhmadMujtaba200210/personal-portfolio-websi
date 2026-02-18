"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function Contact() {
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
            </motion.div>

            <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-6 glass-card p-8 md:p-12 rounded-[2rem]"
            >
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="What's your name?"
                        className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-accent-blue focus:bg-white outline-none transition-all font-medium text-lg"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Where can I reach you?"
                        className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-accent-blue focus:bg-white outline-none transition-all font-medium text-lg"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-2">Message</label>
                    <textarea
                        id="message"
                        rows={4}
                        placeholder="Tell me about your project..."
                        className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-accent-blue focus:bg-white outline-none transition-all font-medium text-lg resize-none"
                    />
                </div>

                <button className="w-full py-4 rounded-xl bg-black text-white font-bold text-lg hover:bg-accent-blue hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl">
                    Send Message <Send size={20} />
                </button>
            </motion.form>
        </div>
    );
}
