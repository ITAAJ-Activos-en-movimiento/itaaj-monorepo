import { headers } from "next/headers";
import { NextResponse } from "next/server";

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

export async function GET() {
  try {
    const cookieHeader = headers().get("cookie") ?? "";

    const upstream = await fetch(`${process.env.INTERNAL_API_BASE}/auth/session`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
      redirect: "manual",
    });
      const text = await upstream.text();
  const res = new NextResponse(text, { status: upstream.status });


    return res;

  } catch {
    return NextResponse.json(
      { user: null },
      { status: 500 }
    );
  }
}
