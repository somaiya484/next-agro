import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"



export const metadata = {
  title: "NextAgroHub - Agricultural Management Platform",
  description: "Complete agricultural management solution for farmers, buyers, experts, and administrators",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
