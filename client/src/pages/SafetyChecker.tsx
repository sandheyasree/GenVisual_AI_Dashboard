import { Card } from "@/components/ui/card";
import { Check, X, AlertCircle } from "lucide-react";
import { usePrompt } from "@/contexts/PromptContext";
import { generateSafetyChecks } from "@/lib/promptAnalyzer";

export default function SafetyChecker() {
  const { promptData } = usePrompt();

  if (!promptData) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Safety Compliance Checker</h2>
          <Card className="border-2 border-border bg-card p-8 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-bold mb-2">No Prompt Provided</p>
            <p className="text-muted-foreground">
              Please enter a prompt in the Prompt Studio first to run safety checks.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const safetyChecks = generateSafetyChecks(promptData);
  const passCount = safetyChecks.filter((c) => c.status === "pass").length;
  const failCount = safetyChecks.filter((c) => c.status === "fail").length;
  const warningCount = safetyChecks.filter((c) => c.status === "warning").length;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Safety Compliance Checker</h2>
        <p className="text-muted-foreground mb-4">
          Safety validation for: <span className="font-bold text-foreground">"{promptData.prompt}"</span>
        </p>

        <div className="flex flex-wrap gap-2 mb-6 text-xs">
          <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
            Industry: {promptData.industry}
          </span>
          <span className="px-2 py-1 bg-primary/10 border-2 border-primary text-foreground font-medium">
            Complexity: {promptData.complexity}
          </span>
        </div>

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

        <Card className="border-2 border-border bg-card p-6 mb-8">
          <div className="flex items-center gap-3">
            {failCount === 0 ? (
              <>
                <div className="w-12 h-12 bg-green-100 border-2 border-green-600 flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-green-600">Design is Safe</p>
                  <p className="text-sm text-muted-foreground">All critical safety checks passed for {promptData.industry}</p>
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

        <div className="space-y-3">
          {safetyChecks.map((check, idx) => (
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
