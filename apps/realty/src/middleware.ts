import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const response = NextResponse.next({
    headers: requestHeaders,
  });

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const cookieStore = await cookies()
    const token = cookieStore.get('tokene')?.value
    if (!token) return NextResponse.redirect(new URL("/", request.url));
    return response;
  }

  

  return response;
}
