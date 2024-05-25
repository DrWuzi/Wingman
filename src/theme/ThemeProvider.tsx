import React, {createContext, ReactNode, useContext, useMemo, useState} from 'react';
import {ITheme} from '../../types/theme/ITheme.ts';

interface IThemeContext {
  theme: ITheme;
  setTheme: (theme: ITheme) => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({
  initialTheme,
  children,
}: {
  initialTheme: ITheme;
  children: ReactNode;
}): React.JSX.Element => {
  const [theme, setTheme] = useState<ITheme>(initialTheme);
  const themeObj = useMemo(() => ({theme, setTheme}), [theme]);
  
  return (
    <ThemeContext.Provider value={themeObj}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): IThemeContext => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return themeContext;
};
