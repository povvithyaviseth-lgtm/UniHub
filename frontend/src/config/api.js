// Central API base used across the frontend.
// Priority:
// 1. `VITE_API_BASE` if provided (explicit override)
// 2. Local backend during dev (`http://localhost:5050`) when running dev server
// 3. Production fallback (deployed backend)

const PROD_FALLBACK = "https://unihub-backend-8wj9.onrender.com";
const envBase = import.meta.env.VITE_API_BASE;
const isDev = import.meta.env.DEV === true || (typeof window !== "undefined" && window.location.hostname === "localhost");

const API_BASE = envBase || (isDev ? "http://localhost:5050" : PROD_FALLBACK);

export default API_BASE;
