import axios from "axios";
import i18n from "../i18n";

export const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export const http = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

function getAccessToken(): string | null {
	try {
		return localStorage.getItem("accessToken");
	} catch {
		return null;
	}
}

http.interceptors.request.use((config) => {
	config.headers = config.headers ?? {};

	const token = getAccessToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	// Tells Django (django-modeltranslation / parler) which language to return
	config.headers["Accept-Language"] = i18n.language ?? "sq";

	return config;
});

