"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { Lead } from "@/types";
import { formatDate, formatPhone } from "@/lib/utils";
import {
  Phone,
  Mail,
  MapPin,
  Search,
  Filter,
  Download,
  Eye,
} from "lucide-react";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [searchTerm, statusFilter, leads]);

  const loadLeads = async () => {
    try {
      const response: any = await api.getLeads({ limit: 100 });
      if (response.success) {
        setLeads(response.data.leads);
      }
    } catch (error) {
      console.error("Error loading leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = leads;

    // Filter by status
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.telefone.includes(searchTerm) ||
          lead.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLeads(filtered);
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/leads/export", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao exportar leads");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Erro ao exportar:", error);
      alert("Erro ao exportar leads");
    } finally {
      setIsExporting(false);
    }
  };

  const statusColors: Record<string, string> = {
    NOVO: "bg-blue-500",
    CONTATADO: "bg-yellow-500",
    QUALIFICADO: "bg-green-500",
    PROPOSTA_ENVIADA: "bg-purple-500",
    NEGOCIACAO: "bg-orange-500",
    GANHO: "bg-emerald-500",
    PERDIDO: "bg-red-500",
  };

  const statusLabels: Record<string, string> = {
    ALL: "Todos",
    NOVO: "Novo",
    CONTATADO: "Contatado",
    QUALIFICADO: "Qualificado",
    PROPOSTA_ENVIADA: "Proposta Enviada",
    NEGOCIACAO: "Negociação",
    GANHO: "Ganho",
    PERDIDO: "Perdido",
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">
            Gerencie seus leads de energia solar
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleExport}
          disabled={isExporting}
        >
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? "Exportando..." : "Exportar CSV"}
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(statusLabels).map(([value, label]) => (
              <Button
                key={value}
                variant={statusFilter === value ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Leads List */}
      <div className="space-y-3">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg">{lead.nome}</h3>
                  <Badge
                    className={statusColors[lead.status]}
                    variant="secondary"
                  >
                    {statusLabels[lead.status]}
                  </Badge>
                  {lead.origem && (
                    <Badge variant="outline" className="text-xs">
                      {lead.origem}
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {formatPhone(lead.telefone)}
                  </span>
                  {lead.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {lead.email}
                    </span>
                  )}
                  {lead.cidade && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {lead.cidade}
                    </span>
                  )}
                  {lead.valorConta && (
                    <span className="text-primary font-medium">
                      Conta: {lead.valorConta.replace(/_/g, " ")}
                    </span>
                  )}
                </div>

                {lead.utmSource && (
                  <div className="text-xs text-muted-foreground">
                    UTM: {lead.utmSource}
                    {lead.utmMedium && ` / ${lead.utmMedium}`}
                    {lead.utmCampaign && ` / ${lead.utmCampaign}`}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="text-sm text-muted-foreground">
                  {formatDate(lead.createdAt)}
                </span>
                <Link href={`/dashboard/leads/${lead.id}`}>
                  <Button size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}

        {filteredLeads.length === 0 && (
          <Card className="p-12">
            <p className="text-center text-muted-foreground">
              Nenhum lead encontrado com os filtros selecionados
            </p>
          </Card>
        )}
      </div>

      {/* Summary */}
      <Card className="p-4">
        <p className="text-sm text-muted-foreground text-center">
          Mostrando {filteredLeads.length} de {leads.length} leads
        </p>
      </Card>
    </div>
  );
}
