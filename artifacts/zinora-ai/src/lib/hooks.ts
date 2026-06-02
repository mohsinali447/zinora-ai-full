import { useMutation, useQuery, type UseQueryOptions, type UseMutationOptions } from "@tanstack/react-query";
import { api, type AuthResponse, type User, type Conversation, type Message, type Article, type Category, type DashboardSummary, type ActivityItem, type AnalyticsOverview, type AnalyticsCharts, type TeamMember, type Plan, type Subscription, type Invoice, type Notification, type AiSettings, type Integration } from "./api";

type QueryOpts<T> = Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">;

function wrapOpts<T>(opts?: { query?: QueryOpts<T> }): QueryOpts<T> {
  return opts?.query ?? {};
}

export function getGetMeQueryKey() { return ["auth", "me"] as const; }

export function useCreateConversation(
  options?: UseMutationOptions<
    Conversation,
    Error,
    {
      data: {
        customerName: string;
        customerEmail: string;
        subject: string;
        channel: string;
      };
    }
  >
) {
  return useMutation({
    mutationFn: ({ data }) => api.conversations.create(data),
    ...options,
  });
}

export function getListConversationsQueryKey(params?: object) { return ["conversations", "list", params] as const; }
export function getListMessagesQueryKey(id: number) { return ["conversations", id, "messages"] as const; }
export function getListArticlesQueryKey(params?: object) { return ["knowledge", "articles", params] as const; }
export function getListCategoriesQueryKey() { return ["knowledge", "categories"] as const; }
export function getListTeamMembersQueryKey() { return ["team", "list"] as const; }
export function getListNotificationsQueryKey() { return ["notifications", "list"] as const; }
export function getListIntegrationsQueryKey() { return ["integrations", "list"] as const; }
export function getGetAiSettingsQueryKey() { return ["ai-settings"] as const; }

export function useGetMe(options?: { query?: QueryOpts<User> }) {
  return useQuery({ queryKey: getGetMeQueryKey(), queryFn: () => api.auth.getMe(), ...wrapOpts<User>(options) });
}

export function useLogin(options?: UseMutationOptions<AuthResponse, Error, { data: { email: string; password: string } }>) {
  return useMutation({ mutationFn: ({ data }) => api.auth.login(data), ...options });
}

export function useSignup(options?: UseMutationOptions<AuthResponse, Error, { data: { name: string; email: string; password: string; company: string } }>) {
  return useMutation({ mutationFn: ({ data }) => api.auth.signup(data), ...options });
}

export function useForgotPassword(options?: UseMutationOptions<{ message: string }, Error, { data: { email: string } }>) {
  return useMutation({ mutationFn: ({ data }) => api.auth.forgotPassword(data), ...options });
}

export function useUpdateMe(options?: UseMutationOptions<User, Error, { data: Partial<User> }>) {
  return useMutation({ mutationFn: ({ data }) => api.auth.updateMe(data), ...options });
}

export function useGetDashboardSummary(options?: { query?: QueryOpts<DashboardSummary> }) {
  return useQuery({ queryKey: ["dashboard", "summary"], queryFn: () => api.dashboard.getSummary(), ...wrapOpts<DashboardSummary>(options) });
}

export function useGetDashboardActivity(options?: { query?: QueryOpts<ActivityItem[]> }) {
  return useQuery({ queryKey: ["dashboard", "activity"], queryFn: () => api.dashboard.getActivity(), ...wrapOpts<ActivityItem[]>(options) });
}

export function useListConversations(params?: { status?: string; search?: string }, options?: { query?: QueryOpts<Conversation[]> }) {
  return useQuery({ queryKey: getListConversationsQueryKey(params), queryFn: () => api.conversations.list(params), ...wrapOpts<Conversation[]>(options) });
}

export function useGetConversation(id: number, options?: { query?: QueryOpts<Conversation> }) {
  return useQuery({ queryKey: ["conversations", id], queryFn: () => api.conversations.get(id), ...wrapOpts<Conversation>(options) });
}

export function useListMessages(id: number, options?: { query?: QueryOpts<Message[]> }) {
  return useQuery({ queryKey: getListMessagesQueryKey(id), queryFn: () => api.conversations.listMessages(id), ...wrapOpts<Message[]>(options) });
}

export function useSendMessage(options?: UseMutationOptions<Message, Error, { id: number; data: { content: string } }>) {
  return useMutation({ mutationFn: ({ id, data }) => api.conversations.sendMessage(id, data), ...options });
}

export function useUpdateConversation(options?: UseMutationOptions<Conversation, Error, { id: number; data: Partial<Conversation> }>) {
  return useMutation({ mutationFn: ({ id, data }) => api.conversations.update(id, data), ...options });
}

export function useListArticles(params?: { search?: string; category?: string }, options?: { query?: QueryOpts<Article[]> }) {
  return useQuery({ queryKey: getListArticlesQueryKey(params), queryFn: () => api.knowledge.listArticles(params), ...wrapOpts<Article[]>(options) });
}

export function useListCategories(options?: { query?: QueryOpts<Category[]> }) {
  return useQuery({ queryKey: getListCategoriesQueryKey(), queryFn: () => api.knowledge.listCategories(), ...wrapOpts<Category[]>(options) });
}

export function useCreateArticle(options?: UseMutationOptions<Article, Error, { data: Partial<Article> }>) {
  return useMutation({ mutationFn: ({ data }) => api.knowledge.createArticle(data), ...options });
}

export function useGetAnalyticsOverview(options?: { query?: QueryOpts<AnalyticsOverview> }) {
  return useQuery({ queryKey: ["analytics", "overview"], queryFn: () => api.analytics.getOverview(), ...wrapOpts<AnalyticsOverview>(options) });
}

export function useGetAnalyticsCharts(options?: { query?: QueryOpts<AnalyticsCharts> }) {
  return useQuery({ queryKey: ["analytics", "charts"], queryFn: () => api.analytics.getCharts(), ...wrapOpts<AnalyticsCharts>(options) });
}

export function useListTeamMembers(options?: { query?: QueryOpts<TeamMember[]> }) {
  return useQuery({ queryKey: getListTeamMembersQueryKey(), queryFn: () => api.team.list(), ...wrapOpts<TeamMember[]>(options) });
}

export function useInviteTeamMember(options?: UseMutationOptions<TeamMember, Error, { data: { email: string; role: string } }>) {
  return useMutation({ mutationFn: ({ data }) => api.team.invite(data), ...options });
}

export function useGetSubscription(options?: { query?: QueryOpts<Subscription> }) {
  return useQuery({ queryKey: ["billing", "subscription"], queryFn: () => api.billing.getSubscription(), ...wrapOpts<Subscription>(options) });
}

export function useListPlans(options?: { query?: QueryOpts<Plan[]> }) {
  return useQuery({ queryKey: ["billing", "plans"], queryFn: () => api.billing.listPlans(), ...wrapOpts<Plan[]>(options) });
}

export function useListInvoices(options?: { query?: QueryOpts<Invoice[]> }) {
  return useQuery({ queryKey: ["billing", "invoices"], queryFn: () => api.billing.listInvoices(), ...wrapOpts<Invoice[]>(options) });
}

export function useListNotifications(options?: { query?: QueryOpts<Notification[]> }) {
  return useQuery({ queryKey: getListNotificationsQueryKey(), queryFn: () => api.notifications.list(), ...wrapOpts<Notification[]>(options) });
}

export function useMarkNotificationRead(options?: UseMutationOptions<Notification, Error, { id: number }>) {
  return useMutation({ mutationFn: ({ id }) => api.notifications.markRead(id), ...options });
}

export function useMarkAllNotificationsRead(options?: UseMutationOptions<void, Error, undefined>) {
  return useMutation({ mutationFn: () => api.notifications.markAllRead(), ...options });
}

export function useGetAiSettings(options?: { query?: QueryOpts<AiSettings> }) {
  return useQuery({ queryKey: getGetAiSettingsQueryKey(), queryFn: () => api.aiSettings.get(), ...wrapOpts<AiSettings>(options) });
}

export function useUpdateAiSettings(options?: UseMutationOptions<AiSettings, Error, { data: Partial<AiSettings> }>) {
  return useMutation({ mutationFn: ({ data }) => api.aiSettings.update(data), ...options });
}

export function useListIntegrations(options?: { query?: QueryOpts<Integration[]> }) {
  return useQuery({ queryKey: getListIntegrationsQueryKey(), queryFn: () => api.integrations.list(), ...wrapOpts<Integration[]>(options) });
}

export function useConnectIntegration(options?: UseMutationOptions<Integration, Error, { id: string }>) {
  return useMutation({ mutationFn: ({ id }) => api.integrations.connect(id), ...options });
}

export function useDisconnectIntegration(options?: UseMutationOptions<Integration, Error, { id: string }>) {
  return useMutation({ mutationFn: ({ id }) => api.integrations.disconnect(id), ...options });
}

export function useSubmitContact(options?: UseMutationOptions<{ message: string }, Error, { data: { name: string; email: string; company?: string; subject: string; message: string } }>) {
  return useMutation({ mutationFn: ({ data }) => api.contact.submit(data), ...options });
}
