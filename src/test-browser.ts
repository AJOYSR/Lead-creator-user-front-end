import axios from "axios";

// Test the API connection in the browser
const testApiInBrowser = async () => {
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

// Extend the Window interface
declare global {
	interface Window {
		testApi: () => Promise<void>;
	}
}

// Export the function to be called from the browser console
window.testApi = testApiInBrowser;

// Log instructions
console.log(
	"To test the API connection, run 'window.testApi()' in the browser console"
);
