export default function imageLoader({ src }: { src: string; width: number; quality?: number }) {
  // Se já for uma URL do proxy, retornar como está
  if (src.startsWith("/api/image-proxy")) {
    return src
  }
  
  // Se for uma URL externa, usar o proxy
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return `/api/image-proxy?url=${encodeURIComponent(src)}`
  }
  
  // URLs locais retornam como estão
  return src
}
