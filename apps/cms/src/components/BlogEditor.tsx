"use client";

import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { common, createLowlight } from "lowlight";
import { MathExtension } from "tiptap-math-extension";
import {
    Bold, Italic, List, ListOrdered, Quote, Code, Heading1, Heading2,
    Link as LinkIcon, Image as ImageIcon, Sigma, Save, Eye, ArrowLeft,
    Type, Globe, Trash2
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveBlogPost } from "@/lib/actions/blogs";
import LinkNext from "next/link";

const lowlight = createLowlight(common);

interface BlogEditorProps {
    post?: any;
}

export default function BlogEditor({ post }: BlogEditorProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(false);
    const [title, setTitle] = useState(post?.title || "");
    const [slug, setSlug] = useState(post?.slug || "");

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false, // Disable default code block to use lowlight
            }),
            Placeholder.configure({
                placeholder: "Start writing your research-grade insights...",
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
            Link.configure({
                openOnClick: false,
            }),
            Image.configure({
                allowBase64: true,
            }),
            MathExtension.configure({
                evaluation: false,
            }),
        ],
        content: post?.content || "",
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "prose prose-invert max-w-none focus:outline-none min-h-[500px] py-12 px-8 editor-content",
            },
        },
    });

    useEffect(() => {
        if (!post && title) {
            setSlug(title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""));
        }
    }, [title, post]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!editor) return;

        setLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append("content", editor.getHTML());
        formData.append("slug", slug);

        try {
            await saveBlogPost(formData);
            router.push("/dashboard/blogs");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to save post.");
        } finally {
            setLoading(false);
        }
    }

    if (!editor) return null;

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
            <input type="hidden" name="id" value={post?.id || ""} />

            {/* Header / Actions */}
            <div className="flex items-center justify-between sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 py-4">
                <div className="flex items-center gap-4">
                    <LinkNext
                        href="/dashboard/blogs"
                        className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all"
                    >
                        <ArrowLeft size={20} />
                    </LinkNext>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">
                            {post ? "Edit Post" : "Draft New Document"}
                        </h2>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setPreview(!preview)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all border ${preview ? 'bg-white text-black border-white' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'}`}
                    >
                        {preview ? <Type size={18} /> : <Eye size={18} />}
                        {preview ? "Edit" : "Preview"}
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-accent-blue text-black px-6 py-2 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent-blue/20 disabled:opacity-50"
                    >
                        <Save size={18} />
                        {loading ? "Committing..." : "Save Post"}
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Meta Fields */}
                <div className="glass-card p-8 rounded-3xl border border-white/5 bg-white/2 space-y-6">
                    <div className="space-y-4">
                        <input
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-transparent text-4xl md:text-5xl font-bold tracking-tight border-none focus:outline-none placeholder:text-gray-800"
                            placeholder="Engineering the Futures: A Quantitative Approach"
                            required
                        />
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-xs font-mono text-gray-500">
                                <Globe size={12} />
                                <span>/blogs/</span>
                                <input
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="bg-transparent border-none focus:outline-none w-auto min-w-[100px]"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="published"
                                        defaultChecked={post?.published}
                                        className="rounded border-white/10 bg-white/5 text-accent-blue focus:ring-accent-blue"
                                    />
                                    Published
                                </label>
                            </div>
                        </div>
                    </div>
                    <textarea
                        name="excerpt"
                        defaultValue={post?.excerpt || ""}
                        className="w-full bg-transparent text-gray-500 border-none focus:outline-none resize-none text-lg italic"
                        placeholder="A brief summary of this research piece..."
                        rows={2}
                    />
                </div>

                {/* Editor Surface */}
                <div className={`relative min-h-[600px] ${preview ? 'hidden' : 'block'}`}>
                    {/* Toolbar */}
                    <div className="flex items-center flex-wrap gap-1 p-2 bg-white/2 border border-white/5 rounded-2xl mb-4">
                        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} icon={<Bold size={18} />} />
                        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} icon={<Italic size={18} />} />
                        <div className="w-px h-6 bg-white/5 mx-1" />
                        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} icon={<Heading1 size={18} />} />
                        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} icon={<Heading2 size={18} />} />
                        <div className="w-px h-6 bg-white/5 mx-1" />
                        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} icon={<List size={18} />} />
                        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} icon={<ListOrdered size={18} />} />
                        <div className="w-px h-6 bg-white/5 mx-1" />
                        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} icon={<Code size={18} />} />
                        <ToolbarButton
                            onClick={() => {
                                const latex = prompt("Enter LaTeX formula:");
                                if (latex) {
                                    editor.chain().focus().insertContent(`$${latex}$`).run();
                                }
                            }}
                            icon={<Sigma size={18} />}
                        />
                        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} icon={<Quote size={18} />} />
                    </div>

                    <div className="glass-card rounded-3xl border border-white/5 bg-white/2 relative">
                        <EditorContent editor={editor} />

                        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                            <div className="flex items-center gap-1 p-1 bg-black border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl">
                                <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} icon={<Bold size={14} />} small />
                                <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} icon={<Italic size={14} />} small />
                                <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} icon={<Code size={14} />} small />
                            </div>
                        </BubbleMenu>

                        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
                            <div className="flex flex-col gap-1 p-2 bg-black border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl min-w-[160px]">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 py-1">Document Commands</p>
                                <MenuButton
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                    icon={<Heading1 size={16} />}
                                    label="Heading 1"
                                />
                                <MenuButton
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                    icon={<Heading2 size={16} />}
                                    label="Heading 2"
                                />
                                <MenuButton
                                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                                    icon={<Code size={16} />}
                                    label="Code Block"
                                />
                                <MenuButton
                                    onClick={() => {
                                        const latex = prompt("Enter LaTeX formula:");
                                        if (latex) editor.chain().focus().insertContent(`$${latex}$`).run();
                                    }}
                                    icon={<Sigma size={16} />}
                                    label="Math Equation"
                                />
                            </div>
                        </FloatingMenu>
                    </div>
                </div>

                {/* Preview Surface */}
                {preview && (
                    <div className="glass-card rounded-3xl border border-white/5 bg-white/2 min-h-[600px]">
                        <div className="p-8 border-b border-white/5 bg-white/2 rounded-t-3xl">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                <div className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
                                Interactive Research Preview
                            </div>
                        </div>
                        <article className="prose prose-invert max-w-none p-12 editor-content" dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
                    </div>
                )}
            </div>

            <style jsx global>{`
                .editor-content .ProseMirror p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #374151;
                    pointer-events: none;
                    height: 0;
                }
                .editor-content pre {
                    background: #0a0a0a !important;
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 1rem;
                    padding: 1.5rem;
                }
                .editor-content blockquote {
                    border-left: 4px solid #3b82f6;
                    background: rgba(59, 130, 246, 0.05);
                    padding: 1.5rem;
                    border-radius: 0 1rem 1rem 0;
                    font-style: italic;
                    color: #94a3b8;
                }
                .editor-content [data-type="math-inline"] {
                    background: rgba(59, 130, 246, 0.1);
                    color: #3b82f6;
                    padding: 0 0.25rem;
                    border-radius: 0.25rem;
                }
                .editor-content [data-type="math-block"] {
                    display: block;
                    text-align: center;
                    background: rgba(59, 130, 246, 0.05);
                    padding: 1.5rem;
                    margin: 1.5rem 0;
                    border-radius: 1rem;
                }
            `}</style>
        </form>
    );
}

function ToolbarButton({ onClick, active, icon, small = false }: any) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center justify-center rounded-xl transition-all ${small ? 'w-8 h-8' : 'w-10 h-10'} ${active ? "bg-accent-blue text-black" : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
        >
            {icon}
        </button>
    );
}

function MenuButton({ onClick, icon, label }: any) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all text-left"
        >
            <span className="text-gray-500">{icon}</span>
            <span className="font-medium">{label}</span>
        </button>
    );
}
