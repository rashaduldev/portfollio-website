import { createContext } from 'react'

interface LayoutContextType {
  language: string
  setLanguage: React.Dispatch<React.SetStateAction<string>>
  translations: any
  isRTL: boolean
}

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined)