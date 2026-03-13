import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const auth = req.cookies.get("crm-auth")?.value;
  const { pathname } = req.nextUrl;

  // ログインページとAPIは認証不要
  if (pathname.startsWith("/login") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // 未認証はログインページへ
  if (auth !== "authenticated") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\.png|.*\\.svg).*)"],
};
