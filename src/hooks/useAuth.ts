import { useState } from "react";

type ApiError = { error?: string };

async function parseError(res: Response) {
  const text = await res.text();
  try {
    const json = JSON.parse(text) as ApiError;
    return json.error ?? "Erro desconhecido";
  } catch {
    return text || "Erro desconhecido";
  }
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error(await parseError(res));
    } catch (err: unknown) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function register(name: string, email: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) throw new Error(await parseError(res));
    } catch (err: unknown) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (!res.ok) throw new Error(await parseError(res));
    } catch (err: unknown) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    register,
    logout,
    loading,
    error,
  };
}
