import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieHeader = (await headers()).get("cookie") ?? "";

  const upstream = await fetch(`${process.env.INTERNAL_API_BASE}/auth/logout`, {
    method: "POST",
    headers: { cookie: cookieHeader },
    cache: "no-store",
    redirect: "manual",
  });

  const res = NextResponse.json({ success: upstream.ok }, { status: upstream.status });

  // 1) Reenvía el Set-Cookie del backend (CLAVE)
  const setCookie = upstream.headers.get("set-cookie");
  if (setCookie) res.headers.set("set-cookie", setCookie);

  // 2) Y además lo borras desde Next por si acaso (doble seguro)
  res.cookies.set("session", "", { path: "/", expires: new Date(0) });

  return res;
}
