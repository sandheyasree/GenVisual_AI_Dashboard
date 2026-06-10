import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PromptProvider } from "./contexts/PromptContext";
import DashboardLayout from "./components/DashboardLayout";
import PromptStudio from "./pages/PromptStudio";
import GraphicGenerator from "./pages/GraphicGenerator";
import Templates from "./pages/Templates";
import History from "./pages/History";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import ComponentSelector from "./pages/ComponentSelector";
import SafetyChecker from "./pages/SafetyChecker";
import CostEstimator from "./pages/CostEstimator";
import OptimizationEngine from "./pages/OptimizationEngine";
import PredictiveMaintenance from "./pages/PredictiveMaintenance";
import DigitalTwin from "./pages/DigitalTwin";

function Router() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path={"/"} component={PromptStudio} />
        <Route path={"/prompt-studio"} component={PromptStudio} />
        <Route path={"/graphic-generator"} component={GraphicGenerator} />
        <Route path={"/templates"} component={Templates} />
        <Route path={"/history"} component={History} />
        <Route path={"/reports"} component={Reports} />
        <Route path={"/settings"} component={Settings} />
        <Route path={"/components"} component={ComponentSelector} />
        <Route path={"/safety"} component={SafetyChecker} />
        <Route path={"/cost"} component={CostEstimator} />
        <Route path={"/optimization"} component={OptimizationEngine} />
        <Route path={"/maintenance"} component={PredictiveMaintenance} />
        <Route path={"/digital-twin"} component={DigitalTwin} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <PromptProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </PromptProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
