"use client"

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { User, Settings, LogOut } from "lucide-react"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@/components/ui/dropdown"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register")

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } catch (error) {
      console.error("Erro ao desconectar", error)
    } finally {
      router.push("/login")
      router.refresh()
    }
  }

  return (
    <header className="border-b-2 border-primary/30 bg-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/20 border-2 border-primary flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5 text-primary"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-primary font-mono tracking-wider">
                {"WARHAMMER 40K BRASIL - CALENDÁRIO DE EVENTOS"}
              </h1>
              <p className="text-[10px] text-muted-foreground font-mono tracking-wide">
                {"VRCHAT CRIADOR DE EVENTOS"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground font-mono">{"CLEARANCE: OMEGA"}</p>
              <p className="text-[10px] text-primary font-mono">{"STATUS: OPERATIONAL"}</p>
            </div>

            {!isAuthPage && (
              <Dropdown>
                  <DropdownTrigger>
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full bg-primary/20 border-2 border-primary/60 flex items-center justify-center text-primary hover:bg-primary/30 hover:border-primary transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
                      aria-label="Menu do usuário"
                    >
                      <User className="w-4 h-4" strokeWidth={2} />
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu align="right">
                    <DropdownItem asChild>
                      <Link href="/perfil">
                        <Settings className="w-3.5 h-3.5" />
                        Configurações
                      </Link>
                    </DropdownItem>
                    <DropdownItem variant="destructive" onClick={handleLogout}>
                      <LogOut className="w-3.5 h-3.5" />
                      Sair
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

