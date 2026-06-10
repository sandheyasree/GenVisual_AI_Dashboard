import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Reports() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Engineering Reports</h2>
        <p className="text-muted-foreground mb-6">Generate and export comprehensive engineering reports</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["PDF", "CAD", "SVG", "Excel BOM"].map((format) => (
            <Card key={format} className="border-2 border-border bg-card p-6">
              <h3 className="font-bold mb-2">Export as {format}</h3>
              <Button className="w-full bg-primary text-primary-foreground border-2 border-primary">
                <Download className="w-4 h-4 mr-2" />
                Export {format}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
