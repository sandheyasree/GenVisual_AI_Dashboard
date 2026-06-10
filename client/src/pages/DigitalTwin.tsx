import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function DigitalTwin() {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Digital Twin Preview</h2>
        <p className="text-muted-foreground mb-6">Interactive simulation of your industrial system</p>

        <Card className="border-2 border-border bg-card p-6 mb-6">
          <div className="bg-background border-2 border-border p-8 mb-4 min-h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">⚙️</div>
              <p className="text-lg font-bold mb-2">System Simulation</p>
              <p className="text-sm text-muted-foreground">
                {isRunning ? "System running - All motors operational" : "System idle - Ready to start"}
              </p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <Button
              onClick={() => setIsRunning(true)}
              className="flex-1 bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 font-bold"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Simulation
            </Button>
            <Button
              onClick={() => setIsRunning(false)}
              variant="outline"
              className="border-2 border-border"
            >
              <Pause className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setIsRunning(false)}
              variant="outline"
              className="border-2 border-border"
            >
              <Square className="w-4 h-4" />
            </Button>
          </div>

          {isRunning && (
            <div className="bg-primary/10 border-2 border-primary p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Simulation Status: Running</p>
                <p className="text-xs text-muted-foreground mt-1">
                  All motors running at nominal speed. No faults detected. System health: 98%
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* System Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Motor 1 Speed", value: isRunning ? "1500 RPM" : "0 RPM" },
            { label: "Motor 2 Speed", value: isRunning ? "1500 RPM" : "0 RPM" },
            { label: "Motor 3 Speed", value: isRunning ? "1500 RPM" : "0 RPM" },
            { label: "System Load", value: isRunning ? "75%" : "0%" },
          ].map((metric, idx) => (
            <Card key={idx} className="border-2 border-border bg-card p-4 text-center">
              <p className="text-xs font-bold text-muted-foreground mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-primary">{metric.value}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
