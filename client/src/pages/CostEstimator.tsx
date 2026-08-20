import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { usePrompt } from "@/contexts/PromptContext";
import { generateCostBreakdown } from "@/lib/promptAnalyzer";

export default function CostEstimator() {
  const { promptData } = usePrompt();

  if (!promptData) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Project Cost Estimator</h2>
          <Card className="border-2 border-border bg-card p-8 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-bold mb-2">No Prompt Provided</p>
            <p className="text-muted-foreground">
              Please enter a prompt in the Prompt Studio first to get cost estimates.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const costBreakdown = generateCostBreakdown(promptData);
  const total = costBreakdown.reduce((sum, item) => sum + item.cost, 0);
  const savings = Math.round(total * (promptData.complexity === "Advanced" ? 0.18 : promptData.complexity === "Intermediate" ? 0.14 : 0.10));

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Project Cost Estimator</h2>
        <p className="text-muted-foreground mb-4">
          Cost breakdown for: <span className="font-bold text-foreground">"{promptData.prompt}"</span>
        </p>

        <div className="flex flex-wrap gap-2 mb-6 text-xs">
          <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
            Industry: {promptData.industry}
          </span>
          <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
            Complexity: {promptData.complexity} Tier
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-2 border-border bg-card p-6">
              <h3 className="text-lg font-bold mb-4">Cost Breakdown</h3>
              <div className="space-y-2">
                {costBreakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border-b border-border">
                    <span className="font-medium">{item.item}</span>
                    <span className="font-bold">₹{item.cost.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between p-3 border-t-2 border-border font-bold text-lg">
                  <span>Total Project Cost</span>
                  <span className="text-primary">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border-2 border-border bg-card p-6">
              <p className="text-xs font-bold text-muted-foreground mb-1">TOTAL PROJECT COST</p>
              <p className="text-3xl font-bold text-primary">₹{total.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-2">Calculated for {promptData.industry}</p>
            </Card>
            <Card className="border-2 border-border bg-card p-6">
              <p className="text-xs font-bold text-muted-foreground mb-1">POTENTIAL SAVINGS</p>
              <p className="text-3xl font-bold text-green-600">₹{savings.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {promptData.complexity === "Advanced" ? "18%" : promptData.complexity === "Intermediate" ? "14%" : "10%"} optimization potential
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
