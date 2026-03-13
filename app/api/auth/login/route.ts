import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, password } = await req.json();

  const validId = process.env.CRM_ID;
  const validPassword = process.env.CRM_PASSWORD;

  if (id === validId && password === validPassword) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("crm-auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7日間
      path: "/",
    });
    return res;
  }

  return NextResponse.json({ ok: false, message: "IDまたはパスワードが違います" }, { status: 401 });
}
