import { defineConfig } from "vite";
import path from "node:path";

import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "src/components"),
			"@models": path.resolve(__dirname, "src/models"),
			"@utils": path.resolve(__dirname, "src/utils"),
		},
	},
	build: {
		outDir: "../dist",
		emptyOutDir: true,

		// sourcemap: true,
		manifest: true,
	},
	server: {
		watch: {
			usePolling: true,
		},
	},
	plugins: [react(), tailwindcss()],
});
