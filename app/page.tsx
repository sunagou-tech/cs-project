import { fetchCustomers } from "@/lib/sheets";
import CustomerList from "@/app/components/CustomerList";

export default async function HomePage() {
  const customers = await fetchCustomers();

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ color: "#94a3b8", fontSize: 11, letterSpacing: "0.2em", marginBottom: 6 }}>CUSTOMER DATABASE</p>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <h1 style={{ color: "#0f172a", fontSize: 28, fontWeight: 900, margin: 0 }}>
            {String(customers.length).padStart(3, "0")}
          </h1>
          <span style={{ color: "#94a3b8", fontSize: 13 }}>RECORDS</span>
        </div>
      </div>
      <CustomerList customers={customers} />
    </div>
  );
}
