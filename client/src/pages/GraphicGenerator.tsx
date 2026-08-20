import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, AlertCircle } from "lucide-react";
import { usePrompt } from "@/contexts/PromptContext";
import {
  generateSchematicContent,
  generateIllustrationContent,
  generatePLCArchitecture,
  parsePromptRequirements,
} from "@/lib/promptAnalyzer";

export default function GraphicGenerator() {
  const [activeTab, setActiveTab] = useState("diagram");
  const { promptData } = usePrompt();

  if (!promptData) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Multi-Graphic Generation</h2>
          <Card className="border-2 border-border bg-card p-8 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-bold mb-2">No Prompt Provided</p>
            <p className="text-muted-foreground">
              Please enter a prompt in the Prompt Studio first to generate graphics.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const reqs = parsePromptRequirements(promptData.prompt, promptData.industry, promptData.complexity);
  const schematicContent = generateSchematicContent(promptData);
  const illustrationContent = generateIllustrationContent(promptData);
  const plcArchitecture = generatePLCArchitecture(promptData);

  const DiagramMockup = () => {
    // Generate power/process flow line nodes dynamically based on prompt
    const mainNodes: Array<{ id: string; label: string; type: "source" | "transformer" | "breaker" | "vfd" | "motor" | "pump" | "valve" }> = [];

    for (let i = 1; i <= reqs.powerSources; i++) {
      mainNodes.push({ id: `source_${i}`, label: reqs.powerSources > 1 ? `AC${i}` : "AC", type: "source" });
    }
    for (let i = 1; i <= reqs.transformers; i++) {
      mainNodes.push({ id: `tr_${i}`, label: `TR${i}`, type: "transformer" });
    }
    for (let i = 1; i <= reqs.breakers; i++) {
      mainNodes.push({ id: `cb_${i}`, label: `CB${i}`, type: "breaker" });
    }
    for (let i = 1; i <= reqs.vfds; i++) {
      mainNodes.push({ id: `vfd_${i}`, label: `VFD${i}`, type: "vfd" });
    }
    for (let i = 1; i <= reqs.motors; i++) {
      mainNodes.push({ id: `m_${i}`, label: `M${i}`, type: "motor" });
    }
    for (let i = 1; i <= reqs.pumps; i++) {
      mainNodes.push({ id: `p_${i}`, label: `P${i}`, type: "pump" });
    }
    for (let i = 1; i <= reqs.valves; i++) {
      mainNodes.push({ id: `v_${i}`, label: `V${i}`, type: "valve" });
    }

    const startX = 80;
    const spacing = Math.max(120, Math.min(180, 800 / Math.max(3, mainNodes.length)));
    const totalWidth = Math.max(700, startX * 2 + mainNodes.length * spacing);

    return (
      <div className="bg-background border-2 border-border p-8 min-h-96">
        <div className="mb-4 pb-4 border-b-2 border-border flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground mb-1">BASED ON PROMPT</p>
            <p className="text-sm font-medium line-clamp-2">{promptData.prompt}</p>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-primary/10 border border-primary text-xs font-bold">{promptData.industry}</span>
            <span className="px-2 py-1 bg-primary/10 border border-primary text-xs font-bold">{promptData.complexity} Tier</span>
          </div>
        </div>

        <svg viewBox={`0 0 ${totalWidth} 360`} className="w-full h-auto">
          {/* Main Bus Line */}
          {mainNodes.length > 1 && (
            <line
              x1={startX}
              y1="100"
              x2={startX + (mainNodes.length - 1) * spacing}
              y2="100"
              stroke="#1a1a1a"
              strokeWidth="2"
            />
          )}

          {/* Main Line Nodes */}
          {mainNodes.map((node, idx) => {
            const cx = startX + idx * spacing;
            return (
              <g key={node.id}>
                {node.type === "source" && (
                  <>
                    <circle cx={cx} cy="100" r="28" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2" />
                    <text x={cx} y="104" textAnchor="middle" fontSize="11" fontWeight="bold">
                      {node.label}
                    </text>
                  </>
                )}
                {node.type === "transformer" && (
                  <>
                    <circle cx={cx - 10} cy="100" r="18" fill="none" stroke="#1a1a1a" strokeWidth="2" />
                    <circle cx={cx + 10} cy="100" r="18" fill="none" stroke="#1a1a1a" strokeWidth="2" />
                    <text x={cx} y="132" textAnchor="middle" fontSize="10" fontWeight="bold">
                      {node.label}
                    </text>
                  </>
                )}
                {node.type === "breaker" && (
                  <>
                    <rect x={cx - 28} y="80" width="56" height="40" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2" />
                    <text x={cx} y="104" textAnchor="middle" fontSize="10" fontWeight="bold">
                      {node.label}
                    </text>
                  </>
                )}
                {node.type === "vfd" && (
                  <>
                    <rect x={cx - 28} y="80" width="56" height="40" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2" />
                    <text x={cx} y="104" textAnchor="middle" fontSize="9" fontWeight="bold">
                      {node.label}
                    </text>
                  </>
                )}
                {(node.type === "motor" || node.type === "pump") && (
                  <>
                    <circle cx={cx} cy="100" r="25" fill="#ffffff" stroke="#e63946" strokeWidth="2.5" />
                    <text x={cx} y="104" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#e63946">
                      {node.label}
                    </text>
                  </>
                )}
                {node.type === "valve" && (
                  <>
                    <polygon points={`${cx - 20},85 ${cx + 20},115 ${cx - 20},115 ${cx + 20},85`} fill="#ffffff" stroke="#1a1a1a" strokeWidth="2" />
                    <text x={cx} y="132" textAnchor="middle" fontSize="10" fontWeight="bold">
                      {node.label}
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {/* Control Section (PLC, HMI, E-Stop) */}
          {reqs.hasPLC && (
            <g>
              <rect x={startX + 60} y="220" width="90" height="50" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2" />
              <text x={startX + 105} y="250" textAnchor="middle" fontSize="11" fontWeight="bold">
                PLC
              </text>
              <line x1={startX + 105} y1="220" x2={startX + 105} y2="128" stroke="#666666" strokeWidth="1" strokeDasharray="4,4" />
            </g>
          )}

          {reqs.hasHMI && (
            <g>
              <rect x={startX + 220} y="220" width="90" height="50" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2" />
              <text x={startX + 265} y="250" textAnchor="middle" fontSize="11" fontWeight="bold">
                HMI
              </text>
              <line x1={startX + 265} y1="220" x2={startX + 265} y2="128" stroke="#666666" strokeWidth="1" strokeDasharray="4,4" />
            </g>
          )}

          {reqs.hasEStop && (
            <g>
              <circle cx={startX + 380} cy="245" r="22" fill="#ffffff" stroke="#e63946" strokeWidth="2" />
              <text x={startX + 380} y="249" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#e63946">
                E-STOP
              </text>
              <line x1={startX + 380} y1="223" x2={startX + 380} y2="128" stroke="#e63946" strokeWidth="1" strokeDasharray="4,4" />
            </g>
          )}
        </svg>
      </div>
    );
  };

  const UILayoutMockup = () => {
    const itemCount = Math.max(1, reqs.motors + reqs.pumps);
    return (
      <div className="bg-background border-2 border-border p-8 min-h-96">
        <div className="mb-4 pb-4 border-b-2 border-border">
          <p className="text-xs font-bold text-muted-foreground mb-1">BASED ON PROMPT</p>
          <p className="text-sm font-medium line-clamp-2">{promptData.prompt}</p>
        </div>
        <div className="bg-card border-2 border-border p-6 max-w-md">
          <h3 className="text-lg font-bold mb-4 border-b-2 border-border pb-2 flex items-center justify-between">
            <span>HMI Dashboard</span>
            <span className="text-xs text-muted-foreground font-normal">{promptData.industry}</span>
          </h3>
          <div className="space-y-3">
            {Array.from({ length: itemCount }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 border-2 border-border">
                <span className="text-sm font-bold">
                  {reqs.pumps > 0 ? `Pump P${idx + 1}` : `Motor M${idx + 1}`} Status
                </span>
                <div className={`w-3 h-3 ${idx === 0 ? "bg-primary" : "bg-muted"} rounded-full`}></div>
              </div>
            ))}
            {reqs.hasEStop && (
              <div className="flex items-center justify-between p-2 border-2 border-red-500 bg-red-50 dark:bg-red-950/20">
                <span className="text-sm font-bold text-red-600">E-STOP Status</span>
                <span className="text-xs font-bold text-green-600">READY</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2 pt-4 border-t-2 border-border">
              <button className="px-3 py-2 bg-primary text-primary-foreground border-2 border-primary font-bold text-sm">
                START
              </button>
              <button className="px-3 py-2 bg-card border-2 border-border text-foreground font-bold text-sm">
                STOP
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SchematicMockup = () => (
    <div className="bg-background border-2 border-border p-8 min-h-96">
      <div className="mb-4 pb-4 border-b-2 border-border">
        <p className="text-xs font-bold text-muted-foreground mb-1">BASED ON PROMPT</p>
        <p className="text-sm font-medium line-clamp-2">{promptData.prompt}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">{schematicContent.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-bold text-muted-foreground mb-2">COMPONENTS</p>
            <ul className="space-y-1 text-sm">
              {schematicContent.components.map((comp, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>{comp}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground mb-2">CONNECTIONS</p>
            <ul className="space-y-1 text-sm">
              {schematicContent.connections.map((conn, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-primary mr-2 font-bold">→</span>
                  <span>{conn}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="pt-4 border-t-2 border-border">
        <p className="text-xs font-bold text-muted-foreground mb-2">SPECIFICATIONS</p>
        <ul className="space-y-1 text-xs text-muted-foreground">
          {schematicContent.notes.map((note, idx) => (
            <li key={idx}>✓ {note}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  const IllustrationMockup = () => (
    <div className="bg-background border-2 border-border p-8 min-h-96 flex flex-col">
      <div className="mb-4 pb-4 border-b-2 border-border">
        <p className="text-xs font-bold text-muted-foreground mb-1">BASED ON PROMPT</p>
        <p className="text-sm font-medium line-clamp-2">{promptData.prompt}</p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-40 h-40 bg-primary/10 border-2 border-primary mb-6 flex items-center justify-center">
          <div className="text-6xl">
            {promptData.industry === "Power Systems" ? "⚡" : promptData.industry === "Process Industry" ? "💧" : promptData.industry === "Manufacturing" ? "🏭" : "🤖"}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2 text-center">{illustrationContent.title}</h3>
        <p className="text-sm text-muted-foreground text-center mb-6">
          {illustrationContent.layout}
        </p>
        <div className="w-full">
          <p className="text-xs font-bold text-muted-foreground mb-2">KEY FEATURES</p>
          <ul className="space-y-1 text-sm">
            {illustrationContent.keyFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-primary mr-2 font-bold">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const PLCArchitectureMockup = () => (
    <div className="bg-background border-2 border-border p-8 min-h-96 flex flex-col">
      <div className="mb-4 pb-4 border-b-2 border-border">
        <p className="text-xs font-bold text-muted-foreground mb-1">BASED ON PROMPT</p>
        <p className="text-sm font-medium line-clamp-2">{promptData.prompt}</p>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold mb-4">{plcArchitecture.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-bold text-muted-foreground mb-2">CPU MODULE</p>
            <p className="text-sm bg-primary/10 border-2 border-primary p-2 mb-4 font-medium">{plcArchitecture.cpuModule}</p>
            <p className="text-xs font-bold text-muted-foreground mb-2">INPUT MODULES</p>
            <ul className="space-y-1 text-sm mb-4">
              {plcArchitecture.inputModules.map((module, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-primary mr-2 font-bold">▸</span>
                  <span>{module}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground mb-2">OUTPUT MODULES</p>
            <ul className="space-y-1 text-sm mb-4">
              {plcArchitecture.outputModules.map((module, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-primary mr-2 font-bold">▸</span>
                  <span>{module}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs font-bold text-muted-foreground mb-2">COMMUNICATION</p>
            <ul className="space-y-1 text-sm">
              {plcArchitecture.communicationModules.map((module, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-primary mr-2 font-bold">◆</span>
                  <span>{module}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="pt-4 border-t-2 border-border mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-4">
          <div className="bg-card border-2 border-border p-2">
            <p className="text-xs text-muted-foreground">Memory</p>
            <p className="text-sm font-bold">{plcArchitecture.memorySize}</p>
          </div>
          <div className="bg-card border-2 border-border p-2">
            <p className="text-xs text-muted-foreground">Scan Time</p>
            <p className="text-sm font-bold">{plcArchitecture.scanTime}</p>
          </div>
          <div className="bg-card border-2 border-border p-2">
            <p className="text-xs text-muted-foreground">Power Supply</p>
            <p className="text-sm font-bold">{plcArchitecture.powerSupply}</p>
          </div>
          <div className="bg-card border-2 border-border p-2">
            <p className="text-xs text-muted-foreground">Status</p>
            <p className="text-sm font-bold text-primary">Ready</p>
          </div>
        </div>
        <p className="text-xs font-bold text-muted-foreground mb-2">SPECIFICATIONS</p>
        <ul className="space-y-1 text-xs text-muted-foreground">
          {plcArchitecture.notes.map((note, idx) => (
            <li key={idx}>✓ {note}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Multi-Graphic Generation</h2>
          <p className="text-muted-foreground mb-4">
            Generated graphics based on your prompt: <span className="font-bold text-foreground">"{promptData.prompt}"</span>
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
              Industry: {promptData.industry}
            </span>
            <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
              Category: {promptData.category}
            </span>
            <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
              Complexity: {promptData.complexity}
            </span>
            <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
              Confidence: {promptData.confidence}%
            </span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 border-2 border-border bg-card mb-6">
            <TabsTrigger value="diagram" className="border-r-2 border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Diagrams
            </TabsTrigger>
            <TabsTrigger value="ui" className="border-r-2 border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              UI Layouts
            </TabsTrigger>
            <TabsTrigger value="schematic" className="border-r-2 border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Schematics
            </TabsTrigger>
            <TabsTrigger value="illustration" className="border-r-2 border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Illustrations
            </TabsTrigger>
            <TabsTrigger value="plc" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              PLC Architecture
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diagram" className="space-y-4">
            <Card className="border-2 border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">{promptData.category}</h3>
                  <p className="text-sm text-muted-foreground">Power & component topology diagram</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-2 border-border">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="border-2 border-border">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <DiagramMockup />
            </Card>
          </TabsContent>

          <TabsContent value="ui" className="space-y-4">
            <Card className="border-2 border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">HMI Screen Layout</h3>
                  <p className="text-sm text-muted-foreground">Human-Machine Interface wireframe</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-2 border-border">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="border-2 border-border">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <UILayoutMockup />
            </Card>
          </TabsContent>

          <TabsContent value="schematic" className="space-y-4">
            <Card className="border-2 border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">{schematicContent.title}</h3>
                  <p className="text-sm text-muted-foreground">Detailed system architecture and components</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-2 border-border">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="border-2 border-border">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <SchematicMockup />
            </Card>
          </TabsContent>

          <TabsContent value="illustration" className="space-y-4">
            <Card className="border-2 border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">{illustrationContent.title}</h3>
                  <p className="text-sm text-muted-foreground">System layout and key features</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-2 border-border">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="border-2 border-border">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <IllustrationMockup />
            </Card>
          </TabsContent>

          <TabsContent value="plc" className="space-y-4">
            <Card className="border-2 border-border bg-card p-6">
              <PLCArchitectureMockup />
            </Card>
          </TabsContent>
        </Tabs>

        {/* Export Options */}
        <Card className="border-2 border-border bg-card p-6 mt-8">
          <h3 className="text-lg font-bold mb-4">Export Options</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["PNG", "SVG", "PDF", "CAD"].map((format) => (
              <Button
                key={format}
                className="bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 font-bold"
              >
                <Download className="w-4 h-4 mr-2" />
                {format}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
