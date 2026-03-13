import { kv } from "@vercel/kv";
import { getEdits } from "./edits";

export type CrmStatus = "成約済" | "対応中" | "確認済み" | "フォロー中" | "検討中" | "クローズ";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  product: string;
  assignedStaff: string;
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
    assignedStaff: "",
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

const DEMO_CUSTOMERS: Customer[] = [
  { id: "demo-1", name: "田中 美咲", email: "tanaka.misaki@example.com", phone: "090-1234-5678", product: "AIスクール3ヶ月コース", amount: "198000", paymentDate: "2026-01-15", paymentStatus: "完了&一括", deliveryStatus: "完了", lineName: "みさき", lineId: "L1", gender: "女性", age: "31〜35歳", memo: "AIツールへの関心が高い。経理部門での活用を検討中。", phoneMemo: "", attribute: "広告", lpName: "LP100", resell: "", status: "対応中" },
  { id: "demo-2", name: "鈴木 健太", email: "suzuki.kenta@example.com", phone: "080-9876-5432", product: "AIスクール3ヶ月コース", amount: "198000", paymentDate: "2025-11-20", paymentStatus: "完了&一括", deliveryStatus: "完了", lineName: "けんた", lineId: "L2", gender: "男性", age: "26〜30歳", memo: "営業マン。メール自動化に特に興味あり。", phoneMemo: "", attribute: "広告", lpName: "LP100", resell: "FE引上", status: "成約済" },
  { id: "demo-3", name: "佐藤 由美", email: "sato.yumi@example.com", phone: "070-1111-2222", product: "AI体験セミナー", amount: "0", paymentDate: "2026-02-01", paymentStatus: "", deliveryStatus: "未完了", lineName: "ゆみ", lineId: "L3", gender: "女性", age: "36〜40歳", memo: "人事担当。採用業務の効率化に関心。予算確認中。", phoneMemo: "", attribute: "紹介", lpName: "LP200", resell: "", status: "検討中" },
  { id: "demo-4", name: "高橋 誠一", email: "takahashi.seiichi@example.com", phone: "090-3333-4444", product: "AIスクール6ヶ月コース", amount: "380000", paymentDate: "2025-10-05", paymentStatus: "分割", deliveryStatus: "完了", lineName: "たかはし社長", lineId: "L4", gender: "男性", age: "46〜50歳", memo: "経営者。AI導入に慎重。具体的なROIを求めている。", phoneMemo: "4月以降に導入検討と話あり", attribute: "広告", lpName: "LP300", resell: "BE引上", status: "フォロー中" },
  { id: "demo-5", name: "伊藤 さくら", email: "ito.sakura@example.com", phone: "080-5555-6666", product: "AI体験セミナー", amount: "0", paymentDate: "2025-09-01", paymentStatus: "", deliveryStatus: "未完了", lineName: "さくら", lineId: "L5", gender: "女性", age: "26〜30歳", memo: "フリーランスのデザイナー。予算の問題でクローズ。半年後に再コンタクト予定。", phoneMemo: "", attribute: "SNS", lpName: "LP100", resell: "", status: "クローズ" },
];

function applyEdits(customers: Customer[], edits: Record<string, object>): Customer[] {
  return customers.map((c) => {
    const edit = edits[c.id];
    if (!edit) return c;
    return { ...c, ...edit };
  });
}

export async function fetchCustomers(): Promise<Customer[]> {
  try {
    const [syncData, edits] = await Promise.all([
      kv.get<SyncData>("customers"),
      getEdits(),
    ]);
    const base = (() => {
      if (!syncData || syncData.rows.length === 0) return DEMO_CUSTOMERS;
      const real = syncData.rows
        .filter((row) => row["名前"] || row["TEL"] || row["MAIL"])
        .map((row, i) => rowToCustomer(row, i));
      return real.length > 0 ? real : DEMO_CUSTOMERS;
    })();
    return applyEdits(base, edits);
  } catch {
    return DEMO_CUSTOMERS;
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
