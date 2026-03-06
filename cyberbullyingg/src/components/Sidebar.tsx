import { BarChart3, Scan, FileText, Settings, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
    { name: "Analyze", path: "/analyze", icon: Scan },
    { name: "Incidents", path: "/incidents", icon: FileText },
    { name: "Settings", path: "/settings", icon: Settings },
];

export const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <aside
            className={`border-r border-border/60 bg-card/95 backdrop-blur-xl transition-all duration-300 ease-in-out flex flex-col h-full ${collapsed ? "w-18 sm:w-20" : "w-56 sm:w-64"
                } max-md:w-0 max-md:-translate-x-full max-md:opacity-0`}
        >
            <div className="h-16 flex items-center justify-between px-4 border-b border-border/60 shrink-0">
                <Link to="/" className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-glow-cyan">
                        <Shield className="w-5 h-5 text-primary-foreground" />
                    </div>
                    {!collapsed && (
                        <span className="font-semibold text-foreground text-base tracking-tight whitespace-nowrap">
                            CyberGuard
                        </span>
                    )}
                </Link>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1 -mr-2 text-muted-foreground hover:text-foreground hidden md:block"
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-3">
                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                location.pathname === item.path
                                    ? "bg-primary/10 text-primary border border-primary/30 shadow-sm"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                            title={collapsed ? item.name : undefined}
                        >
                            <item.icon className="w-5 h-5 shrink-0" />
                            {!collapsed && <span>{item.name}</span>}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="p-4 border-t border-border/60 mt-auto">
                <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <span className="text-sm font-medium text-foreground">Admin</span>
                    </div>
                    {!collapsed && (
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-foreground truncate">Admin User</p>
                            <p className="text-xs text-muted-foreground truncate">admin@cyberguard.io</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};
