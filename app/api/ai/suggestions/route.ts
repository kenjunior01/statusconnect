import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { profileData, language = "pt" } = await req.json()

    // Configure Groq with your API key
    const groqClient = groq({
      apiKey: "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",
    })

    const prompt =
      language === "pt"
        ? `Você é um consultor especialista em marketing digital e monetização de redes sociais. Analise este perfil de usuário do WhatsApp Status e forneça sugestões detalhadas para otimização:

        📊 DADOS DO PERFIL:
        Nome: ${profileData.name}
        Visualizações médias: ${profileData.views}
        Preço atual: R$ ${profileData.price}
        Nicho: ${profileData.niche || "Não especificado"}
        
        📈 FORNEÇA ANÁLISE DETALHADA PARA:
        
        1. 💰 OTIMIZAÇÃO DE PREÇO:
        - Análise se o preço está adequado para as visualizações
        - Sugestão de preço ideal baseado no mercado
        - Estratégias de precificação dinâmica
        
        2. 🎯 MELHORIAS NO PERFIL:
        - Como tornar o perfil mais atrativo para empresas
        - Elementos que aumentam a conversão
        - Diferenciação da concorrência
        
        3. 📱 ESTRATÉGIAS PARA AUMENTAR VISUALIZAÇÕES:
        - Horários ideais para postar
        - Tipos de conteúdo que geram mais engajamento
        - Técnicas para aumentar o alcance
        
        4. 🏷️ NICHO E POSICIONAMENTO:
        ${profileData.niche ? `- Como se destacar no nicho de ${profileData.niche}` : "- Sugestão de nicho baseado no perfil"}
        - Oportunidades de mercado
        - Público-alvo ideal
        
        Seja específico, prático e forneça dicas acionáveis. Use emojis para organizar as informações.`
        : `You are a digital marketing and social media monetization expert consultant. Analyze this WhatsApp Status user profile and provide detailed optimization suggestions:

        📊 PROFILE DATA:
        Name: ${profileData.name}
        Average views: ${profileData.views}
        Current price: $${profileData.price}
        Niche: ${profileData.niche || "Not specified"}
        
        📈 PROVIDE DETAILED ANALYSIS FOR:
        
        1. 💰 PRICE OPTIMIZATION:
        - Analysis if the price is adequate for the views
        - Ideal price suggestion based on market
        - Dynamic pricing strategies
        
        2. 🎯 PROFILE IMPROVEMENTS:
        - How to make the profile more attractive to companies
        - Elements that increase conversion
        - Differentiation from competition
        
        3. 📱 STRATEGIES TO INCREASE VIEWS:
        - Ideal posting times
        - Content types that generate more engagement
        - Techniques to increase reach
        
        4. 🏷️ NICHE AND POSITIONING:
        ${profileData.niche ? `- How to stand out in the ${profileData.niche} niche` : "- Niche suggestion based on profile"}
        - Market opportunities
        - Ideal target audience
        
        Be specific, practical and provide actionable tips. Use emojis to organize information.`

    const { text } = await generateText({
      model: groqClient("llama-3.1-8b-instant"),
      prompt,
      maxTokens: 800,
      temperature: 0.7,
    })

    return NextResponse.json({ suggestions: text })
  } catch (error) {
    console.error("AI suggestions error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate suggestions",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
