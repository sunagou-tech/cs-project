import { kv } from "@vercel/kv";

export type CustomerEdit = {
  status?: string;
  assignedStaff?: string;
  name?: string;
  phone?: string;
  email?: string;
  product?: string;
  memo?: string;
  phoneMemo?: string;
  lineName?: string;
  lineId?: string;
};

function isKvAvailable(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function getEdits(): Promise<Record<string, CustomerEdit>> {
  if (!isKvAvailable()) return {};
  try {
    return (await kv.get<Record<string, CustomerEdit>>("customer_edits")) ?? {};
  } catch {
    return {};
  }
}

export async function saveEdit(id: string, updates: CustomerEdit): Promise<void> {
  if (!isKvAvailable()) throw new Error("KV not configured");
  const edits = await getEdits();
  edits[id] = { ...(edits[id] ?? {}), ...updates };
  await kv.set("customer_edits", edits);
}
