import axios from "axios";

const requestCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },

  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.method === 'get') {
      const cacheKey = config.url;
      const cachedData = requestCache.get(cacheKey);
      
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        return Promise.reject({
          config,
          response: { data: cachedData.data },
          isFromCache: true,
        });
      }
    }

    return config;
  },

  (error) => {
    return Promise.reject(
      error
    );
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.config.method === 'get') {
      requestCache.set(response.config.url, {
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
        statusText: 'OK (cached)',
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

    return Promise.reject(
      error
    );
  }
);

export default api;