import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${process.env.API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return new Response(await res.text(), { status: res.status });
  }

  const data: { token: string } = await res.json();

  // Cookie HttpOnly: JS do browser NÃO consegue ler
  const cookieStore = await cookies();
  cookieStore.set("token", data.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // em produção: true (HTTPS)
    path: "/",
  });

  return Response.json({ ok: true });
}