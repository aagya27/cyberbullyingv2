import { Sidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen w-full bg-black text-foreground flex flex-col relative overflow-hidden">
      {/* Universal Background for inner pages */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0f18] to-[#110e19]" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Sidebar only on md+; on mobile, content takes full width */}
        <div className="hidden md:flex h-full glass-panel-dark border-r border-white/10 z-20">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="glass-panel-dark border-b border-white/10 z-20">
            <TopHeader />
          </div>
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 sm:py-8">
            <div className="mx-auto max-w-7xl animate-fade-in relative">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
