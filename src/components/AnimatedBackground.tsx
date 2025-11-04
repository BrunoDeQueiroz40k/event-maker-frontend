"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface AnimatedBackgroundProps {
  enableImageBackground?: boolean
  imagePath?: string
  imageOpacity?: number
  availableBackgrounds?: number[]
}

export default function AnimatedBackground({
  enableImageBackground = false,
  imagePath = "/assets/imgs/loading/loadingWallpapers",
  imageOpacity = 25,
  availableBackgrounds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
}: AnimatedBackgroundProps) {
  // Inicializar background aleatório usando função lazy
  const [currentBackground, setCurrentBackground] = useState(() => {
    if (enableImageBackground && availableBackgrounds.length > 0) {
      return availableBackgrounds[
        Math.floor(Math.random() * availableBackgrounds.length)
      ]
    }
    return 1
  })
  const [showBackground, setShowBackground] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (enableImageBackground) {
      // Mostrar background após um pequeno delay para evitar flash
      const timer = setTimeout(() => {
        setShowBackground(true)
      }, 50)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [enableImageBackground])

  // Trocar imagem a cada 10 segundos com transição suave
  useEffect(() => {
    if (!enableImageBackground || availableBackgrounds.length <= 1) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      
      // Após 500ms de fade out, trocar a imagem
      setTimeout(() => {
        let nextBackground = currentBackground
        
        // Garantir que a próxima imagem seja diferente
        while (nextBackground === currentBackground && availableBackgrounds.length > 1) {
          nextBackground = availableBackgrounds[
            Math.floor(Math.random() * availableBackgrounds.length)
          ]
        }
        
        setCurrentBackground(nextBackground)
        
        // Após trocar, fazer fade in
        setTimeout(() => {
          setIsTransitioning(false)
        }, 50)
      }, 500)
    }, 10000) // 10 segundos

    return () => clearInterval(interval)
  }, [enableImageBackground, currentBackground, availableBackgrounds])

  return (
    <>
      {/* Container para imagem de background - fixed atrás de tudo */}
      {enableImageBackground && showBackground && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full animate-pan-right transition-opacity duration-500 ease-in-out"
            style={{ 
              opacity: isTransitioning ? 0 : imageOpacity / 100 
            }}
          >
            <Image
              src={`${imagePath}/w${currentBackground}.png`}
              alt="Background animado"
              fill
              className="object-cover object-center"
              priority
              unoptimized
              onError={() => {
                // Se a imagem não carregar, não quebra o layout
                console.warn(`Background image not found: ${imagePath}/w${currentBackground}.png`)
              }}
            />
          </div>
        </div>
      )}

      {/* Efeitos de estrelas e warp - fixed acima da imagem */}
      <div className="fixed inset-0 z-1 pointer-events-none">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        <div className="warp-effect"></div>
      </div>
    </>
  )
}
