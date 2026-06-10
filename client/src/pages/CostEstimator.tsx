import { Card } from "@/components/ui/card";

const COST_BREAKDOWN = [
  { item: "Motors (3x)", cost: 15000 },
  { item: "PLC System", cost: 25000 },
  { item: "Drives & Converters", cost: 18000 },
  { item: "Sensors & Relays", cost: 8000 },
  { item: "Wiring & Installation", cost: 12000 },
  { item: "HMI Panel", cost: 10000 },
];

export default function CostEstimator() {
  const total = COST_BREAKDOWN.reduce((sum, item) => sum + item.cost, 0);
  const savings = Math.round(total * 0.12);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Project Cost Estimator</h2>
        <p className="text-muted-foreground mb-6">Accurate cost breakdown for your industrial system</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-2 border-border bg-card p-6">
              <h3 className="text-lg font-bold mb-4">Cost Breakdown</h3>
              <div className="space-y-2">
                {COST_BREAKDOWN.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border-b border-border">
                    <span className="font-medium">{item.item}</span>
                    <span className="font-bold">₹{item.cost.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between p-3 border-t-2 border-border font-bold text-lg">
                  <span>Total Cost</span>
                  <span className="text-primary">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border-2 border-border bg-card p-6">
              <p className="text-xs font-bold text-muted-foreground mb-1">TOTAL PROJECT COST</p>
              <p className="text-3xl font-bold text-primary">₹{total.toLocaleString()}</p>
            </Card>
            <Card className="border-2 border-border bg-card p-6">
              <p className="text-xs font-bold text-muted-foreground mb-1">POTENTIAL SAVINGS</p>
              <p className="text-3xl font-bold text-green-600">₹{savings.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-2">12% optimization potential</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
