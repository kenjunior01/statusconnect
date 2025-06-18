import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/hooks/use-language"
import { CurrencyProvider } from "@/hooks/use-currency"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StatusConnect - Monetize Your WhatsApp Status",
  description: "Connect with companies that want to advertise on your WhatsApp status and earn money.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <CurrencyProvider>
            {children}
            <Toaster />
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
