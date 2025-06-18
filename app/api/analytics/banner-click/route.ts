import { type NextRequest, NextResponse } from "next/server"

interface ClickData {
  bannerId: string
  timestamp: string
  userAgent: string
  ip: string
  referrer?: string
  location?: {
    country: string
    city: string
  }
}

// Mock database - em produção, usar um banco de dados real
const clicksDatabase: ClickData[] = []

export async function POST(req: NextRequest) {
  try {
    const { bannerId } = await req.json()

    // Obter dados do request
    const userAgent = req.headers.get("user-agent") || ""
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
    const referrer = req.headers.get("referer") || undefined

    // Simular geolocalização (em produção, usar serviço real)
    const location = {
      country: "Brasil",
      city: "São Paulo",
    }

    const clickData: ClickData = {
      bannerId,
      timestamp: new Date().toISOString(),
      userAgent,
      ip,
      referrer,
      location,
    }

    // Salvar no "banco de dados"
    clicksDatabase.push(clickData)

    return NextResponse.json({
      success: true,
      message: "Click tracked successfully",
      clickId: clicksDatabase.length,
    })
  } catch (error) {
    console.error("Error tracking click:", error)
    return NextResponse.json({ error: "Failed to track click" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const bannerId = searchParams.get("bannerId")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    let filteredClicks = clicksDatabase

    if (bannerId) {
      filteredClicks = filteredClicks.filter((click) => click.bannerId === bannerId)
    }

    if (startDate) {
      filteredClicks = filteredClicks.filter((click) => new Date(click.timestamp) >= new Date(startDate))
    }

    if (endDate) {
      filteredClicks = filteredClicks.filter((click) => new Date(click.timestamp) <= new Date(endDate))
    }

    // Calcular estatísticas
    const totalClicks = filteredClicks.length
    const uniqueClicks = new Set(filteredClicks.map((click) => click.ip)).size

    const clicksByCountry = filteredClicks.reduce(
      (acc, click) => {
        const country = click.location?.country || "Unknown"
        acc[country] = (acc[country] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return NextResponse.json({
      totalClicks,
      uniqueClicks,
      clicksByCountry,
      recentClicks: filteredClicks.slice(-10).reverse(),
    })
  } catch (error) {
    console.error("Error fetching click analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
