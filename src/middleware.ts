import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Não aplicar auth em rotas de API e assets do Next
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next()
  }

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register")
  const token = request.cookies.get("token")?.value

  // Sem token: só permite login e registro
  if (!token && !isAuthPage) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/login"
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Com token em página de auth: manda para a home
  if (token && isAuthPage) {
    const homeUrl = request.nextUrl.clone()
    homeUrl.pathname = "/"
    return NextResponse.redirect(homeUrl)
  }

  return NextResponse.next()
}
