import axios from "axios";

// Test the API connection
const testApi = async () => {
	try {
		// Test the Netlify function
		const testResponse = await axios.get("/test");
		console.log("Test function response:", testResponse.data);

		// Test the API proxy
		const apiResponse = await axios.get("/api/users");
		console.log("API response:", apiResponse.data);
	} catch (error) {
		console.error("Error testing API:", error);
	}
};

// Run the test
testApi();
