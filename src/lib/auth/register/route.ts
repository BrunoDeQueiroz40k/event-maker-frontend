import { cookies } from "next/headers";

export async function POST(req: Request) {
   const body = await req.json();

   const res = await fetch(`${process.env.API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
   });

   if (!res.ok) {
      return new Response(await res.text(), { status: res.status });
   }

   const data: { token: string } = await res.json();

   const cookieStore = await cookies();
   cookieStore.set("token", data.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // produção: true
      path: "/",
   });

   return Response.json({ ok: true });
}