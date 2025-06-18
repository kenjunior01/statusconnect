import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { views, currentPrice, niche, currency = "BRL", language = "pt" } = await req.json()

    const groqClient = groq({
      apiKey: "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",
    })

    const prompt =
      language === "pt"
        ? `Você é um especialista em precificação de marketing digital. Analise os dados abaixo e forneça uma recomendação de preço precisa:

        📊 DADOS:
        - Visualizações médias: ${views}
        - Preço atual: ${currency === "BRL" ? "R$" : "$"} ${currentPrice}
        - Nicho: ${niche || "Geral"}
        - Moeda: ${currency}
        
        📈 ANÁLISE SOLICITADA:
        1. Calcule o CPM (Custo por Mil visualizações) atual
        2. Compare com benchmarks do mercado brasileiro/internacional
        3. Sugira um preço otimizado baseado em:
           - Taxa de engajamento típica do nicho
           - Valor de mercado por visualização
           - Competitividade do preço
        
        4. Forneça 3 opções de preço:
           - Conservador (menor risco)
           - Equilibrado (recomendado)
           - Agressivo (maior lucro)
        
        Responda em formato JSON com esta estrutura:
        {
          "currentCPM": number,
          "marketBenchmark": string,
          "recommendations": {
            "conservative": number,
            "balanced": number,
            "aggressive": number
          },
          "reasoning": string
        }`
        : `You are a digital marketing pricing expert. Analyze the data below and provide a precise price recommendation:

        📊 DATA:
        - Average views: ${views}
        - Current price: ${currency === "BRL" ? "R$" : "$"} ${currentPrice}
        - Niche: ${niche || "General"}
        - Currency: ${currency}
        
        📈 REQUESTED ANALYSIS:
        1. Calculate current CPM (Cost per Thousand views)
        2. Compare with Brazilian/international market benchmarks
        3. Suggest optimized price based on:
           - Typical niche engagement rate
           - Market value per view
           - Price competitiveness
        
        4. Provide 3 price options:
           - Conservative (lower risk)
           - Balanced (recommended)
           - Aggressive (higher profit)
        
        Respond in JSON format with this structure:
        {
          "currentCPM": number,
          "marketBenchmark": string,
          "recommendations": {
            "conservative": number,
            "balanced": number,
            "aggressive": number
          },
          "reasoning": string
        }`

    const { text } = await generateText({
      model: groqClient("llama-3.1-8b-instant"),
      prompt,
      maxTokens: 600,
      temperature: 0.3,
    })

    // Try to parse JSON response
    try {
      const analysis = JSON.parse(text)
      return NextResponse.json(analysis)
    } catch {
      // If JSON parsing fails, return text response
      return NextResponse.json({
        analysis: text,
        error: "Could not parse structured response",
      })
    }
  } catch (error) {
    console.error("Price analysis error:", error)
    return NextResponse.json(
      {
        error: "Failed to analyze price",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
