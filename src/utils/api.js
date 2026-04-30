import axios from "axios";

/**
 * ✅ Base URL for images (used in Item.jsx, Product.jsx etc.)
 * Change this ONLY when backend URL changes
 */
export const IMAGE_BASE_URL = "http://localhost:5000";

/**
 * ✅ Axios instance for API calls
 */
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

/**
 * ✅ OPTIONAL: Automatically attach token (if you are using auth)
 * Safe even if token does not exist
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * ✅ OPTIONAL: Global error handler
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
