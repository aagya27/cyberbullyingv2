import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Bell, Shield, Key, Globe, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Configuration Saved",
      description: "Neural net preferences and API endpoints updated successfully.",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 animate-fade-in relative z-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary uppercase tracking-widest backdrop-blur-md mb-3">
            <SettingsIcon className="w-3 h-3 animate-[spin_4s_linear_infinite]" />
            System Configuration
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-white text-glow mb-2">
            Engine Settings
          </h1>
          <p className="text-sm text-white/50 font-medium">
            Manage your AI inference endpoints, API keys, and local model parameters.
          </p>
        </div>

        <Tabs defaultValue="detection" className="space-y-6">
          <TabsList className="glass-panel-dark border-white/10 p-1 w-full flex justify-start h-auto">
            <TabsTrigger value="detection" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:border-primary/50 border border-transparent rounded-lg py-2.5 px-6 font-semibold tracking-wide transition-all uppercase text-[11px]">
              <Shield className="w-4 h-4 mr-2" />
              Inference Engine
            </TabsTrigger>
          </TabsList>

          {}
          <TabsContent value="detection">
            <div className="glass-panel-dark rounded-xl border border-white/10 p-6 md:p-8 space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <Key className="w-32 h-32 text-primary" />
              </div>

              <div className="relative z-10">
                <h3 className="font-bold text-xl text-white mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  API Endpoint Configuration
                </h3>
                <p className="text-sm text-white/50 mb-6 max-w-2xl leading-relaxed">
                  Connect external deep learning providers (like OpenAI) for enhanced zero-shot detection capabilities. Local fallback will occur if external services timeout.
                </p>

                <div className="space-y-4 max-w-xl">
                  <div className="space-y-2">
                    <Label htmlFor="openai" className="text-xs font-bold uppercase tracking-widest text-white/70">OpenAI API Key (Optional)</Label>
                    <Input id="openai" type="password" placeholder="sk-..." className="bg-black/50 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary focus-visible:border-primary transition-all h-12 font-mono" />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                  <div>
                    <p className="font-bold text-white mb-1">Enforce Local Inference</p>
                    <p className="text-xs text-white/50 max-w-sm">Run detection entirely locally via WebGL/WASM without routing data through external APIs. Recommended for strict privacy compliance.</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Button size="lg" className="shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all bg-primary text-primary-foreground font-bold tracking-wide" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Commit Configuration
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
