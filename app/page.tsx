"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, MessageCircle, Star, Globe, TrendingUp, Users, DollarSign, Smartphone, X } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { useCurrency } from "@/hooks/use-currency"

interface UserProfile {
  id: string
  name: string
  views: number
  price: number
  niche?: string
  screenshots: string[]
  featured: boolean
  isNew: boolean
}

interface BannerAd {
  id: string
  company: string
  image: string
  link: string
  position: "top" | "sidebar" | "bottom"
  active: boolean
}

const mockProfiles: UserProfile[] = [
  {
    id: "1",
    name: "Maria Silva",
    views: 850,
    price: 25,
    niche: "Fashion",
    screenshots: ["/placeholder.svg?height=200&width=150"],
    featured: true,
    isNew: false,
  },
  {
    id: "2",
    name: "João Santos",
    views: 1200,
    price: 35,
    niche: "Tech",
    screenshots: ["/placeholder.svg?height=200&width=150"],
    featured: true,
    isNew: false,
  },
  {
    id: "3",
    name: "Ana Costa",
    views: 650,
    price: 20,
    niche: "Food",
    screenshots: ["/placeholder.svg?height=200&width=150"],
    featured: false,
    isNew: true,
  },
  {
    id: "4",
    name: "Pedro Lima",
    views: 950,
    price: 30,
    niche: "Sports",
    screenshots: ["/placeholder.svg?height=200&width=150"],
    featured: false,
    isNew: true,
  },
]

const mockBanners: BannerAd[] = [
  {
    id: "1",
    company: "TechStore",
    image: "/placeholder.svg?height=100&width=728&text=TechStore+-+Smartphones+em+Oferta",
    link: "#",
    position: "top",
    active: true,
  },
  {
    id: "2",
    company: "Fashion Brand",
    image: "/placeholder.svg?height=250&width=300&text=Fashion+Brand+-+Nova+Cole%C3%A7%C3%A3o",
    link: "#",
    position: "sidebar",
    active: true,
  },
  {
    id: "3",
    company: "Food Delivery",
    image: "/placeholder.svg?height=100&width=728&text=Food+Delivery+-+Desconto+30%25",
    link: "#",
    position: "bottom",
    active: true,
  },
]

export default function HomePage() {
  const { language, setLanguage, t } = useLanguage()
  const { currency, setCurrency, convertPrice } = useCurrency()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNiche, setSelectedNiche] = useState("all")
  const [filteredProfiles, setFilteredProfiles] = useState(mockProfiles)
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [showTopBanner, setShowTopBanner] = useState(true)

  const topBanners = mockBanners.filter((b) => b.position === "top" && b.active)
  const sidebarBanners = mockBanners.filter((b) => b.position === "sidebar" && b.active)
  const bottomBanners = mockBanners.filter((b) => b.position === "bottom" && b.active)

  // Rotate banners every 5 seconds
  useEffect(() => {
    if (topBanners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % topBanners.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [topBanners.length])

  useEffect(() => {
    let filtered = mockProfiles

    if (searchTerm) {
      filtered = filtered.filter(
        (profile) =>
          profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.niche?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedNiche !== "all") {
      filtered = filtered.filter((profile) => profile.niche === selectedNiche)
    }

    setFilteredProfiles(filtered)
  }, [searchTerm, selectedNiche])

  const featuredProfiles = filteredProfiles.filter((p) => p.featured)
  const newProfiles = filteredProfiles.filter((p) => p.isNew)
  const discoverProfiles = filteredProfiles.filter((p) => !p.featured && !p.isNew)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Top Banner */}
      {showTopBanner && topBanners.length > 0 && (
        <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <img
                  src={topBanners[currentBannerIndex]?.image || "/placeholder.svg"}
                  alt={topBanners[currentBannerIndex]?.company}
                  className="w-full h-16 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => window.open(topBanners[currentBannerIndex]?.link, "_blank")}
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTopBanner(false)}
                className="ml-2 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {topBanners.length > 1 && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {topBanners.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentBannerIndex ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-green-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-sm"></div>
                <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Smartphone className="h-5 w-5 text-white" />
                    <DollarSign className="h-5 w-5 text-yellow-300" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  StatusConnect
                </h1>
                <p className="text-xs text-gray-500">WhatsApp • Money • Success</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-24 border-green-200 focus:border-green-400">
                  <Globe className="h-4 w-4 mr-1 text-green-600" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt">PT</SelectItem>
                  <SelectItem value="en">EN</SelectItem>
                </SelectContent>
              </Select>

              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-20 border-green-200 focus:border-green-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BRL">BRL</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>

              <Link href="/auth/login">
                <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                  {t("login")}
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg">
                  {t("register")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex-1 px-4">
          {/* Hero Section */}
          <section className="py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-3xl blur-3xl opacity-20"></div>
                <div className="relative">
                  <h2 className="text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                    {t("heroTitle")}
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">{t("heroSubtitle")}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register?type=user">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    {t("startEarning")}
                  </Button>
                </Link>
                <Link href="/auth/register?type=company">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <TrendingUp className="mr-2 h-5 w-5" />
                    {t("startAdvertising")}
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Search and Filters */}
          <section className="py-8">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <Input
                placeholder={t("searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border-green-200 focus:border-green-400 shadow-md"
              />
              <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                <SelectTrigger className="w-full md:w-48 border-green-200 focus:border-green-400 shadow-md">
                  <SelectValue placeholder={t("selectNiche")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allNiches")}</SelectItem>
                  <SelectItem value="Fashion">{t("fashion")}</SelectItem>
                  <SelectItem value="Tech">{t("tech")}</SelectItem>
                  <SelectItem value="Food">{t("food")}</SelectItem>
                  <SelectItem value="Sports">{t("sports")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          {/* Featured Profiles */}
          {featuredProfiles.length > 0 && (
            <section className="py-8">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-6 flex items-center">
                <Star className="mr-3 h-8 w-8 text-yellow-500 animate-pulse" />
                {t("featuredProfiles")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProfiles.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
            </section>
          )}

          {/* New Profiles */}
          {newProfiles.length > 0 && (
            <section className="py-8">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-6">
                {t("newProfiles")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {newProfiles.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
            </section>
          )}

          {/* Discover More */}
          {discoverProfiles.length > 0 && (
            <section className="py-8">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
                {t("discoverMore")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {discoverProfiles.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
            </section>
          )}

          {/* Bottom Banner */}
          {bottomBanners.length > 0 && (
            <section className="py-8">
              <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-4 shadow-xl">
                <img
                  src={bottomBanners[0].image || "/placeholder.svg"}
                  alt={bottomBanners[0].company}
                  className="w-full h-20 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => window.open(bottomBanners[0].link, "_blank")}
                />
              </div>
            </section>
          )}
        </div>

        {/* Sidebar with Banners */}
        {sidebarBanners.length > 0 && (
          <div className="hidden lg:block w-80 p-4">
            <div className="sticky top-24 space-y-6">
              <h4 className="text-lg font-semibold text-gray-700">Anúncios</h4>
              {sidebarBanners.map((banner) => (
                <div
                  key={banner.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <img
                    src={banner.image || "/placeholder.svg"}
                    alt={banner.company}
                    className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => window.open(banner.link, "_blank")}
                  />
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-700">{banner.company}</p>
                    <p className="text-xs text-gray-500">Anúncio patrocinado</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-full">
              <div className="flex items-center space-x-1">
                <Smartphone className="h-6 w-6 text-white" />
                <DollarSign className="h-6 w-6 text-yellow-300" />
              </div>
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              StatusConnect
            </h3>
          </div>
          <p className="text-gray-300 mb-8 text-lg">{t("footerText")}</p>
          <div className="flex justify-center space-x-8">
            <Link href="/about" className="text-gray-300 hover:text-green-400 transition-colors">
              {t("about")}
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-green-400 transition-colors">
              {t("contact")}
            </Link>
            <Link href="/privacy" className="text-gray-300 hover:text-green-400 transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/admin" className="text-gray-300 hover:text-yellow-400 transition-colors">
              Admin
            </Link>
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
    <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
      <CardHeader className="p-4">
        <div className="relative">
          <img
            src={profile.screenshots[0] || "/placeholder.svg"}
            alt={`${profile.name} status`}
            className="w-full h-48 object-cover rounded-xl shadow-md"
          />
          {profile.featured && (
            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
              <Star className="h-3 w-3 mr-1" />
              {t("featured")}
            </Badge>
          )}
          {profile.isNew && (
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg animate-pulse">
              {t("new")}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardTitle className="text-lg mb-2 text-gray-800">{profile.name}</CardTitle>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Eye className="h-4 w-4 mr-1 text-blue-500" />
          {profile.views.toLocaleString()} {t("views")}
        </div>
        {profile.niche && (
          <Badge
            variant="secondary"
            className="mb-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200"
          >
            {t(profile.niche.toLowerCase())}
          </Badge>
        )}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {currency} {convertPrice(profile.price, "BRL", currency).toFixed(2)}
          </span>
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-md"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            {t("chat")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
