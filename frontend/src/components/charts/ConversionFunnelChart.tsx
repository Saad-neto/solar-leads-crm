import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FunnelStage {
  stage: string;
  count: number;
  percentage: string;
}

interface ConversionFunnelChartProps {
  data: FunnelStage[];
  conversionRate?: string;
  isLoading?: boolean;
}

export function ConversionFunnelChart({ data, conversionRate, isLoading }: ConversionFunnelChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Funil de Conversão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Funil de Conversão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">
            <p className="text-muted-foreground">Nenhum dado disponível</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxCount = Math.max(...data.map((d) => d.count));

  const stageColors = [
    "bg-blue-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-emerald-500",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Funil de Conversão</span>
          {conversionRate && (
            <span className="text-sm font-normal text-muted-foreground">
              Taxa de conversão: <span className="font-bold text-primary">{conversionRate}</span>
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((stage, index) => {
            const widthPercentage = maxCount > 0 ? (stage.count / maxCount) * 100 : 0;

            return (
              <div key={stage.stage} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{stage.stage}</span>
                  <span className="text-sm text-muted-foreground">
                    {stage.count} leads ({stage.percentage}%)
                  </span>
                </div>
                <div className="relative h-12 bg-muted rounded-lg overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 ${stageColors[index]} transition-all duration-500 flex items-center justify-center text-white font-medium`}
                    style={{ width: `${widthPercentage}%` }}
                  >
                    {widthPercentage > 10 && <span className="text-sm">{stage.count}</span>}
                  </div>
                  {widthPercentage <= 10 && stage.count > 0 && (
                    <span className="absolute inset-y-0 left-2 flex items-center text-sm font-medium text-foreground">
                      {stage.count}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Conversion insights */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Insights</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Total de leads no funil: {data.reduce((sum, s) => sum + s.count, 0)}</li>
            <li>
              • Taxa de qualificação:{" "}
              {data[2] && data[0] && data[0].count > 0
                ? ((data[2].count / data[0].count) * 100).toFixed(1)
                : "0"}
              %
            </li>
            {conversionRate && <li>• Taxa de conversão final: {conversionRate}</li>}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
