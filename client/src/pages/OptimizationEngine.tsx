import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const OPTIMIZATIONS = [
  {
    current: "Single PLC",
    suggestion: "Dual PLC Redundancy",
    benefit: "Higher reliability (99.9% uptime)",
    impact: "High",
  },
  {
    current: "4 Sensors",
    suggestion: "3 Sensors with Smart Logic",
    benefit: "Cost reduction: ₹15,000",
    impact: "Medium",
  },
  {
    current: "Standard Motors",
    suggestion: "Energy-Efficient Motors",
    benefit: "30% power reduction",
    impact: "High",
  },
  {
    current: "Manual Monitoring",
    suggestion: "Predictive Analytics",
    benefit: "Prevent 80% of failures",
    impact: "Critical",
  },
];

export default function OptimizationEngine() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Design Optimization Engine</h2>
        <p className="text-muted-foreground mb-6">AI-powered suggestions to improve your designs</p>

        <div className="space-y-4">
          {OPTIMIZATIONS.map((opt, idx) => (
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
