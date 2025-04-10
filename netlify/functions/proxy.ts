import { Handler } from "@netlify/functions";
import axios from "axios";

const API_URL = "http://172.18.101.27:4050";

export const handler: Handler = async (event) => {
	try {
		const path = event.path.replace("/.netlify/functions/proxy", "");
		const method = event.httpMethod;
		const body = event.body ? JSON.parse(event.body) : undefined;
		const headers = {
			...event.headers,
			host: new URL(API_URL).host,
		};

		const response = await axios({
			method,
			url: `${API_URL}${path}`,
			data: body,
			headers,
			validateStatus: () => true, // Don't throw on any status code
		});

		return {
			statusCode: response.status,
			body: JSON.stringify(response.data),
			headers: {
				"Content-Type": "application/json",
				...response.headers,
			},
		};
	} catch (error) {
		console.error("Proxy error:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Internal Server Error" }),
		};
	}
};
