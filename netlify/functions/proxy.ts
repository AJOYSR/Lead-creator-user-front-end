import { Handler } from "@netlify/functions";
import axios from "axios";

// Use environment variable or fallback to the hardcoded URL
const API_URL = process.env.VITE_API_URL || "http://172.18.101.27:4050";

export const handler: Handler = async (event) => {
	try {
		const path = event.path.replace("/.netlify/functions/proxy", "");
		const method = event.httpMethod;
		const body = event.body ? JSON.parse(event.body) : undefined;
		const headers = {
			...event.headers,
			host: new URL(API_URL).host,
		};

		console.log(`Proxying ${method} request to ${API_URL}${path}`);

		const response = await axios({
			method,
			url: `${API_URL}${path}`,
			data: body,
			headers,
			validateStatus: () => true, // Don't throw on any status code
		});

		// Convert headers to a format compatible with Netlify Functions
		const responseHeaders: Record<string, string> = {
			"Content-Type": "application/json",
		};

		// Only include string headers
		Object.entries(response.headers).forEach(([key, value]) => {
			if (typeof value === "string") {
				responseHeaders[key] = value;
			}
		});

		return {
			statusCode: response.status,
			body: JSON.stringify(response.data),
			headers: responseHeaders,
		};
	} catch (error) {
		console.error("Proxy error:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Internal Server Error" }),
		};
	}
};
