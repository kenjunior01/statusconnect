import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { userProfile, competitorProfiles, language = "pt" } = await req.json()

    const groqClient = groq({
      apiKey: "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",
    })

    const prompt =
      language === "pt"
        ? `Você é um analista de mercado especializado em influencer marketing. Analise o perfil do usuário em comparação com a concorrência:

        👤 SEU PERFIL:
        - Nome: ${userProfile.name}
        - Visualizações: ${userProfile.views}
        - Preço: R$ ${userProfile.price}
        - Nicho: ${userProfile.niche}
        
        🏆 CONCORRENTES:
        ${competitorProfiles
          .map(
            (comp: any, index: number) =>
              `${index + 1}. ${comp.name} - ${comp.views} views - R$ ${comp.price} - ${comp.niche}`,
          )
          .join("\n")}
        
        📊 FORNEÇA ANÁLISE DETALHADA:
        
        1. 📈 POSICIONAMENTO NO MERCADO:
        - Onde você está em relação aos concorrentes
        - Seus pontos fortes e fracos
        - Oportunidades de diferenciação
        
        2. 💰 ANÁLISE DE PREÇOS:
        - Comparação de preços por visualização
        - Se está sub ou supervalorizado
        - Estratégia de precificação recomendada
        
        3. 🎯 ESTRATÉGIAS DE DIFERENCIAÇÃO:
        - Como se destacar da concorrência
        - Nichos menos explorados
        - Propostas de valor únicas
        
        4. 📱 RECOMENDAÇÕES ACIONÁVEIS:
        - 3 ações imediatas para melhorar posição
        - Métricas para acompanhar progresso
        - Timeline para implementação
        
        Use emojis e seja específico nas recomendações.`
        : `You are a market analyst specialized in influencer marketing. Analyze the user's profile compared to the competition:

        👤 YOUR PROFILE:
        - Name: ${userProfile.name}
        - Views: ${userProfile.views}
        - Price: $${userProfile.price}
        - Niche: ${userProfile.niche}
        
        🏆 COMPETITORS:
        ${competitorProfiles
          .map(
            (comp: any, index: number) =>
              `${index + 1}. ${comp.name} - ${comp.views} views - $${comp.price} - ${comp.niche}`,
          )
          .join("\n")}
        
        📊 PROVIDE DETAILED ANALYSIS:
        
        1. 📈 MARKET POSITIONING:
        - Where you stand compared to competitors
        - Your strengths and weaknesses
        - Differentiation opportunities
        
        2. 💰 PRICE ANALYSIS:
        - Price comparison per view
        - If you're under or overvalued
        - Recommended pricing strategy
        
        3. 🎯 DIFFERENTIATION STRATEGIES:
        - How to stand out from competition
        - Less explored niches
        - Unique value propositions
        
        4. 📱 ACTIONABLE RECOMMENDATIONS:
        - 3 immediate actions to improve position
        - Metrics to track progress
        - Implementation timeline
        
        Use emojis and be specific in recommendations.`

    const { text } = await generateText({
      model: groqClient("llama-3.1-8b-instant"),
      prompt,
      maxTokens: 900,
      temperature: 0.6,
    })

    return NextResponse.json({ competitorAnalysis: text })
  } catch (error) {
    console.error("Competitor analysis error:", error)
    return NextResponse.json(
      {
        error: "Failed to analyze competitors",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
