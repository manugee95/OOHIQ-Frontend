import axios, { InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "./actions/cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

export const ApiInstance = axios.create({
	baseURL: BASE_URL,
});

ApiInstance.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		const accessToken = await getAccessToken();

		// Add access token to Authorization header if it exists
		if (accessToken) {
			config.headers["auth-token"] = `${accessToken}`;
		}

		return config;
	},
	(error: any) => {
		return Promise.reject(error);
	}
);
