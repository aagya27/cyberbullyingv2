import { Layout } from "@/components/Layout";
import { Shield, Brain, FileText, CheckCircle } from "lucide-react";

const HowItWorksPage = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-8 animate-fade-in relative z-10 pb-16">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-widest backdrop-blur-md mb-4 mx-auto">
            <Brain className="w-3.5 h-3.5" />
            Platform Architecture
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-white text-glow mb-4">
            How CyberGuard AI Works
          </h1>
          <p className="text-base text-white/50 font-medium max-w-2xl mx-auto leading-relaxed">
            Discover the neural inference pipeline that powers our real-time threat detection and automated content moderation logic.
          </p>
        </div>

        <div className="space-y-6 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-8 top-12 bottom-12 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

          {[
            {
              icon: Shield,
              title: "1. Encrypted Signal Ingestion",
              description:
                "Telemetry nodes ingest text payloads or image assets from connected APIS and user uploads. Input is immediately tokenized and processed securely within local or sandboxed environments.",
            },
            {
              icon: Brain,
              title: "2. Deep Vision OCR & Tokenization",
              description:
                "For visual media, advanced Optical Character Recognition (OCR) isolates rasterized text. Text streams then undergo syntactic analysis to understand slang, obfuscation, and linguistic context.",
            },
            {
              icon: CheckCircle,
              title: "3. Multi-Layer Neural Inference",
              description:
                "The payload passes through our deep learning classifier models. The engine evaluates semantic intent to assign threat scores across multiple vectors: hate speech, violence, harassment, and dox threats.",
            },
            {
              icon: FileText,
              title: "4. Immutable Threat Reporting",
              description:
                "Flagged payloads trigger automated logging. A comprehensive dossier is generated detailing confidence parameters, platform origin, and suggested mitigation tactics for human operators.",
            },
          ].map((step, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-stretch md:items-start gap-6 glass-panel-dark p-6 md:p-8 rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] group hover:border-primary/40 transition-all relative z-10"
            >
              <div className="w-16 h-16 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center shrink-0 shadow-inner group-hover:bg-primary/10 group-hover:border-primary/30 transition-all relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full pointer-events-none" />
                <step.icon className="w-8 h-8 text-primary relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex-1 mt-1">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-glow transition-all duration-300">
                  {step.title}
                </h3>
                <p className="text-white/60 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorksPage;
