import { cookies } from "next/headers";

export async function GET() {
   const token = (await cookies()).get("token")?.value;

   const res = await fetch(`${process.env.API_URL}/api/auth/usuario`, {
      headers: {
         Authorization: `Bearer ${token}`
      }
   });

   return Response.json(await res.json());
}
