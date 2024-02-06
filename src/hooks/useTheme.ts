'use client';
import { useCallback, useEffect } from "react";
import useGlobal from './useGlobal';

function useTheme(defaultTheme: string = "dark"): [string | undefined, (theme: string) => void] {
  const getDefaultTheme = useCallback(() => window.localStorage.getItem("theme") ?? defaultTheme, [defaultTheme]);
  const [theme, setTheme] = useGlobal('theme', getDefaultTheme);
  
  useEffect(() => {
    if (!theme) return;

    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
}

export default useTheme;