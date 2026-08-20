import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle } from "lucide-react";
import { usePrompt } from "@/contexts/PromptContext";
import {
  downloadProjectAsMarkdown,
  downloadProjectAsCSV,
  downloadProjectAsJSON,
} from "@/lib/exportProject";

export default function Reports() {
  const { promptData } = usePrompt();

  if (!promptData) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Engineering Reports</h2>
          <Card className="border-2 border-border bg-card p-8 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-bold mb-2">No Prompt Provided</p>
            <p className="text-muted-foreground">
              Please enter a prompt in the Prompt Studio first to generate reports.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const handleExport = (format: string) => {
    if (format === "PDF" || format === "Markdown") {
      downloadProjectAsMarkdown(promptData);
    } else if (format === "Excel BOM" || format === "CSV") {
      downloadProjectAsCSV(promptData);
    } else {
      downloadProjectAsJSON(promptData);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Engineering Reports</h2>
        <p className="text-muted-foreground mb-4">
          Generate and export comprehensive engineering reports for: <span className="font-bold text-foreground">"{promptData.prompt}"</span>
        </p>

        <div className="flex flex-wrap gap-2 mb-6 text-xs">
          <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
            Industry: {promptData.industry}
          </span>
          <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
            Complexity: {promptData.complexity}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "PDF Report (Markdown)", format: "PDF", desc: "Full text specification & safety audit report" },
            { title: "Excel / CSV BOM", format: "Excel BOM", desc: "Itemized component quantities, models, and cost table" },
            { title: "SVG Vector Diagram", format: "SVG", desc: "Scalable vector schematic diagram export" },
            { title: "JSON Data Package", format: "JSON", desc: "Complete metadata package for CAD/SCADA integration" },
          ].map((item) => (
            <Card key={item.format} className="border-2 border-border bg-card p-6 flex flex-col justify-between">
              <div className="mb-4">
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <Button
                onClick={() => handleExport(item.format)}
                className="w-full bg-primary text-primary-foreground border-2 border-primary font-bold hover:bg-primary/90"
              >
                <Download className="w-4 h-4 mr-2" />
                Export {item.format}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
