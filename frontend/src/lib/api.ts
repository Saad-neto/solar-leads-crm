const API_URL = import.meta.env.VITE_API_URL || "http://95.217.158.112:3003";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.message || "Erro ao fazer requisição"
    );
  }

  return data;
}

export const api = {
  // Auth
  login: async (email: string, password: string) =>
    fetchApi("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // Leads
  getLeads: async (params?: {
    status?: string | string[];
    origem?: string | string[];
    cidade?: string | string[];
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    valorConta?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    const query = new URLSearchParams();

    if (params?.status) {
      const statusArray = Array.isArray(params.status) ? params.status : [params.status];
      statusArray.forEach(s => query.append("status", s));
    }

    if (params?.origem) {
      const origemArray = Array.isArray(params.origem) ? params.origem : [params.origem];
      origemArray.forEach(o => query.append("origem", o));
    }

    if (params?.cidade) {
      const cidadeArray = Array.isArray(params.cidade) ? params.cidade : [params.cidade];
      cidadeArray.forEach(c => query.append("cidade", c));
    }

    if (params?.search) query.append("search", params.search);
    if (params?.dateFrom) query.append("dateFrom", params.dateFrom);
    if (params?.dateTo) query.append("dateTo", params.dateTo);
    if (params?.valorConta) query.append("valorConta", params.valorConta);
    if (params?.page) query.append("page", params.page.toString());
    if (params?.pageSize) query.append("pageSize", params.pageSize.toString());
    if (params?.sortBy) query.append("sortBy", params.sortBy);
    if (params?.sortOrder) query.append("sortOrder", params.sortOrder);

    return fetchApi(`/api/leads?${query.toString()}`);
  },

  getLead: async (id: string) => fetchApi(`/api/leads/${id}`),

  updateLeadStatus: async (id: string, status: string) =>
    fetchApi(`/api/leads/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  updateLeadNotes: async (id: string, notas: string) =>
    fetchApi(`/api/leads/${id}/notes`, {
      method: "PATCH",
      body: JSON.stringify({ notas }),
    }),

  exportLeads: async () => fetchApi("/api/leads/export"),

  // Metrics
  getMetrics: async () => fetchApi("/api/metrics"),

  getOverviewMetrics: async () => fetchApi("/api/metrics/overview"),

  getChartData: async (days?: number) => {
    const query = days ? `?days=${days}` : "";
    return fetchApi(`/api/metrics/chart${query}`);
  },

  // New chart endpoints
  getLeadsTimeline: async (days: number = 30) =>
    fetchApi(`/api/metrics/leads-timeline?days=${days}`),

  getLeadsBySource: async () =>
    fetchApi("/api/metrics/leads-by-source"),

  getConversionFunnel: async () =>
    fetchApi("/api/metrics/conversion-funnel"),
};
