"use client";

import { motion } from "framer-motion";
import { User, MapPin, Calendar, Coffee } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto space-y-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="space-y-8 text-center md:text-left"
            >
                <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto md:mx-0 overflow-hidden relative border-4 border-white shadow-xl">
                    {/* Placeholder for Profile Image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-400" />
                </div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Hey, I'm <span className="text-accent-blue">Ahmad Mujtaba</span>.
                </h1>

                <div className="prose prose-lg text-gray-500 leading-relaxed space-y-6">
                    <p>
                        I'm a Master's student in Quantitative Finance at Northeastern University with a specialization in Machine Learning from Cornell. I bridge the gap between financial theory and computational implementation.
                    </p>
                    <p>
                        My experience spans from building valuation models for semiconductor equities to designing high-frequency data engineering pipelines. I possess a strong command of Python (NumPy, pandas, TensorFlow), C++, and SQL, applying them to risk modeling, asset pricing, and systematic trading strategies.
                    </p>
                    <p>
                        I am passionate about using quantitative methods—like Monte Carlo simulations and Stochastic Processes—to solve complex financial problems.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
                    <div className="glass-card p-4 rounded-xl flex items-center gap-4">
                        <div className="p-3 rounded-full bg-blue-50 text-accent-blue">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Location</p>
                            <p className="font-medium">Westborough, MA</p>
                        </div>
                    </div>
                    <div className="glass-card p-4 rounded-xl flex items-center gap-4">
                        <div className="p-3 rounded-full bg-orange-50 text-orange-500">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Experience</p>
                            <p className="font-medium">2+ Years</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Experience Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
            >
                <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
                <div className="space-y-8">
                    <div className="relative pl-8 border-l border-gray-200 space-y-2">
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-accent-blue" />
                        <h3 className="text-xl font-bold">Junior Analyst</h3>
                        <p className="text-gray-500">360 Huntington Fund | Sept 2025 – Dec 2025</p>
                        <p className="text-gray-600 leading-relaxed">
                            Conducted fundamental and quantitative analysis on semiconductor equities. Built valuation models incorporating revenue growth and varied demand scenarios. Collaborated with senior analysts to align empirical outputs with investment decision criteria.
                        </p>
                    </div>
                    <div className="relative pl-8 border-l border-gray-200 space-y-2">
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gray-300" />
                        <h3 className="text-xl font-bold">Data Engineering</h3>
                        <p className="text-gray-500">Global Financial Media | June 2024 – Jan 2025</p>
                        <p className="text-gray-600 leading-relaxed">
                            Designed data-driven backend systems using Spring Boot and AWS. Automated cross-database synchronization pipelines to improve data integrity. Consolidated heterogeneous data sources reducing query latency.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* Education Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
            >
                <h2 className="text-3xl font-bold tracking-tight">Education</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="glass-card p-6 rounded-2xl space-y-2">
                        <h3 className="font-bold text-lg">M.S. Quantitative Finance</h3>
                        <p className="text-accent-blue font-medium">Northeastern University</p>
                        <p className="text-sm text-gray-500">Exp. Dec 2026</p>
                        <p className="text-sm text-gray-600 pt-2">Coursework: Stochastic Processes, Numerical Methods, Optimization, ML for Finance.</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl space-y-2">
                        <h3 className="font-bold text-lg">Specialisation in ML</h3>
                        <p className="text-accent-blue font-medium">Cornell University</p>
                        <p className="text-sm text-gray-500">Exp. Aug 2026</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl space-y-2">
                        <h3 className="font-bold text-lg">B.S. Computer Science</h3>
                        <p className="text-accent-blue font-medium">CASE Institute of Technology</p>
                        <p className="text-sm text-gray-500">Graduated May 2024</p>
                    </div>
                </div>
            </motion.section>

            {/* Certifications Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
            >
                <h2 className="text-3xl font-bold tracking-tight">Certifications</h2>
                <div className="flex flex-wrap gap-3">
                    {["Excel Crash Course (Wall Street Prep)", "Bloomberg Market Concept", "Math for ML (Udemy)", "Quant Finance Bootcamp"].map((cert, i) => (
                        <div key={i} className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium border border-gray-200">
                            {cert}
                        </div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
}
