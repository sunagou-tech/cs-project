import { kv } from "@vercel/kv";

export type CrmStatus = "成約済" | "対応中" | "フォロー中" | "検討中" | "クローズ";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  product: string;
  amount: string;
  paymentDate: string;
  paymentStatus: string;
  deliveryStatus: string;
  lineName: string;
  lineId: string;
  gender: string;
  age: string;
  memo: string;
  phoneMemo: string;
  attribute: string;
  lpName: string;
  resell: string;
  status: CrmStatus;
};

export type SyncData = {
  updatedAt: string | null;
  rows: Record<string, string>[];
};

type SheetRow = Record<string, string>;

function deriveStatus(row: SheetRow): CrmStatus {
  const payment = row["支払い状況\n完了＆分割"] || "";
  if (payment.includes("完了")) return "成約済";
  if (payment.includes("分割")) return "対応中";
  const result = row["結果"] || "";
  if (result.includes("完了")) return "成約済";
  return "フォロー中";
}

function rowToCustomer(row: SheetRow, i: number): Customer {
  return {
    id: String(i),
    name: row["名前"] || "",
    email: row["MAIL"] || row["E-mail"] || "",
    phone: row["TEL"] || row["電話番号"] || "",
    product: row["商品"] || "",
    amount: row["決済金額"] || row["金額"] || "",
    paymentDate: (row["決済日時"] || "").split("T")[0] || "",
    paymentStatus: row["支払い状況\n完了＆分割"] || "",
    deliveryStatus: row["商品提供\n完了＆未完了"] || "",
    lineName: row["LINE名"] || "",
    lineId: row["LINE"] || "",
    gender: row["性別"] || "",
    age: row["年齢"] || "",
    memo: row["【通常】備考"] || "",
    phoneMemo: row["【電話】備考"] || "",
    attribute: row["属性"] || "",
    lpName: row["LP名"] || "",
    resell: row["再販・引上"] || "",
    status: deriveStatus(row),
  };
}

export async function fetchCustomers(): Promise<Customer[]> {
  try {
    const data = await kv.get<SyncData>("customers");
    if (!data) return [];
    return data.rows
      .filter((row) => row["名前"] || row["TEL"] || row["MAIL"])
      .map((row, i) => rowToCustomer(row, i));
  } catch {
    return [];
  }
}

export async function fetchCustomerById(id: string): Promise<Customer | null> {
  const customers = await fetchCustomers();
  return customers.find((c) => c.id === id) ?? null;
}

export async function getLastSynced(): Promise<string | null> {
  try {
    const data = await kv.get<SyncData>("customers");
    return data?.updatedAt ?? null;
  } catch {
    return null;
  }
}

export function searchCustomers(customers: Customer[], query: string): Customer[] {
  if (!query.trim()) return customers;
  const q = query.trim().toLowerCase();
  return customers.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.product.toLowerCase().includes(q)
  );
}
