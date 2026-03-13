import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRM // 顧客管理システム",
  description: "顧客情報・対応履歴の一元管理ダッシュボード",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

          {/* ヘッダー */}
          <header style={{
            background: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
            position: "sticky",
            top: 0,
            zIndex: 50,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}>
            <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
                {/* ロゴマーク */}
                <div style={{
                  width: 32, height: 32,
                  border: "1px solid #e2e8f0",
                  borderRadius: 6,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "#f8fafc",
                }}>
                  <svg width="16" height="16" fill="none" stroke="#0ea5e9" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p style={{ color: "#0f172a", fontWeight: 900, fontSize: 13, letterSpacing: "0.08em", lineHeight: 1 }}>
                    CRM SYSTEM
                  </p>
                  <p style={{ color: "#94a3b8", fontSize: 10, letterSpacing: "0.12em", marginTop: 2 }}>
                    顧客管理システム
                  </p>
                </div>
              </a>

              {/* ステータスインジケーター */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
                <span style={{ color: "#94a3b8", fontSize: 11, letterSpacing: "0.1em" }}>ONLINE</span>
              </div>
            </div>
          </header>

          <main style={{ flex: 1 }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
