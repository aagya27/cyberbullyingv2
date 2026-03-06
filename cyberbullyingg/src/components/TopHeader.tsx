import { Bell, Search, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

export const TopHeader = () => {
    const location = useLocation();

    const getPageTitle = () => {
        switch (location.pathname) {
            case "/dashboard":
                return "Dashboard";
            case "/analyze":
                return "Analysis Workspace";
            case "/incidents":
                return "Incident Reports";
            case "/settings":
                return "Platform Settings";
            case "/how-it-works":
                return "How It Works";
            default:
                return "CyberGuard";
        }
    };

    return (
        <header className="h-16 bg-background border-b border-border/60 flex items-center justify-between px-4 sm:px-6 shrink-0 z-10 sticky top-0">
            <div className="flex items-center gap-4">
                {/* We'll handle mobile sidebar toggle later if needed, hiding for desktop */}
                <button className="md:hidden text-muted-foreground hover:text-foreground">
                    <Menu className="w-5 h-5" />
                </button>
                <h2 className="text-lg font-semibold text-foreground">{getPageTitle()}</h2>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative hidden md:block">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="h-9 w-64 rounded-md border border-border bg-muted/50 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-background transition-colors"
                    />
                </div>

                <button className="relative text-muted-foreground hover:text-foreground">
                    <Bell className="w-5 h-5" />
                    <span className="absolute 1 top-0 right-0 w-2 h-2 rounded-full bg-destructive border-2 border-card" />
                </button>
            </div>
        </header>
    );
};
