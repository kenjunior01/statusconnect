"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "pt" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  pt: {
    // Navigation
    login: "Entrar",
    register: "Cadastrar",

    // Hero Section
    heroTitle: "Monetize Seus Status do WhatsApp",
    heroSubtitle:
      "Conecte-se com empresas que querem anunciar nos seus status e ganhe dinheiro de forma simples e segura.",
    startEarning: "Começar a Ganhar",
    startAdvertising: "Começar a Anunciar",

    // Search and Filters
    searchPlaceholder: "Buscar por nome ou nicho...",
    selectNiche: "Selecionar Nicho",
    allNiches: "Todos os Nichos",

    // Niches
    fashion: "Moda",
    tech: "Tecnologia",
    food: "Gastronomia",
    sports: "Esportes",

    // Sections
    featuredProfiles: "Perfis em Destaque",
    newProfiles: "Novos Perfis",
    discoverMore: "Descubra Mais",

    // Profile Card
    views: "visualizações",
    featured: "Destaque",
    new: "Novo",
    chat: "Conversar",

    // Footer
    footerText: "A plataforma que conecta criadores de conteúdo com empresas de forma inteligente.",
    about: "Sobre",
    contact: "Contato",
    privacy: "Privacidade",

    // Auth
    email: "E-mail",
    password: "Senha",
    confirmPassword: "Confirmar Senha",
    name: "Nome",
    whatsappNumber: "Número do WhatsApp",
    userType: "Tipo de Usuário",
    individual: "Pessoa Física",
    company: "Empresa",
    createAccount: "Criar Conta",
    alreadyHaveAccount: "Já tem uma conta?",
    dontHaveAccount: "Não tem uma conta?",

    // Dashboard
    dashboard: "Painel",
    myProfile: "Meu Perfil",
    messages: "Mensagens",
    earnings: "Ganhos",
    settings: "Configurações",
    logout: "Sair",

    // Profile Management
    uploadScreenshots: "Upload de Screenshots",
    setPrice: "Definir Preço",
    selectNicheOptional: "Selecionar Nicho (Opcional)",
    saveProfile: "Salvar Perfil",

    // AI Suggestions
    aiSuggestions: "Sugestões da IA",
    optimizeProfile: "Otimizar Perfil",
    priceRecommendation: "Recomendação de Preço",

    // Currency
    currency: "Moeda",

    // Payments
    paymentMethod: "Método de Pagamento",
    paypal: "PayPal",
    bankTransfer: "Transferência Bancária",
    payNow: "Pagar Agora",

    // Banner Ads
    bannerAds: "Anúncios em Banner",
    topBanner: "Banner Superior",
    sidebarBanner: "Banner Lateral",
    weeklyRate: "Taxa Semanal",

    // Subscription
    subscription: "Assinatura",
    free: "Gratuito",
    premium: "Premium",
    unlimited: "Ilimitado",
    upgradeNow: "Atualizar Agora",
  },
  en: {
    // Navigation
    login: "Login",
    register: "Register",

    // Hero Section
    heroTitle: "Monetize Your WhatsApp Status",
    heroSubtitle: "Connect with companies that want to advertise on your status and earn money simply and securely.",
    startEarning: "Start Earning",
    startAdvertising: "Start Advertising",

    // Search and Filters
    searchPlaceholder: "Search by name or niche...",
    selectNiche: "Select Niche",
    allNiches: "All Niches",

    // Niches
    fashion: "Fashion",
    tech: "Technology",
    food: "Food",
    sports: "Sports",

    // Sections
    featuredProfiles: "Featured Profiles",
    newProfiles: "New Profiles",
    discoverMore: "Discover More",

    // Profile Card
    views: "views",
    featured: "Featured",
    new: "New",
    chat: "Chat",

    // Footer
    footerText: "The platform that intelligently connects content creators with companies.",
    about: "About",
    contact: "Contact",
    privacy: "Privacy",

    // Auth
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    name: "Name",
    whatsappNumber: "WhatsApp Number",
    userType: "User Type",
    individual: "Individual",
    company: "Company",
    createAccount: "Create Account",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",

    // Dashboard
    dashboard: "Dashboard",
    myProfile: "My Profile",
    messages: "Messages",
    earnings: "Earnings",
    settings: "Settings",
    logout: "Logout",

    // Profile Management
    uploadScreenshots: "Upload Screenshots",
    setPrice: "Set Price",
    selectNicheOptional: "Select Niche (Optional)",
    saveProfile: "Save Profile",

    // AI Suggestions
    aiSuggestions: "AI Suggestions",
    optimizeProfile: "Optimize Profile",
    priceRecommendation: "Price Recommendation",

    // Currency
    currency: "Currency",

    // Payments
    paymentMethod: "Payment Method",
    paypal: "PayPal",
    bankTransfer: "Bank Transfer",
    payNow: "Pay Now",

    // Banner Ads
    bannerAds: "Banner Ads",
    topBanner: "Top Banner",
    sidebarBanner: "Sidebar Banner",
    weeklyRate: "Weekly Rate",

    // Subscription
    subscription: "Subscription",
    free: "Free",
    premium: "Premium",
    unlimited: "Unlimited",
    upgradeNow: "Upgrade Now",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
