export interface SimplifiedAnalysis {
    isToxic: boolean;
    severity: string;
    categories: string[];
    confidence: number;
}

class ToxicityService {
    private backendUrl: string;

    constructor() {
        
        
        const envBase = (import.meta as any).env?.VITE_BACKEND_URL as string | undefined;
        const base = envBase && envBase.length > 0 ? envBase : window.location.origin;
        this.backendUrl = `${base.replace(/\/+$/, "")}/predict`;
    }

    async analyze(text: string): Promise<SimplifiedAnalysis> {
        try {
            console.log("Sending text to AI model backend...");
            const response = await fetch(this.backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to analyze content");
            }

            const data = await response.json();

            return {
                isToxic: data.isToxic,
                severity: data.severity,
                categories: data.categories,
                confidence: data.confidence
            };
        } catch (error) {
            console.error("Backend AI analysis failed:", error);
            throw error;
        }
    }
}

export const toxicityService = new ToxicityService();
