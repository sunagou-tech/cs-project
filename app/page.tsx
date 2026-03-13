"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { customers, searchCustomers } from "@/lib/data";

const statusStyle: Record<string, { color: string; bg: string; border: string }> = {
  対応中:    { color: "#0369a1", bg: "#e0f2fe", border: "#bae6fd" },
  成約済:    { color: "#065f46", bg: "#d1fae5", border: "#a7f3d0" },
  検討中:    { color: "#92400e", bg: "#fef3c7", border: "#fde68a" },
  フォロー中: { color: "#5b21b6", bg: "#ede9fe", border: "#ddd6fe" },
  クローズ:  { color: "#475569", bg: "#f1f5f9", border: "#e2e8f0" },
};

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const results = query.trim() ? searchCustomers(query) : customers;

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px" }}>

      {/* タイトル */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ color: "#94a3b8", fontSize: 11, letterSpacing: "0.2em", marginBottom: 6 }}>CUSTOMER DATABASE</p>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <h1 style={{ color: "#0f172a", fontSize: 28, fontWeight: 900, letterSpacing: "0.04em", margin: 0 }}>
            {customers.length.toString().padStart(3, "0")}
          </h1>
          <span style={{ color: "#94a3b8", fontSize: 13 }}>RECORDS</span>
        </div>
      </div>

      {/* 検索バー */}
      <div style={{ position: "relative", marginBottom: 28 }}>
        <div style={{
          position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
          color: "#94a3b8",
        }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="苗字で検索..."
          style={{
            width: "100%",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: "12px 14px 12px 44px",
            color: "#0f172a",
            fontSize: 14,
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.15s, box-shadow 0.15s",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#0ea5e9";
            e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e2e8f0";
            e.target.style.boxShadow = "0 1px 2px rgba(0,0,0,0.04)";
          }}
        />
        {query && (
          <button onClick={() => setQuery("")} style={{
            position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
            color: "#94a3b8", background: "none", border: "none", cursor: "pointer", padding: 4,
          }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* 顧客リスト */}
      {results.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: "#94a3b8" }}>
          <p style={{ letterSpacing: "0.1em", fontSize: 13 }}>NO RECORDS FOUND</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {/* ヘッダー行 */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 130px 110px 80px",
            padding: "8px 16px",
            color: "#94a3b8",
            fontSize: 10,
            letterSpacing: "0.18em",
            borderBottom: "1px solid #e2e8f0",
          }}>
            <span>CLIENT</span>
            <span>CONTACT</span>
            <span>STATUS</span>
            <span style={{ textAlign: "right" }}>LOGS</span>
          </div>

          {results.map((customer) => {
            const s = statusStyle[customer.status] ?? statusStyle["クローズ"];
            return (
              <button
                key={customer.id}
                onClick={() => router.push(`/customers/${customer.id}`)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 130px 110px 80px",
                  alignItems: "center",
                  padding: "14px 16px",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.12s",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#bae6fd";
                  el.style.boxShadow = "0 2px 8px rgba(14,165,233,0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#e2e8f0";
                  el.style.boxShadow = "0 1px 2px rgba(0,0,0,0.04)";
                }}
              >
                {/* 名前 */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: s.bg,
                    border: `1px solid ${s.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    color: s.color,
                    fontWeight: 900, fontSize: 14,
                  }}>
                    {customer.lastName[0]}
                  </div>
                  <div>
                    <p style={{ color: "#0f172a", fontWeight: 700, fontSize: 14, margin: 0 }}>
                      {customer.lastName} {customer.firstName}
                    </p>
                    <p style={{ color: "#94a3b8", fontSize: 11, margin: "2px 0 0" }}>
                      {customer.assignedStaff}
                    </p>
                  </div>
                </div>

                {/* 電話番号 */}
                <span style={{ color: "#64748b", fontSize: 12, fontFamily: "monospace" }}>
                  {customer.phone}
                </span>

                {/* ステータス */}
                <span style={{
                  display: "inline-block",
                  color: s.color,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  padding: "3px 10px",
                  borderRadius: 4,
                  border: `1px solid ${s.border}`,
                  background: s.bg,
                  whiteSpace: "nowrap",
                }}>
                  {customer.status}
                </span>

                {/* ログ数 */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, color: "#94a3b8", fontSize: 12, fontFamily: "monospace" }}>
                  <span title="電話">{customer.phoneLogs.length}</span>
                  <span title="LINE">{customer.lineLogs.length}</span>
                  <span title="イベント">{customer.eventLogs.length}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
