import axiosInstance from "@/api/axios";
import { clearAuthToken, setAuthToken } from "@/utils/localStorageUtils";

export const loginUser = async (credentials) => {
  try {
    const res = await axiosInstance.post("/user/login", credentials);

    const { token, data: user } = res.data;

    // Save token for authenticated requests
    setAuthToken(token);

    return { success: true, user, token };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Login failed"
    };
  }
};

export const signupUser = async (formData) => {
  try {
    const res = await axiosInstance.post("/user/signup", formData);
    return { success: true, data: res.data };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Signup failed"
    };
  }
};

export const logoutUser = async () => {
  try {
    const res = await axiosInstance.post("/user/logout");

    // Remove token
    clearAuthToken()

    return { success: true, data: res.data };
  } catch (err) {
    return { success: false };
  }
};

export const fetchUserProfile = async () => {
  try {
    const res = await axiosInstance.get("/user/profile");
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false };
  }
};
