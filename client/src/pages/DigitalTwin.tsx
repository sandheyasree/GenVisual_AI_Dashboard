import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { usePrompt } from "@/contexts/PromptContext";
import { parsePromptRequirements } from "@/lib/promptAnalyzer";

export default function DigitalTwin() {
  const { promptData } = usePrompt();
  const [isRunning, setIsRunning] = useState(false);
  const [speeds, setSpeeds] = useState<number[]>([]);

  const reqs = promptData
    ? parsePromptRequirements(promptData.prompt, promptData.industry, promptData.complexity)
    : null;

  const deviceCount = reqs
    ? Math.max(1, reqs.motors > 0 ? reqs.motors : reqs.pumps > 0 ? reqs.pumps : 1)
    : 1;

  const deviceLabel = reqs && reqs.pumps > 0 && reqs.motors === 0 ? "Pump" : "Motor";

  useEffect(() => {
    setSpeeds(Array(deviceCount).fill(0));
  }, [deviceCount]);

  const handleStart = () => {
    setIsRunning(true);
    const newSpeeds = Array(deviceCount)
      .fill(0)
      .map(() => 1450 + Math.random() * 50);
    setSpeeds(newSpeeds);
  };

  const handleStop = () => {
    setIsRunning(false);
    setSpeeds(Array(deviceCount).fill(0));
  };

  const handleSpeedChange = (index: number, speed: number) => {
    const next = [...speeds];
    next[index] = speed;
    setSpeeds(next);
  };

  if (!promptData || !reqs) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Digital Twin Preview</h2>
          <Card className="border-2 border-border bg-card p-8 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-bold mb-2">No Prompt Provided</p>
            <p className="text-muted-foreground">
              Please enter a prompt in the Prompt Studio first to start the simulation.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const systemLoad = speeds.length > 0
    ? Math.round((speeds.reduce((a, b) => a + b, 0) / (deviceCount * 1500)) * 100)
    : 0;

  const systemHealth = isRunning ? 98 : 100;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Digital Twin Preview</h2>
        <p className="text-muted-foreground mb-4">
          Interactive simulation for: <span className="font-bold text-foreground">"{promptData.prompt}"</span>
        </p>

        <div className="flex flex-wrap gap-2 mb-6 text-xs">
          <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
            Industry: {promptData.industry}
          </span>
          <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
            Complexity: {promptData.complexity}
          </span>
          <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
            Simulated Units: {deviceCount} {deviceLabel}(s)
          </span>
        </div>

        <Card className="border-2 border-border bg-card p-6 mb-6">
          {/* Simulation Visualization */}
          <div className="bg-background border-2 border-border p-8 mb-4 min-h-96">
            <svg viewBox="0 0 1000 360" className="w-full h-auto">
              {/* Power Source */}
              <circle cx="60" cy="100" r="28" fill="none" stroke="#1a1a1a" strokeWidth="2" />
              <text x="60" y="105" textAnchor="middle" fontSize="11" fontWeight="bold">
                AC
              </text>

              {/* Dynamic Units based on prompt */}
              {Array.from({ length: deviceCount }).map((_, idx) => {
                const spacing = Math.max(140, Math.min(220, 700 / deviceCount));
                const xPos = 180 + idx * spacing;
                const isUnitRunning = isRunning && (speeds[idx] || 0) > 0;

                return (
                  <g key={idx}>
                    <line x1={idx === 0 ? 88 : 180 + (idx - 1) * spacing + 28} y1="100" x2={xPos - 28} y2="100" stroke="#1a1a1a" strokeWidth="2" />
                    <circle
                      cx={xPos}
                      cy="100"
                      r="28"
                      fill="#ffffff"
                      stroke={isUnitRunning ? "#e63946" : "#1a1a1a"}
                      strokeWidth="2.5"
                    />
                    <text x={xPos} y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill={isUnitRunning ? "#e63946" : "#1a1a1a"}>
                      {deviceLabel === "Pump" ? `P${idx + 1}` : `M${idx + 1}`}
                    </text>
                    <text
                      x={xPos}
                      y="148"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fill={isUnitRunning ? "#e63946" : "#666"}
                    >
                      {Math.round(speeds[idx] || 0)} RPM
                    </text>
                  </g>
                );
              })}

              {/* PLC & HMI */}
              {reqs.hasPLC && (
                <g>
                  <rect x="360" y="220" width="90" height="50" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2" />
                  <text x="405" y="250" textAnchor="middle" fontSize="11" fontWeight="bold">
                    PLC
                  </text>
                </g>
              )}

              {reqs.hasHMI && (
                <g>
                  <rect x="560" y="220" width="90" height="50" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2" />
                  <text x="605" y="250" textAnchor="middle" fontSize="11" fontWeight="bold">
                    HMI
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-2 mb-6">
            <Button
              onClick={handleStart}
              disabled={isRunning}
              className="flex-1 bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 font-bold"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Simulation
            </Button>
            <Button
              onClick={handleStop}
              disabled={!isRunning}
              variant="outline"
              className="border-2 border-border"
            >
              <Pause className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleStop}
              variant="outline"
              className="border-2 border-border"
            >
              <Square className="w-4 h-4" />
            </Button>
          </div>

          {/* Status Alert */}
          {isRunning && (
            <div className="bg-primary/10 border-2 border-primary p-4 flex items-start gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Simulation Status: Running</p>
                <p className="text-xs text-muted-foreground mt-1">
                  All {deviceCount} {deviceLabel.toLowerCase()}(s) running at nominal speed. No faults detected. System health: {systemHealth}%
                </p>
              </div>
            </div>
          )}

          {/* Speed Controls */}
          <div className="mb-6 pb-6 border-b-2 border-border">
            <h3 className="text-lg font-bold mb-4">{deviceLabel} Speed Control</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: deviceCount }).map((_, idx) => (
                <Card key={idx} className="border-2 border-border bg-background p-4">
                  <label className="block text-sm font-bold mb-2">{deviceLabel} {idx + 1}</label>
                  <input
                    type="range"
                    min="0"
                    max="1500"
                    value={speeds[idx] || 0}
                    onChange={(e) => handleSpeedChange(idx, parseInt(e.target.value))}
                    disabled={!isRunning}
                    className="w-full h-2 bg-border border-2 border-border rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">RPM</span>
                    <span className="text-sm font-bold text-primary">{Math.round(speeds[idx] || 0)}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* System Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-2 border-border bg-background p-4 text-center">
              <p className="text-xs font-bold text-muted-foreground mb-1">Total {deviceLabel}s</p>
              <p className="text-3xl font-bold text-primary">{deviceCount}</p>
            </Card>
            <Card className="border-2 border-border bg-background p-4 text-center">
              <p className="text-xs font-bold text-muted-foreground mb-1">System Load</p>
              <p className="text-3xl font-bold text-primary">{systemLoad}%</p>
            </Card>
            <Card className="border-2 border-border bg-background p-4 text-center">
              <p className="text-xs font-bold text-muted-foreground mb-1">System Health</p>
              <p className="text-3xl font-bold text-green-600">{systemHealth}%</p>
            </Card>
            <Card className="border-2 border-border bg-background p-4 text-center">
              <p className="text-xs font-bold text-muted-foreground mb-1">Status</p>
              <p className="text-lg font-bold text-primary">{isRunning ? "Running" : "Idle"}</p>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}
