import { http } from "./http";

export type DesignationType = "general" | "cause" | "project" | "orphan";

export type DonationStatus =
	| "created"
	| "pending"
	| "succeeded"
	| "failed"
	| "canceled"
	| "refunded";

export type Paginated<T> = {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
};

export type CauseList = {
	id: number;
	title: string;
	slug: string;
	summary: string;
	cover_image: string | null;
	goal_amount: string | null;
	is_active: boolean;
	total_donated: string;
	donation_progress: number;
	created_at: string;
};

export type OrganizationProfile = {
	id: number;
	name: string;
	slug: string;
	description?: string;
	logo: string | null;
	phone?: string;
	email?: string;
	address?: string;
	social_links?: unknown;
	created_at: string;
	updated_at: string;
};

export async function getOrganizationCurrent(): Promise<OrganizationProfile> {
	const { data } = await http.get<OrganizationProfile>("/organization/current/");
	return data;
}

export async function getCauses(params?: {
	page?: number;
	search?: string;
	ordering?: string;
	is_active?: boolean;
}): Promise<Paginated<CauseList>> {
	const { data } = await http.get<Paginated<CauseList>>("/causes/", { params });
	return data;
}

/** Same field set as CauseListSerializer; embedded on project detail. */
export type CauseListEmbedded = CauseList;

export type ProjectListItem = {
	id: number;
	title: string;
	slug: string;
	summary: string;
	cover_image: string | null;
	cause: number | null;
	cause_title: string | null;
	goal_amount: string | null;
	is_active: boolean;
	total_donated: string;
	donation_progress: number;
	created_at: string;
};

export type ProjectDetail = {
	id: number;
	title: string;
	slug: string;
	summary: string;
	content: string;
	cover_image: string | null;
	cause: number | null;
	cause_detail: CauseListEmbedded | null;
	goal_amount: string | null;
	is_active: boolean;
	total_donated: string;
	donation_progress: number;
	created_at: string;
	updated_at: string;
};

export async function getProjects(params?: {
	page?: number;
	search?: string;
	ordering?: string;
	is_active?: boolean;
	cause?: number;
}): Promise<Paginated<ProjectListItem>> {
	const { data } = await http.get<Paginated<ProjectListItem>>("/projects/", {
		params,
	});
	return data;
}

export async function getProjectBySlug(slug: string): Promise<ProjectDetail> {
	const { data } = await http.get<ProjectDetail>(
		`/projects/${encodeURIComponent(slug)}/`
	);
	return data;
}

/** Orphan-projects list item — GET /orphan-projects/ returns DRF paginated JSON. */
export type OrphanProjectListItem = {
	id: number;
	title: string;
	slug: string;
	summary: string;
	cover_image: string | null;
	goal_amount: string | null;
	is_active: boolean;
	total_donated: string;
	donation_progress: number;
	created_at: string;
};

export type OrphanProjectDetail = {
	id: number;
	title: string;
	slug: string;
	summary: string;
	content: string;
	cover_image: string | null;
	goal_amount: string | null;
	is_active: boolean;
	total_donated: string;
	donation_progress: number;
	created_at: string;
	updated_at: string;
};

export async function getOrphanProjects(params?: {
	page?: number;
	is_active?: boolean;
	search?: string;
	ordering?: string;
}): Promise<Paginated<OrphanProjectListItem>> {
	const { data } = await http.get<Paginated<OrphanProjectListItem>>(
		"/orphan-projects/",
		{ params }
	);
	return data;
}

export async function getOrphanProjectBySlug(
	slug: string
): Promise<OrphanProjectDetail> {
	const { data } = await http.get<OrphanProjectDetail>(
		`/orphan-projects/${encodeURIComponent(slug)}/`
	);
	return data;
}

export type RequestType = "orphan" | "family" | "volunteer" | "other";

export type HelpRequestPayload = {
	request_type: RequestType;
	full_name: string;
	phone: string;
	email?: string;
	details: Record<string, string | number>;
};

export type HelpRequestResponse = {
	message: string;
};

export async function submitHelpRequest(
	payload: HelpRequestPayload
): Promise<HelpRequestResponse> {
	const { data } = await http.post<HelpRequestResponse>("/requests/", payload);
	return data;
}

export type ContactMessagePayload = {
	full_name: string;
	email: string;
	phone: string;
	message: string;
};

export type ContactMessageResponse = {
	message?: string;
	full_name?: string;
	email?: string;
	phone?: string;
};

export async function submitContactMessage(
	payload: ContactMessagePayload
): Promise<ContactMessageResponse> {
	const { data } = await http.post<ContactMessageResponse>("/contact/", payload);
	return data;
}

export type CheckoutSessionRequest = {
	amount_eur_cents: number;
	designation_type?: DesignationType;
	designation_slug?: string;
	donor_email?: string;
	donor_full_name?: string;
	is_anonymous?: boolean;
	success_url: string;
	cancel_url: string;
};

export type CheckoutSessionResponse = {
	checkout_url: string;
	donation_intent_id: number;
};

export type VerifyDonationResponse = {
	donation_id: number;
	status: DonationStatus;
	amount: string;
	designation: string;
};

export type DonationIntentPublic = {
	id: number;
	amount: string;
	designation_type: DesignationType;
	designation_display: string;
	donor_name: string;
	created_at: string;
};

export const donationsApi = {
	createCheckoutSession: async (
		payload: CheckoutSessionRequest
	): Promise<CheckoutSessionResponse> => {
		const { data } = await http.post<CheckoutSessionResponse>(
			"/donations/checkout-session/",
			payload
		);
		return data;
	},
	verifyDonation: async (params: {
		session_id?: string;
		donation_id?: string;
	}): Promise<VerifyDonationResponse> => {
		const { data } = await http.get<VerifyDonationResponse>("/donations/verify/", {
			params,
		});
		return data;
	},
	getRecentDonations: async (): Promise<DonationIntentPublic[]> => {
		const { data } = await http.get<DonationIntentPublic[]>(
			"/donations/recent_public/"
		);
		return data;
	},
};
