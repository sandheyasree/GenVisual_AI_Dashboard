import { useState } from "react";
import { useLocation } from "wouter";
import { Menu, X, Bell, User, Moon, Sun, Home, Zap, FileText, Clock, BarChart3, Box, Shield, DollarSign, Cog, Cpu, Wrench, Layers, Download } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { label: "Prompt Studio", href: "/prompt-studio", icon: Home },
  { label: "Graphic Generator", href: "/graphic-generator", icon: Zap },
  { label: "Templates", href: "/templates", icon: FileText },
  { label: "History", href: "/history", icon: Clock },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Components", href: "/components", icon: Box },
  { label: "Safety", href: "/safety", icon: Shield },
  { label: "Cost", href: "/cost", icon: DollarSign },
  { label: "Optimization", href: "/optimization", icon: Cog },
  { label: "Maintenance", href: "/maintenance", icon: Wrench },
  { label: "Digital Twin", href: "/digital-twin", icon: Layers },
  { label: "Export", href: "/export", icon: Download },
  { label: "Settings", href: "/settings", icon: Cpu },
];

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const [location, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const isActive = (href: string) => {
    return location === href || (location === "/" && href === "/prompt-studio");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-card border-r-2 border-border transition-all duration-300 flex flex-col sticky top-0 h-screen overflow-y-auto`}
      >
        {/* Logo Section */}
        <div className="p-4 border-b-2 border-border flex items-center justify-between">
          <div className={`flex items-center gap-2 ${!sidebarOpen && "justify-center w-full"}`}>
            <div className="w-8 h-8 bg-primary border-2 border-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">G</span>
            </div>
            {sidebarOpen && (
              <h1 className="text-lg font-bold tracking-tight whitespace-nowrap">GenVisual</h1>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.href}
                onClick={() => navigate(item.href)}
                className={`w-full flex items-center gap-3 px-3 py-2 border-2 transition-all ${
                  isActive(item.href)
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-primary hover:bg-primary/5"
                } ${!sidebarOpen && "justify-center"}`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-2 border-t-2 border-border space-y-2">
          <Button
            variant="ghost"
            size={sidebarOpen ? "default" : "icon"}
            onClick={toggleTheme}
            className="w-full border-2 border-border justify-start"
          >
            {theme === "light" ? (
              <>
                <Moon className="w-5 h-5" />
                {sidebarOpen && <span className="ml-2 text-sm">Dark</span>}
              </>
            ) : (
              <>
                <Sun className="w-5 h-5" />
                {sidebarOpen && <span className="ml-2 text-sm">Light</span>}
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size={sidebarOpen ? "default" : "icon"}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full border-2 border-border justify-start"
          >
            {sidebarOpen ? (
              <>
                <X className="w-5 h-5" />
                <span className="ml-2 text-sm">Collapse</span>
              </>
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="border-b-2 border-border bg-card sticky top-0 z-40">
          <div className="px-4 md:px-8 py-4 flex items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-xs">
              <Input
                type="text"
                placeholder="Search projects..."
                className="border-2 border-border bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="border-2 border-transparent hover:border-border"
              >
                <Bell className="w-5 h-5" />
              </Button>

              {/* User Profile */}
              <Button
                variant="ghost"
                size="icon"
                className="border-2 border-transparent hover:border-border"
              >
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
