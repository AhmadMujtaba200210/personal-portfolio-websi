"use client";

import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";

const products = [
    {
        title: "Portfolio Template 2024",
        price: "$49",
        tag: "Framer",
        image: "bg-gradient-to-br from-purple-500 to-indigo-500",
    },
    {
        title: "Ultimate Icon Pack",
        price: "$29",
        tag: "Design Assets",
        image: "bg-gradient-to-tr from-emerald-400 to-cyan-500",
    },
    {
        title: "SaaS Dashboard UI Kit",
        price: "$89",
        tag: "Figma",
        image: "bg-gradient-to-bl from-orange-400 to-pink-500",
    },
    {
        title: "Neobrutalism Guide",
        price: "Free",
        tag: "E-book",
        image: "bg-gradient-to-tl from-gray-800 to-black",
    },
];

export default function ProductsListing() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="space-y-4"
            >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Digital <span className="text-accent-blue">Goods</span>.
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl">
                    High-quality resources to kickstart your next project.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {products.map((product, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative bg-white dark:bg-gray-900/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
                    >
                        <div className={`h-64 w-full ${product.image} relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        </div>

                        <div className="p-8 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-xs font-bold tracking-wider text-accent-blue uppercase">{product.tag}</span>
                                    <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white group-hover:text-accent-blue transition-colors">{product.title}</h3>
                                </div>
                                <span className="text-xl font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-full">{product.price}</span>
                            </div>

                            <button className="w-full py-4 mt-4 rounded-xl bg-gray-900 dark:bg-white/10 text-white font-bold flex items-center justify-center gap-2 group-hover:bg-accent-blue transition-colors">
                                Get it now <ShoppingBag size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
