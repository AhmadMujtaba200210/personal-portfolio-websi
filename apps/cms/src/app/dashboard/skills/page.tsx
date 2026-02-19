import SkillsManager from "@/components/SkillsManager";

export const metadata = {
    title: "Skills & Tech Stack | Command Center",
    description: "Manage technical expertise and proficiency levels.",
};

export default function SkillsPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight">Technical Arsenal</h2>
                <p className="text-gray-500">Curate and prioritize your technical expertise across various domains.</p>
            </div>

            <SkillsManager />
        </div>
    );
}
