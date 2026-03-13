import { notFound } from "next/navigation";
import Link from "next/link";
import { getCustomerById } from "@/lib/data";

type Props = { params: Promise<{ id: string }> };

const statusStyle: Record<string, { color: string; bg: string; border: string }> = {
  対応中:    { color: "#0369a1", bg: "#e0f2fe", border: "#bae6fd" },
  成約済:    { color: "#065f46", bg: "#d1fae5", border: "#a7f3d0" },
  検討中:    { color: "#92400e", bg: "#fef3c7", border: "#fde68a" },
  フォロー中: { color: "#5b21b6", bg: "#ede9fe", border: "#ddd6fe" },
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

export default async function CustomerDetailPage({ params }: Props) {
  const { id } = await params;
  const customer = getCustomerById(id);
  if (!customer) notFound();

  const s = statusStyle[customer.status] ?? statusStyle["クローズ"];

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px" }}>

      {/* パンくず */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, fontSize: 12, color: "#94a3b8", letterSpacing: "0.08em" }}>
        <Link href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>DATABASE</Link>
        <span style={{ color: "#cbd5e1" }}>/</span>
        <span style={{ color: "#0f172a", fontWeight: 600 }}>{customer.lastName} {customer.firstName}</span>
      </div>

      {/* 基本情報ヘッダー */}
      <div style={{ ...panel, marginBottom: 24 }}>
        <div style={{ padding: "24px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
            {/* 左：名前 */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 10,
                border: `1px solid ${s.border}`,
                background: s.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, fontWeight: 900, color: s.color,
                flexShrink: 0,
              }}>
                {customer.lastName[0]}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <h1 style={{ color: "#0f172a", fontSize: 22, fontWeight: 900, margin: 0 }}>
                    {customer.lastName} {customer.firstName}
                  </h1>
                  <span style={{
                    color: s.color, fontSize: 11, fontWeight: 700, padding: "3px 10px",
                    border: `1px solid ${s.border}`, borderRadius: 4,
                    background: s.bg,
                    letterSpacing: "0.04em",
                  }}>
                    {customer.status}
                  </span>
                </div>
                <p style={{ color: "#94a3b8", fontSize: 12, margin: "4px 0 0", letterSpacing: "0.08em" }}>
                  {customer.lastNameKana} {customer.firstNameKana}
                </p>
              </div>
            </div>

            {/* 右：担当・登録日 */}
            <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.8, textAlign: "right" }}>
              <p style={{ margin: 0 }}>担当 <span style={{ color: "#0f172a", fontWeight: 600 }}>{customer.assignedStaff}</span></p>
              <p style={{ margin: 0, fontFamily: "monospace", color: "#94a3b8" }}>REG {customer.createdAt}</p>
            </div>
          </div>

          {/* 連絡先 */}
          <div style={{
            marginTop: 20, paddingTop: 20,
            borderTop: "1px solid #f1f5f9",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
          }}>
            {[
              { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", value: customer.phone },
              { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", value: customer.email },
            ].map((item) => (
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

          {/* メモ */}
          {customer.memo && (
            <div style={{
              marginTop: 16,
              padding: "12px 16px",
              background: "#fffbeb",
              border: "1px solid #fde68a",
              borderRadius: 6,
              borderLeft: "3px solid #f59e0b",
            }}>
              <p style={{ color: "#92400e", fontSize: 10, letterSpacing: "0.12em", margin: "0 0 4px", fontWeight: 700 }}>MEMO</p>
              <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{customer.memo}</p>
            </div>
          )}
        </div>
      </div>

      {/* 電話履歴 */}
      <div style={panel}>
        <div style={panelHeader}>
          <svg width="14" height="14" fill="none" stroke="#0ea5e9" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span style={{ color: "#0369a1", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em" }}>CALL LOGS</span>
          <span style={{ color: "#94a3b8", fontSize: 11, marginLeft: "auto", fontFamily: "monospace" }}>{customer.phoneLogs.length} records</span>
        </div>
        {customer.phoneLogs.length === 0 ? (
          <p style={{ color: "#94a3b8", fontSize: 12, padding: "32px 20px", textAlign: "center", letterSpacing: "0.1em" }}>NO RECORDS</p>
        ) : (
          customer.phoneLogs.map((log, i) => (
            <div key={log.id} style={{
              padding: "16px 20px",
              borderBottom: i < customer.phoneLogs.length - 1 ? "1px solid #f1f5f9" : "none",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ color: "#64748b", fontSize: 11, fontFamily: "monospace" }}>{log.date}</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: "#94a3b8", fontSize: 11 }}>{log.duration}</span>
                  <span style={{ color: "#0369a1", fontSize: 10, padding: "1px 8px", border: "1px solid #bae6fd", borderRadius: 3, background: "#e0f2fe", fontWeight: 700 }}>{log.staff}</span>
                </div>
              </div>
              <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{log.content}</p>
            </div>
          ))
        )}
      </div>

      {/* LINE履歴 */}
      <div style={panel}>
        <div style={panelHeader}>
          <svg width="14" height="14" fill="none" stroke="#10b981" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span style={{ color: "#065f46", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em" }}>LINE LOGS</span>
          <span style={{ color: "#94a3b8", fontSize: 11, marginLeft: "auto", fontFamily: "monospace" }}>{customer.lineLogs.length} records</span>
        </div>
        {customer.lineLogs.length === 0 ? (
          <p style={{ color: "#94a3b8", fontSize: 12, padding: "32px 20px", textAlign: "center", letterSpacing: "0.1em" }}>NO RECORDS</p>
        ) : (
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
            {customer.lineLogs.map((log) => (
              <div key={log.id} style={{ display: "flex", justifyContent: log.direction === "送信" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "78%",
                  padding: "10px 14px",
                  borderRadius: log.direction === "送信" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  background: log.direction === "送信" ? "#e0f2fe" : "#f8fafc",
                  border: log.direction === "送信" ? "1px solid #bae6fd" : "1px solid #e2e8f0",
                }}>
                  <p style={{ color: "#0f172a", fontSize: 13, lineHeight: 1.7, margin: "0 0 6px" }}>{log.message}</p>
                  <p style={{ color: "#94a3b8", fontSize: 10, margin: 0, fontFamily: "monospace" }}>
                    {log.date} · {log.direction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* イベント履歴 */}
      <div style={panel}>
        <div style={panelHeader}>
          <svg width="14" height="14" fill="none" stroke="#8b5cf6" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span style={{ color: "#5b21b6", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em" }}>EVENT LOGS</span>
          <span style={{ color: "#94a3b8", fontSize: 11, marginLeft: "auto", fontFamily: "monospace" }}>{customer.eventLogs.length} records</span>
        </div>
        {customer.eventLogs.length === 0 ? (
          <p style={{ color: "#94a3b8", fontSize: 12, padding: "32px 20px", textAlign: "center", letterSpacing: "0.1em" }}>NO RECORDS</p>
        ) : (
          customer.eventLogs.map((log, i) => (
            <div key={log.id} style={{
              padding: "16px 20px",
              display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16,
              borderBottom: i < customer.eventLogs.length - 1 ? "1px solid #f1f5f9" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", marginTop: 5, flexShrink: 0,
                  background: log.attended ? "#10b981" : "#e2e8f0",
                  border: log.attended ? "none" : "1px solid #cbd5e1",
                }} />
                <div>
                  <p style={{ color: "#0f172a", fontSize: 13, fontWeight: 600, margin: "0 0 3px" }}>{log.eventName}</p>
                  {log.note && <p style={{ color: "#94a3b8", fontSize: 11, margin: 0 }}>{log.note}</p>}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ color: "#94a3b8", fontSize: 11, fontFamily: "monospace", margin: "0 0 3px" }}>{log.date}</p>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                  color: log.attended ? "#065f46" : "#94a3b8",
                  background: log.attended ? "#d1fae5" : "#f1f5f9",
                  border: `1px solid ${log.attended ? "#a7f3d0" : "#e2e8f0"}`,
                  padding: "1px 7px", borderRadius: 3,
                }}>
                  {log.attended ? "ATTENDED" : "ABSENT"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 戻るリンク */}
      <Link href="/" style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        color: "#64748b", fontSize: 12, letterSpacing: "0.08em",
        textDecoration: "none", marginTop: 8,
      }}>
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        BACK TO DATABASE
      </Link>

    </div>
  );
}
