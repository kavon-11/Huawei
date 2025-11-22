import apiClient from "./api.service";
import { APIEndpoints } from "../constants/apis.constant";

export const authService = {
  login: async (credentials) => {
    const response = await apiClient.post(APIEndpoints.loginUser, credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await apiClient.post(APIEndpoints.registerUser, userData);
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get(APIEndpoints.profile);
    return response.data;
  },

  checkHealth: async () => {
    const response = await apiClient.get(APIEndpoints.health);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },
};
