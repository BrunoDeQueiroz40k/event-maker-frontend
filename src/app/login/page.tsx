"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import AnimatedBackground from "@/components/AnimatedBackground"
import { GoogleIcon, FacebookIcon, ShieldIcon } from "@/components/SocialIcons"

export default function LoginPage() {
  const router = useRouter()

  const { login, loading, error } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
    router.push("/")
  }

  const handleSocialLogin = (provider: string) => {
    console.log("[v0] Social login:", provider)
    // Lógica de autenticação social aqui
  }

  return (
    <div className="min-h-screen relative bg-black flex items-center justify-center overflow-hidden">
      <AnimatedBackground enableImageBackground={true} />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-black/80 backdrop-blur-sm border-2 border-imperial p-8 clip-corners">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <ShieldIcon />
            </div>
            <h1 className="text-3xl font-bold text-imperial mb-2 tracking-wider">ACESSO IMPERIAL</h1>
            <p className="text-sm text-gray-400 font-mono">{'// TERMINAL DE AUTENTICAÇÃO //'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            {error && (
              <p className="text-xs text-red-400 font-mono">{error}</p>
            )}

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

            <Button
              type="submit"
              className="w-full cursor-pointer bg-imperial hover:bg-imperial/80 text-black font-bold clip-corners transition-all hover:shadow-[0_0_20px_rgba(218,165,32,0.5)]"
              disabled={loading}
            >
              {loading ? "AUTENTICANDO..." : "INICIAR SESSÃO"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-imperial/30"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-black px-2 text-gray-500 font-mono">OU</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 clip-corners transition-all"
            >
              <GoogleIcon />
              Google
            </Button>

            <Button
              type="button"
              onClick={() => handleSocialLogin("facebook")}
              className="w-full bg-[#1877F2]/20 hover:bg-[#1877F2]/30 text-white border border-[#1877F2]/50 clip-corners transition-all"
            >
              <FacebookIcon />
              Facebook
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 font-mono">
              Novo no sistema?{" "}
              <Link href="/register" className="text-imperial hover:text-imperial/80 underline">
                Registrar-se
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-4 font-mono">{'// PELO IMPERADOR DA HUMANIDADE //'}</p>
      </div>
    </div>
  )
}
