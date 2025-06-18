"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Zap, User, Building } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { useSearchParams } from "next/navigation"

export default function RegisterPage() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const defaultType = searchParams.get("type") || "user"

  const [userType, setUserType] = useState<"user" | "company">(defaultType as "user" | "company")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    whatsappNumber: "",
    niche: "",
    companyName: "",
    companyDescription: "",
  })
  const [screenshots, setScreenshots] = useState<File[]>([])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleScreenshotUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 3) {
      alert("Máximo de 3 screenshots permitidos")
      return
    }
    setScreenshots(files)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Senhas não coincidem")
      return
    }

    if (userType === "user" && screenshots.length < 3) {
      alert("É necessário enviar 3 screenshots")
      return
    }

    // Here you would typically send the data to your backend
    console.log("Registration data:", { userType, formData, screenshots })
    alert("Cadastro realizado com sucesso! Aguarde aprovação.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold">StatusConnect</h1>
          </div>
          <CardTitle className="text-2xl">{t("createAccount")}</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div className="space-y-2">
              <Label>{t("userType")}</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={userType === "user" ? "default" : "outline"}
                  onClick={() => setUserType("user")}
                  className="h-20 flex-col"
                >
                  <User className="h-6 w-6 mb-2" />
                  {t("individual")}
                </Button>
                <Button
                  type="button"
                  variant={userType === "company" ? "default" : "outline"}
                  onClick={() => setUserType("company")}
                  className="h-20 flex-col"
                >
                  <Building className="h-6 w-6 mb-2" />
                  {t("company")}
                </Button>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{userType === "company" ? "Nome do Responsável" : t("name")}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Company specific fields */}
            {userType === "company" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nome da Empresa</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyDescription">Descrição da Empresa</Label>
                  <Textarea
                    id="companyDescription"
                    value={formData.companyDescription}
                    onChange={(e) => handleInputChange("companyDescription", e.target.value)}
                    rows={3}
                  />
                </div>
              </>
            )}

            {/* Password fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* User specific fields */}
            {userType === "user" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="whatsappNumber">{t("whatsappNumber")}</Label>
                    <Input
                      id="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                      placeholder="+55 11 99999-9999"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="niche">Nicho (Opcional)</Label>
                    <Select value={formData.niche} onValueChange={(value) => handleInputChange("niche", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectNicheOptional")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fashion">{t("fashion")}</SelectItem>
                        <SelectItem value="tech">{t("tech")}</SelectItem>
                        <SelectItem value="food">{t("food")}</SelectItem>
                        <SelectItem value="sports">{t("sports")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Screenshot Upload */}
                <div className="space-y-2">
                  <Label>{t("uploadScreenshots")} (3 obrigatórios)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleScreenshotUpload}
                      className="hidden"
                      id="screenshots"
                    />
                    <Label htmlFor="screenshots" className="cursor-pointer">
                      <Button type="button" variant="outline" asChild>
                        <span>Selecionar Screenshots</span>
                      </Button>
                    </Label>
                    {screenshots.length > 0 && (
                      <p className="mt-2 text-sm text-gray-600">{screenshots.length} arquivo(s) selecionado(s)</p>
                    )}
                  </div>
                </div>
              </>
            )}

            <Button type="submit" className="w-full">
              {t("createAccount")}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t("alreadyHaveAccount")}{" "}
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                {t("login")}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
