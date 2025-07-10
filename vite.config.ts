import { defineConfig, ResolvedConfig, UserConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            formats: ["es"],
            entry: {
                main: "src/main/index.ts",
                settingsTab: "src/ui/settingsTab.tsx",
                mainDock: "src/ui/mainDock.tsx"
            }
        },
        rollupOptions: {
            external: ["@mendix/component-framework", "@mendix/model-access-sdk"]
        },
        outDir: "./dist/myextension"
    }
} satisfies UserConfig);
