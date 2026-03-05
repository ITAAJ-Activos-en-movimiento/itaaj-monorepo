import { headers } from "next/headers";

type SessionUser = {
  id: string;
  email: string;
  name?: string;
  lastname?: string;
  picture?: string;
  photo?: string; 
  phone?: string;
};
export type Session = { user: SessionUser } | null;

export async function getServerSession(): Promise<Session> {
  try {
    const cookieHeader = (await headers()).get("cookie") ?? "";

    const res = await fetch(`${process.env.INTERNAL_API_BASE}/auth/session`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
      redirect: "manual",
    });

    if (res.status === 200) {
      return (await res.json()) as Session;
    }

    return null;
  } catch {
    return null;
  }
}
