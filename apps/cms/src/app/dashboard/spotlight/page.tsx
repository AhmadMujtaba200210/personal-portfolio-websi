import SpotlightManager from "@/components/SpotlightManager";

export const metadata = {
    title: "Milestones & Spotlights | Command Center",
    description: "Curate your high-impact achievements and spotlight items.",
};

export default function SpotlightPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight">Technical Chronicler</h2>
                <p className="text-gray-500">Record and highlight your most significant technical milestones and accolades.</p>
            </div>

            <SpotlightManager />
        </div>
    );
}
