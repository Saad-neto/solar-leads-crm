"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/Pagination";
import { api } from "@/lib/api";
import { Lead } from "@/types";
import { formatDate, formatPhone } from "@/lib/utils";
import {
  Phone,
  Mail,
  MapPin,
  Search,
  Download,
  Eye,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export default function LeadsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1")
  );
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get("pageSize") || "25")
  );
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadLeads();
  }, [currentPage, pageSize, statusFilter, searchTerm]);

  // Update URL with query params
  const updateURL = () => {
    const params = new URLSearchParams();
    if (currentPage > 1) params.set("page", currentPage.toString());
    if (pageSize !== 25) params.set("pageSize", pageSize.toString());
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    if (searchTerm) params.set("search", searchTerm);

    const newURL = params.toString()
      ? `/dashboard/leads?${params.toString()}`
      : "/dashboard/leads";

    router.replace(newURL, { scroll: false });
  };

  useEffect(() => {
    updateURL();
  }, [currentPage, pageSize, statusFilter, searchTerm]);

  const loadLeads = async () => {
    try {
      setIsLoading(true);
      const params: any = {
        page: currentPage,
        pageSize: pageSize,
      };

      if (statusFilter !== "ALL") {
        params.status = statusFilter;
      }

      if (searchTerm) {
        params.search = searchTerm;
      }

      const response: any = await api.getLeads(params);

      if (response.success) {
        setLeads(response.data.leads);
        setTotalItems(response.data.pagination.totalItems);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error: any) {
      console.error("Error loading leads:", error);
      toast.error("Erro ao carregar leads");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    // Debounce search - reset to first page
    setCurrentPage(1);
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/leads/export`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      toast.success("Leads exportados com sucesso!");
    } catch (error) {
      console.error("Erro ao exportar:", error);
      toast.error("Erro ao exportar leads");
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
          {isExporting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Exportando...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </>
          )}
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
                onChange={(e) => handleSearchChange(e.target.value)}
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
                onClick={() => handleStatusFilterChange(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Leads List */}
      {!isLoading && (
        <>
          <div className="space-y-3">
            {leads.map((lead) => (
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

            {leads.length === 0 && (
              <Card className="p-12">
                <p className="text-center text-muted-foreground">
                  Nenhum lead encontrado com os filtros selecionados
                </p>
              </Card>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </>
      )}
    </div>
  );
}
