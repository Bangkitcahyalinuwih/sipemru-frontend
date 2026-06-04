import axios from "axios";

const requestCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 menit

export const clearApiCache = () => {
  requestCache.clear();
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    Accept: "application/json",
  },

  timeout: 10000,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.method?.toLowerCase() === "get") {
      const cacheKey = `${config.url}${JSON.stringify(
        config.params || {}
      )}`;

      const cachedData =
        requestCache.get(cacheKey);

      if (
        cachedData &&
        Date.now() - cachedData.timestamp <
          CACHE_DURATION
      ) {
        return Promise.reject({
          config,
          response: {
            data: cachedData.data,
          },
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
    if (
      response.config.method?.toLowerCase() ===
      "get"
    ) {
      const cacheKey = `${response.config.url}${JSON.stringify(
        response.config.params || {}
      )}`;

      requestCache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });
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

    const status =
      error.response?.status;

    if (status === 401) {
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      if (
        window.location.pathname !==
        "/login"
      ) {
        window.location.href =
          "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;