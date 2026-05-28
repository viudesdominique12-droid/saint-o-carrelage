import type { NextConfig } from "next";
import path from "node:path";

// Déployé sur GitHub Pages à l'URL https://<user>.github.io/saint-o-carrelage/
// → besoin de basePath + assetPrefix EN PROD UNIQUEMENT pour que les liens et
// les assets pointent bien vers /saint-o-carrelage/. En dev local on garde
// la racine "/" pour que localhost:3000 reste pratique.

const REPO = "/saint-o-carrelage";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve(__dirname),
  basePath: isProd ? REPO : "",
  assetPrefix: isProd ? REPO : "",
  trailingSlash: true,
  images: {
    // GitHub Pages = static host, pas d'optimizer Next disponible.
    unoptimized: true,
  },
};

export default nextConfig;
