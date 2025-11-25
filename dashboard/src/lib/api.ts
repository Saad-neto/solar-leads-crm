const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

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
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

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
    status?: string;
    page?: number;
    limit?: number;
  }) => {
    const query = new URLSearchParams();
    if (params?.status) query.append("status", params.status);
    if (params?.page) query.append("page", params.page.toString());
    if (params?.limit) query.append("limit", params.limit.toString());

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
};
