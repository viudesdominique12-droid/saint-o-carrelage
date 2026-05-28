// Helper pour préfixer les paths d'assets statiques avec le basePath en
// production. Nécessaire parce que next/image en mode `unoptimized: true`
// + `output: 'export'` ne préfixe pas automatiquement les src strings.
//
// Aligné avec next.config.ts : "/saint-o-carrelage" en prod, "" en dev.

export const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/saint-o-carrelage" : "";

export const asset = (path: string): string => `${BASE_PATH}${path}`;
