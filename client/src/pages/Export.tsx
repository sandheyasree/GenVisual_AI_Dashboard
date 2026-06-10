import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Download, FileJson, FileText, Table } from "lucide-react";
import { usePrompt } from "@/contexts/PromptContext";
import {
  downloadProjectAsJSON,
  downloadProjectAsCSV,
  downloadProjectAsMarkdown,
} from "@/lib/exportProject";

export default function Export() {
  const { promptData } = usePrompt();

  if (!promptData) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Export Project</h2>
          <Card className="border-2 border-border bg-card p-8 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-bold mb-2">No Prompt Provided</p>
            <p className="text-muted-foreground">
              Please enter a prompt in the Prompt Studio first to export your project.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Export Project</h2>
        <p className="text-muted-foreground mb-6">
          Export your project data in multiple formats: <span className="font-bold text-foreground">"{promptData.prompt}"</span>
        </p>

        {/* Export Format Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* JSON Export */}
          <Card className="border-2 border-border bg-card p-6 hover:border-primary transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 border-2 border-primary flex items-center justify-center">
                <FileJson className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold">JSON Format</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Complete project data including prompt, analysis, and metadata in JSON format.
            </p>
            <Button
              onClick={() => downloadProjectAsJSON(promptData)}
              className="w-full bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 font-bold"
            >
              <Download className="w-4 h-4 mr-2" />
              Export as JSON
            </Button>
          </Card>

          {/* CSV Export */}
          <Card className="border-2 border-border bg-card p-6 hover:border-primary transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 border-2 border-primary flex items-center justify-center">
                <Table className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold">CSV Format</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Tabular format with BOM, components, and cost breakdown. Perfect for spreadsheets.
            </p>
            <Button
              onClick={() => downloadProjectAsCSV(promptData)}
              className="w-full bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 font-bold"
            >
              <Download className="w-4 h-4 mr-2" />
              Export as CSV
            </Button>
          </Card>

          {/* Markdown Export */}
          <Card className="border-2 border-border bg-card p-6 hover:border-primary transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 border-2 border-primary flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold">Markdown Format</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Formatted report with all project details. Great for documentation and sharing.
            </p>
            <Button
              onClick={() => downloadProjectAsMarkdown(promptData)}
              className="w-full bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 font-bold"
            >
              <Download className="w-4 h-4 mr-2" />
              Export as Markdown
            </Button>
          </Card>
        </div>

        {/* Project Summary */}
        <Card className="border-2 border-border bg-card p-6">
          <h3 className="text-lg font-bold mb-4">Project Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-3 pb-3 border-b-2 border-border">Project Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prompt:</span>
                  <span className="font-medium">{promptData.prompt.substring(0, 40)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Industry:</span>
                  <span className="font-medium">{promptData.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Complexity:</span>
                  <span className="font-medium">{promptData.complexity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Time:</span>
                  <span className="font-medium">{promptData.estimatedTime}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-3 pb-3 border-b-2 border-border">AI Analysis</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Intent:</span>
                  <span className="font-medium">{promptData.intent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{promptData.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Confidence:</span>
                  <span className="font-medium text-primary">{promptData.confidence}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Components:</span>
                  <span className="font-medium">{promptData.components.length} detected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Components List */}
          <div className="mt-6 pt-6 border-t-2 border-border">
            <h4 className="font-bold mb-3">Detected Components</h4>
            <div className="flex flex-wrap gap-2">
              {promptData.components.map((component, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-primary/10 border-2 border-primary text-foreground text-sm font-medium"
                >
                  {component}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Export Info */}
        <Card className="border-2 border-border bg-primary/10 p-6 mt-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm mb-1">Export Information</p>
              <p className="text-sm text-muted-foreground">
                Your project data is exported locally to your computer. No data is stored on our servers. 
                Each export includes all project information, BOM, cost estimates, and safety reports.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
