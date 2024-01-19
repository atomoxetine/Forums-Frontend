'use client';
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function useTheme(defaultTheme: string = "dark") : [string | undefined, Dispatch<SetStateAction<string | undefined>>] {
  const [theme, setTheme] = useState<string>();
  useEffect(() => {
    const local = window.localStorage.getItem("theme");
    setTheme(local ?? defaultTheme);
  }, []);

  useEffect(() => {
    if (!theme) return;

    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
}

export default useTheme;