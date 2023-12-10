import dotenv from "dotenv";
import react from "@vitejs/plugin-react-swc";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { defineConfig } from 'vite';

dotenv.config({ path: "../.env" });

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      ViteImageOptimizer({
          svg: {
            multipass: true,
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    cleanupNumericValues: false,
                    removeViewBox: false,
                  },
                  cleanupIDs: {
                    minify: false,
                    remove: false,
                  },
                  convertPathData: false,
                },
              },
              'sortAttrs',
              {
                name: 'addAttributesToSVGElement',
                params: {
                  attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                },
              },
            ],
          },
          png: {
            quality: 100,
          },
          jpeg: {
            quality: 100,
          },
          jpg: {            
            quality: 100,
          },
          tiff: {            
            quality: 100,
          },                    
          gif: {},
          webp: {           
            lossless: true,
          },
          avif: {           
            lossless: true,
          },
          cache: false,
          cacheLocation: undefined,
      }),
    ],
    server: {
      proxy: {
        "/api": `http://localhost:${process.env.PORT}`,
      },
    },
    cacheDir: "../node_modules/.vite",
  };
});