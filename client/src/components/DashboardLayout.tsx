import { useState } from "react";
import { useLocation } from "wouter";
import { Menu, X, Bell, User, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { label: "Prompt Studio", href: "/prompt-studio" },
  { label: "Graphic Generator", href: "/graphic-generator" },
  { label: "Templates", href: "/templates" },
  { label: "History", href: "/history" },
  { label: "Reports", href: "/reports" },
  { label: "Components", href: "/components" },
  { label: "Safety", href: "/safety" },
  { label: "Cost", href: "/cost" },
  { label: "Optimization", href: "/optimization" },
  { label: "Maintenance", href: "/maintenance" },
  { label: "Digital Twin", href: "/digital-twin" },
  { label: "Export", href: "/export" },
  { label: "Settings", href: "/settings" },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isActive = (href: string) => {
    return location === href || (location === "/" && href === "/prompt-studio");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b-2 border-border bg-background sticky top-0 z-50">
        <div className="max-w-full px-4 py-4 md:px-6">
          {/* Top Row: Logo, Search, Actions */}
          <div className="flex items-center justify-between gap-4 mb-4">
            {/* Logo */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 bg-primary border-2 border-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">G</span>
              </div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight whitespace-nowrap">
                GenVisual AI
              </h1>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-xs">
              <Input
                type="text"
                placeholder="Search projects..."
                className="border-2 border-border bg-card text-foreground placeholder:text-muted-foreground"
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

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="border-2 border-transparent hover:border-border"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>

              {/* User Profile */}
              <Button
                variant="ghost"
                size="icon"
                className="border-2 border-transparent hover:border-border"
              >
                <User className="w-5 h-5" />
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden border-2 border-transparent hover:border-border"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex gap-1 overflow-x-auto pb-2 -mb-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => navigate(item.href)}
                className={`px-4 py-2 border-2 whitespace-nowrap text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Navigation - Mobile */}
          {mobileMenuOpen && (
            <nav className="md:hidden grid grid-cols-2 gap-2 pt-4 border-t-2 border-border">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    navigate(item.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 border-2 text-xs font-medium transition-all ${
                    isActive(item.href)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full">
        {children}
      </main>
    </div>
  );
}
