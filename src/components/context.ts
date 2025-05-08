import { PortfolioJSON } from '@/types/translations';
import { createContext } from 'react';

interface LayoutContextType {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  translations: PortfolioJSON;
  isRTL: boolean;
}

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);
