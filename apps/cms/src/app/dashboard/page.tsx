import prisma from "@portfolio/database";
import Link from "next/link";
import { PenTool, Upload, User, Settings } from "lucide-react";

export default async function DashboardPage() {
    const [blogCount, draftBlogCount, projectCount, mediaCount, mediaSize] = await Promise.all([
        prisma.blogPost.count(),
        prisma.blogPost.count({ where: { published: false } }),
        prisma.project.count(),
        prisma.media.count(),
        prisma.media.aggregate({ _sum: { size: true } }),
    ]);

    const totalSizeMB = ((mediaSize._sum.size || 0) / (1024 * 1024)).toFixed(1);

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">System Overview</h2>
                <p className="text-gray-500">Welcome back. All content systems are nominally operational.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Blogs" value={String(blogCount)} sub={`Drafts: ${draftBlogCount}`} />
                <StatCard label="Portfolio Projects" value={String(projectCount)} sub="Total tracked" />
                <StatCard label="Media Assets" value={String(mediaCount)} sub={`Size: ${totalSizeMB} MB`} />
                <StatCard label="System Health" value="100%" sub="All systems nominal" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-8 rounded-3xl border border-white/5 bg-white/2">
                    <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-500 italic">No recent activity recorded.</p>
                    </div>
                </div>
                <div className="glass-card p-8 rounded-3xl border border-white/5 bg-white/2">
                    <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/dashboard/blogs/new" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold transition-all flex items-center gap-2 justify-center">
                            <PenTool size={16} /> New Blog Post
                        </Link>
                        <Link href="/dashboard/media" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold transition-all flex items-center gap-2 justify-center">
                            <Upload size={16} /> Upload Media
                        </Link>
                        <Link href="/dashboard/hero" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold transition-all flex items-center gap-2 justify-center">
                            <User size={16} /> Update Hero
                        </Link>
                        <Link href="/dashboard/settings" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold transition-all flex items-center gap-2 justify-center">
                            <Settings size={16} /> Site Settings
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
    return (
        <div className="glass-card p-6 rounded-3xl border border-white/5 bg-white/2 hover:border-accent-blue/30 transition-all group">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-3xl font-bold group-hover:text-accent-blue transition-colors">{value}</p>
            <p className="text-xs text-gray-600 font-medium mt-1">{sub}</p>
        </div>
    );
}
