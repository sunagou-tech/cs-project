import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchCustomerById } from "@/lib/sheets";

type Props = { params: Promise<{ id: string }> };

const statusStyle: Record<string, { color: string; bg: string; border: string }> = {
  成約済:    { color: "#065f46", bg: "#d1fae5", border: "#a7f3d0" },
  対応中:    { color: "#0369a1", bg: "#e0f2fe", border: "#bae6fd" },
  フォロー中: { color: "#5b21b6", bg: "#ede9fe", border: "#ddd6fe" },
  検討中:    { color: "#92400e", bg: "#fef3c7", border: "#fde68a" },
  クローズ:  { color: "#475569", bg: "#f1f5f9", border: "#e2e8f0" },
};

const panel: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 10,
  overflow: "hidden",
  marginBottom: 16,
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
};

const panelHeader: React.CSSProperties = {
  padding: "12px 20px",
  borderBottom: "1px solid #f1f5f9",
  display: "flex",
  alignItems: "center",
  gap: 8,
  background: "#f8fafc",
};

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", gap: 16, padding: "10px 20px", borderBottom: "1px solid #f8fafc" }}>
      <span style={{ color: "#94a3b8", fontSize: 12, width: 120, flexShrink: 0 }}>{label}</span>
      <span style={{ color: "#0f172a", fontSize: 13 }}>{value}</span>
    </div>
  );
}

export default async function CustomerDetailPage({ params }: Props) {
  const { id } = await params;
  const customer = await fetchCustomerById(id);
  if (!customer) notFound();

  const s = statusStyle[customer.status] ?? statusStyle["クローズ"];

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px" }}>

      {/* パンくず */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, fontSize: 12, color: "#94a3b8" }}>
        <Link href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>DATABASE</Link>
        <span style={{ color: "#cbd5e1" }}>/</span>
        <span style={{ color: "#0f172a", fontWeight: 600 }}>{customer.name}</span>
      </div>

      {/* 基本情報ヘッダー */}
      <div style={{ ...panel, marginBottom: 24 }}>
        <div style={{ padding: "24px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: 10, border: `1px solid ${s.border}`, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: s.color, flexShrink: 0 }}>
                {customer.name[0] || "?"}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <h1 style={{ color: "#0f172a", fontSize: 22, fontWeight: 900, margin: 0 }}>{customer.name}</h1>
                  <span style={{ color: s.color, fontSize: 11, fontWeight: 700, padding: "3px 10px", border: `1px solid ${s.border}`, borderRadius: 4, background: s.bg }}>
                    {customer.status}
                  </span>
                </div>
                <p style={{ color: "#94a3b8", fontSize: 12, margin: "4px 0 0" }}>{customer.gender} {customer.age}</p>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.8, textAlign: "right" }}>
              {customer.attribute && <p style={{ margin: 0 }}>属性 <span style={{ color: "#0f172a", fontWeight: 600 }}>{customer.attribute}</span></p>}
              {customer.paymentDate && <p style={{ margin: 0, fontFamily: "monospace", color: "#94a3b8" }}>{customer.paymentDate}</p>}
            </div>
          </div>

          {/* 連絡先 */}
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #f1f5f9", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", value: customer.phone },
              { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", value: customer.email },
            ].filter(i => i.value).map((item) => (
              <div key={item.value} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 30, height: 30, border: "1px solid #e2e8f0", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "#f8fafc" }}>
                  <svg width="14" height="14" fill="none" stroke="#0ea5e9" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <span style={{ color: "#475569", fontSize: 13, fontFamily: "monospace" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 購入情報 */}
      <div style={panel}>
        <div style={panelHeader}>
          <svg width="14" height="14" fill="none" stroke="#0ea5e9" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span style={{ color: "#0369a1", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em" }}>購入情報</span>
        </div>
        <Row label="商品" value={customer.product} />
        <Row label="決済金額" value={customer.amount ? `¥${Number(customer.amount).toLocaleString()}` : ""} />
        <Row label="決済日" value={customer.paymentDate} />
        <Row label="支払い状況" value={customer.paymentStatus} />
        <Row label="商品提供" value={customer.deliveryStatus} />
        <Row label="LP名" value={customer.lpName} />
        <Row label="再販・引上" value={customer.resell} />
      </div>

      {/* LINE情報 */}
      {(customer.lineName || customer.lineId) && (
        <div style={panel}>
          <div style={panelHeader}>
            <svg width="14" height="14" fill="none" stroke="#10b981" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span style={{ color: "#065f46", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em" }}>LINE</span>
          </div>
          <Row label="LINE名" value={customer.lineName} />
          <Row label="LINE ID" value={customer.lineId} />
        </div>
      )}

      {/* 備考 */}
      {(customer.memo || customer.phoneMemo) && (
        <div style={panel}>
          <div style={panelHeader}>
            <svg width="14" height="14" fill="none" stroke="#f59e0b" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span style={{ color: "#92400e", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em" }}>備考</span>
          </div>
          {customer.memo && (
            <div style={{ padding: "14px 20px", borderBottom: customer.phoneMemo ? "1px solid #f1f5f9" : "none" }}>
              <p style={{ color: "#94a3b8", fontSize: 10, margin: "0 0 6px", fontWeight: 700 }}>【通常】</p>
              <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{customer.memo}</p>
            </div>
          )}
          {customer.phoneMemo && (
            <div style={{ padding: "14px 20px" }}>
              <p style={{ color: "#94a3b8", fontSize: 10, margin: "0 0 6px", fontWeight: 700 }}>【電話】</p>
              <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{customer.phoneMemo}</p>
            </div>
          )}
        </div>
      )}

      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#64748b", fontSize: 12, textDecoration: "none", marginTop: 8 }}>
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        BACK TO DATABASE
      </Link>
    </div>
  );
}
