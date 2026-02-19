import { getBlogPosts, deleteBlogPost } from "@/lib/actions/blogs";
import { FileText, Plus, Edit, Trash2, Eye, Calendar, User } from "lucide-react";
import Link from "next/link";

export default async function BlogsPage() {
    const posts = await getBlogPosts();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">Research Hub</h2>
                    <p className="text-gray-500 text-sm">Manage your technical publications and research notes.</p>
                </div>
                <Link
                    href="/dashboard/blogs/new"
                    className="flex items-center gap-2 bg-accent-blue text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent-blue/20"
                >
                    <Plus size={20} />
                    Draft New Post
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {posts.length === 0 ? (
                    <div className="glass-card p-20 rounded-3xl border border-white/5 bg-white/2 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gray-600">
                            <FileText size={32} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-lg font-bold">The Hub is Empty</p>
                            <p className="text-sm text-gray-500">Initialize your first research document to share insights.</p>
                        </div>
                    </div>
                ) : (
                    <div className="glass-card rounded-3xl border border-white/5 bg-white/2 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/2">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Document</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Metadata</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Control</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {posts.map((post) => (
                                    <tr key={post.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm">{post.title}</span>
                                                <span className="text-xs text-gray-500 truncate max-w-[300px]">{post.excerpt || "No excerpt provided."}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <Calendar size={12} />
                                                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                                    <User size={12} />
                                                    <span>{post.author.name}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            {post.published ? (
                                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold uppercase tracking-wider">Published</span>
                                            ) : (
                                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 font-bold uppercase tracking-wider">Draft</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/dashboard/blogs/${post.id}`}
                                                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-accent-blue hover:border-accent-blue/30 transition-all"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <form action={async () => {
                                                    "use server";
                                                    await deleteBlogPost(post.id);
                                                }}>
                                                    <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-all">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
