"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password }),
      });
      const data = await res.json();

      if (data.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError(data.message || "ログインに失敗しました");
      }
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f1f5f9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        padding: "40px 36px",
        width: "100%",
        maxWidth: 400,
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
      }}>
        {/* ロゴ */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 10,
            background: "#f0f9ff",
            border: "1px solid #bae6fd",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
          }}>
            <svg width="22" height="22" fill="none" stroke="#0ea5e9" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 style={{ color: "#0f172a", fontSize: 18, fontWeight: 900, margin: 0, letterSpacing: "0.06em" }}>
            CRM SYSTEM
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 12, margin: "6px 0 0" }}>顧客管理システム</p>
        </div>

        {/* フォーム */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", color: "#475569", fontSize: 12, fontWeight: 600, marginBottom: 6, letterSpacing: "0.06em" }}>
              ID
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              autoComplete="username"
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid #e2e8f0",
                borderRadius: 7,
                fontSize: 14,
                color: "#0f172a",
                background: "#ffffff",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => e.target.style.borderColor = "#0ea5e9"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>

          <div>
            <label style={{ display: "block", color: "#475569", fontSize: 12, fontWeight: 600, marginBottom: 6, letterSpacing: "0.06em" }}>
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid #e2e8f0",
                borderRadius: 7,
                fontSize: 14,
                color: "#0f172a",
                background: "#ffffff",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => e.target.style.borderColor = "#0ea5e9"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>

          {error && (
            <p style={{
              color: "#dc2626",
              fontSize: 13,
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: 6,
              padding: "8px 12px",
              margin: 0,
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px",
              background: loading ? "#94a3b8" : "#0ea5e9",
              color: "#ffffff",
              border: "none",
              borderRadius: 7,
              fontSize: 14,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.06em",
              transition: "background 0.15s",
              marginTop: 4,
            }}
          >
            {loading ? "..." : "ログイン"}
          </button>
        </form>
      </div>
    </div>
  );
}
