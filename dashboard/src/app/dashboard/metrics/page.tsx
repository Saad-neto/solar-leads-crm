"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Target } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface MetricsData {
  leadsByOrigem: { origem: string; count: number }[];
  leadsByStatus: { status: string; count: number }[];
}

interface OverviewData {
  totalLeads: number;
  leadsMonth: number;
  leadsFechados: number;
  conversionRate: string;
}

export default function MetricsPage() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const [metricsRes, overviewRes] = (await Promise.all([
          api.getMetrics(),
          api.getOverviewMetrics(),
        ])) as [{ success: boolean; data?: any }, { success: boolean; data?: any }];

        if (metricsRes.success) {
          setMetrics(metricsRes.data);
        }

        if (overviewRes.success) {
          setOverview(overviewRes.data);
        }
      } catch (error) {
        toast.error("Erro ao carregar métricas");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const totalOrigens = metrics?.leadsByOrigem.reduce((acc, item) => acc + item.count, 0) || 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Métricas</h1>
        <p className="text-muted-foreground">
          Análise de desempenho e conversão
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">Carregando métricas...</div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Taxa de Conversão
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overview?.conversionRate || "0%"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Leads fechados / Total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Leads Este Mês
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overview?.leadsMonth || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Últimos 30 dias
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Leads
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overview?.totalLeads || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Todos os tempos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Leads Fechados
                </CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overview?.leadsFechados || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Conversões concluídas
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Origem dos Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics?.leadsByOrigem.map((item) => {
                  const percentage = totalOrigens > 0
                    ? Math.round((item.count / totalOrigens) * 100)
                    : 0;

                  return (
                    <div key={item.origem} className="flex items-center">
                      <div className="w-40 font-medium capitalize">
                        {item.origem.replace("_", " ")}
                      </div>
                      <div className="flex-1">
                        <div className="h-4 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-24 text-right text-sm text-muted-foreground">
                        {item.count} ({percentage}%)
                      </div>
                    </div>
                  );
                })}

                {(!metrics?.leadsByOrigem || metrics.leadsByOrigem.length === 0) && (
                  <div className="text-center text-muted-foreground py-8">
                    Nenhum dado disponível ainda
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
