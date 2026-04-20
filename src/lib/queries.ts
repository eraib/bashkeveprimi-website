import { useMutation, useQuery } from "@tanstack/react-query";
import {
	donationsApi,
	getAboutPage,
	getCauses,
	getOrganizationCurrent,
	getOrphanProjectBySlug,
	getOrphanProjects,
	getProjectBySlug,
	getProjects,
	submitContactMessage,
	submitHelpRequest,
	type CheckoutSessionRequest,
	type ContactMessagePayload,
	type HelpRequestPayload,
} from "./api";

export function useAboutPage() {
	return useQuery({
		queryKey: ["about"],
		queryFn: getAboutPage,
	});
}

export function useOrganizationCurrent() {
	return useQuery({
		queryKey: ["organization", "current"],
		queryFn: getOrganizationCurrent,
	});
}

export function useCausesList(params?: {
	page?: number;
	search?: string;
	ordering?: string;
	is_active?: boolean;
}) {
	return useQuery({
		queryKey: ["causes", params ?? {}],
		queryFn: () => getCauses(params),
	});
}

export function useProjectsList(params?: {
	page?: number;
	search?: string;
	ordering?: string;
	is_active?: boolean;
	cause?: number;
}) {
	return useQuery({
		queryKey: ["projects", "list", params ?? {}],
		queryFn: () => getProjects(params),
	});
}

export function useProjectDetail(slug: string | undefined) {
	return useQuery({
		queryKey: ["projects", "detail", slug],
		queryFn: () => getProjectBySlug(slug!),
		enabled: Boolean(slug),
	});
}

export function useOrphanProjectsList(params?: {
	page?: number;
	is_active?: boolean;
	search?: string;
	ordering?: string;
}) {
	return useQuery({
		queryKey: ["orphan-projects", "list", params ?? {}],
		queryFn: () => getOrphanProjects(params),
	});
}

export function useOrphanProjectDetail(slug: string | undefined) {
	return useQuery({
		queryKey: ["orphan-projects", "detail", slug],
		queryFn: () => getOrphanProjectBySlug(slug!),
		enabled: Boolean(slug),
	});
}

export function useRecentPublicDonations() {
	return useQuery({
		queryKey: ["donations", "recent_public"],
		queryFn: donationsApi.getRecentDonations,
	});
}

export function useCreateCheckoutSession() {
	return useMutation({
		mutationFn: (payload: CheckoutSessionRequest) =>
			donationsApi.createCheckoutSession(payload),
	});
}

export function useSubmitHelpRequest() {
	return useMutation({
		mutationFn: (payload: HelpRequestPayload) => submitHelpRequest(payload),
	});
}

export function useSubmitContactMessage() {
	return useMutation({
		mutationFn: (payload: ContactMessagePayload) => submitContactMessage(payload),
	});
}

