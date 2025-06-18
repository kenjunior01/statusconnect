"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  User,
  Building,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Smartphone,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { useSearchParams } from "next/navigation"

export default function RegisterPage() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const defaultType = searchParams.get("type") || "user"

  const [currentStep, setCurrentStep] = useState(1)
  const [userType, setUserType] = useState<"user" | "company">(defaultType as "user" | "company")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    whatsappNumber: "",
    niche: "",
    companyName: "",
    companyDescription: "",
    location: "",
    agreeTerms: false,
    agreeMarketing: false,
  })
  const [screenshots, setScreenshots] = useState<File[]>([])

  const handleInputChange = (field: string, value: string | boolean) => {
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

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.password && formData.confirmPassword
      case 2:
        if (userType === "company") {
          return formData.companyName && formData.companyDescription
        } else {
          return formData.whatsappNumber && formData.location
        }
      case 3:
        if (userType === "user") {
          return screenshots.length >= 3
        }
        return true
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, userType === "user" ? 4 : 3))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Senhas não coincidem")
      return
    }

    if (!formData.agreeTerms) {
      alert("Você deve aceitar os termos de uso")
      return
    }

    if (userType === "user" && screenshots.length < 3) {
      alert("É necessário enviar 3 screenshots")
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Registration data:", { userType, formData, screenshots })
    alert("Cadastro realizado com sucesso! Aguarde aprovação.")
    setIsLoading(false)
  }

  const totalSteps = userType === "user" ? 4 : 3
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-3 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-1">
                  <Smartphone className="h-6 w-6 text-white" />
                  <Sparkles className="h-5 w-5 text-yellow-300" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              StatusConnect
            </h1>
          </div>
          <p className="text-gray-600">Crie sua conta e comece a monetizar</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-4 pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-gray-800">{t("createAccount")}</CardTitle>
              <div className="text-sm text-gray-500">
                Passo {currentStep} de {totalSteps}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Informações Básicas</span>
                <span>{userType === "company" ? "Dados da Empresa" : "Perfil"}</span>
                {userType === "user" && <span>Screenshots</span>}
                <span>Finalizar</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* User Type Selection */}
                  <div className="space-y-3">
                    <Label className="text-gray-700 font-medium">{t("userType")}</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant={userType === "user" ? "default" : "outline"}
                        onClick={() => setUserType("user")}
                        className="h-20 flex-col space-y-2"
                      >
                        <User className="h-6 w-6" />
                        <span>{t("individual")}</span>
                      </Button>
                      <Button
                        type="button"
                        variant={userType === "company" ? "default" : "outline"}
                        onClick={() => setUserType("company")}
                        className="h-20 flex-col space-y-2"
                      >
                        <Building className="h-6 w-6" />
                        <span>{t("company")}</span>
                      </Button>
                    </div>
                  </div>

                  {/* Basic Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 font-medium">
                        {userType === "company" ? "Nome do Responsável" : t("name")}
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="name"
                          placeholder="Seu nome completo"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="pl-10 h-12 border-gray-200 focus:border-blue-400 shadow-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">
                        {t("email")}
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="pl-10 h-12 border-gray-200 focus:border-blue-400 shadow-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-700 font-medium">
                        {t("password")}
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-400 shadow-sm"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                        {t("confirmPassword")}
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-400 shadow-sm"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Profile/Company Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  {userType === "company" ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="companyName" className="text-gray-700 font-medium">
                          Nome da Empresa
                        </Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            id="companyName"
                            placeholder="Nome da sua empresa"
                            value={formData.companyName}
                            onChange={(e) => handleInputChange("companyName", e.target.value)}
                            className="pl-10 h-12 border-gray-200 focus:border-blue-400 shadow-sm"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyDescription" className="text-gray-700 font-medium">
                          Descrição da Empresa
                        </Label>
                        <Textarea
                          id="companyDescription"
                          placeholder="Descreva sua empresa e o que ela faz..."
                          value={formData.companyDescription}
                          onChange={(e) => handleInputChange("companyDescription", e.target.value)}
                          rows={4}
                          className="border-gray-200 focus:border-blue-400 shadow-sm"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="whatsappNumber" className="text-gray-700 font-medium">
                            {t("whatsappNumber")}
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                              id="whatsappNumber"
                              placeholder="+55 11 99999-9999"
                              value={formData.whatsappNumber}
                              onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                              className="pl-10 h-12 border-gray-200 focus:border-blue-400 shadow-sm"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-gray-700 font-medium">
                            Localização
                          </Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                              id="location"
                              placeholder="Cidade, Estado"
                              value={formData.location}
                              onChange={(e) => handleInputChange("location", e.target.value)}
                              className="pl-10 h-12 border-gray-200 focus:border-blue-400 shadow-sm"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="niche" className="text-gray-700 font-medium">
                          Nicho (Opcional)
                        </Label>
                        <Select value={formData.niche} onValueChange={(value) => handleInputChange("niche", value)}>
                          <SelectTrigger className="h-12 border-gray-200 focus:border-blue-400 shadow-sm">
                            <SelectValue placeholder={t("selectNicheOptional")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fashion">{t("fashion")}</SelectItem>
                            <SelectItem value="tech">{t("tech")}</SelectItem>
                            <SelectItem value="food">{t("food")}</SelectItem>
                            <SelectItem value="sports">{t("sports")}</SelectItem>
                            <SelectItem value="beauty">Beleza</SelectItem>
                            <SelectItem value="travel">Viagem</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Step 3: Screenshots (User only) */}
              {currentStep === 3 && userType === "user" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-gray-700 font-medium">{t("uploadScreenshots")} (3 obrigatórios)</Label>
                    <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors">
                      <Upload className="h-16 w-16 mx-auto text-blue-400 mb-4" />
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleScreenshotUpload}
                        className="hidden"
                        id="screenshots"
                      />
                      <Label htmlFor="screenshots" className="cursor-pointer">
                        <Button
                          type="button"
                          variant="outline"
                          className="border-blue-300 text-blue-700 hover:bg-blue-50 shadow-md"
                          asChild
                        >
                          <span>Selecionar Screenshots</span>
                        </Button>
                      </Label>
                      {screenshots.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-600 mb-2">{screenshots.length} arquivo(s) selecionado(s)</p>
                          <div className="flex items-center justify-center space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-green-600 font-medium">Screenshots carregados com sucesso!</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      Envie 3 screenshots dos seus status do WhatsApp para mostrar seu estilo e alcance.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Terms and Finish */}
              {currentStep === totalSteps && (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
                    <h3 className="text-xl font-semibold text-gray-800">Quase pronto!</h3>
                    <p className="text-gray-600">Revise suas informações e aceite os termos para finalizar.</p>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                        className="mt-1"
                      />
                      <Label htmlFor="agreeTerms" className="text-sm text-gray-700 leading-relaxed">
                        Eu concordo com os{" "}
                        <Link href="/terms" className="text-blue-600 hover:underline">
                          Termos de Uso
                        </Link>{" "}
                        e{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                          Política de Privacidade
                        </Link>{" "}
                        da StatusConnect.
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="agreeMarketing"
                        checked={formData.agreeMarketing}
                        onCheckedChange={(checked) => handleInputChange("agreeMarketing", checked as boolean)}
                        className="mt-1"
                      />
                      <Label htmlFor="agreeMarketing" className="text-sm text-gray-700 leading-relaxed">
                        Aceito receber e-mails promocionais e atualizações sobre novos recursos (opcional).
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep} className="flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar
                  </Button>
                )}

                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                    className="ml-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Próximo
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!formData.agreeTerms || isLoading}
                    className="ml-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12 px-8"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Criando conta...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {t("createAccount")}
                        <CheckCircle className="h-5 w-5 ml-2" />
                      </div>
                    )}
                  </Button>
                )}
              </div>
            </form>

            {/* Social Registration */}
            {currentStep === 1 && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">ou registre-se com</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-11 border-gray-200 hover:bg-gray-50">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="h-11 border-gray-200 hover:bg-gray-50">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </>
            )}

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600">
                {t("alreadyHaveAccount")}{" "}
                <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 font-semibold hover:underline">
                  {t("login")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
