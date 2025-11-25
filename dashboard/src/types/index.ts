export type LeadStatus =
  | "NOVO"
  | "CONTATADO"
  | "QUALIFICADO"
  | "PROPOSTA_ENVIADA"
  | "NEGOCIACAO"
  | "GANHO"
  | "PERDIDO";

export type ValorConta =
  | "ATE_200"
  | "DE_200_A_500"
  | "DE_500_A_1000"
  | "ACIMA_1000";

export interface Lead {
  id: string;
  nome: string;
  telefone: string;
  email?: string | null;
  cidade?: string | null;
  valorConta?: ValorConta | null;
  origem?: string | null;
  status: LeadStatus;
  notas?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeadMetrics {
  total: number;
  novo: number;
  contatado: number;
  qualificado: number;
  ganho: number;
  perdido: number;
  taxaConversao: number;
}

export interface User {
  id: string;
  email: string;
  nome: string;
  role: string;
  clienteId: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
    refreshToken: string;
  };
  message?: string;
}
