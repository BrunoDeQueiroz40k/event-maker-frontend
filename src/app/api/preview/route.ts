import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL é obrigatória" }, { status: 400 })
  }

  // Validar URL
  try {
    new URL(url)
  } catch {
    return NextResponse.json({ error: "URL inválida" }, { status: 400 })
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      signal: AbortSignal.timeout(5000), // Timeout de 5 segundos
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()

    // Extrair metadados usando regex
    const titleMatch =
      html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i) ||
      html.match(/<title>([^<]+)<\/title>/i)
    const title = titleMatch ? titleMatch[1].trim() : ""

    const descriptionMatch =
      html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i) ||
      html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)
    const description = descriptionMatch ? descriptionMatch[1].trim() : ""

    const imageMatch =
      html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i) ||
      html.match(/<meta\s+name="twitter:image"\s+content="([^"]+)"/i)
    const image = imageMatch ? imageMatch[1].trim() : ""

    const faviconMatch =
      html.match(/<link\s+rel="(?:shortcut\s+)?icon"\s+href="([^"]+)"/i) ||
      html.match(/<link\s+rel="apple-touch-icon"\s+href="([^"]+)"/i)
    
    let favicon = faviconMatch ? faviconMatch[1].trim() : ""
    
    // Se favicon for relativo, converter para absoluto
    if (favicon && !favicon.startsWith("http")) {
      try {
        const urlObj = new URL(url)
        favicon = favicon.startsWith("/")
          ? `${urlObj.protocol}//${urlObj.hostname}${favicon}`
          : `${urlObj.protocol}//${urlObj.hostname}/${favicon}`
      } catch {
        favicon = ""
      }
    }

    // Se imagem for relativa, converter para absoluta
    let imageUrl = image
    if (image && !image.startsWith("http")) {
      try {
        const urlObj = new URL(url)
        imageUrl = image.startsWith("/")
          ? `${urlObj.protocol}//${urlObj.hostname}${image}`
          : `${urlObj.protocol}//${urlObj.hostname}/${image}`
      } catch {
        imageUrl = image
      }
    }

    // Extrair domínio
    const urlObj = new URL(url)
    const domain = urlObj.hostname.replace("www.", "")

    return NextResponse.json({
      title: title || domain,
      description: description || "",
      image: imageUrl || "",
      favicon: favicon || `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
      url: url,
      domain: domain,
    })
  } catch (error) {
    console.error("Erro ao buscar preview:", error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Erro ao buscar preview",
      },
      { status: 500 }
    )
  }
}
