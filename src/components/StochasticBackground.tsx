"use client";

import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";

const SYMBOLS = ["∑", "∫", "π", "♠", "♥", "♦", "♣", "∞", "λ", "μ", "σ"];

interface Particle {
    x: number;
    y: number;
    vx: number; // Velocity X
    vy: number; // Velocity Y (Brownian motion)
    size: number;
    symbol: string;
    alpha: number;
}

export const StochasticBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const particleCount = Math.floor(window.innerWidth / 15); // Density control

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 14 + 10,
                    symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
                    alpha: Math.random() * 0.3 + 0.1,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Set styles based on theme
            const isDark = theme === 'dark' || theme === 'system';
            const color = isDark ? "rgba(0, 243, 255," : "rgba(0, 68, 204,"; // Brighter cyan for dark mode

            particles.forEach((p) => {
                // Update position (Stochastic/Brownian-ish motion)
                p.x += p.vx + (Math.random() - 0.5) * 0.2;
                p.y += p.vy + (Math.random() - 0.5) * 0.2;

                // Wall collision (Bounce)
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Draw Symbol with better visibility in dark mode
                ctx.font = `${p.size}px "Crimson Pro", serif`;
                const opacity = isDark ? p.alpha * 2.5 : p.alpha; // Increase opacity in dark mode
                ctx.fillStyle = `${color} ${Math.min(opacity, 0.6)})`;
                ctx.fillText(p.symbol, p.x, p.y);

                // Draw connecting lines for nearby particles (Constellation effect)
                /* 
                // Uncomment for denser look, but keeping it clean for cleaner UI
                particles.forEach((p2) => {
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 80) {
                        ctx.beginPath();
                        ctx.strokeStyle = `${color} ${0.1 - dist/800})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
                */
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        draw();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme, mounted]);

    if (!mounted) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            {/* Overlay Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/80" />
        </div>
    );
};
