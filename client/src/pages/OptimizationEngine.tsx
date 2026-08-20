import { Card } from "@/components/ui/card";
import { TrendingUp, AlertCircle } from "lucide-react";
import { usePrompt } from "@/contexts/PromptContext";
import { generateOptimizations } from "@/lib/promptAnalyzer";

export default function OptimizationEngine() {
  const { promptData } = usePrompt();

  if (!promptData) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Design Optimization Engine</h2>
          <Card className="border-2 border-border bg-card p-8 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-bold mb-2">No Prompt Provided</p>
            <p className="text-muted-foreground">
              Please enter a prompt in the Prompt Studio first to get optimization recommendations.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const optimizations = generateOptimizations(promptData);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Design Optimization Engine</h2>
        <p className="text-muted-foreground mb-4">
          AI-powered suggestions for: <span className="font-bold text-foreground">"{promptData.prompt}"</span>
        </p>

        <div className="flex flex-wrap gap-2 mb-6 text-xs">
          <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
            Industry: {promptData.industry}
          </span>
          <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
            Complexity: {promptData.complexity}
          </span>
        </div>

        <div className="space-y-4">
          {optimizations.map((opt, idx) => (
            <Card key={idx} className="border-2 border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold">Current: {opt.current}</h3>
                    <span className={`px-2 py-1 text-xs font-bold border-2 ${
                      opt.impact === "Critical" ? "border-red-600 bg-red-100 text-red-600" :
                      opt.impact === "High" ? "border-primary bg-primary/10 text-primary" :
                      "border-yellow-600 bg-yellow-100 text-yellow-600"
                    }`}>
                      {opt.impact} Impact
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Suggestion: {opt.suggestion}</p>
                  <p className="text-sm font-medium">✓ {opt.benefit}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
