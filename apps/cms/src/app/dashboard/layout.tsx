import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
    LayoutDashboard,
    Briefcase,
    PenTool,
    Image as ImageIcon,
    Settings,
    LogOut,
    User,
    Zap,
    Star
} from "lucide-react";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white flex">
            {/* Sidebar */}
            <aside className="w-72 border-r border-white/5 flex flex-col p-6 space-y-8 bg-[#080808]">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 bg-accent-blue rounded-xl flex items-center justify-center">
                        <Zap className="text-black" size={20} />
                    </div>
                    <div>
                        <h2 className="font-bold tracking-tight">COMMAND</h2>
                        <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Admin v1.0</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-1">
                    <SidebarLink href="/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" active />
                    <SidebarLink href="/dashboard/hero" icon={<User size={20} />} label="Hero Section" />
                    <SidebarLink href="/dashboard/projects" icon={<Briefcase size={20} />} label="Projects" />
                    <SidebarLink href="/dashboard/skills" icon={<Zap size={20} />} label="Technical Arsenal" />
                    <SidebarLink href="/dashboard/spotlight" icon={<Star size={20} />} label="Milestones" />
                    <SidebarLink href="/dashboard/blogs" icon={<PenTool size={20} />} label="Blog Posts" />
                    <SidebarLink href="/dashboard/media" icon={<ImageIcon size={20} />} label="Media Library" />
                    <SidebarLink href="/dashboard/settings" icon={<Settings size={20} />} label="Settings" />
                </nav>

                <div className="pt-6 border-t border-white/5">
                    <form action={async () => {
                        "use server";
                        await signOut();
                    }}>
                        <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                            <LogOut size={20} />
                            <span className="font-medium text-sm">Terminate Session</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-blue/5 via-transparent to-transparent">
                <header className="h-20 border-bottom border-white/5 flex items-center justify-between px-12 border-b">
                    <h1 className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em]">Live Workspace</h1>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-xs font-bold text-white">{session.user?.name}</p>
                            <p className="text-[10px] text-gray-500">{session.user?.email}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                            <User className="text-gray-400" size={20} />
                        </div>
                    </div>
                </header>
                <div className="p-12">
                    {children}
                </div>
            </main>
        </div>
    );
}

function SidebarLink({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                active ? "bg-accent-blue text-black" : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
        >
            <span className={cn("transition-transform group-hover:scale-110", active ? "text-black" : "text-gray-500 group-hover:text-white")}>
                {icon}
            </span>
            <span className="font-medium text-sm">{label}</span>
        </Link>
    );
}
