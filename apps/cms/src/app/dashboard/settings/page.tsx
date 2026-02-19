import SettingsEditor from "@/components/SettingsEditor";

export const metadata = {
    title: "Global Registry | Command Center",
    description: "Configure system-wide settings, SEO, and analytics.",
};

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight">System Registry</h2>
                <p className="text-gray-500">Coordinate global variables, SEO metadata, and connectivity protocols.</p>
            </div>

            <SettingsEditor />
        </div>
    );
}
