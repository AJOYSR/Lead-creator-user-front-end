import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
	return {
		statusCode: 200,
		body: JSON.stringify({ message: "Netlify function is working!" }),
		headers: {
			"Content-Type": "application/json",
		},
	};
};
