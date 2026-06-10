import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, AlertCircle } from "lucide-react";
import { usePrompt } from "@/contexts/PromptContext";

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

  const DiagramMockup = () => (
    <div className="bg-background border-2 border-border p-8 min-h-96">
      <div className="mb-4 pb-4 border-b-2 border-border">
        <p className="text-xs font-bold text-muted-foreground mb-1">BASED ON PROMPT</p>
        <p className="text-sm font-medium line-clamp-2">{promptData.prompt}</p>
      </div>
      <svg viewBox="0 0 800 400" className="w-full h-auto">
        <circle cx="100" cy="100" r="30" fill="none" stroke="#1a1a1a" strokeWidth="2" />
        <text x="100" y="105" textAnchor="middle" fontSize="12" fontWeight="bold">AC</text>
        <rect x="200" y="80" width="60" height="40" fill="none" stroke="#1a1a1a" strokeWidth="2" />
        <text x="230" y="105" textAnchor="middle" fontSize="10" fontWeight="bold">CB1</text>
        <circle cx="350" cy="100" r="25" fill="none" stroke="#e63946" strokeWidth="2" />
        <text x="350" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#e63946">M1</text>
        <circle cx="500" cy="100" r="25" fill="none" stroke="#e63946" strokeWidth="2" />
        <text x="500" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#e63946">M2</text>
        <circle cx="650" cy="100" r="25" fill="none" stroke="#e63946" strokeWidth="2" />
        <text x="650" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#e63946">M3</text>
        <rect x="200" y="200" width="80" height="60" fill="none" stroke="#1a1a1a" strokeWidth="2" />
        <text x="240" y="235" textAnchor="middle" fontSize="11" fontWeight="bold">PLC</text>
        <rect x="400" y="200" width="80" height="60" fill="none" stroke="#1a1a1a" strokeWidth="2" />
        <text x="440" y="235" textAnchor="middle" fontSize="11" fontWeight="bold">HMI</text>
        <circle cx="600" cy="230" r="20" fill="none" stroke="#e63946" strokeWidth="2" />
        <text x="600" y="235" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#e63946">E-STOP</text>
        <line x1="130" y1="100" x2="200" y2="100" stroke="#1a1a1a" strokeWidth="2" />
        <line x1="260" y1="100" x2="325" y2="100" stroke="#1a1a1a" strokeWidth="2" />
        <line x1="375" y1="100" x2="475" y2="100" stroke="#1a1a1a" strokeWidth="2" />
        <line x1="525" y1="100" x2="625" y2="100" stroke="#1a1a1a" strokeWidth="2" />
        <line x1="240" y1="200" x2="240" y2="150" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="5,5" />
        <line x1="440" y1="200" x2="440" y2="150" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="5,5" />
      </svg>
    </div>
  );

  const UILayoutMockup = () => (
    <div className="bg-background border-2 border-border p-8 min-h-96">
      <div className="mb-4 pb-4 border-b-2 border-border">
        <p className="text-xs font-bold text-muted-foreground mb-1">BASED ON PROMPT</p>
        <p className="text-sm font-medium line-clamp-2">{promptData.prompt}</p>
      </div>
      <div className="bg-card border-2 border-border p-6 max-w-md">
        <h3 className="text-lg font-bold mb-4 border-b-2 border-border pb-2">HMI Dashboard</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 border-2 border-border">
            <span className="text-sm font-bold">Motor 1 Status</span>
            <div className="w-3 h-3 bg-primary rounded-full"></div>
          </div>
          <div className="flex items-center justify-between p-2 border-2 border-border">
            <span className="text-sm font-bold">Motor 2 Status</span>
            <div className="w-3 h-3 bg-primary rounded-full"></div>
          </div>
          <div className="flex items-center justify-between p-2 border-2 border-border">
            <span className="text-sm font-bold">Motor 3 Status</span>
            <div className="w-3 h-3 bg-muted rounded-full"></div>
          </div>
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

  const SchematicMockup = () => (
    <div className="bg-background border-2 border-border p-8 min-h-96">
      <div className="mb-4 pb-4 border-b-2 border-border">
        <p className="text-xs font-bold text-muted-foreground mb-1">BASED ON PROMPT</p>
        <p className="text-sm font-medium line-clamp-2">{promptData.prompt}</p>
      </div>
      <svg viewBox="0 0 800 400" className="w-full h-auto">
        <text x="50" y="30" fontSize="12" fontWeight="bold">SENSORS</text>
        <rect x="30" y="50" width="50" height="30" fill="none" stroke="#1a1a1a" strokeWidth="2" />
        <text x="55" y="70" textAnchor="middle" fontSize="10">S1</text>
        <rect x="100" y="50" width="50" height="30" fill="none" stroke="#1a1a1a" strokeWidth="2" />
        <text x="125" y="70" textAnchor="middle" fontSize="10">S2</text>
        <text x="350" y="30" fontSize="12" fontWeight="bold">PLC CORE</text>
        <rect x="300" y="50" width="100" height="80" fill="none" stroke="#e63946" strokeWidth="2" />
        <text x="350" y="95" textAnchor="middle" fontSize="11" fontWeight="bold">AC500</text>
        <text x="600" y="30" fontSize="12" fontWeight="bold">ACTUATORS</text>
        <rect x="580" y="50" width="50" height="30" fill="none" stroke="#1a1a1a" strokeWidth="2" />
        <text x="605" y="70" textAnchor="middle" fontSize="10">A1</text>
        <rect x="650" y="50" width="50" height="30" fill="none" stroke="#1a1a1a" strokeWidth="2" />
        <text x="675" y="70" textAnchor="middle" fontSize="10">A2</text>
        <text x="350" y="200" fontSize="12" fontWeight="bold" textAnchor="middle">COMMUNICATION</text>
        <rect x="250" y="220" width="200" height="40" fill="none" stroke="#1a1a1a" strokeWidth="2" />
        <text x="350" y="245" textAnchor="middle" fontSize="10">ETHERNET / PROFIBUS</text>
        <line x1="80" y1="80" x2="300" y2="90" stroke="#1a1a1a" strokeWidth="2" />
        <line x1="400" y1="90" x2="580" y2="65" stroke="#1a1a1a" strokeWidth="2" />
        <line x1="350" y1="130" x2="350" y2="220" stroke="#1a1a1a" strokeWidth="2" />
      </svg>
    </div>
  );

  const IllustrationMockup = () => (
    <div className="bg-background border-2 border-border p-8 min-h-96 flex flex-col items-center justify-center">
      <div className="mb-4 pb-4 border-b-2 border-border w-full">
        <p className="text-xs font-bold text-muted-foreground mb-1">BASED ON PROMPT</p>
        <p className="text-sm font-medium line-clamp-2">{promptData.prompt}</p>
      </div>
      <div className="text-center">
        <div className="w-32 h-32 bg-primary/10 border-2 border-primary mx-auto mb-4 flex items-center justify-center">
          <div className="text-6xl">🏭</div>
        </div>
        <h3 className="text-lg font-bold mb-2">Smart Factory Layout</h3>
        <p className="text-sm text-muted-foreground">Conceptual visualization of industrial system</p>
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
              {promptData.category}
            </span>
            <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
              Confidence: {promptData.confidence}%
            </span>
            <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
              {promptData.complexity}
            </span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 border-2 border-border bg-card mb-6">
            <TabsTrigger value="diagram" className="border-r-2 border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Diagrams
            </TabsTrigger>
            <TabsTrigger value="ui" className="border-r-2 border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              UI Layouts
            </TabsTrigger>
            <TabsTrigger value="schematic" className="border-r-2 border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Schematics
            </TabsTrigger>
            <TabsTrigger value="illustration" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Illustrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diagram" className="space-y-4">
            <Card className="border-2 border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">Single Line Diagram (SLD)</h3>
                  <p className="text-sm text-muted-foreground">Power distribution and motor connections</p>
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
                  <h3 className="text-lg font-bold">PLC Architecture Diagram</h3>
                  <p className="text-sm text-muted-foreground">Sensor-PLC-Actuator connections</p>
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
                  <h3 className="text-lg font-bold">Factory Layout Illustration</h3>
                  <p className="text-sm text-muted-foreground">Conceptual system visualization</p>
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
