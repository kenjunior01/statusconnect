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
  Users,
  DollarSign,
  Eye,
  Settings,
  BarChart3,
  Shield,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Plus,
  Smartphone,
  TrendingUp,
  MousePointer,
  Clock,
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  type: "user" | "company"
  status: "pending" | "approved" | "suspended"
  views: number
  earnings: number
  joinDate: string
}

interface BannerAd {
  id: string
  company: string
  title: string
  image: string
  link: string
  position: "top" | "sidebar" | "bottom"
  price: number
  startDate: string
  endDate: string
  status: "active" | "paused" | "expired"
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria@email.com",
    type: "user",
    status: "approved",
    views: 850,
    earnings: 450,
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "TechCorp",
    email: "contact@techcorp.com",
    type: "company",
    status: "approved",
    views: 0,
    earnings: 0,
    joinDate: "2024-01-20",
  },
  {
    id: "3",
    name: "João Santos",
    email: "joao@email.com",
    type: "user",
    status: "pending",
    views: 0,
    earnings: 0,
    joinDate: "2024-01-25",
  },
]

const mockBanners: BannerAd[] = [
  {
    id: "1",
    company: "TechStore",
    title: "Smartphones em Oferta",
    image: "/placeholder.svg?height=100&width=728",
    link: "https://techstore.com",
    position: "top",
    price: 500,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    status: "active",
  },
  {
    id: "2",
    company: "Fashion Brand",
    title: "Nova Coleção",
    image: "/placeholder.svg?height=250&width=300",
    link: "https://fashionbrand.com",
    position: "sidebar",
    price: 300,
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    status: "active",
  },
]

export default function AdminPage() {
  const [users, setUsers] = useState(mockUsers)
  const [banners, setBanners] = useState(mockBanners)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newBanner, setNewBanner] = useState({
    company: "",
    title: "",
    link: "",
    position: "top" as "top" | "sidebar" | "bottom",
    price: 0,
    startDate: "",
    endDate: "",
  })

  const [bannerAnalytics, setBannerAnalytics] = useState<Record<string, any>>({
    "1": {
      totalClicks: 245,
      uniqueClicks: 198,
      totalImpressions: 12500,
      clickRate: 1.96,
      avgViewDuration: 3.2,
      clicksByCountry: {
        Brasil: 180,
        Portugal: 45,
        "Estados Unidos": 20,
      },
      recentClicks: [
        { timestamp: new Date().toISOString(), location: { city: "São Paulo", country: "Brasil" } },
        {
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          location: { city: "Rio de Janeiro", country: "Brasil" },
        },
        { timestamp: new Date(Date.now() - 7200000).toISOString(), location: { city: "Lisboa", country: "Portugal" } },
      ],
    },
    "2": {
      totalClicks: 156,
      uniqueClicks: 134,
      totalImpressions: 8900,
      clickRate: 1.75,
      avgViewDuration: 2.8,
      clicksByCountry: {
        Brasil: 120,
        Portugal: 25,
        "Estados Unidos": 11,
      },
      recentClicks: [
        { timestamp: new Date().toISOString(), location: { city: "Brasília", country: "Brasil" } },
        { timestamp: new Date(Date.now() - 1800000).toISOString(), location: { city: "Porto", country: "Portugal" } },
      ],
    },
  })

  const [selectedBannerForAnalytics, setSelectedBannerForAnalytics] = useState("1")
  const [analyticsDateRange, setAnalyticsDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  })

  const stats = {
    totalUsers: users.length,
    pendingUsers: users.filter((u) => u.status === "pending").length,
    totalRevenue: banners.reduce((sum, b) => sum + b.price, 0),
    activeBanners: banners.filter((b) => b.status === "active").length,
  }

  const approveUser = (userId: string) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: "approved" as const } : user)))
  }

  const suspendUser = (userId: string) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: "suspended" as const } : user)))
  }

  const createBanner = () => {
    const banner: BannerAd = {
      id: Date.now().toString(),
      ...newBanner,
      image: `/placeholder.svg?height=${newBanner.position === "sidebar" ? "250" : "100"}&width=${
        newBanner.position === "sidebar" ? "300" : "728"
      }`,
      status: "active",
    }
    setBanners((prev) => [...prev, banner])
    setNewBanner({
      company: "",
      title: "",
      link: "",
      position: "top",
      price: 0,
      startDate: "",
      endDate: "",
    })
  }

  const fetchBannerAnalytics = async (bannerId: string) => {
    // Simular chamada de API
    console.log(`Fetching analytics for banner ${bannerId}`)
  }

  const fetchAllAnalytics = async () => {
    // Simular chamada de API para todos os banners
    console.log("Fetching all analytics")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-indigo-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full blur-sm"></div>
                <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-full">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-xs text-gray-500">StatusConnect Management</p>
              </div>
            </div>
            <Button variant="outline" className="border-indigo-300 text-indigo-700 hover:bg-indigo-50">
              Voltar ao Site
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total de Usuários</p>
                  <p className="text-3xl font-bold">{stats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Pendentes</p>
                  <p className="text-3xl font-bold">{stats.pendingUsers}</p>
                </div>
                <Eye className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Receita Total</p>
                  <p className="text-3xl font-bold">R$ {stats.totalRevenue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Banners Ativos</p>
                  <p className="text-3xl font-bold">{stats.activeBanners}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-lg">
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="banners" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Banners
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <DollarSign className="h-4 w-4 mr-2" />
              Pagamentos
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Gerenciamento de Usuários
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow bg-gradient-to-r from-gray-50 to-white"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-full ${
                            user.type === "user" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          {user.type === "user" ? <Smartphone className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge
                              variant={
                                user.status === "approved"
                                  ? "default"
                                  : user.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className={
                                user.status === "approved"
                                  ? "bg-green-500"
                                  : user.status === "pending"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }
                            >
                              {user.status}
                            </Badge>
                            <Badge variant="outline">{user.type}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {user.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() => approveUser(user.id)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Aprovar
                          </Button>
                        )}
                        {user.status === "approved" && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => suspendUser(user.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Suspender
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="banners">
            <div className="space-y-6">
              {/* Create New Banner */}
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Criar Novo Banner
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input
                        id="company"
                        value={newBanner.company}
                        onChange={(e) => setNewBanner((prev) => ({ ...prev, company: e.target.value }))}
                        className="border-green-200 focus:border-green-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        value={newBanner.title}
                        onChange={(e) => setNewBanner((prev) => ({ ...prev, title: e.target.value }))}
                        className="border-green-200 focus:border-green-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="link">Link</Label>
                      <Input
                        id="link"
                        value={newBanner.link}
                        onChange={(e) => setNewBanner((prev) => ({ ...prev, link: e.target.value }))}
                        className="border-green-200 focus:border-green-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Posição</Label>
                      <Select
                        value={newBanner.position}
                        onValueChange={(value: "top" | "sidebar" | "bottom") =>
                          setNewBanner((prev) => ({ ...prev, position: value }))
                        }
                      >
                        <SelectTrigger className="border-green-200 focus:border-green-400">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top">Topo</SelectItem>
                          <SelectItem value="sidebar">Lateral</SelectItem>
                          <SelectItem value="bottom">Rodapé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Preço (R$)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newBanner.price}
                        onChange={(e) =>
                          setNewBanner((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) }))
                        }
                        className="border-green-200 focus:border-green-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Data de Início</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newBanner.startDate}
                        onChange={(e) => setNewBanner((prev) => ({ ...prev, startDate: e.target.value }))}
                        className="border-green-200 focus:border-green-400"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={createBanner}
                    className="mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Banner
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Banners */}
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Banners Ativos
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {banners.map((banner) => (
                      <div
                        key={banner.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow bg-gradient-to-r from-gray-50 to-white"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={banner.image || "/placeholder.svg"}
                            alt={banner.title}
                            className="w-20 h-12 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900">{banner.company}</h4>
                            <p className="text-sm text-gray-600">{banner.title}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge
                                variant={banner.status === "active" ? "default" : "secondary"}
                                className={banner.status === "active" ? "bg-green-500" : "bg-gray-500"}
                              >
                                {banner.status}
                              </Badge>
                              <Badge variant="outline">{banner.position}</Badge>
                              <span className="text-sm font-medium text-green-600">R$ {banner.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              {/* Analytics Overview */}
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Analytics de Banners
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <MousePointer className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                          <p className="text-blue-100 text-sm">Total de Cliques</p>
                          <p className="text-2xl font-bold">
                            {Object.values(bannerAnalytics).reduce(
                              (sum: number, analytics: any) => sum + analytics.totalClicks,
                              0,
                            )}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Eye className="h-8 w-8 mx-auto mb-2 text-green-200" />
                          <p className="text-green-100 text-sm">Total de Impressões</p>
                          <p className="text-2xl font-bold">
                            {Object.values(bannerAnalytics)
                              .reduce((sum: number, analytics: any) => sum + analytics.totalImpressions, 0)
                              .toLocaleString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <BarChart3 className="h-8 w-8 mx-auto mb-2 text-orange-200" />
                          <p className="text-orange-100 text-sm">Taxa de Clique Média</p>
                          <p className="text-2xl font-bold">
                            {Object.values(bannerAnalytics).length > 0
                              ? (
                                  Object.values(bannerAnalytics).reduce(
                                    (sum: number, analytics: any) => sum + analytics.clickRate,
                                    0,
                                  ) / Object.values(bannerAnalytics).length
                                ).toFixed(2)
                              : 0}
                            %
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Clock className="h-8 w-8 mx-auto mb-2 text-purple-200" />
                          <p className="text-purple-100 text-sm">Tempo Médio de Visualização</p>
                          <p className="text-2xl font-bold">
                            {Object.values(bannerAnalytics).length > 0
                              ? Math.round(
                                  Object.values(bannerAnalytics).reduce(
                                    (sum: number, analytics: any) => sum + analytics.avgViewDuration,
                                    0,
                                  ) / Object.values(bannerAnalytics).length,
                                )
                              : 0}
                            s
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Banner Selection and Date Range */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label>Selecionar Banner</Label>
                      <Select value={selectedBannerForAnalytics} onValueChange={setSelectedBannerForAnalytics}>
                        <SelectTrigger>
                          <SelectValue placeholder="Todos os banners" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os banners</SelectItem>
                          {banners.map((banner) => (
                            <SelectItem key={banner.id} value={banner.id}>
                              {banner.company} - {banner.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Data de Início</Label>
                      <Input
                        type="date"
                        value={analyticsDateRange.startDate}
                        onChange={(e) => setAnalyticsDateRange((prev) => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Data de Fim</Label>
                      <Input
                        type="date"
                        value={analyticsDateRange.endDate}
                        onChange={(e) => setAnalyticsDateRange((prev) => ({ ...prev, endDate: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() =>
                      selectedBannerForAnalytics !== "all"
                        ? fetchBannerAnalytics(selectedBannerForAnalytics)
                        : fetchAllAnalytics()
                    }
                    className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Atualizar Analytics
                  </Button>
                </CardContent>
              </Card>

              {/* Detailed Analytics for Selected Banner */}
              {selectedBannerForAnalytics !== "all" && bannerAnalytics[selectedBannerForAnalytics] && (
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
                    <CardTitle>
                      Analytics Detalhado - {banners.find((b) => b.id === selectedBannerForAnalytics)?.company}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Performance Metrics */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Métricas de Performance</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                            <span className="text-blue-700">Total de Cliques:</span>
                            <span className="font-bold text-blue-900">
                              {bannerAnalytics[selectedBannerForAnalytics].totalClicks}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <span className="text-green-700">Cliques Únicos:</span>
                            <span className="font-bold text-green-900">
                              {bannerAnalytics[selectedBannerForAnalytics].uniqueClicks}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                            <span className="text-purple-700">Total de Impressões:</span>
                            <span className="font-bold text-purple-900">
                              {bannerAnalytics[selectedBannerForAnalytics].totalImpressions.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                            <span className="text-orange-700">Taxa de Clique (CTR):</span>
                            <span className="font-bold text-orange-900">
                              {bannerAnalytics[selectedBannerForAnalytics].clickRate.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Geographic Distribution */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Distribuição Geográfica</h4>
                        <div className="space-y-2">
                          {Object.entries(bannerAnalytics[selectedBannerForAnalytics].clicksByCountry).map(
                            ([country, clicks]) => (
                              <div key={country} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <span>{country}</span>
                                <Badge variant="secondary">{clicks} cliques</Badge>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Recent Clicks */}
                    <div className="mt-6">
                      <h4 className="font-semibold text-lg mb-4">Cliques Recentes</h4>
                      <div className="space-y-2">
                        {bannerAnalytics[selectedBannerForAnalytics].recentClicks
                          .slice(0, 5)
                          .map((click: any, index: number) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="text-sm font-medium">
                                  {new Date(click.timestamp).toLocaleString("pt-BR")}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {click.location?.city}, {click.location?.country}
                                </p>
                              </div>
                              <Badge variant="outline">Click #{index + 1}</Badge>
                            </div>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* All Banners Performance Table */}
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Performance de Todos os Banners
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Banner</th>
                          <th className="text-left p-3">Posição</th>
                          <th className="text-left p-3">Cliques</th>
                          <th className="text-left p-3">Impressões</th>
                          <th className="text-left p-3">CTR</th>
                          <th className="text-left p-3">Status</th>
                          <th className="text-left p-3">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {banners.map((banner) => {
                          const analytics = bannerAnalytics[banner.id]
                          return (
                            <tr key={banner.id} className="border-b hover:bg-gray-50">
                              <td className="p-3">
                                <div>
                                  <p className="font-medium">{banner.company}</p>
                                  <p className="text-sm text-gray-600">{banner.title}</p>
                                </div>
                              </td>
                              <td className="p-3">
                                <Badge variant="outline">{banner.position}</Badge>
                              </td>
                              <td className="p-3 font-medium">{analytics?.totalClicks || 0}</td>
                              <td className="p-3 font-medium">{analytics?.totalImpressions?.toLocaleString() || 0}</td>
                              <td className="p-3">
                                <span
                                  className={`font-medium ${
                                    (analytics?.clickRate || 0) > 2
                                      ? "text-green-600"
                                      : (analytics?.clickRate || 0) > 1
                                        ? "text-yellow-600"
                                        : "text-red-600"
                                  }`}
                                >
                                  {analytics?.clickRate?.toFixed(2) || 0}%
                                </span>
                              </td>
                              <td className="p-3">
                                <Badge variant={banner.status === "active" ? "default" : "secondary"}>
                                  {banner.status}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedBannerForAnalytics(banner.id)}
                                >
                                  Ver Detalhes
                                </Button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Gerenciamento de Pagamentos
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <DollarSign className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Sistema de pagamentos em desenvolvimento</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Configurações da Plataforma
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-4">Configurações Gerais</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Taxa de Comissão (%)</Label>
                        <Input type="number" defaultValue="10" className="border-orange-200 focus:border-orange-400" />
                      </div>
                      <div className="space-y-2">
                        <Label>Limite de Screenshots</Label>
                        <Input type="number" defaultValue="3" className="border-orange-200 focus:border-orange-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Configurações de Email</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Email de Notificações</Label>
                        <Input
                          type="email"
                          defaultValue="admin@statusconnect.com"
                          className="border-orange-200 focus:border-orange-400"
                        />
                      </div>
                    </div>
                  </div>

                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    Salvar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
