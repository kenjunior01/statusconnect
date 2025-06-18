"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Eye,
  MessageCircle,
  Star,
  Globe,
  TrendingUp,
  Users,
  Smartphone,
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Heart,
  Share2,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { useCurrency } from "@/hooks/use-currency"
import { InfiniteMovingBanners } from "@/components/ui/infinite-moving-banners"

interface UserProfile {
  id: string
  name: string
  views: number
  price: number
  niche?: string
  screenshots: string[]
  featured: boolean
  isNew: boolean
  location: string
  rating: number
  responseTime: string
  completedJobs: number
  joinDate: string
  isOnline: boolean
  languages: string[]
}

interface BannerAd {
  id: string
  company: string
  image: string
  link: string
  title: string
  active: boolean
}

const mockProfiles: UserProfile[] = [
  {
    id: "1",
    name: "Maria Silva",
    views: 850,
    price: 25,
    niche: "Fashion",
    screenshots: ["/placeholder.svg?height=300&width=200"],
    featured: true,
    isNew: false,
    location: "São Paulo, SP",
    rating: 4.9,
    responseTime: "2h",
    completedJobs: 47,
    joinDate: "2023-08-15",
    isOnline: true,
    languages: ["Português", "English"],
  },
  {
    id: "2",
    name: "João Santos",
    views: 1200,
    price: 35,
    niche: "Tech",
    screenshots: ["/placeholder.svg?height=300&width=200"],
    featured: true,
    isNew: false,
    location: "Rio de Janeiro, RJ",
    rating: 4.8,
    responseTime: "1h",
    completedJobs: 62,
    joinDate: "2023-07-10",
    isOnline: false,
    languages: ["Português", "English", "Español"],
  },
  {
    id: "3",
    name: "Ana Costa",
    views: 650,
    price: 20,
    niche: "Food",
    screenshots: ["/placeholder.svg?height=300&width=200"],
    featured: false,
    isNew: true,
    location: "Belo Horizonte, MG",
    rating: 4.7,
    responseTime: "3h",
    completedJobs: 23,
    joinDate: "2024-01-15",
    isOnline: true,
    languages: ["Português"],
  },
  {
    id: "4",
    name: "Pedro Lima",
    views: 950,
    price: 30,
    niche: "Sports",
    screenshots: ["/placeholder.svg?height=300&width=200"],
    featured: false,
    isNew: true,
    location: "Porto Alegre, RS",
    rating: 4.6,
    responseTime: "4h",
    completedJobs: 31,
    joinDate: "2023-12-20",
    isOnline: true,
    languages: ["Português", "English"],
  },
  {
    id: "5",
    name: "Carla Mendes",
    views: 1100,
    price: 40,
    niche: "Beauty",
    screenshots: ["/placeholder.svg?height=300&width=200"],
    featured: true,
    isNew: false,
    location: "Salvador, BA",
    rating: 4.9,
    responseTime: "1h",
    completedJobs: 89,
    joinDate: "2023-05-20",
    isOnline: true,
    languages: ["Português", "English"],
  },
  {
    id: "6",
    name: "Rafael Oliveira",
    views: 780,
    price: 28,
    niche: "Travel",
    screenshots: ["/placeholder.svg?height=300&width=200"],
    featured: false,
    isNew: false,
    location: "Fortaleza, CE",
    rating: 4.5,
    responseTime: "2h",
    completedJobs: 34,
    joinDate: "2023-09-10",
    isOnline: false,
    languages: ["Português", "English", "Français"],
  },
]

const mockBanners: BannerAd[] = [
  {
    id: "1",
    company: "Salão Bella Vista",
    image: "/placeholder.svg?height=120&width=350&text=Salão+Bella+Vista+-+Cortes+e+Tratamentos",
    link: "#",
    title: "Cortes e Tratamentos - Agende Já!",
    active: true,
  },
  {
    id: "2",
    company: "Pizzaria Dona Maria",
    image: "/placeholder.svg?height=120&width=350&text=Pizzaria+Dona+Maria+-+Delivery+Grátis",
    link: "#",
    title: "Delivery Grátis - Peça Agora!",
    active: true,
  },
  {
    id: "3",
    company: "Academia FitLife",
    image: "/placeholder.svg?height=120&width=350&text=Academia+FitLife+-+Primeira+Semana+Grátis",
    link: "#",
    title: "Primeira Semana Grátis - Venha Treinar!",
    active: true,
  },
  {
    id: "4",
    company: "Loja de Roupas Trend",
    image: "/placeholder.svg?height=120&width=350&text=Loja+Trend+-+Coleção+Verão",
    link: "#",
    title: "Nova Coleção Verão - 30% OFF",
    active: true,
  },
  {
    id: "5",
    company: "Oficina do João",
    image: "/placeholder.svg?height=120&width=350&text=Oficina+do+João+-+Revisão+Completa",
    link: "#",
    title: "Revisão Completa - Preço Justo",
    active: true,
  },
  {
    id: "6",
    company: "Clínica Odonto Sorriso",
    image: "/placeholder.svg?height=120&width=350&text=Clínica+Sorriso+-+Limpeza+Dental",
    link: "#",
    title: "Limpeza Dental - Consulta Gratuita",
    active: true,
  },
]

const locations = [
  "São Paulo, SP",
  "Rio de Janeiro, RJ",
  "Belo Horizonte, MG",
  "Porto Alegre, RS",
  "Salvador, BA",
  "Fortaleza, CE",
  "Brasília, DF",
  "Curitiba, PR",
  "Recife, PE",
  "Manaus, AM",
]

const niches = ["Fashion", "Tech", "Food", "Sports", "Beauty", "Travel", "Lifestyle", "Fitness", "Music", "Art"]

export default function HomePage() {
  const { language, setLanguage, t } = useLanguage()
  const { currency, setCurrency, convertPrice } = useCurrency()

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNiche, setSelectedNiche] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [minViews, setMinViews] = useState(0)
  const [minRating, setMinRating] = useState(0)
  const [onlineOnly, setOnlineOnly] = useState(false)
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  const [filteredProfiles, setFilteredProfiles] = useState(mockProfiles)

  const activeBanners = mockBanners.filter((b) => b.active)

  // Advanced filtering logic
  useEffect(() => {
    let filtered = mockProfiles

    // Text search
    if (searchTerm) {
      filtered = filtered.filter(
        (profile) =>
          profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.niche?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Niche filter
    if (selectedNiche !== "all") {
      filtered = filtered.filter((profile) => profile.niche === selectedNiche)
    }

    // Location filter
    if (selectedLocation !== "all") {
      filtered = filtered.filter((profile) => profile.location === selectedLocation)
    }

    // Price range filter
    filtered = filtered.filter((profile) => {
      const price = convertPrice(profile.price, "BRL", currency)
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Views filter
    if (minViews > 0) {
      filtered = filtered.filter((profile) => profile.views >= minViews)
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter((profile) => profile.rating >= minRating)
    }

    // Online status filter
    if (onlineOnly) {
      filtered = filtered.filter((profile) => profile.isOnline)
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "featured":
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.views - a.views
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "views":
          return b.views - a.views
        case "rating":
          return b.rating - a.rating
        case "newest":
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
        default:
          return 0
      }
    })

    setFilteredProfiles(filtered)
  }, [searchTerm, selectedNiche, selectedLocation, priceRange, minViews, minRating, onlineOnly, sortBy, currency])

  const featuredProfiles = filteredProfiles.filter((p) => p.featured)
  const newProfiles = filteredProfiles.filter((p) => p.isNew && !p.featured)
  const discoverProfiles = filteredProfiles.filter((p) => !p.featured && !p.isNew)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Trading-Style Banner Ticker */}
      {activeBanners.length > 0 && (
        <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 shadow-xl border-b-2 border-blue-500">
          <div className="py-2">
            <div className="flex items-center justify-between px-4 mb-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
                  <span className="text-white font-bold text-sm">ANÚNCIOS AO VIVO</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs font-medium">MERCADO ABERTO</span>
                </div>
              </div>
              <div className="text-white text-xs">
                {activeBanners.length} campanhas ativas • Atualizado em tempo real
              </div>
            </div>
            <InfiniteMovingBanners
              banners={activeBanners}
              direction="left"
              speed="normal"
              pauseOnHover={true}
              className="max-w-full"
            />
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-lg shadow-xl border-b border-blue-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-3 rounded-2xl shadow-xl">
                  <div className="flex items-center space-x-1">
                    <Smartphone className="h-6 w-6 text-white" />
                    <Sparkles className="h-5 w-5 text-yellow-300" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  StatusConnect
                </h1>
                <p className="text-sm text-gray-500 font-medium">Monetize • Connect • Succeed</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-28 border-blue-200 focus:border-blue-400 shadow-md bg-white/80">
                  <Globe className="h-4 w-4 mr-1 text-blue-600" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt">🇧🇷 PT</SelectItem>
                  <SelectItem value="en">🇺🇸 EN</SelectItem>
                </SelectContent>
              </Select>

              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-24 border-blue-200 focus:border-blue-400 shadow-md bg-white/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BRL">BRL</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>

              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 shadow-md font-medium"
                >
                  {t("login")}
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg font-medium px-6">
                  {t("register")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Advanced Search and Filters */}
        <section className="py-8">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              {/* Main Search Bar */}
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Buscar por nome, nicho ou localização..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-14 text-lg border-gray-200 focus:border-blue-400 shadow-md bg-white/90"
                  />
                </div>
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="h-14 px-6 border-gray-200 hover:bg-gray-50 shadow-md bg-white/90"
                >
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filtros Avançados
                  <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </Button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="border-t pt-6 space-y-6 bg-gray-50/50 -mx-8 px-8 pb-6 rounded-b-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Niche Filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nicho</label>
                      <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                        <SelectTrigger className="bg-white shadow-sm">
                          <SelectValue placeholder="Todos os nichos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os nichos</SelectItem>
                          {niches.map((niche) => (
                            <SelectItem key={niche} value={niche}>
                              {niche}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Location Filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        <MapPin className="h-4 w-4 inline mr-1" />
                        Localização
                      </label>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger className="bg-white shadow-sm">
                          <SelectValue placeholder="Todas as cidades" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as cidades</SelectItem>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sort By */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Ordenar por</label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="bg-white shadow-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="featured">Destaques</SelectItem>
                          <SelectItem value="price-low">Menor preço</SelectItem>
                          <SelectItem value="price-high">Maior preço</SelectItem>
                          <SelectItem value="views">Mais visualizações</SelectItem>
                          <SelectItem value="rating">Melhor avaliação</SelectItem>
                          <SelectItem value="newest">Mais recentes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Online Status */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <Button
                        variant={onlineOnly ? "default" : "outline"}
                        onClick={() => setOnlineOnly(!onlineOnly)}
                        className="w-full justify-start"
                      >
                        <div className={`w-2 h-2 rounded-full mr-2 ${onlineOnly ? "bg-white" : "bg-green-500"}`} />
                        {onlineOnly ? "Apenas online" : "Todos"}
                      </Button>
                    </div>
                  </div>

                  {/* Range Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Price Range */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700">Faixa de Preço ({currency})</label>
                      <Slider value={priceRange} onValueChange={setPriceRange} max={100} step={5} className="w-full" />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>
                          {currency} {priceRange[0]}
                        </span>
                        <span>
                          {currency} {priceRange[1]}
                        </span>
                      </div>
                    </div>

                    {/* Min Views */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700">Visualizações mínimas</label>
                      <Slider
                        value={[minViews]}
                        onValueChange={(value) => setMinViews(value[0])}
                        max={2000}
                        step={100}
                        className="w-full"
                      />
                      <div className="text-sm text-gray-500">{minViews.toLocaleString()}+ views</div>
                    </div>

                    {/* Min Rating */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700">Avaliação mínima</label>
                      <Slider
                        value={[minRating]}
                        onValueChange={(value) => setMinRating(value[0])}
                        max={5}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="text-sm text-gray-500">{minRating.toFixed(1)}+ ⭐</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Results Summary */}
        <div className="py-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">{filteredProfiles.length}</span> perfis encontrados
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              {searchTerm && <Badge variant="secondary">"{searchTerm}"</Badge>}
              {selectedNiche !== "all" && <Badge variant="secondary">{selectedNiche}</Badge>}
              {selectedLocation !== "all" && <Badge variant="secondary">{selectedLocation}</Badge>}
              {onlineOnly && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Online
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Featured Profiles */}
        {featuredProfiles.length > 0 && (
          <section className="py-8">
            <div className="flex items-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  {t("featuredProfiles")}
                </h3>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-yellow-200 to-transparent ml-6"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {featuredProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </section>
        )}

        {/* New Profiles */}
        {newProfiles.length > 0 && (
          <section className="py-8">
            <div className="flex items-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  {t("newProfiles")}
                </h3>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-green-200 to-transparent ml-6"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {newProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </section>
        )}

        {/* Discover More */}
        {discoverProfiles.length > 0 && (
          <section className="py-8">
            <div className="flex items-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {t("discoverMore")}
                </h3>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-200 to-transparent ml-6"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {discoverProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </section>
        )}

        {/* Hero Section */}
        <section className="py-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-tight">
                  {t("heroTitle")}
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">{t("heroSubtitle")}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/auth/register?type=user">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-2xl transform hover:scale-105 transition-all duration-300 px-6 py-3 text-lg font-semibold"
                >
                  <Users className="mr-2 h-5 w-5" />
                  {t("startEarning")}
                </Button>
              </Link>
              <Link href="/auth/register?type=company">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 shadow-xl transform hover:scale-105 transition-all duration-300 px-6 py-3 text-lg font-semibold"
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  {t("startAdvertising")}
                </Button>
              </Link>
            </div>
            <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Quer anunciar seus serviços aqui?</h3>
              <p className="text-gray-600 mb-4">Cadastre sua empresa e apareça nos status dos nossos creators</p>
              <Link href="/auth/register?type=company">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg">
                  Cadastrar Empresa
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* No Results */}
        {filteredProfiles.length === 0 && (
          <section className="py-16 text-center">
            <div className="max-w-md mx-auto">
              <div className="p-4 bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Nenhum perfil encontrado</h3>
              <p className="text-gray-600 mb-6">
                Tente ajustar seus filtros ou termos de busca para encontrar mais resultados.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedNiche("all")
                  setSelectedLocation("all")
                  setPriceRange([0, 100])
                  setMinViews(0)
                  setMinRating(0)
                  setOnlineOnly(false)
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Limpar Filtros
              </Button>
            </div>
          </section>
        )}
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-12">Números que Impressionam</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">10K+</div>
              <div className="text-blue-100 text-lg">Creators Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">50M+</div>
              <div className="text-purple-100 text-lg">Visualizações</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">R$ 2M+</div>
              <div className="text-pink-100 text-lg">Pagos aos Creators</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-3 rounded-2xl shadow-xl">
              <div className="flex items-center space-x-1">
                <Smartphone className="h-8 w-8 text-white" />
                <Sparkles className="h-6 w-6 text-yellow-300" />
              </div>
            </div>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              StatusConnect
            </h3>
          </div>
          <p className="text-gray-300 mb-10 text-xl max-w-2xl mx-auto leading-relaxed">{t("footerText")}</p>
          <div className="flex justify-center space-x-12 mb-8">
            <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors text-lg">
              {t("about")}
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-purple-400 transition-colors text-lg">
              {t("contact")}
            </Link>
            <Link href="/privacy" className="text-gray-300 hover:text-pink-400 transition-colors text-lg">
              {t("privacy")}
            </Link>
            <Link href="/admin" className="text-gray-300 hover:text-yellow-400 transition-colors text-lg">
              Admin
            </Link>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400">© 2024 StatusConnect. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProfileCard({ profile }: { profile: UserProfile }) {
  const { t } = useLanguage()
  const { currency, convertPrice } = useCurrency()

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 bg-white border-0 shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={profile.screenshots[0] || "/placeholder.svg"}
          alt={`${profile.name} status`}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {profile.featured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
              <Star className="h-3 w-3 mr-1" />
              {t("featured")}
            </Badge>
          )}
          {profile.isNew && (
            <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg animate-pulse">
              <Sparkles className="h-3 w-3 mr-1" />
              {t("new")}
            </Badge>
          )}
        </div>

        {/* Online Status */}
        <div className="absolute top-3 right-3">
          <div
            className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
              profile.isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white shadow-lg">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white shadow-lg">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <CardTitle className="text-xl mb-1 text-gray-800 group-hover:text-blue-600 transition-colors">
              {profile.name}
            </CardTitle>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {profile.location}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center mb-1">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-semibold text-gray-800">{profile.rating}</span>
            </div>
            <div className="text-xs text-gray-500">{profile.completedJobs} jobs</div>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Eye className="h-4 w-4 mr-1 text-blue-500" />
          <span className="font-medium">{profile.views.toLocaleString()}</span>
          <span className="mx-2">•</span>
          <span>Responde em {profile.responseTime}</span>
        </div>

        {profile.niche && (
          <Badge
            variant="secondary"
            className="mb-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200"
          >
            {t(profile.niche.toLowerCase())}
          </Badge>
        )}

        {/* Languages */}
        <div className="flex flex-wrap gap-1 mb-4">
          {profile.languages.map((lang, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {lang}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {currency} {convertPrice(profile.price, "BRL", currency).toFixed(2)}
            </span>
            <div className="text-xs text-gray-500">por post</div>
          </div>
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md px-6"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            {t("chat")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
