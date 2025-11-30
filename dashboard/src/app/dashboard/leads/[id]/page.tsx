"use client";

export const runtime = 'edge';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { Lead, LeadStatus } from "@/types";
import { formatDate, formatPhone } from "@/lib/utils";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Tag,
  ArrowLeft,
  Save,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus>("NOVO");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (params.id) {
      loadLead();
    }
  }, [params.id]);

  const loadLead = async () => {
    try {
      const response: any = await api.getLead(params.id as string);
      if (response.success) {
        setLead(response.data);
        setNotes(response.data.notas || "");
        setSelectedStatus(response.data.status);
      }
    } catch (error) {
      console.error("Error loading lead:", error);
      toast.error("Erro ao carregar lead");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    setIsSaving(true);
    try {
      await api.updateLeadStatus(params.id as string, selectedStatus);
      toast.success("Status atualizado com sucesso!");
      loadLead();
    } catch (error) {
      toast.error("Erro ao atualizar status");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateNotes = async () => {
    setIsSaving(true);
    try {
      await api.updateLeadNotes(params.id as string, notes);
      toast.success("Notas atualizadas com sucesso!");
      loadLead();
    } catch (error) {
      toast.error("Erro ao atualizar notas");
    } finally {
      setIsSaving(false);
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

  const statusOptions: LeadStatus[] = [
    "NOVO",
    "CONTATADO",
    "QUALIFICADO",
    "PROPOSTA_ENVIADA",
    "NEGOCIACAO",
    "GANHO",
    "PERDIDO",
  ];

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!lead) {
    return <div>Lead não encontrado</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/leads">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{lead.nome}</h1>
          <p className="text-muted-foreground">Detalhes do lead</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Lead Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Lead</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Telefone</p>
                <p className="font-medium">{formatPhone(lead.telefone)}</p>
              </div>
            </div>

            {lead.email && (
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{lead.email}</p>
                </div>
              </div>
            )}

            {lead.cidade && (
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Cidade</p>
                  <p className="font-medium">{lead.cidade}</p>
                </div>
              </div>
            )}

            {lead.valorConta && (
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Valor da Conta
                  </p>
                  <p className="font-medium">
                    {lead.valorConta.replace(/_/g, " ")}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Tag className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Origem</p>
                <p className="font-medium">{lead.origem || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Criado em</p>
                <p className="font-medium">{formatDate(lead.createdAt)}</p>
              </div>
            </div>

            {(lead.utmSource || lead.utmMedium || lead.utmCampaign) && (
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2">UTM Parameters</p>
                <div className="space-y-1 text-sm text-muted-foreground">
                  {lead.utmSource && <p>Source: {lead.utmSource}</p>}
                  {lead.utmMedium && <p>Medium: {lead.utmMedium}</p>}
                  {lead.utmCampaign && <p>Campaign: {lead.utmCampaign}</p>}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status & Notes */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status do Lead</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Status Atual</Label>
                <div className="mt-2">
                  <Badge className={statusColors[lead.status]} variant="secondary">
                    {lead.status}
                  </Badge>
                </div>
              </div>

              <div>
                <Label htmlFor="status">Atualizar Status</Label>
                <select
                  id="status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as LeadStatus)}
                  className="w-full mt-2 flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={handleUpdateStatus}
                disabled={isSaving || selectedStatus === lead.status}
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar Status
              </Button>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notas Internas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="notes">Anotações</Label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Adicione notas sobre este lead..."
                  className="w-full mt-2 min-h-[150px] flex rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                />
              </div>

              <Button
                onClick={handleUpdateNotes}
                disabled={isSaving}
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar Notas
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
