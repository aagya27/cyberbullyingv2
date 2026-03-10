import { Shield, BarChart3, FileText, Settings, Menu, X, Info } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
  { name: "Analyze", path: "/analyze", icon: Shield },
  { name: "How it works", path: "/how-it-works", icon: Info },
  { name: "Incidents", path: "/incidents", icon: FileText },
  { name: "Settings", path: "/settings", icon: Settings },
];

export const Navbar = ({ className = "" }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-[12px] border-b border-border/60 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-cyber rounded-lg flex items-center justify-center shadow-glow-cyan">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground text-lg leading-tight">CyberGuard</h1>
              <p className="text-xs text-muted-foreground">AI Detection System</p>
            </div>
          </Link>

          {}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${location.pathname === item.path
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </div>

          {}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
