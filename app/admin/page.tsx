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
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-lg">
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="banners" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Banners
            </TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <DollarSign className="h-4 w-4 mr-2" />
              Pagamentos
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
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
