import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout() {
  useEffect(() => {
    // Auto-login com token fake para autenticação da API
    const token = localStorage.getItem("token");
    if (!token) {
      // Fazer login automático
      fetch("https://solar-leads-api.saadneto.workers.dev/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "teste@solarlead.com",
          password: "senha123"
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem("token", data.data.accessToken);
          localStorage.setItem("refreshToken", data.data.refreshToken);
          localStorage.setItem("user", JSON.stringify(data.data.user));
        }
      })
      .catch(err => console.error("Auto-login error:", err));
    }
  }, []);

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container max-w-7xl mx-auto p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
