import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchCustomerById } from "@/lib/sheets";
import { updateCustomer } from "@/app/actions/customer";

type Props = { params: Promise<{ id: string }> };

const STATUS_OPTIONS = ["対応中", "確認済み", "成約済", "検討中", "フォロー中", "クローズ"];

const statusColors: Record<string, string> = {
  対応中:   "#0369a1",
  確認済み:  "#0891b2",
  成約済:   "#065f46",
  検討中:   "#92400e",
  フォロー中: "#5b21b6",
  クローズ:  "#475569",
};

const field: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #e2e8f0",
  borderRadius: 7,
  fontSize: 14,
  color: "#0f172a",
  background: "#ffffff",
  outline: "none",
  boxSizing: "border-box",
};

export default async function EditCustomerPage({ params }: Props) {
  const { id } = await params;
  const customer = await fetchCustomerById(id);
  if (!customer) notFound();

  const action = updateCustomer.bind(null, id);

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 24px" }}>

      {/* パンくず */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, fontSize: 12, color: "#94a3b8" }}>
        <Link href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>DATABASE</Link>
        <span>/</span>
        <Link href={`/customers/${id}`} style={{ color: "#94a3b8", textDecoration: "none" }}>{customer.name}</Link>
        <span>/</span>
        <span style={{ color: "#0f172a", fontWeight: 600 }}>編集</span>
      </div>

      <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}>
          <h1 style={{ color: "#0f172a", fontSize: 16, fontWeight: 900, margin: 0 }}>顧客情報の編集</h1>
          <p style={{ color: "#94a3b8", fontSize: 12, margin: "4px 0 0" }}>{customer.name}</p>
        </div>

        <form action={action} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* ステータス */}
          <div>
            <label style={{ display: "block", color: "#475569", fontSize: 12, fontWeight: 700, marginBottom: 8, letterSpacing: "0.06em" }}>ステータス</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {STATUS_OPTIONS.map((s) => (
                <label key={s} style={{ cursor: "pointer" }}>
                  <input type="radio" name="status" value={s} defaultChecked={customer.status === s} style={{ display: "none" }} />
                  <span style={{
                    display: "inline-block", padding: "6px 16px", borderRadius: 6, fontSize: 13, fontWeight: 700,
                    border: `2px solid ${customer.status === s ? statusColors[s] : "#e2e8f0"}`,
                    color: customer.status === s ? statusColors[s] : "#94a3b8",
                    background: customer.status === s ? `${statusColors[s]}10` : "#ffffff",
                    cursor: "pointer",
                  }}>
                    {s}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 担当者 */}
          <div>
            <label style={{ display: "block", color: "#475569", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>担当者</label>
            <input name="assignedStaff" defaultValue={customer.assignedStaff} placeholder="例：山田 太郎" style={field} />
          </div>

          {/* 基本情報 */}
          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 20 }}>
            <p style={{ color: "#94a3b8", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", margin: "0 0 16px" }}>基本情報</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", color: "#475569", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>名前</label>
                <input name="name" defaultValue={customer.name} style={field} />
              </div>
              <div>
                <label style={{ display: "block", color: "#475569", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>電話番号</label>
                <input name="phone" defaultValue={customer.phone} style={field} />
              </div>
              <div>
                <label style={{ display: "block", color: "#475569", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>メール</label>
                <input name="email" defaultValue={customer.email} style={field} />
              </div>
              <div>
                <label style={{ display: "block", color: "#475569", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>商品</label>
                <input name="product" defaultValue={customer.product} style={field} />
              </div>
            </div>
          </div>

          {/* LINE */}
          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 20 }}>
            <p style={{ color: "#94a3b8", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", margin: "0 0 16px" }}>LINE</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", color: "#475569", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>LINE名</label>
                <input name="lineName" defaultValue={customer.lineName} style={field} />
              </div>
              <div>
                <label style={{ display: "block", color: "#475569", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>LINE ID</label>
                <input name="lineId" defaultValue={customer.lineId} style={field} />
              </div>
            </div>
          </div>

          {/* 備考 */}
          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 20 }}>
            <p style={{ color: "#94a3b8", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", margin: "0 0 16px" }}>備考</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", color: "#475569", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>【通常】備考</label>
                <textarea name="memo" defaultValue={customer.memo} rows={3} style={{ ...field, resize: "vertical", fontFamily: "inherit" }} />
              </div>
              <div>
                <label style={{ display: "block", color: "#475569", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>【電話】備考</label>
                <textarea name="phoneMemo" defaultValue={customer.phoneMemo} rows={3} style={{ ...field, resize: "vertical", fontFamily: "inherit" }} />
              </div>
            </div>
          </div>

          {/* ボタン */}
          <div style={{ display: "flex", gap: 12, paddingTop: 8 }}>
            <button type="submit" style={{
              flex: 1, padding: "12px", background: "#0ea5e9", color: "#ffffff",
              border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer",
            }}>
              保存する
            </button>
            <Link href={`/customers/${id}`} style={{
              flex: 1, padding: "12px", background: "#f1f5f9", color: "#475569",
              border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontWeight: 700,
              textDecoration: "none", textAlign: "center",
            }}>
              キャンセル
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
