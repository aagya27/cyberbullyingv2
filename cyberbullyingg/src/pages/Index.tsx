import { Shield, Scan, AlertTriangle, BarChart3, Brain, Lock, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { useIncidents } from "@/hooks/use-incidents";

const Index = () => {
  const { incidents } = useIncidents();
  const threatsDetected = incidents.length;
  const highSeverity = incidents.filter((i) => i.severity === "high" || i.severity === "critical").length;

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in relative z-10 pb-16">

        {}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary uppercase tracking-widest backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Command Center Active
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white text-glow">
            Threat Intelligence Overview
          </h1>
          <p className="max-w-xl text-base text-white/60 font-medium">
            Real-time monitoring of cyberbullying, harassment, and toxic patterns detected across your connected platforms.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Link to="/analyze">
              <Button size="lg" className="h-12 px-6 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all bg-primary text-primary-foreground hover:bg-primary/90">
                <Scan className="w-4 h-4 mr-2" />
                New Analysis
              </Button>
            </Link>
            <Link to="/incidents">
              <Button variant="outline" size="lg" className="h-12 px-6 glass-panel-dark text-white hover:bg-white/10 border-white/20">
                View Incident Log
              </Button>
            </Link>
          </div>
        </section>

        {}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="glass-panel-dark rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <Shield className="w-12 h-12 text-success" />
            </div>
            <p className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Model Status</p>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-success animate-pulse shadow-[0_0_10px_rgba(var(--success),0.8)]" />
              <p className="text-2xl font-bold text-white text-glow">Online</p>
            </div>
          </div>

          <div className="glass-panel-dark rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <Activity className="w-12 h-12 text-primary" />
            </div>
            <p className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Total Scans</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
              {threatsDetected > 0 ? threatsDetected * 14 : '0'}
            </p>
          </div>

          <div className="glass-panel-dark rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <AlertTriangle className="w-12 h-12 text-warning" />
            </div>
            <p className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Threats Detected</p>
            <p className="text-3xl font-bold text-warning text-glow">
              {threatsDetected}
            </p>
          </div>

          <div className="glass-panel-dark rounded-2xl p-6 relative overflow-hidden group border-destructive/30">
            <div className="absolute inset-0 bg-destructive/5 group-hover:bg-destructive/10 transition-colors" />
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <AlertTriangle className="w-12 h-12 text-destructive" />
            </div>
            <p className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2 relative z-10">Critical Incidents</p>
            <p className="text-3xl font-bold text-destructive text-glow relative z-10">
              {highSeverity}
            </p>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {}
          <section className="space-y-6">
            <h2 className="text-sm font-bold text-white/50 uppercase tracking-widest pl-1">
              Platform Architecture
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="glass-panel-dark rounded-xl p-6 space-y-3 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 text-primary">
                  <Brain className="w-5 h-5" />
                </div>
                <p className="text-base font-bold text-white">Explainable AI</p>
                <p className="text-sm text-white/60 leading-relaxed font-medium">
                  Simple labels and deterministic confidence scores instead of raw probabilities for rapid triage.
                </p>
              </div>
              <div className="glass-panel-dark rounded-xl p-6 space-y-3 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/30 text-purple-400">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <p className="text-base font-bold text-white">Severity Mapping</p>
                <p className="text-sm text-white/60 leading-relaxed font-medium">
                  Automatically group incidents by threat level so monitoring teams focus on critical alerts immediately.
                </p>
              </div>
              <div className="glass-panel-dark rounded-xl p-6 space-y-3 hover:-translate-y-1 transition-transform sm:col-span-2">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 text-cyan-400">
                  <Lock className="w-5 h-5" />
                </div>
                <p className="text-base font-bold text-white">Local Inference & Privacy</p>
                <p className="text-sm text-white/60 leading-relaxed font-medium max-w-xl">
                  Your fine-tuned NLP models run directly on your own backend infrastructure. Sensitive content and user data never routes through third-party generic API endpoints.
                </p>
              </div>
            </div>
          </section>

          {}
          <section className="space-y-6">
            <h2 className="text-sm font-bold text-white/50 uppercase tracking-widest pl-1">
              Live Intercept Signal
            </h2>
            <div className="glass-panel-dark rounded-2xl p-1 overflow-hidden">
              <div className="bg-black/60 rounded-xl p-6 h-full flex flex-col gap-4 relative">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-destructive to-transparent animate-scan opacity-50" />

                <p className="text-xs uppercase tracking-widest text-destructive font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-destructive animate-ping" />
                  Signal Intercepted
                </p>

                <div className="rounded-lg bg-white/5 border border-white/10 p-4 border-l-2 border-l-destructive">
                  <p className="text-sm text-white/90 font-mono italic">
                    “I&apos;m going to ruin your life, you don&apos;t deserve to be here.”
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs mt-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/20 border border-destructive/30 text-destructive px-3 py-1 font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    High Severity
                  </span>
                  <span className="text-white/40 font-mono">conf: 0.862</span>
                </div>
              </div>
            </div>

            <div className="glass-panel-dark rounded-xl p-6 space-y-4 border-primary/20 bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Scan className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Manual Override</p>
                </div>
              </div>
              <p className="text-sm text-white/60 font-medium leading-relaxed">
                Manually input suspicious text sequences to trigger an immediate NLP analysis pipeline execution.
              </p>
              <Link to="/analyze">
                <Button variant="outline" className="w-full justify-center glass-panel-dark text-white hover:bg-white/10 border-white/20 mt-2">
                  Launch Analysis Environment
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
