import { type NextRequest, NextResponse } from "next/server"

interface ImpressionData {
  bannerId: string
  timestamp: string
  viewDuration: number
  userAgent: string
  ip: string
}

// Mock database - em produção, usar um banco de dados real
const impressionsDatabase: ImpressionData[] = []

export async function POST(req: NextRequest) {
  try {
    const { bannerId, viewDuration } = await req.json()

    // Obter dados do request
    const userAgent = req.headers.get("user-agent") || ""
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"

    const impressionData: ImpressionData = {
      bannerId,
      timestamp: new Date().toISOString(),
      viewDuration,
      userAgent,
      ip,
    }

    // Salvar no "banco de dados"
    impressionsDatabase.push(impressionData)

    return NextResponse.json({
      success: true,
      message: "Impression tracked successfully",
    })
  } catch (error) {
    console.error("Error tracking impression:", error)
    return NextResponse.json({ error: "Failed to track impression" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const bannerId = searchParams.get("bannerId")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    let filteredImpressions = impressionsDatabase

    if (bannerId) {
      filteredImpressions = filteredImpressions.filter((imp) => imp.bannerId === bannerId)
    }

    if (startDate) {
      filteredImpressions = filteredImpressions.filter((imp) => new Date(imp.timestamp) >= new Date(startDate))
    }

    if (endDate) {
      filteredImpressions = filteredImpressions.filter((imp) => new Date(imp.timestamp) <= new Date(endDate))
    }

    // Calcular estatísticas
    const totalImpressions = filteredImpressions.length
    const avgViewDuration =
      filteredImpressions.length > 0
        ? filteredImpressions.reduce((sum, imp) => sum + imp.viewDuration, 0) / filteredImpressions.length
        : 0

    return NextResponse.json({
      totalImpressions,
      avgViewDuration: Math.round(avgViewDuration * 100) / 100,
    })
  } catch (error) {
    console.error("Error fetching impression analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
