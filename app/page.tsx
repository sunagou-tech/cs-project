import { fetchCustomers, getLastSynced } from "@/lib/sheets";
import CustomerList from "@/app/components/CustomerList";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [customers, lastSynced] = await Promise.all([fetchCustomers(), getLastSynced()]);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ color: "#94a3b8", fontSize: 11, letterSpacing: "0.2em", marginBottom: 6 }}>CUSTOMER DATABASE</p>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h1 style={{ color: "#0f172a", fontSize: 28, fontWeight: 900, margin: 0 }}>
              {String(customers.length).padStart(3, "0")}
            </h1>
            <span style={{ color: "#94a3b8", fontSize: 13 }}>RECORDS</span>
          </div>
          <div style={{ fontSize: 11, color: "#94a3b8", textAlign: "right" }}>
            {lastSynced
              ? <span>最終同期: {new Date(lastSynced).toLocaleString("ja-JP")}</span>
              : <span style={{ color: "#f59e0b" }}>未同期 — スプシからデータを送信してください</span>
            }
          </div>
        </div>
      </div>
      <CustomerList customers={customers} />
    </div>
  );
}
