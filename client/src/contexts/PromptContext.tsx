import { createContext, useContext, useState, ReactNode } from "react";

export interface PromptData {
  prompt: string;
  industry: string;
  complexity: string;
  intent: string;
  category: string;
  confidence: number;
  components: string[];
  estimatedTime: string;
  timestamp: string;
}

interface PromptContextType {
  promptData: PromptData | null;
  setPromptData: (data: PromptData) => void;
  clearPromptData: () => void;
}

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export function PromptProvider({ children }: { children: ReactNode }) {
  const [promptData, setPromptData] = useState<PromptData | null>(null);

  const clearPromptData = () => {
    setPromptData(null);
  };

  return (
    <PromptContext.Provider value={{ promptData, setPromptData, clearPromptData }}>
      {children}
    </PromptContext.Provider>
  );
}

export function usePrompt() {
  const context = useContext(PromptContext);
  if (context === undefined) {
    throw new Error("usePrompt must be used within a PromptProvider");
  }
  return context;
}
