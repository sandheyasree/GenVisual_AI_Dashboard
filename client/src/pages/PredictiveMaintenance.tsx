import { Card } from "@/components/ui/card";

const MAINTENANCE_PREDICTIONS = [
  {
    component: "Motor 1",
    health: 95,
    status: "Excellent",
    nextMaintenance: "12 months",
  },
  {
    component: "Motor 2",
    health: 88,
    status: "Good",
    nextMaintenance: "6 months - Bearing wear detected",
  },
  {
    component: "Motor 3",
    health: 92,
    status: "Good",
    nextMaintenance: "9 months",
  },
  {
    component: "PLC System",
    health: 98,
    status: "Excellent",
    nextMaintenance: "24 months",
  },
  {
    component: "Drive Unit",
    health: 85,
    status: "Fair",
    nextMaintenance: "3 months - Capacitor aging",
  },
];

export default function PredictiveMaintenance() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Predictive Maintenance</h2>
        <p className="text-muted-foreground mb-6">AI-powered maintenance predictions and insights</p>

        <div className="space-y-4">
          {MAINTENANCE_PREDICTIONS.map((item, idx) => (
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
