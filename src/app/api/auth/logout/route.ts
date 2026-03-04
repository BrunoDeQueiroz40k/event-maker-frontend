import { cookies } from "next/headers"

export async function POST() {
  ;(await cookies()).delete("token")
  const cookieStore = await cookies()
  cookieStore.set("token", "", { maxAge: 0, path: "/" })
  return Response.json({ ok: true })
}
