import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

const SYNC_TOKEN = process.env.SYNC_TOKEN || "crm-sync-2026";

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-sync-token");
  if (token !== SYNC_TOKEN) {
    return NextResponse.json({ ok: false, message: "unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const filePath = path.join(process.cwd(), "data", "customers.json");
    await writeFile(filePath, JSON.stringify({ updatedAt: new Date().toISOString(), rows: data }));
    return NextResponse.json({ ok: true, count: data.length });
  } catch (e) {
    return NextResponse.json({ ok: false, message: String(e) }, { status: 500 });
  }
}
