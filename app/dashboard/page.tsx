"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  MessageCircle,
  DollarSign,
  Settings,
  LogOut,
  Upload,
  Sparkles,
  TrendingUp,
  Eye,
  Smartphone,
  Star,
  BarChart3,
} from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useCurrency } from "@/hooks/use-currency"

export default function DashboardPage() {
  const { t } = useLanguage()
  const { currency, convertPrice } = useCurrency()
  const [aiSuggestions, setAiSuggestions] = useState("")
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [priceAnalysis, setPriceAnalysis] = useState("")
  const [contentSuggestions, setContentSuggestions] = useState("")

  const [profileData, setProfileData] = useState({
    name: "Maria Silva",
    views: 850,
    price: 25,
    niche: "Fashion",
    earnings: 450,
    totalContracts: 18,
    pendingMessages: 3,
  })

  const getAISuggestions = async () => {
    setLoadingSuggestions(true)
    try {
      const response = await fetch("/api/ai/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileData,
          language: "pt",
        }),
      })

      const data = await response.json()
      setAiSuggestions(data.suggestions)
    } catch (error) {
      console.error("Error getting AI suggestions:", error)
      setAiSuggestions("Erro ao obter sugestões. Tente novamente.")
    } finally {
      setLoadingSuggestions(false)
    }
  }

  const getPriceAnalysis = async () => {
    try {
      const response = await fetch("/api/ai/price-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          views: profileData.views,
          currentPrice: profileData.price,
          niche: profileData.niche,
          currency: currency,
          language: "pt",
        }),
      })
      const data = await response.json()
      setPriceAnalysis(JSON.stringify(data, null, 2))
    } catch (error) {
      console.error("Error:", error)
      setPriceAnalysis("Erro ao analisar preços")
    }
  }

  const getContentSuggestions = async () => {
    try {
      const response = await fetch("/api/ai/content-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          niche: profileData.niche,
          targetAudience: "Jovens adultos",
          language: "pt",
        }),
      })
      const data = await response.json()
      setContentSuggestions(data.contentSuggestions)
    } catch (error) {
      console.error("Error:", error)
      setContentSuggestions("Erro ao gerar sugestões de conteúdo")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-emerald-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full blur-sm"></div>
                <div className="relative bg-gradient-to-r from-emerald-500 to-blue-600 p-2 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Smartphone className="h-5 w-5 text-white" />
                    <DollarSign className="h-5 w-5 text-yellow-300" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  {t("dashboard")}
                </h1>
                <p className="text-xs text-gray-500">StatusConnect Dashboard</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {t("logout")}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl transform hover:scale-105 transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-white/20 p-3 rounded-full">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-blue-100 text-sm font-medium">{t("views")}</p>
                  <p className="text-3xl font-bold">{profileData.views.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white border-0 shadow-xl transform hover:scale-105 transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-white/20 p-3 rounded-full">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-green-100 text-sm font-medium">{t("earnings")}</p>
                  <p className="text-3xl font-bold">
                    {currency} {convertPrice(profileData.earnings, "BRL", currency).toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-xl transform hover:scale-105 transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-white/20 p-3 rounded-full">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-purple-100 text-sm font-medium">Contratos</p>
                  <p className="text-3xl font-bold">{profileData.totalContracts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-xl transform hover:scale-105 transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-white/20 p-3 rounded-full">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-orange-100 text-sm font-medium">{t("messages")}</p>
                  <p className="text-3xl font-bold">{profileData.pendingMessages}</p>
                  {profileData.pendingMessages > 0 && (
                    <Badge className="mt-1 bg-yellow-400 text-yellow-900 animate-pulse">Pendentes</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-lg rounded-xl p-1">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg"
            >
              <User className="h-4 w-4 mr-2" />
              {t("myProfile")}
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-lg"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              {t("messages")}
            </TabsTrigger>
            <TabsTrigger
              value="ai-suggestions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {t("aiSuggestions")}
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-lg"
            >
              <Settings className="h-4 w-4 mr-2" />
              {t("settings")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  {t("myProfile")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      {t("name")}
                    </Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                      className="border-blue-200 focus:border-blue-400 shadow-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-gray-700 font-medium">
                      {t("setPrice")} ({currency})
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={convertPrice(profileData.price, "BRL", currency)}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          price: convertPrice(Number.parseFloat(e.target.value) || 0, currency, "BRL"),
                        }))
                      }
                      className="border-blue-200 focus:border-blue-400 shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="niche" className="text-gray-700 font-medium">
                    Nicho
                  </Label>
                  <Select
                    value={profileData.niche}
                    onValueChange={(value) => setProfileData((prev) => ({ ...prev, niche: value }))}
                  >
                    <SelectTrigger className="border-blue-200 focus:border-blue-400 shadow-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fashion">{t("fashion")}</SelectItem>
                      <SelectItem value="Tech">{t("tech")}</SelectItem>
                      <SelectItem value="Food">{t("food")}</SelectItem>
                      <SelectItem value="Sports">{t("sports")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">{t("uploadScreenshots")}</Label>
                  <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors">
                    <Upload className="h-16 w-16 mx-auto text-blue-400 mb-4" />
                    <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 shadow-md">
                      Atualizar Screenshots
                    </Button>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-200">
                  {t("saveProfile")}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-green-50">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {t("messages")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="p-4 border border-green-200 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">Empresa ABC</h4>
                      <Badge className="bg-gradient-to-r from-red-400 to-pink-500 text-white animate-pulse">Nova</Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      Olá! Gostaria de anunciar um produto de beleza no seu status...
                    </p>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md"
                    >
                      Responder
                    </Button>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-slate-50 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">TechCorp</h4>
                      <Badge variant="secondary" className="bg-gray-500 text-white">
                        Lida
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Obrigado pela postagem! O resultado foi excelente...</p>
                    <Button size="sm" variant="outline" className="border-gray-300 hover:bg-gray-50 shadow-sm">
                      Ver Conversa
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-suggestions">
            <div className="space-y-6">
              {/* Profile Optimization */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-purple-50">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    {t("aiSuggestions")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Button
                      onClick={getAISuggestions}
                      disabled={loadingSuggestions}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      {loadingSuggestions ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Gerando sugestões...
                        </div>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          {t("optimizeProfile")}
                        </>
                      )}
                    </Button>

                    {aiSuggestions && (
                      <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl shadow-inner">
                        <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
                          <Sparkles className="h-5 w-5 mr-2" />🤖 Sugestões da IA Groq:
                        </h4>
                        <div className="text-sm text-purple-800 whitespace-pre-wrap leading-relaxed">
                          {aiSuggestions}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Price Analysis */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-green-50">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Análise de Preços Inteligente
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Button
                      onClick={getPriceAnalysis}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />💰 Analisar Preço Atual
                    </Button>

                    {priceAnalysis && (
                      <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-inner">
                        <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                          <BarChart3 className="h-5 w-5 mr-2" />📊 Análise de Preços:
                        </h4>
                        <pre className="text-sm text-green-800 whitespace-pre-wrap overflow-x-auto">
                          {priceAnalysis}
                        </pre>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Content Suggestions */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Sugestões de Conteúdo
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Button
                      onClick={getContentSuggestions}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />📱 Gerar Ideias de Conteúdo
                    </Button>

                    {contentSuggestions && (
                      <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl shadow-inner">
                        <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                          <Star className="h-5 w-5 mr-2" />💡 Ideias de Conteúdo:
                        </h4>
                        <div className="text-sm text-blue-800 whitespace-pre-wrap leading-relaxed">
                          {contentSuggestions}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-orange-50">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  {t("settings")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">Preferências de Idioma e Moeda</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-700 font-medium">Idioma</Label>
                      <Select defaultValue="pt">
                        <SelectTrigger className="border-orange-200 focus:border-orange-400 shadow-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt">Português</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-700 font-medium">{t("currency")}</Label>
                      <Select defaultValue="BRL">
                        <SelectTrigger className="border-orange-200 focus:border-orange-400 shadow-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BRL">BRL (R$)</SelectItem>
                          <SelectItem value="USD">USD ($)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">Assinatura</h4>
                  <div className="p-6 border-2 border-orange-200 rounded-xl bg-gradient-to-r from-orange-50 to-yellow-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">Plano Gratuito</p>
                        <p className="text-sm text-gray-600">3 contratos por mês</p>
                      </div>
                      <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg">
                        {t("upgradeNow")}
                      </Button>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg transform hover:scale-105 transition-all duration-200">
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
