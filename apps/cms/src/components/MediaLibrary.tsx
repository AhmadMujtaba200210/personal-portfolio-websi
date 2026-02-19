"use client";

import { useState, useRef, useEffect } from "react";
import {
    Upload,
    Image as ImageIcon,
    File,
    Video,
    Search,
    Trash2,
    Copy,
    Check,
    Info,
    X,
    Loader2
} from "lucide-react";
import { uploadMedia, getMediaList, deleteMedia, updateMediaMetadata } from "@/lib/actions/media";
import { formatBytes } from "@/lib/utils";

interface MediaItem {
    id: string;
    filename: string;
    url: string;
    type: string;
    size: number | null;
    mimeType: string | null;
    alt: string | null;
    createdAt: Date;
}

export default function MediaLibrary() {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchMedia();
    }, []);

    async function fetchMedia() {
        try {
            const data = await getMediaList();
            setMedia(data as any);
        } catch (error) {
            console.error("Failed to fetch media:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleUpload(files: FileList | null) {
        if (!files || files.length === 0) return;

        setUploading(true);
        try {
            for (const file of Array.from(files)) {
                const formData = new FormData();
                formData.append("file", file);
                await uploadMedia(formData);
            }
            await fetchMedia();
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed. Check console for details.");
        } finally {
            setUploading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure? This will break any links to this asset.")) return;
        try {
            await deleteMedia(id);
            setMedia(media.filter(m => m.id !== id));
            if (selectedItem?.id === id) setSelectedItem(null);
        } catch (error) {
            console.error("Delete failed:", error);
        }
    }

    const filteredMedia = media.filter(m =>
        m.filename.toLowerCase().includes(search.toLowerCase()) ||
        m.alt?.toLowerCase().includes(search.toLowerCase())
    );

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-accent-blue transition-colors" />
                    <input
                        type="text"
                        placeholder="Search assets..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/50 transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        multiple
                        onChange={(e) => handleUpload(e.target.files)}
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-accent-blue text-white text-sm font-bold hover:bg-accent-blue/90 disabled:opacity-50 transition-all shadow-lg shadow-accent-blue/20"
                    >
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        {uploading ? "Uploading..." : "Upload Assets"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr,350px] gap-8">
                {/* Media Grid */}
                <div
                    className={`glass-card p-6 rounded-3xl border border-white/5 bg-white/2 min-h-[600px] transition-all ${isDragging ? 'border-accent-blue/50 bg-accent-blue/5 ring-2 ring-accent-blue/20' : ''}`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        handleUpload(e.dataTransfer.files);
                    }}
                >
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
                            <Loader2 className="w-8 h-8 animate-spin text-accent-blue" />
                            <p className="text-sm font-medium">Scanning vault...</p>
                        </div>
                    ) : filteredMedia.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center space-y-4">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                                <ImageIcon className="w-8 h-8 opacity-20" />
                            </div>
                            <div>
                                <p className="font-bold text-white">No assets found</p>
                                <p className="text-sm">Drag and drop files here to begin</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                            {filteredMedia.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedItem(item)}
                                    className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${selectedItem?.id === item.id ? 'border-accent-blue' : 'border-transparent hover:border-white/20'}`}
                                >
                                    {item.type === "image" ? (
                                        <img
                                            src={item.url}
                                            alt={item.alt || ""}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-white/5 flex flex-col items-center justify-center gap-2">
                                            {item.type === "video" ? <Video className="w-8 h-8 text-accent-blue" /> : <File className="w-8 h-8 text-gray-400" />}
                                            <p className="text-[10px] font-bold text-gray-500 uppercase">{item.type}</p>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); copyToClipboard(item.url, item.id); }}
                                            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                                            title="Copy URL"
                                        >
                                            {copiedId === item.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                                            className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Sidebar */}
                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-3xl border border-white/5 bg-white/2 sticky top-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <Info className="w-4 h-4 text-accent-blue" />
                                Asset Intelligence
                            </h3>
                            {selectedItem && (
                                <button onClick={() => setSelectedItem(null)} className="p-1 hover:bg-white/5 rounded-lg transition-colors">
                                    <X className="w-4 h-4 text-gray-500" />
                                </button>
                            )}
                        </div>

                        {selectedItem ? (
                            <div className="space-y-6">
                                <div className="aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/5">
                                    {selectedItem.type === "image" ? (
                                        <img src={selectedItem.url} className="w-full h-full object-contain" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <File className="w-12 h-12 text-white/20" />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Filename</label>
                                        <p className="text-sm font-medium break-all">{selectedItem.filename}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Type</label>
                                            <p className="text-sm font-medium uppercase text-accent-blue">{selectedItem.type}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Size</label>
                                            <p className="text-sm font-medium">{formatBytes(selectedItem.size || 0)}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Direct Link</label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <code className="text-[10px] flex-1 bg-black/30 p-2 rounded-lg border border-white/5 truncate">
                                                {selectedItem.url}
                                            </code>
                                            <button
                                                onClick={() => copyToClipboard(selectedItem.url, "sidebar")}
                                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                            >
                                                {copiedId === "sidebar" ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <p className="text-[10px] text-gray-600">Uploaded on {new Date(selectedItem.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="py-20 text-center space-y-3">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                                    <Info className="w-6 h-6 text-gray-600" />
                                </div>
                                <p className="text-sm text-gray-500 px-8">Select an asset from the vault to inspect its properties and metadata.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
