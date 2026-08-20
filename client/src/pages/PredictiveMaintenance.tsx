import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { usePrompt } from "@/contexts/PromptContext";
import { generateMaintenancePredictions } from "@/lib/promptAnalyzer";

export default function PredictiveMaintenance() {
  const { promptData } = usePrompt();

  if (!promptData) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Predictive Maintenance</h2>
          <Card className="border-2 border-border bg-card p-8 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-bold mb-2">No Prompt Provided</p>
            <p className="text-muted-foreground">
              Please enter a prompt in the Prompt Studio first to see maintenance predictions.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const predictions = generateMaintenancePredictions(promptData);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Predictive Maintenance</h2>
        <p className="text-muted-foreground mb-4">
          AI-powered maintenance predictions for: <span className="font-bold text-foreground">"{promptData.prompt}"</span>
        </p>

        <div className="flex flex-wrap gap-2 mb-6 text-xs">
          <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
            Industry: {promptData.industry}
          </span>
          <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
            Complexity: {promptData.complexity}
          </span>
          <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
            Tracked Units: {predictions.length}
          </span>
        </div>

        <div className="space-y-4">
          {predictions.map((item, idx) => (
            <Card key={idx} className="border-2 border-border bg-card p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">{item.component}</h3>
                <span className={`px-3 py-1 border-2 font-bold text-sm ${
                  item.health >= 90 ? "border-green-600 bg-green-100 text-green-600" :
                  item.health >= 85 ? "border-yellow-600 bg-yellow-100 text-yellow-600" :
                  "border-red-600 bg-red-100 text-red-600"
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Health Score</span>
                  <span className="text-sm font-bold">{item.health}%</span>
                </div>
                <div className="bg-border h-2 border-2 border-border">
                  <div
                    className="bg-primary h-full transition-all"
                    style={{ width: `${item.health}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{item.nextMaintenance}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
