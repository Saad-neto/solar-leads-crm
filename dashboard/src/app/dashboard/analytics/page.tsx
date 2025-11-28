"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeadsTimelineChart } from "@/components/charts/LeadsTimelineChart";
import { LeadsBySourceChart } from "@/components/charts/LeadsBySourceChart";
import { ConversionFunnelChart } from "@/components/charts/ConversionFunnelChart";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { TrendingUp, Users, Target, BarChart3, Calendar } from "lucide-react";

export default function AnalyticsPage() {
  const [period, setPeriod] = useState(30);
  const [isLoading, setIsLoading] = useState(true);

  // Charts data
  const [timelineData, setTimelineData] = useState<any[]>([]);
  const [sourcesData, setSourcesData] = useState<any[]>([]);
  const [funnelData, setFunnelData] = useState<any[]>([]);
  const [conversionRate, setConversionRate] = useState<string>("");

  // Overview stats
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalFechados, setTotalFechados] = useState(0);
  const [leadsThisMonth, setLeadsThisMonth] = useState(0);

  useEffect(() => {
    loadAnalytics();
  }, [period]);

  const loadAnalytics = async () => {
    try {
      setIsLoading(true);

      const [timelineRes, sourcesRes, funnelRes, overviewRes] = await Promise.all([
        api.getLeadsTimeline(period),
        api.getLeadsBySource(),
        api.getConversionFunnel(),
        api.getOverviewMetrics(),
      ]);

      // Timeline
      if (timelineRes.success) {
        setTimelineData(timelineRes.data.timeline);
        setTotalLeads(timelineRes.data.total);
      }

      // Sources
      if (sourcesRes.success) {
        setSourcesData(sourcesRes.data.sources);
      }

      // Funnel
      if (funnelRes.success) {
        setFunnelData(funnelRes.data.funnel);
        setConversionRate(funnelRes.data.conversionRate);
        setTotalFechados(funnelRes.data.ganho);
      }

      // Overview
      if (overviewRes.success) {
        setLeadsThisMonth(overviewRes.data.leadsMonth);
      }
    } catch (error) {
      console.error("Error loading analytics:", error);
      toast.error("Erro ao carregar analytics");
    } finally {
      setIsLoading(false);
    }
  };

  const periodOptions = [
    { value: 7, label: "7 dias" },
    { value: 30, label: "30 dias" },
    { value: 60, label: "60 dias" },
    { value: 90, label: "90 dias" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Análise detalhada de desempenho e conversão
          </p>
        </div>

        {/* Period selector */}
        <div className="flex gap-2">
          {periodOptions.map((option) => (
            <Button
              key={option.value}
              variant={period === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod(option.value)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Leads no Período
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              Últimos {period} dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Leads Este Mês
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadsThisMonth}</div>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
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
            <div className="text-2xl font-bold">{totalFechados}</div>
            <p className="text-xs text-muted-foreground">Status: Ganho</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Conversão
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}</div>
            <p className="text-xs text-muted-foreground">Ganhos / Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Timeline Chart */}
        <div className="md:col-span-2">
          <LeadsTimelineChart data={timelineData} isLoading={isLoading} />
        </div>

        {/* Sources Chart */}
        <LeadsBySourceChart data={sourcesData} isLoading={isLoading} />

        {/* Funnel Chart */}
        <ConversionFunnelChart
          data={funnelData}
          conversionRate={conversionRate}
          isLoading={isLoading}
        />
      </div>

      {/* Additional Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Insights e Recomendações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Dynamic insights based on data */}
            {sourcesData.length > 0 && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Melhor Fonte de Leads
                </h4>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {sourcesData[0]?.origem}
                  </span>{" "}
                  é sua melhor fonte com{" "}
                  <span className="font-medium text-foreground">
                    {sourcesData[0]?.count} leads ({sourcesData[0]?.percentage}%)
                  </span>
                  . Continue investindo nessa origem.
                </p>
              </div>
            )}

            {parseFloat(conversionRate) < 10 && totalLeads > 10 && (
              <div className="p-4 border border-yellow-500/50 bg-yellow-500/10 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                  <Target className="h-4 w-4" />
                  Oportunidade de Melhoria
                </h4>
                <p className="text-sm text-muted-foreground">
                  Sua taxa de conversão está em {conversionRate}. Considere
                  melhorar o follow-up dos leads qualificados para aumentar as
                  vendas.
                </p>
              </div>
            )}

            {totalLeads > 0 && leadsThisMonth === 0 && (
              <div className="p-4 border border-red-500/50 bg-red-500/10 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2 text-red-700 dark:text-red-400">
                  <Users className="h-4 w-4" />
                  Atenção Necessária
                </h4>
                <p className="text-sm text-muted-foreground">
                  Nenhum lead novo este mês. Verifique suas campanhas de marketing
                  e landing pages.
                </p>
              </div>
            )}

            {leadsThisMonth > 20 && (
              <div className="p-4 border border-green-500/50 bg-green-500/10 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-700 dark:text-green-400">
                  <TrendingUp className="h-4 w-4" />
                  Ótimo Desempenho!
                </h4>
                <p className="text-sm text-muted-foreground">
                  Você está com {leadsThisMonth} leads este mês. Continue com o bom
                  trabalho!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
