import { defineConfig } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";
import ffmpeg from "@motion-canvas/ffmpeg";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components/"),
      "@libs": path.resolve(__dirname, "./src/libs/"),
    },
  },
  plugins: [motionCanvas(), ffmpeg()],
});
