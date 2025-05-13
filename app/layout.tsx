import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AlphabetProvider } from "@/contexts/AlphabetContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Procesador de Lenguajes Personalizados",
  description: "Aplicación para el procesamiento y manipulación de lenguajes formales",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AlphabetProvider>
            {children}
          </AlphabetProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
