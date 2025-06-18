import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { niche, targetAudience, language = "pt" } = await req.json()

    const groqClient = groq({
      apiKey: "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",
    })

    const prompt =
      language === "pt"
        ? `Você é um especialista em criação de conteúdo para redes sociais. Crie sugestões de conteúdo para Status do WhatsApp que maximizem visualizações e engajamento:

        🎯 CONTEXTO:
        - Nicho: ${niche || "Geral"}
        - Público-alvo: ${targetAudience || "Geral"}
        
        📱 CRIE 10 IDEIAS DE CONTEÚDO PARA STATUS:
        
        Para cada ideia, forneça:
        1. Título/Tema
        2. Descrição breve
        3. Melhor horário para postar
        4. Tipo de mídia (foto, vídeo, texto)
        5. Call-to-action sugerido
        
        Foque em:
        - Conteúdo viral e compartilhável
        - Tendências atuais
        - Interação com a audiência
        - Valor agregado para quem visualiza
        
        Use emojis e seja criativo!`
        : `You are a social media content creation expert. Create content suggestions for WhatsApp Status that maximize views and engagement:

        🎯 CONTEXT:
        - Niche: ${niche || "General"}
        - Target audience: ${targetAudience || "General"}
        
        📱 CREATE 10 CONTENT IDEAS FOR STATUS:
        
        For each idea, provide:
        1. Title/Theme
        2. Brief description
        3. Best time to post
        4. Media type (photo, video, text)
        5. Suggested call-to-action
        
        Focus on:
        - Viral and shareable content
        - Current trends
        - Audience interaction
        - Added value for viewers
        
        Use emojis and be creative!`

    const { text } = await generateText({
      model: groqClient("llama-3.1-8b-instant"),
      prompt,
      maxTokens: 1000,
      temperature: 0.8,
    })

    return NextResponse.json({ contentSuggestions: text })
  } catch (error) {
    console.error("Content suggestions error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate content suggestions",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
