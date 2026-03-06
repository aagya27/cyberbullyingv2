import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Scan, AlertTriangle, BarChart3, Lock, Brain, Sparkles, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="dark min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Background Image with Blur Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/cyberbullying_hero_bg.png"
          alt="Cyberbullying conceptual background"
          className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_20s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/95 backdrop-blur-[6px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar className="!bg-background/50 border-white/10" />

        <main className="flex-1 pt-24 pb-16">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-8 sm:py-16 lg:py-24 relative">

            {/* Ambient glowing orbs */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-destructive/15 rounded-full blur-[128px] pointer-events-none" />

            <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] items-center">
              <div className="space-y-8 animate-fade-in relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
                  Next-Gen Threat Intelligence
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter text-white text-glow leading-[1.1]">
                  Eradicate Toxicity. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-purple-500 animate-pulse-glow">
                    Protect Your Community.
                  </span>
                </h1>
                <p className="max-w-xl text-base sm:text-lg text-white/70 font-medium leading-relaxed">
                  CyberGuard deploys enterprise-grade AI to detect, analyze, and neutralize cyberbullying and toxic content in real-time. Built for scale, engineered for safety.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link to="/dashboard">
                    <Button size="lg" className="h-14 px-8 text-base font-semibold shadow-[0_0_30px_rgba(var(--primary),0.2)] hover:shadow-[0_0_40px_rgba(var(--primary),0.5)] transition-all duration-300 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                      <Scan className="w-5 h-5 mr-2" />
                      Open Dashboard
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full glass-panel-dark flex items-center justify-center border-success/30">
                      <Activity className="w-5 h-5 text-success animate-pulse" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">Real-time Inference</p>
                      <p className="text-white/50 text-xs">Sub-50ms latency</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full glass-panel-dark flex items-center justify-center border-warning/30">
                      <Brain className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">Jigsaw Tuned</p>
                      <p className="text-white/50 text-xs">High-accuracy NLP</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Preview Card */}
              <div className="relative animate-slide-up [animation-delay:200ms] perspective-1000 z-10 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-destructive/20 blur-3xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
                <div className="glass-panel-dark rounded-2xl p-1 shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:rotate-1 border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                  <div className="bg-black/80 rounded-xl p-6 sm:p-8 backdrop-blur-xl h-full flex flex-col gap-6 relative overflow-hidden">
                    {/* decorative scanline */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 border border-destructive/20 overflow-hidden">
                          <div className="absolute inset-0 bg-destructive/20 animate-pulse" />
                          <Shield className="w-6 h-6 text-destructive relative z-10" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">
                            Live Intercept
                          </p>
                          <p className="text-base font-semibold text-white">Threat Detected</p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1.5 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-xs px-3 py-1 font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-ping" />
                        Critical
                      </span>
                    </div>

                    <div className="rounded-xl bg-white/5 border border-white/10 p-5 relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-destructive rounded-l-xl" />
                      <p className="text-sm text-white/90 font-mono leading-relaxed pl-2 relative z-10">
                        “I&apos;m going to ruin your life. People like you should not exist here.”
                      </p>
                    </div>

                    <div className="bg-black/50 rounded-xl p-4 border border-white/5 flex flex-col gap-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/60 font-medium">Primary Threat Vector</span>
                        <span className="text-destructive font-bold">HATE_SPEECH</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-destructive h-full rounded-full w-[94%] shadow-[0_0_10px_rgba(var(--destructive),0.8)]" />
                      </div>
                      <div className="flex items-center justify-between text-[10px] uppercase font-bold text-white/40 tracking-widest mt-1">
                        <span>Confidence Score</span>
                        <span className="text-white/90">94.2%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Feature Grid - Glassmorphism style */}
          <section className="container mx-auto px-4 py-16 relative z-10">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Brain,
                  title: "Explainable AI Insights",
                  desc: "Beyond raw scores. CyberGuard maps complex neural network predictions into human-readable severity tiers for rapid comprehension.",
                  color: "text-primary"
                },
                {
                  icon: BarChart3,
                  title: "Actionable Intelligence",
                  desc: "Comprehensive dashboards with precise metrics, confidence intervals, and timestamped logs to empower moderation workflows.",
                  color: "text-purple-400"
                },
                {
                  icon: Lock,
                  title: "Zero-Trust Architecture",
                  desc: "Your data never implicitly trusts third parties. Inference runs locally on your FastAPI backend, guaranteeing absolute privacy.",
                  color: "text-cyan-400"
                }
              ].map((feature, i) => (
                <div key={i} className="glass-panel-dark rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 group">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3">{feature.title}</h2>
                  <p className="text-sm text-white/60 leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Workflow Section */}
          <section className="relative z-10 py-24 border-y border-white/10 bg-black/40 backdrop-blur-md">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-glow">
                  Operational Simplicity. Enterprise Power.
                </h2>
                <p className="text-base text-white/60 font-medium">
                  Transform chaotic user interactions into manageable, structured safety protocols in three deterministic steps.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3 relative">
                {/* Connecting line for desktop */}
                <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0" />

                {[
                  {
                    step: "01",
                    icon: Scan,
                    title: "Ingest Data Streams",
                    desc: "Connect APIs or use the UI to stream text and media directly to the classification engine."
                  },
                  {
                    step: "02",
                    icon: Activity,
                    title: "Neural Analysis",
                    desc: "The Jigsaw-tuned model evaluates semantic intent, neutralizing variations in spelling and syntax."
                  },
                  {
                    step: "03",
                    icon: Shield,
                    title: "Automated Enforcement",
                    desc: "Triage incidents dynamically based on high-confidence severity thresholds."
                  }
                ].map((item, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-5">
                    <div className="w-24 h-24 rounded-full glass-panel-dark flex items-center justify-center border-4 border-black relative">
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white shadow-glow-cyan">
                        {item.step}
                      </div>
                      <item.icon className="w-10 h-10 text-white/80" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed max-w-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Override Footer styling implicitly by placing it here, or let the parent bg handle it */}
        <div className="relative z-10 bg-black/80 backdrop-blur-xl border-t border-white/5">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Landing;

