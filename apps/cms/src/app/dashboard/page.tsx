export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">System Overview</h2>
                <p className="text-gray-500">Welcome back. All content systems are nominally operational.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Blogs" value="0" sub="Drafts: 0" />
                <StatCard label="Portfolio Projects" value="3" sub="Updated: Today" />
                <StatCard label="Media Assets" value="24" sub="Size: 1.2 GB" />
                <StatCard label="System Health" value="100%" sub="Node 23.11 x Prisma 7" />
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
                        <button className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold transition-all">New Blog Post</button>
                        <button className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold transition-all">Upload Media</button>
                        <button className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold transition-all">Update Hero</button>
                        <button className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold transition-all">Project Settings</button>
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
