import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { Lead } from "@/types";
import { formatDate, formatPhone } from "@/lib/utils";
import {
  Users,
  UserPlus,
  UserCheck,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    novo: 0,
    contatado: 0,
    qualificado: 0,
  });
  const [overview, setOverview] = useState<{
    growthPercentage: number;
  } | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [leadsResponse, overviewResponse]: any = await Promise.all([
        api.getLeads({ pageSize: 5 }),
        api.getOverviewMetrics(),
      ]);

      if (leadsResponse.success) {
        const leads = leadsResponse.data.leads;
        setRecentLeads(leads);

        // Calculate stats
        setStats({
          total: leadsResponse.data.total,
          novo: leads.filter((l: Lead) => l.status === "NOVO").length,
          contatado: leads.filter((l: Lead) => l.status === "CONTATADO").length,
          qualificado: leads.filter((l: Lead) => l.status === "QUALIFICADO")
            .length,
        });
      }

      if (overviewResponse.success) {
        setOverview(overviewResponse.data);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
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

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral dos seus leads de energia solar
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {overview?.growthPercentage !== undefined ? (
                overview.growthPercentage >= 0 ? (
                  `+${overview.growthPercentage}% desde o último mês`
                ) : (
                  `${overview.growthPercentage}% desde o último mês`
                )
              ) : (
                "Carregando..."
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.novo}</div>
            <p className="text-xs text-muted-foreground">Aguardando contato</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contatados</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contatado}</div>
            <p className="text-xs text-muted-foreground">
              Em processo de qualificação
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualificados</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.qualificado}</div>
            <p className="text-xs text-muted-foreground">
              Prontos para proposta
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <CardTitle>Leads Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLeads.map((lead) => (
              <Link
                key={lead.id}
                to={`/dashboard/leads/${lead.id}`}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-3">
                    <p className="font-semibold">{lead.nome}</p>
                    <Badge
                      className={statusColors[lead.status]}
                      variant="secondary"
                    >
                      {lead.status}
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    {lead.telefone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {formatPhone(lead.telefone)}
                      </span>
                    )}
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
                  </div>
                </div>
                <div className="text-sm text-muted-foreground text-right">
                  {formatDate(lead.createdAt)}
                </div>
              </Link>
            ))}
          </div>
          {recentLeads.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Nenhum lead encontrado
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
