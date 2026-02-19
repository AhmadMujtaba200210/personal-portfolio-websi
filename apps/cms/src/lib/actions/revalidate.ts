"use server";

const PORTFOLIO_URL = process.env.PORTFOLIO_URL || "http://localhost:3000";
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || "";

export async function revalidatePortfolio(paths: string[]) {
    try {
        const res = await fetch(`${PORTFOLIO_URL}/api/revalidate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-revalidation-secret": REVALIDATION_SECRET,
            },
            body: JSON.stringify({ paths }),
        });

        if (!res.ok) {
            console.error("Portfolio revalidation failed:", res.status);
        }
    } catch (error) {
        // Silently fail — portfolio may not be running in dev
        console.error("Portfolio revalidation error:", error);
    }
}
