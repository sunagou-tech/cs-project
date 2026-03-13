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

export async function getEdits(): Promise<Record<string, CustomerEdit>> {
  try {
    return (await kv.get<Record<string, CustomerEdit>>("customer_edits")) ?? {};
  } catch {
    return {};
  }
}

export async function saveEdit(id: string, updates: CustomerEdit): Promise<void> {
  const edits = await getEdits();
  edits[id] = { ...(edits[id] ?? {}), ...updates };
  await kv.set("customer_edits", edits);
}
