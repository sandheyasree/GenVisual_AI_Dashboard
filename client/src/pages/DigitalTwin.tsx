import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, AlertCircle, Zap } from "lucide-react";
import { useState, useMemo } from "react";
import { usePrompt } from "@/contexts/PromptContext";

export default function DigitalTwin() {
  const [isRunning, setIsRunning] = useState(false);
  const [motorSpeeds, setMotorSpeeds] = useState<number[]>([]);
  const { promptData } = usePrompt();

  // Parse motor count from prompt
  const motorCount = useMemo(() => {
    if (!promptData) return 3;
    const prompt = promptData.prompt.toLowerCase();
    const match = prompt.match(/(\d+)\s*(?:motor|motors|m\d)/);
    return match ? parseInt(match[1]) : 3;
  }, [promptData]);

  // Initialize motor speeds
  useMemo(() => {
    setMotorSpeeds(Array(motorCount).fill(0));
  }, [motorCount]);

  const handleStart = () => {
    setIsRunning(true);
    // Animate motor speeds
    const speeds = Array(motorCount)
      .fill(0)
      .map(() => 1500 + Math.random() * 50);
    setMotorSpeeds(speeds);
  };

  const handleStop = () => {
    setIsRunning(false);
    setMotorSpeeds(Array(motorCount).fill(0));
  };

  const handleMotorSpeedChange = (index: number, speed: number) => {
    const newSpeeds = [...motorSpeeds];
    newSpeeds[index] = speed;
    setMotorSpeeds(newSpeeds);
  };

  if (!promptData) {
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

  const systemLoad = motorSpeeds.length > 0 
    ? Math.round((motorSpeeds.reduce((a, b) => a + b, 0) / (motorCount * 1500)) * 100)
    : 0;

  const systemHealth = isRunning ? 98 : 100;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Digital Twin Preview</h2>
        <p className="text-muted-foreground mb-4">
          Interactive simulation for: <span className="font-bold text-foreground">"{promptData.prompt}"</span>
        </p>

        <Card className="border-2 border-border bg-card p-6 mb-6">
          {/* Simulation Visualization */}
          <div className="bg-background border-2 border-border p-8 mb-4 min-h-96">
            <svg viewBox="0 0 1000 400" className="w-full h-auto">
              {/* Power Source */}
              <circle cx="50" cy="100" r="25" fill="none" stroke="#1a1a1a" strokeWidth="2" />
              <text x="50" y="105" textAnchor="middle" fontSize="10" fontWeight="bold">
                AC
              </text>

              {/* Motors - Dynamic based on prompt */}
              {Array.from({ length: motorCount }).map((_, idx) => {
                const xPos = 150 + idx * 200;
                const isRunning_ = isRunning && motorSpeeds[idx] > 0;
                return (
                  <g key={idx}>
                    {/* Motor Circle */}
                    <circle
                      cx={xPos}
                      cy="100"
                      r="30"
                      fill="none"
                      stroke={isRunning_ ? "#e63946" : "#1a1a1a"}
                      strokeWidth="2"
                    />
                    {/* Rotation indicator */}
                    {isRunning_ && (
                      <circle
                        cx={xPos}
                        cy="100"
                        r="30"
                        fill="none"
                        stroke="#e63946"
                        strokeWidth="1"
                        opacity="0.3"
                        style={{
                          animation: "spin 2s linear infinite",
                        }}
                      />
                    )}
                    <text x={xPos} y="105" textAnchor="middle" fontSize="12" fontWeight="bold">
                      M{idx + 1}
                    </text>
                    {/* Speed indicator */}
                    <text
                      x={xPos}
                      y="150"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fill={isRunning_ ? "#e63946" : "#666"}
                    >
                      {Math.round(motorSpeeds[idx])} RPM
                    </text>
                  </g>
                );
              })}

              {/* PLC */}
              <rect x="400" y="250" width="80" height="60" fill="none" stroke="#1a1a1a" strokeWidth="2" />
              <text x="440" y="285" textAnchor="middle" fontSize="11" fontWeight="bold">
                PLC
              </text>

              {/* HMI */}
              <rect x="700" y="250" width="80" height="60" fill="none" stroke="#1a1a1a" strokeWidth="2" />
              <text x="740" y="285" textAnchor="middle" fontSize="11" fontWeight="bold">
                HMI
              </text>

              {/* Connection lines */}
              {Array.from({ length: motorCount }).map((_, idx) => {
                const xPos = 150 + idx * 200;
                return (
                  <line
                    key={`line-${idx}`}
                    x1={xPos}
                    y1="130"
                    x2="440"
                    y2="250"
                    stroke="#1a1a1a"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                );
              })}
            </svg>

            <style>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
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
                  All {motorCount} motors running at nominal speed. No faults detected. System health: {systemHealth}%
                </p>
              </div>
            </div>
          )}

          {/* Motor Speed Controls */}
          <div className="mb-6 pb-6 border-b-2 border-border">
            <h3 className="text-lg font-bold mb-4">Motor Speed Control</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: motorCount }).map((_, idx) => (
                <Card key={idx} className="border-2 border-border bg-background p-4">
                  <label className="block text-sm font-bold mb-2">Motor {idx + 1}</label>
                  <input
                    type="range"
                    min="0"
                    max="1500"
                    value={motorSpeeds[idx] || 0}
                    onChange={(e) => handleMotorSpeedChange(idx, parseInt(e.target.value))}
                    disabled={!isRunning}
                    className="w-full h-2 bg-border border-2 border-border rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">RPM</span>
                    <span className="text-sm font-bold text-primary">{Math.round(motorSpeeds[idx] || 0)}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* System Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-2 border-border bg-background p-4 text-center">
              <p className="text-xs font-bold text-muted-foreground mb-1">Total Motors</p>
              <p className="text-3xl font-bold text-primary">{motorCount}</p>
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
