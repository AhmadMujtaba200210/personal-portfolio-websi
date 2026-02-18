"use client";

import * as React from "react";
import Typewriter from 'typewriter-effect';
import { useTheme } from "next-themes";

interface TypewriterWrapperProps {
    strings: string[];
}

export function TypewriterWrapper({ strings }: TypewriterWrapperProps) {
    const { theme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        if (mounted && containerRef.current) {
            const wrapper = containerRef.current.querySelector('.Typewriter__wrapper');
            const cursor = containerRef.current.querySelector('.Typewriter__cursor');

            const color = theme === 'dark' ? 'white' : '#111827'; // white for dark, gray-900 for light

            if (wrapper) (wrapper as HTMLElement).style.color = color;
            if (cursor) (cursor as HTMLElement).style.color = color;
        }
    }, [theme, mounted]);

    return (
        <div ref={containerRef} className="typewriter-text-fix min-h-[1.5em]">
            {mounted ? (
                <Typewriter
                    options={{
                        strings,
                        autoStart: true,
                        loop: true,
                        cursor: '_',
                        delay: 75,
                    }}
                />
            ) : (
                <span className="opacity-0">{strings[0]}</span>
            )}
        </div>
    );
}
