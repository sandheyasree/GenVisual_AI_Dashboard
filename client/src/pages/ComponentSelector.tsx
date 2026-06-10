import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Component {
  name: string;
  category: string;
  model: string;
  specs: string;
}

const RECOMMENDED_COMPONENTS: Component[] = [
  { name: "Motor", category: "Actuators", model: "5HP ABB Motor", specs: "3-phase, 1500 RPM" },
  { name: "Drive", category: "Power Control", model: "ABB ACS580", specs: "11 kW, IP54" },
  { name: "PLC", category: "Control", model: "ABB AC500", specs: "Compact, 16 I/O" },
  { name: "Breaker", category: "Protection", model: "ABB S200", specs: "16A, C-curve" },
  { name: "Relay", category: "Control", model: "ABB CR-M", specs: "4NO/4NC" },
  { name: "Sensor", category: "Input", model: "Inductive Proximity", specs: "M12, 2m range" },
];

export default function ComponentSelector() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Auto Component Selection</h2>
        <p className="text-muted-foreground mb-6">
          AI-recommended industrial components optimized for your design
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RECOMMENDED_COMPONENTS.map((component, idx) => (
            <Card key={idx} className="border-2 border-border bg-card p-6">
              <div className="mb-4 pb-4 border-b-2 border-border">
                <p className="text-xs font-bold text-muted-foreground mb-1">{component.category}</p>
                <h3 className="text-lg font-bold">{component.name}</h3>
              </div>
              <div className="mb-4">
                <p className="text-sm font-bold mb-1">{component.model}</p>
                <p className="text-xs text-muted-foreground">{component.specs}</p>
              </div>
              <Button className="w-full bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 font-bold">
                Add to BOM
              </Button>
            </Card>
          ))}
        </div>

        <Card className="border-2 border-border bg-card p-6 mt-8">
          <h3 className="text-lg font-bold mb-4">Bill of Materials (BOM)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2 font-bold">Component</th>
                  <th className="text-left py-2 font-bold">Model</th>
                  <th className="text-right py-2 font-bold">Qty</th>
                  <th className="text-right py-2 font-bold">Unit Price</th>
                  <th className="text-right py-2 font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {RECOMMENDED_COMPONENTS.slice(0, 3).map((component, idx) => (
                  <tr key={idx} className="border-b border-border">
                    <td className="py-2">{component.name}</td>
                    <td className="py-2">{component.model}</td>
                    <td className="text-right py-2">1</td>
                    <td className="text-right py-2">₹5,000</td>
                    <td className="text-right py-2 font-bold">₹5,000</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
