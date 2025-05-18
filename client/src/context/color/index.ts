import { createContext } from 'react';

export interface ColorContextType {
  colorScheme: 'dark' | 'light';
  onChange: (colorScheme: 'dark' | 'light') => void;
}

const ColorContext = createContext<ColorContextType | null>(null);

export default ColorContext;
