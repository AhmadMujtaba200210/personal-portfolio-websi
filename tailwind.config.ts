import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                accent: {
                    blue: "#0070f3",
                    glow: "rgba(0, 112, 243, 0.15)",
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
            animation: {
                "soft-float": "float 6s ease-in-out infinite",
                "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "spring-up": "springUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                springUp: {
                    "0%": { opacity: "0", transform: "translateY(40px) scale(0.9)" },
                    "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
