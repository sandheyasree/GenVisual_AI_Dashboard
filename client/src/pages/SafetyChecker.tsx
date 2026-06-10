import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

interface SafetyCheck {
  name: string;
  status: "pass" | "fail" | "warning";
  description: string;
  recommendation?: string;
}

const SAFETY_CHECKS: SafetyCheck[] = [
  {
    name: "Overload Protection",
    status: "pass",
    description: "Thermal overload relay present on all motors",
  },
  {
    name: "Emergency Stop",
    status: "pass",
    description: "Emergency stop button configured and tested",
  },
  {
    name: "Grounding",
    status: "pass",
    description: "Proper grounding and bonding implemented",
  },
  {
    name: "Circuit Breaker",
    status: "pass",
    description: "Appropriate breaker rating for system load",
  },
  {
    name: "Fault Detection",
    status: "warning",
    description: "Limited fault detection capability",
    recommendation: "Add redundant sensors for critical monitoring",
  },
  {
    name: "Safety Interlock",
    status: "fail",
    description: "Missing safety interlock on access points",
    recommendation: "Install safety switches on all access doors",
  },
];

export default function SafetyChecker() {
  const passCount = SAFETY_CHECKS.filter((c) => c.status === "pass").length;
  const failCount = SAFETY_CHECKS.filter((c) => c.status === "fail").length;
  const warningCount = SAFETY_CHECKS.filter((c) => c.status === "warning").length;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Safety Compliance Checker</h2>
        <p className="text-muted-foreground mb-6">Validate your design against safety standards</p>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="border-2 border-border bg-card p-6 text-center">
            <p className="text-3xl font-bold text-primary">{passCount}</p>
            <p className="text-sm text-muted-foreground">Passed</p>
          </Card>
          <Card className="border-2 border-border bg-card p-6 text-center">
            <p className="text-3xl font-bold text-yellow-600">{warningCount}</p>
            <p className="text-sm text-muted-foreground">Warnings</p>
          </Card>
          <Card className="border-2 border-border bg-card p-6 text-center">
            <p className="text-3xl font-bold text-red-600">{failCount}</p>
            <p className="text-sm text-muted-foreground">Failed</p>
          </Card>
        </div>

        {/* Status Badge */}
        <Card className="border-2 border-border bg-card p-6 mb-8">
          <div className="flex items-center gap-3">
            {failCount === 0 ? (
              <>
                <div className="w-12 h-12 bg-green-100 border-2 border-green-600 flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-green-600">Design is Safe</p>
                  <p className="text-sm text-muted-foreground">All critical safety checks passed</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 bg-red-100 border-2 border-red-600 flex items-center justify-center">
                  <X className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-red-600">Issues Detected</p>
                  <p className="text-sm text-muted-foreground">Address critical failures before deployment</p>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Detailed Checks */}
        <div className="space-y-3">
          {SAFETY_CHECKS.map((check, idx) => (
            <Card key={idx} className="border-2 border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {check.status === "pass" && (
                    <div className="w-6 h-6 bg-green-100 border-2 border-green-600 flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                  )}
                  {check.status === "warning" && (
                    <div className="w-6 h-6 bg-yellow-100 border-2 border-yellow-600 flex items-center justify-center">
                      <span className="text-yellow-600 font-bold">!</span>
                    </div>
                  )}
                  {check.status === "fail" && (
                    <div className="w-6 h-6 bg-red-100 border-2 border-red-600 flex items-center justify-center">
                      <X className="w-4 h-4 text-red-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{check.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{check.description}</p>
                  {check.recommendation && (
                    <p className="text-sm bg-primary/10 border-l-2 border-primary p-2">
                      <span className="font-bold">Recommendation:</span> {check.recommendation}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
