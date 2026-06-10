import { Card } from "@/components/ui/card";

export default function Templates() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Templates</h2>
        <p className="text-muted-foreground mb-6">Pre-built templates for common industrial systems</p>
        <Card className="border-2 border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">Templates coming soon</p>
        </Card>
      </div>
    </div>
  );
}
