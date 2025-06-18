"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"

type Currency = "BRL" | "USD"

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  exchangeRate: number
  convertPrice: (amount: number, from: Currency, to: Currency) => number
  updateExchangeRate: () => Promise<void>
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("BRL")
  const [exchangeRate, setExchangeRate] = useState(5.0) // Default BRL to USD rate

  const updateExchangeRate = async () => {
    try {
      // In a real app, you would use a currency API like:
      // const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
      // const data = await response.json()
      // setExchangeRate(data.rates.BRL)

      // For demo purposes, we'll simulate an API call
      const mockRate = 5.0 + (Math.random() - 0.5) * 0.5 // Simulate rate fluctuation
      setExchangeRate(mockRate)
    } catch (error) {
      console.error("Failed to update exchange rate:", error)
    }
  }

  const convertPrice = (amount: number, from: Currency, to: Currency): number => {
    if (from === to) return amount

    if (from === "BRL" && to === "USD") {
      return amount / exchangeRate
    } else if (from === "USD" && to === "BRL") {
      return amount * exchangeRate
    }

    return amount
  }

  useEffect(() => {
    updateExchangeRate()
    // Update exchange rate every 5 minutes
    const interval = setInterval(updateExchangeRate, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        exchangeRate,
        convertPrice,
        updateExchangeRate,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
