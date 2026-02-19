import MediaLibrary from "@/components/MediaLibrary";

export const metadata = {
    title: "Media Library | Command Center",
    description: "Manage portfolio assets and technical research media.",
};

export default function MediaPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight">Vault & Media</h2>
                <p className="text-gray-500">Securely manage and distribute assets across your portfolio.</p>
            </div>

            <MediaLibrary />
        </div>
    );
}
