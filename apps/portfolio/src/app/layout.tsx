import type { Metadata } from "next";
import { Inter, Crimson_Pro } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const crimson = Crimson_Pro({ subsets: ["latin"], variable: "--font-crimson" });

export const metadata: Metadata = {
    title: "Portfolio | Digital Portfolio",
    description: "A premium digital portfolio experience inspired by high-end design.",
};

import { SideNav } from "@/components/SideNav";
import { FloatingConnect } from "@/components/FloatingConnect";
import { ThemeProvider } from "@/components/ThemeProvider";
import { StochasticBackground } from "@/components/StochasticBackground";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${crimson.variable} font-sans`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <StochasticBackground />
                    <SideNav />
                    <FloatingConnect />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
