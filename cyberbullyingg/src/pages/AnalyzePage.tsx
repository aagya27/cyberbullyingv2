import { useState } from "react";
import { toxicityService } from "@/lib/toxicityModel";
import { useIncidents } from "@/hooks/use-incidents";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scan, AlertTriangle, CheckCircle, Shield, Brain, FileText, Copy, Download, Loader2, Image as ImageIcon, Upload, BarChart3, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Tesseract from "tesseract.js";

interface AnalysisResult {
  isBullying: boolean;
  severity: "none" | "low" | "medium" | "high" | "critical";
  categories: string[];
  confidence: number;
  explanation: string;
  keywords: string[];
}

const getExplanation = (categories: string[], confidence: number) => {
  if (categories.length === 0) {
    return "No harmful content detected. The text appears to be safe.";
  }

  const cats = categories.join(", ");
  return `This content has been flagged as ${cats} with ${(confidence).toFixed(1)}% confidence. The AI model has detected patterns consistent with toxic behavior.`;
};

const getSeverityConfig = (severity: string) => {
  switch (severity) {
    case "critical": return { color: "bg-destructive", textColor: "text-destructive", label: "Critical" };
    case "high": return { color: "bg-orange-500", textColor: "text-orange-400", label: "High" };
    case "medium": return { color: "bg-warning", textColor: "text-warning", label: "Medium" };
    case "low": return { color: "bg-blue-500", textColor: "text-blue-400", label: "Low" };
    default: return { color: "bg-success", textColor: "text-success", label: "Safe" };
  }
};

const AnalyzePage = () => {
  const { toast } = useToast();
  const { addIncident } = useIncidents();
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: "Error", description: "Please upload a valid image file", variant: "destructive" });
      return;
    }

    setIsExtracting(true);
    try {
      const { data: { text } } = await Tesseract.recognize(
        file,
        'eng',
        { logger: m => console.log(m) }
      );

      if (text.trim()) {
        setContent(text.trim());
        toast({ title: "Text Extracted", description: "Image text successfully loaded for analysis." });
      } else {
        toast({ title: "No Text Found", description: "Could not find any readable text in the image.", variant: "destructive" });
      }
    } catch (error) {
      console.error("OCR failed:", error);
      toast({ title: "Error", description: "Failed to extract text from the image.", variant: "destructive" });
    } finally {
      setIsExtracting(false);
    }
  };

  const handleAnalyze = async () => {
    if (!content.trim()) {
      toast({ title: "Error", description: "Please enter content to analyze", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const evaluation = await toxicityService.analyze(content);

      const analysisResult: AnalysisResult = {
        isBullying: evaluation.isToxic,
        severity: evaluation.severity as any,
        categories: evaluation.categories,
        confidence: evaluation.confidence,
        explanation: getExplanation(evaluation.categories, evaluation.confidence),
        keywords: [] 
      };

      setResult(analysisResult);

      
      if (analysisResult.isBullying) {
        addIncident({
          type: evaluation.categories[0] || "Toxic Content",
          severity: analysisResult.severity,
          platform: platform || "Web Input",
          content: content,
          confidence: evaluation.confidence,
          sourceUrl: url || undefined,
        });
        toast({ title: "Incident Recorded", description: "The detected threat has been logged to incidents." });
      }

    } catch (error) {
      console.error("Analysis failed:", error);
      toast({ title: "Error", description: "Failed to analyze content. Please try again.", variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Incident report has been created and is ready for download.",
    });
  };

  const handleCopyResult = () => {
    if (result) {
      const reportText = `
CyberGuard Detection Report
===========================
Severity: ${result.severity.toUpperCase()}
Categories: ${result.categories.join(", ")}
Confidence: ${result.confidence}%
Platform: ${platform || "Not specified"}
URL: ${url || "Not provided"}

Analysis:
${result.explanation}

Detected Keywords: ${result.keywords.join(", ") || "None"}

Content Analyzed:
"${content}"
      `.trim();
      navigator.clipboard.writeText(reportText);
      toast({ title: "Copied", description: "Report copied to clipboard" });
    }
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in relative z-10 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary uppercase tracking-widest backdrop-blur-md mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Intelligence Sandbox
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-white text-glow">
              Deep Content Analysis
            </h1>
            <p className="text-sm text-white/50 mt-2 max-w-2xl font-medium">
              Execute a manual inference pipeline. The proprietary NLP model will score semantic severity and isolate threat vectors.
            </p>
          </div>
          <Button variant="outline" size="sm" className="glass-panel-dark text-white hover:bg-white/10 border-white/20" onClick={() => { setContent(""); setUrl(""); setResult(null); }}>
            Purge Workspace
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* Input Section */}
          <section className="space-y-4">
            <div className="glass-panel-dark rounded-xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.3)] border border-primary/30 text-primary">
                    <Scan className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Data Ingestion</p>
                    <p className="text-base font-semibold text-white">Target String</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-white/40 bg-white/5 px-2 py-1 rounded">
                  {content.length} bytes
                </span>
              </div>

              <Textarea
                id="content"
                placeholder="Initialize intercept payload here (paste chat logs, posts, or DMs) for semantic evaluation..."
                className="min-h-[180px] bg-black/50 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary focus-visible:border-primary focus-visible:shadow-[0_0_20px_rgba(var(--primary),0.2)] transition-all resize-none shadow-inner"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="platform" className="text-white/60 text-xs uppercase tracking-wider font-semibold">Origin Vector</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger className="bg-black/50 border-white/10 text-white">
                      <SelectValue placeholder="Unknown Vector" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0f18] border-white/10 text-white">
                      <SelectItem value="twitter">X Signal</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="reddit">Reddit</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="other">Anomalous Vector</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url" className="text-white/60 text-xs uppercase tracking-wider font-semibold">Source Relay (URL)</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://..."
                    className="bg-black/50 border-white/10 text-white placeholder:text-white/30"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t border-white/10">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all bg-primary text-primary-foreground font-bold tracking-wide"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !content.trim()}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Executing Protocol...
                    </>
                  ) : (
                    <>
                      <Scan className="w-5 h-5 mr-2" />
                      Execute Analysis
                    </>
                  )}
                </Button>

                <p className="text-[11px] text-white/40 font-mono flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-success" />
                  End-to-end encrypted local inference.
                </p>
              </div>
            </div>

            {}
            <div className="glass-panel-dark rounded-xl border border-dashed border-white/20 p-5 space-y-3 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <ImageIcon className="w-4 h-4 text-primary" />
                  <p className="text-sm font-bold text-white">Optical Character Extraction</p>
                </div>
                <p className="text-xs text-white/50 leading-relaxed font-medium">
                  Decompile visual assets. Upload screenshots of hostile interactions to auto-extract text payloads.
                </p>
                <div className="relative mt-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={isExtracting || isAnalyzing}
                  />
                  <div className="flex items-center justify-center rounded-lg border border-white/20 bg-black/40 hover:bg-black/60 transition-colors px-4 py-4 text-xs font-semibold text-primary uppercase tracking-widest cursor-pointer shadow-inner">
                    <div className="flex items-center gap-2">
                      {isExtracting ? (
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      <span>{isExtracting ? "Parsing Matrix..." : "Upload Terminal Screenshot"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {}
          <section className="space-y-4">
            {isAnalyzing && (
              <div className="glass-panel-dark rounded-xl p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-24 h-24 mb-6 rounded-full flex items-center justify-center border-4 border-primary/20 relative shadow-[0_0_50px_rgba(var(--primary),0.2)]">
                  <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin" />
                  <Brain className="w-10 h-10 text-primary animate-pulse" />
                </div>
                <h3 className="font-bold text-xl text-white mb-2 text-glow">
                  Neural Scan Active
                </h3>
                <p className="text-sm font-medium text-white/50 animate-pulse">
                  Evaluating semantic nodes against Jigsaw datasets...
                </p>
              </div>
            )}

            {!isAnalyzing && !result && (
              <div className="glass-panel-dark rounded-xl border-dashed border-white/20 p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white/20" />
                </div>
                <p className="text-sm font-medium text-white/40 max-w-xs leading-relaxed">
                  Awaiting payload. Output metrics and threat diagnostics will compile here post-inference.
                </p>
              </div>
            )}

            {result && !isAnalyzing && (
              <div className="glass-panel-dark rounded-2xl overflow-hidden shadow-2xl animate-slide-up border border-white/10 relative">
                {}
                <div className={`p-6 relative overflow-hidden ${result.isBullying
                  ? "bg-gradient-to-br from-destructive/30 to-destructive/5 border-b border-destructive/30"
                  : "bg-gradient-to-br from-success/30 to-success/5 border-b border-success/30"
                  }`}>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10" />

                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {result.isBullying ? (
                          <AlertTriangle className="w-8 h-8 text-destructive animate-pulse" />
                        ) : (
                          <CheckCircle className="w-8 h-8 text-success" />
                        )}
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-white/60 mb-1">
                            System Diagnostic
                          </p>
                          <h3 className={`font-bold text-xl ${result.isBullying ? 'text-destructive text-glow' : 'text-success text-glow'}`}>
                            {result.isBullying ? "Malicious Intent Detected" : "Clear Output"}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Confidence</span>
                        <span className="text-lg font-mono text-white/90">{(result.confidence).toFixed(2)}%</span>
                      </div>

                      <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md ${result.severity === 'critical' ? 'bg-destructive/20 border-destructive/50 text-white shadow-[0_0_15px_rgba(var(--destructive),0.5)]' :
                        result.severity === 'high' ? 'bg-orange-500/20 border-orange-500/50 text-white' :
                          result.severity === 'medium' ? 'bg-warning/20 border-warning/50 text-white' :
                            'bg-success/20 border-success/50 text-white'
                        }`}>
                        Severity: {result.severity}
                      </div>
                    </div>
                  </div>
                </div>

                {}
                <div className="p-6 space-y-6 bg-black/40 backdrop-blur-md">
                  {result.categories.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2">
                        <Activity className="w-3 h-3" /> Identified Vectors
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {result.categories.map((cat, i) => (
                          <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono font-medium text-white/80 shadow-md">
                            {cat.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="rounded-lg bg-black/60 border border-white/5 p-4 shadow-inner">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Automated Assessment</p>
                    <p className="text-sm text-white/80 leading-relaxed font-medium">
                      {result.explanation}
                    </p>
                  </div>

                  {result.isBullying && (
                    <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                      <Button className="w-full bg-white text-black hover:bg-white/90 font-bold" onClick={handleGenerateReport}>
                        <FileText className="w-4 h-4 mr-2" />
                        Export Log
                      </Button>
                      <Button variant="outline" className="w-full glass-panel-dark text-white hover:bg-white/10 border-white/20" onClick={handleCopyResult}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Telemetry
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyzePage;
