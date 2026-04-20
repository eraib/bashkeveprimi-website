import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
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
	const { i18n } = useTranslation();
	return useQuery({
		queryKey: ["about", i18n.language],
		queryFn: getAboutPage,
	});
}

export function useOrganizationCurrent() {
	const { i18n } = useTranslation();
	return useQuery({
		queryKey: ["organization", i18n.language],
		queryFn: getOrganizationCurrent,
	});
}

export function useCausesList(params?: {
	page?: number;
	search?: string;
	ordering?: string;
	is_active?: boolean;
}) {
	const { i18n } = useTranslation();
	return useQuery({
		queryKey: ["causes", i18n.language, params ?? {}],
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
	const { i18n } = useTranslation();
	return useQuery({
		queryKey: ["projects", "list", i18n.language, params ?? {}],
		queryFn: () => getProjects(params),
	});
}

export function useProjectDetail(slug: string | undefined) {
	const { i18n } = useTranslation();
	return useQuery({
		queryKey: ["projects", "detail", i18n.language, slug],
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
	const { i18n } = useTranslation();
	return useQuery({
		queryKey: ["orphan-projects", "list", i18n.language, params ?? {}],
		queryFn: () => getOrphanProjects(params),
	});
}

export function useOrphanProjectDetail(slug: string | undefined) {
	const { i18n } = useTranslation();
	return useQuery({
		queryKey: ["orphan-projects", "detail", i18n.language, slug],
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

