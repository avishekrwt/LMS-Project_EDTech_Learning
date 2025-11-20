import { useCallback } from "react";
import { useTheme } from "next-themes";

export const useThemeToggle = () => {
  const { theme: currentTheme, setTheme, resolvedTheme } = useTheme();

  const theme = (resolvedTheme || currentTheme) as string | undefined;

  const toggleTheme = useCallback(() => {
    if ((theme || "light") === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [setTheme, theme]);

  return { theme: theme || "light", toggleTheme };
};
