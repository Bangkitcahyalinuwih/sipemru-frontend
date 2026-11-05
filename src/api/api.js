import axios from "axios";

const requestCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 menit

// URL yang tidak boleh di-cache (data harus selalu terbaru)
const NO_CACHE_PATTERNS = ["/qr/", "/bookings/my", "/admin/bookings"];

// Endpoint auth: 401 di sini berarti kredensial salah, bukan sesi habis
const AUTH_PATTERNS = ["/login", "/register"];

export const clearApiCache = () => {
  requestCache.clear();
};

const isGet = (config) => config?.method?.toLowerCase() === "get";

const matches = (url, patterns) =>
  patterns.some((p) => (url || "").includes(p));

const shouldCache = (config) =>
  isGet(config) && !config.skipCache && !matches(config.url, NO_CACHE_PATTERNS);

const getCacheKey = (config) =>
  `${config.url}${JSON.stringify(config.params || {})}`;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
  },
  timeout: 30000,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (shouldCache(config)) {
      const cached = requestCache.get(getCacheKey(config));

      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return Promise.reject({
          config,
          response: { data: cached.data },
          isFromCache: true,
        });
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    if (shouldCache(response.config)) {
      requestCache.set(getCacheKey(response.config), {
        data: response.data,
        timestamp: Date.now(),
      });
    }

    // Data berubah (POST/PUT/PATCH/DELETE) -> cache lama tidak valid lagi
    if (!isGet(response.config)) {
      requestCache.clear();
    }

    return response;
  },

  (error) => {
    if (error.isFromCache) {
      return Promise.resolve({
        data: error.response.data,
        status: 200,
        statusText: "OK (cached)",
        headers: {},
        config: error.config,
      });
    }

    const status = error.response?.status;
    const url = error.config?.url;

    // 401 pada endpoint selain login/register = token tidak valid/kedaluwarsa
    if (status === 401 && !matches(url, AUTH_PATTERNS)) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      requestCache.clear();

      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;