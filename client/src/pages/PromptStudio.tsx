import { useState } from "react";
import { Mic, Zap, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePrompt } from "@/contexts/PromptContext";

interface AIAnalysis {
  intent: string;
  category: string;
  confidence: number;
  components: string[];
  complexity: string;
  estimatedTime: string;
}

const EXAMPLE_PROMPTS = [
  "Create a smart factory dashboard",
  "Generate a water treatment process flow diagram",
  "Design a motor control schematic",
  "Create a hospital management UI layout",
];

const INDUSTRIES = [
  "Power Systems",
  "Industrial Automation",
  "Manufacturing",
  "Process Industry",
];

const COMPLEXITY_LEVELS = ["Basic", "Intermediate", "Advanced"];

export default function PromptStudio() {
  const { promptData, setPromptData } = usePrompt();
  const [prompt, setPrompt] = useState(promptData ? promptData.prompt : "");
  const [selectedIndustry, setSelectedIndustry] = useState(promptData ? promptData.industry : "Industrial Automation");
  const [selectedComplexity, setSelectedComplexity] = useState(promptData ? promptData.complexity : "Intermediate");
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(
    promptData
      ? {
        intent: promptData.intent,
        category: promptData.category,
        confidence: promptData.confidence,
        components: promptData.components,
        complexity: promptData.complexity,
        estimatedTime: promptData.estimatedTime,
      }
      : null
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = () => {
    if (!prompt.trim()) return;

    setIsAnalyzing(true);

    // Simulate AI analysis with timeout
    setTimeout(() => {
      // Mock AI analysis based on prompt keywords
      const mockAnalysis: AIAnalysis = {
        intent: "System Design & Automation",
        category: "Industrial Schematic",
        confidence: 94,
        components: ["PLC", "Motors", "Sensors", "HMI", "Emergency Stop", "Breakers"],
        complexity: selectedComplexity,
        estimatedTime: selectedComplexity === "Basic" ? "2-3 min" : selectedComplexity === "Intermediate" ? "5-7 min" : "10-15 min",
      };
      setAnalysis(mockAnalysis);

      // Save to global context
      setPromptData({
        prompt,
        industry: selectedIndustry,
        complexity: selectedComplexity,
        intent: mockAnalysis.intent,
        category: mockAnalysis.category,
        confidence: mockAnalysis.confidence,
        components: mockAnalysis.components,
        estimatedTime: mockAnalysis.estimatedTime,
        timestamp: new Date().toISOString(),
      });

      setIsAnalyzing(false);
    }, 800);
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Prompt Studio</h2>
          <p className="text-muted-foreground">
            Describe your industrial system and let AI generate comprehensive engineering diagrams
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Smart Requirement Input Panel */}
            <Card className="border-2 border-border bg-card p-6">
              <h3 className="text-lg font-bold mb-4">Smart Requirement Input</h3>

              {/* Prompt Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Your Prompt</label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your industrial system, e.g., 'Design a conveyor system with 3 motors, emergency stop, PLC and HMI'"
                  className="border-2 border-border bg-background text-foreground min-h-24 resize-none"
                />
              </div>

              {/* Industry Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Industry</label>
                <div className="grid grid-cols-2 gap-2">
                  {INDUSTRIES.map((industry) => (
                    <button
                      key={industry}
                      onClick={() => setSelectedIndustry(industry)}
                      className={`px-3 py-2 border-2 text-sm font-medium transition-all ${selectedIndustry === industry
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-primary"
                        }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>

              {/* Complexity Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Complexity Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {COMPLEXITY_LEVELS.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedComplexity(level)}
                      className={`px-3 py-2 border-2 text-sm font-medium transition-all ${selectedComplexity === level
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-primary"
                        }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleAnalyze}
                  disabled={!prompt.trim() || isAnalyzing}
                  className="flex-1 bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 font-bold"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {isAnalyzing ? "Analyzing..." : "Analyze & Generate"}
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-border bg-card text-foreground hover:border-primary"
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Example Prompts */}
            <Card className="border-2 border-border bg-card p-6">
              <h3 className="text-sm font-bold mb-3 text-muted-foreground">EXAMPLE PROMPTS</h3>
              <div className="space-y-2">
                {EXAMPLE_PROMPTS.map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleExampleClick(example)}
                    className="w-full text-left px-3 py-2 border-2 border-border bg-background text-foreground hover:border-primary transition-all text-sm"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </Card>

            {/* Generation Insights */}
            {analysis && (
              <Card className="border-2 border-border bg-card p-6">
                <h3 className="text-lg font-bold mb-4">Generation Insights</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="pb-4 border-b-2 border-border">
                    <p className="text-xs font-bold text-muted-foreground mb-1">GRAPHIC TYPE</p>
                    <p className="text-base font-bold">{analysis.category}</p>
                  </div>
                  <div className="pb-4 border-b-2 border-border">
                    <p className="text-xs font-bold text-muted-foreground mb-1">COMPLEXITY</p>
                    <p className="text-base font-bold">{analysis.complexity}</p>
                  </div>
                  <div className="pb-4 border-b-2 border-border">
                    <p className="text-xs font-bold text-muted-foreground mb-1">ESTIMATED TIME</p>
                    <p className="text-base font-bold">{analysis.estimatedTime}</p>
                  </div>
                  <div className="pb-4 border-b-2 border-border">
                    <p className="text-xs font-bold text-muted-foreground mb-1">STATUS</p>
                    <p className="text-base font-bold text-primary">Ready to Export</p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column: AI Analysis Panel */}
          <div className="lg:col-span-1">
            {analysis ? (
              <Card className="border-2 border-primary bg-card p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-4 text-primary">AI Understanding</h3>

                {/* Detected Intent */}
                <div className="mb-4 pb-4 border-b-2 border-border">
                  <p className="text-xs font-bold text-muted-foreground mb-1">DETECTED INTENT</p>
                  <p className="text-base font-bold">{analysis.intent}</p>
                </div>

                {/* Graphic Category */}
                <div className="mb-4 pb-4 border-b-2 border-border">
                  <p className="text-xs font-bold text-muted-foreground mb-1">GRAPHIC CATEGORY</p>
                  <p className="text-base font-bold">{analysis.category}</p>
                </div>

                {/* Confidence Score */}
                <div className="mb-4 pb-4 border-b-2 border-border">
                  <p className="text-xs font-bold text-muted-foreground mb-2">CONFIDENCE SCORE</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-border h-2 border-2 border-border">
                      <div
                        className="bg-primary h-full transition-all duration-500 confidence-bar"
                        style={{ width: `${analysis.confidence}%` }}
                      />
                    </div>
                    <span className="text-lg font-bold text-primary">{analysis.confidence}%</span>
                  </div>
                </div>

                {/* Extracted Components */}
                <div>
                  <p className="text-xs font-bold text-muted-foreground mb-2">EXTRACTED COMPONENTS</p>
                  <div className="space-y-1">
                    {analysis.components.map((component, idx) => (
                      <div
                        key={idx}
                        className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground text-xs font-medium"
                      >
                        ✓ {component}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="border-2 border-border bg-card p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-4 text-muted-foreground">AI Understanding</h3>
                <p className="text-sm text-muted-foreground">
                  Enter a prompt and click "Analyze & Generate" to see AI analysis results here.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
