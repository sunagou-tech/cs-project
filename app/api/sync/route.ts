import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const SYNC_TOKEN = process.env.SYNC_TOKEN || "crm-sync-2026";

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-sync-token");
  if (token !== SYNC_TOKEN) {
    return NextResponse.json({ ok: false, message: "unauthorized" }, { status: 401 });
  }

  try {
    const rows = await req.json();
    await kv.set("customers", { updatedAt: new Date().toISOString(), rows });
    return NextResponse.json({ ok: true, count: rows.length });
  } catch (e) {
    return NextResponse.json({ ok: false, message: String(e) }, { status: 500 });
  }
}
