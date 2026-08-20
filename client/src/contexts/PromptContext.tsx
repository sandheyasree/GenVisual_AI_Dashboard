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
  const [promptData, setPromptDataState] = useState<PromptData | null>(() => {
    try {
      const saved = sessionStorage.getItem("genvisual_prompt_data");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const setPromptData = (data: PromptData) => {
    setPromptDataState(data);
    try {
      sessionStorage.setItem("genvisual_prompt_data", JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  };

  const clearPromptData = () => {
    setPromptDataState(null);
    try {
      sessionStorage.removeItem("genvisual_prompt_data");
    } catch (e) {
      console.error(e);
    }
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
