import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
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
});
