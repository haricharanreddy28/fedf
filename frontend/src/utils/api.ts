import axios from 'axios';

// ----------------------------------------------------
// FIX: Ensure backend base URL ends with /api
// ----------------------------------------------------
const RAW_URL = import.meta.env.VITE_API_URL || "";
const API_BASE_URL = RAW_URL.replace(/\/$/, "") + "/api";

console.log("🔥 Using API Base URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ----------------------------------------------------
// Add Auth Token if exists
// ----------------------------------------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ----------------------------------------------------
// Response Interceptor
// ----------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          return Promise.reject(new Error("Unauthorized. Please login again."));
        case 404:
          return Promise.reject(new Error("Resource not found."));
        case 500:
          return Promise.reject(
            new Error(
              error.response.data?.message ||
                error.response.data?.error ||
                "Server error"
            )
          );
        default:
          return Promise.reject(
            new Error(error.response.data?.message || "An error occurred")
          );
      }
    } else if (error.request) {
      return Promise.reject(new Error("Network issue. Please check your connection."));
    } else {
      return Promise.reject(new Error("Failed to load data. Please try again."));
    }
  }
);

// ----------------------------------------------------
// REQUEST RETRY HELPER
// ----------------------------------------------------
const retryRequest = async (fn: () => Promise<any>, retries = 3): Promise<any> => {
  try {
    return await fn();
  } catch (error: any) {
    if (
      retries > 0 &&
      (error.message.includes("Network") || error.message.includes("Server"))
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return retryRequest(fn, retries - 1);
    }
    throw error;
  }
};

// ----------------------------------------------------
// API FUNCTIONS
// ----------------------------------------------------
export const fetchLegalRights = async () => {
  const response = await api.get("/legal-rights");
  return response;
};

export const fetchSupportServices = async () => {
  const response = await api.get("/support-services");
  return response;
};

export const submitCaseNote = async (note: any) => {
  const response = await api.post("/case-notes", note);
  return response;
};

export const updateCaseNote = async (id: string, note: any) => {
  const response = await api.put(`/case-notes/${id}`, note);
  return response;
};

export const deleteCaseNote = async (id: string) => {
  const response = await api.delete(`/case-notes/${id}`);
  return response;
};

export const uploadDocument = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/documents", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response;
};

export default api;
