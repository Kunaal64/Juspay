import { ThemeProvider as NextThemesProvider } from "next-themes"

//Wraps application with next-themes provider to manage light/dark mode
export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
