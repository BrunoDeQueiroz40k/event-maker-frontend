"use client"

import { useState, useEffect } from "react"
import { ExternalLink, AlertCircle, Loader2 } from "lucide-react"
import Image from "next/image"
import imageLoader from "@/lib/image-loader"

interface LinkPreviewProps {
  url: string
  className?: string
}

interface PreviewData {
  title: string
  description: string
  image: string
  favicon: string
  url: string
  domain: string
}

export function LinkPreview({ url, className = "" }: LinkPreviewProps) {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Função para processar URL para usar com Image do Next.js
  // O loader customizado vai lidar com o proxy automaticamente
  const getImageSrc = (originalUrl: string) => {
    if (!originalUrl) return ""
    // O loader customizado vai converter para proxy automaticamente
    return originalUrl
  }

  // Função para extrair hostname de forma segura
  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "")
    } catch {
      return url
    }
  }

  // Função para validar URL
  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString)
      return true
    } catch {
      return false
    }
  }

  useEffect(() => {
    if (!url || !isValidUrl(url)) {
      setPreviewData(null)
      setError(null)
      setLoading(false)
      return
    }

    // Debounce para evitar muitas requisições
    const timeoutId = setTimeout(() => {
      const fetchPreview = async () => {
        setLoading(true)
        setError(null)

        try {
          const response = await fetch(
            `/api/preview?url=${encodeURIComponent(url)}`
          )

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const data = await response.json()

          if (data.error) {
            throw new Error(data.error)
          }

          setPreviewData(data)
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Erro ao carregar preview"
          )
        } finally {
          setLoading(false)
        }
      }

      fetchPreview()
    }, 500) // Aguarda 500ms após parar de digitar

    return () => clearTimeout(timeoutId)
  }, [url])

  if (!url || !isValidUrl(url)) return null

  return (
    <div
      className={`border border-primary/30 rounded-md overflow-hidden hover:border-primary/50 transition-colors duration-200 bg-card ${className}`}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="flex">
          {/* Conteúdo do link */}
          <div className="flex-1 p-3 space-y-2">
            <div className="space-y-1">
              <h3 className="text-foreground font-semibold text-sm group-hover:text-primary transition-colors duration-200 line-clamp-1 font-mono">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Carregando...
                  </span>
                ) : error ? (
                  <span className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="w-3 h-3" />
                    Erro ao carregar
                  </span>
                ) : (
                  previewData?.title || "Sem título"
                )}
              </h3>
              {previewData?.description && !loading && !error && (
                <p className="text-muted-foreground text-xs line-clamp-2 font-mono">
                  {previewData.description}
                </p>
              )}
            </div>

            {/* Favicon + domínio */}
            <div className="flex items-center gap-2 text-primary/70 text-xs font-mono">
              {previewData?.favicon && !loading && !error && (
                <Image
                  width={14}
                  height={14}
                  src={getImageSrc(previewData.favicon)}
                  alt=""
                  loader={imageLoader}
                  className="w-3.5 h-3.5 shrink-0"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                />
              )}
              <span className="truncate">
                {previewData?.domain || getHostname(url)}
              </span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200 shrink-0" />
            </div>
          </div>
          
          {/* Imagem do preview */}
          <div className="w-32 h-24 bg-muted shrink-0 relative overflow-hidden">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
            ) : error ? (
              <div className="w-full h-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
            ) : previewData?.image ? (
              <Image
                width={128}
                height={96}
                src={getImageSrc(previewData.image)}
                alt={previewData.title}
                loader={imageLoader}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted/50">
                <ExternalLink className="w-8 h-8 text-primary/50" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-200" />
          </div>
        </div>
      </a>
    </div>
  )
}
