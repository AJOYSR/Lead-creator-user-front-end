import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
	// Load env file based on `mode` in the current working directory.
	// Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
	const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [react()],
		server: {
			port: 5173,
			proxy: {
				"/api": {
					target: "http://172.18.101.27:4050",
					changeOrigin: true,
					secure: false,
				},
			},
		},
	};
});
