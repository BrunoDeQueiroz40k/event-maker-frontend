"use client"



import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import AnimatedBackground from "@/components/AnimatedBackground"
import { GoogleIcon, FacebookIcon, ShieldIcon } from "@/components/SocialIcons"

export default function RegisterPage() {
  const router = useRouter()
  const { register, loading, error } = useAuth()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (password !== confirmPassword) {
      setFormError("As senhas não coincidem.")
      return
    }

    try {
      await register(name, email, password)
      router.push("/")
    } catch {
      // erro já é tratado em `error` do hook
    }
  }

  const handleSocialRegister = (provider: string) => {
    console.log("[v0] Social register:", provider)
    // Lógica de autenticação social futura
  }

  return (
    <div className="min-h-screen relative bg-black flex items-center justify-center py-8 overflow-hidden">
      <AnimatedBackground enableImageBackground={true} />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-black/80 backdrop-blur-sm border-2 border-imperial p-8 clip-corners">
          <div className="text-center mb-6">
            <div className="inline-block mb-3">
              <ShieldIcon size={56} className="text-imperial" />
            </div>
            <h1 className="text-2xl font-bold text-imperial mb-2 tracking-wider">NOVO REGISTRO</h1>
            <p className="text-xs text-gray-400 font-mono">{'// INICIAÇÃO AO SISTEMA //'} </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-imperial text-sm font-mono">
                NOME COMPLETO
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black/50 border-imperial/50 text-white focus:border-imperial font-mono"
                placeholder="Nome do Operador"
                required
              />
            </div>

            {(formError || error) && (
              <p className="text-xs text-red-400 font-mono">{formError || error}</p>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-imperial text-sm font-mono">
                IDENTIFICAÇÃO
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/50 border-imperial/50 text-white focus:border-imperial font-mono"
                placeholder="usuario@imperium.terra"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-imperial text-sm font-mono">
                CÓDIGO DE ACESSO
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/50 border-imperial/50 text-white focus:border-imperial font-mono"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-imperial text-sm font-mono">
                CONFIRMAR CÓDIGO
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-black/50 border-imperial/50 text-white focus:border-imperial font-mono"
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer bg-imperial hover:bg-imperial/80 text-black font-bold clip-corners transition-all hover:shadow-[0_0_20px_rgba(218,165,32,0.5)]"
              disabled={loading}
            >
              {loading ? "REGISTRANDO..." : "REGISTRAR OPERADOR"}
            </Button>
          </form>

          <div className="relative my-5">
            <div className="relative flex items-center justify-center text-xs">
              <div className="w-full border-t border-imperial/30"></div>
              <span className="px-2 text-gray-500 font-mono whitespace-nowrap">OU REGISTRAR VIA</span>
              <div className="w-full border-t border-imperial/30"></div>
            </div>
          </div>

          {/* Social Register */}
          <div className="space-y-3">
            <Button
              type="button"
              onClick={() => handleSocialRegister("google")}
              className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 clip-corners transition-all"
            >
              <GoogleIcon />
              Google
            </Button>

            <Button
              type="button"
              onClick={() => handleSocialRegister("facebook")}
              className="w-full bg-[#1877F2]/20 hover:bg-[#1877F2]/30 text-white border border-[#1877F2]/50 clip-corners transition-all"
            >
              <FacebookIcon />
              Facebook
            </Button>
          </div>

          <div className="mt-5 text-center">
            <p className="text-sm text-gray-400 font-mono">
              Já possui acesso?{" "}
              <Link href="/login" className="text-imperial hover:text-imperial/80 underline">
                Fazer login
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-4 font-mono">{'// PELO IMPERADOR DA HUMANIDADE //'}</p>
      </div>
    </div>
  )
}
