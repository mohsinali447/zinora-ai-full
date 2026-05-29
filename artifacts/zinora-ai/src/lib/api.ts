const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "/api";

function getToken(): string | null {
  return localStorage.getItem("zinora_token");
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options?.headers as Record<string, string> | undefined),
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      message = body.message ?? body.error ?? message;
    } catch {}
    throw new Error(message);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export type AuthResponse = { token: string; user: User };
export type User = { id: number; name: string; email: string; company: string; role: string; avatarUrl?: string | null; createdAt: string };
export type Conversation = { id: number; customerName: string; subject: string; status: string; lastMessage: string; lastMessageAt: string; unreadCount: number; tags: string[] };
export type Message = { id: number; conversationId: number; sender: string; senderType: string; content: string; isAi: boolean; timestamp: string };
export type Article = { id: number; title: string; content: string; category: string; status: string; views: number; updatedAt: string };
export type Category = { id: number; name: string; slug: string; articleCount: number };
export type DashboardSummary = { totalConversations: number; resolvedToday: number; activeChats: number; avgResponseTime: string; satisfactionScore: number; aiResolutionRate: number };
export type ActivityItem = { id: number; description: string; timestamp: string };
export type AnalyticsOverview = { totalTickets: number; aiResolutionRate: number; avgResponseTime: number; avgSatisfaction: number };
export type AnalyticsCharts = { dailyConversations: { date: string; value: number }[]; satisfactionTrend: { date: string; value: number }[]; teamPerformance: { name: string; resolved: number; satisfaction: number }[] };
export type TeamMember = { id: number; name: string; email: string; role: string; status: string; avatarUrl?: string | null; conversationsHandled: number; joinedAt: string };
export type Plan = { id: number; name: string; description: string; price: number; features: string[]; isPopular: boolean };
export type Subscription = { planName: string; status: string; currentPeriodStart: string; currentPeriodEnd: string; aiCreditsUsed: number; aiCreditsLimit: number; seatsUsed: number; seatsLimit: number };
export type Invoice = { id: number; date: string; description: string; status: string; amount: number };
export type Notification = { id: number; title: string; message: string; type: string; isRead: boolean; createdAt: string };
export type AiSettings = { personality: string; responseTone: string; model: string; language: string; confidenceThreshold: number; enableAutoReply: boolean; autoEscalate: boolean; enableSentimentAnalysis: boolean; workingHoursOnly: boolean };
export type Integration = { id: string; name: string; category: string; description: string; isConnected: boolean };

export const api = {
  auth: {
    login: (data: { email: string; password: string }) =>
      apiFetch<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify(data) }),
    signup: (data: { name: string; email: string; password: string; company: string }) =>
      apiFetch<AuthResponse>("/auth/signup", { method: "POST", body: JSON.stringify(data) }),
    forgotPassword: (data: { email: string }) =>
      apiFetch<{ message: string }>("/auth/forgot-password", { method: "POST", body: JSON.stringify(data) }),
    getMe: () => apiFetch<User>("/auth/me"),
    updateMe: (data: Partial<User>) =>
      apiFetch<User>("/auth/me", { method: "PATCH", body: JSON.stringify(data) }),
  },
  conversations: {
    list: (params?: { status?: string; search?: string }) => {
      const q = new URLSearchParams();
      if (params?.status) q.set("status", params.status);
      if (params?.search) q.set("search", params.search);
      return apiFetch<Conversation[]>(`/conversations${q.toString() ? `?${q}` : ""}`);
    },
    get: (id: number) => apiFetch<Conversation>(`/conversations/${id}`),
    update: (id: number, data: Partial<Conversation>) =>
      apiFetch<Conversation>(`/conversations/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
    listMessages: (id: number) => apiFetch<Message[]>(`/conversations/${id}/messages`),
    sendMessage: (id: number, data: { content: string }) =>
      apiFetch<Message>(`/conversations/${id}/messages`, { method: "POST", body: JSON.stringify(data) }),
  },
  knowledge: {
    listArticles: (params?: { search?: string; category?: string }) => {
      const q = new URLSearchParams();
      if (params?.search) q.set("search", params.search);
      if (params?.category) q.set("category", params.category);
      return apiFetch<Article[]>(`/knowledge/articles${q.toString() ? `?${q}` : ""}`);
    },
    listCategories: () => apiFetch<Category[]>("/knowledge/categories"),
    createArticle: (data: Partial<Article>) =>
      apiFetch<Article>("/knowledge/articles", { method: "POST", body: JSON.stringify(data) }),
  },
  dashboard: {
    getSummary: () => apiFetch<DashboardSummary>("/dashboard/summary"),
    getActivity: () => apiFetch<ActivityItem[]>("/dashboard/activity"),
  },
  analytics: {
    getOverview: () => apiFetch<AnalyticsOverview>("/analytics/overview"),
    getCharts: () => apiFetch<AnalyticsCharts>("/analytics/charts"),
  },
  team: {
    list: () => apiFetch<TeamMember[]>("/team"),
    invite: (data: { email: string; role: string }) =>
      apiFetch<TeamMember>("/team/invite", { method: "POST", body: JSON.stringify(data) }),
  },
  billing: {
    getSubscription: () => apiFetch<Subscription>("/billing/subscription"),
    listPlans: () => apiFetch<Plan[]>("/billing/plans"),
    listInvoices: () => apiFetch<Invoice[]>("/billing/invoices"),
  },
  notifications: {
    list: () => apiFetch<Notification[]>("/notifications"),
    markRead: (id: number) =>
      apiFetch<Notification>(`/notifications/${id}/read`, { method: "POST" }),
    markAllRead: () => apiFetch<void>("/notifications/read-all", { method: "POST" }),
  },
  aiSettings: {
    get: () => apiFetch<AiSettings>("/ai-settings"),
    update: (data: Partial<AiSettings>) =>
      apiFetch<AiSettings>("/ai-settings", { method: "PATCH", body: JSON.stringify(data) }),
  },
  integrations: {
    list: () => apiFetch<Integration[]>("/integrations"),
    connect: (id: string) =>
      apiFetch<Integration>(`/integrations/${id}/connect`, { method: "POST" }),
    disconnect: (id: string) =>
      apiFetch<Integration>(`/integrations/${id}/disconnect`, { method: "POST" }),
  },
  contact: {
    submit: (data: { name: string; email: string; company?: string; subject: string; message: string }) =>
      apiFetch<{ message: string }>("/contact", { method: "POST", body: JSON.stringify(data) }),
  },
};
