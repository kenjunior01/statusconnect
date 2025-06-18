import { type NextRequest, NextResponse } from "next/server"

// Mock exchange rates - in production, use a real API like exchangerate-api.com
const MOCK_RATES = {
  USD: 1,
  BRL: 5.0,
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const from = searchParams.get("from") as "USD" | "BRL"
    const to = searchParams.get("to") as "USD" | "BRL"
    const amount = Number.parseFloat(searchParams.get("amount") || "0")

    if (!from || !to || !amount) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Convert to USD first, then to target currency
    const usdAmount = amount / MOCK_RATES[from]
    const convertedAmount = usdAmount * MOCK_RATES[to]

    return NextResponse.json({
      from,
      to,
      amount,
      convertedAmount: Math.round(convertedAmount * 100) / 100,
      rate: MOCK_RATES[to] / MOCK_RATES[from],
    })
  } catch (error) {
    console.error("Currency conversion error:", error)
    return NextResponse.json({ error: "Failed to convert currency" }, { status: 500 })
  }
}
