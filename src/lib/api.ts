/// <reference types="vite/client" />
import axios from "axios";
import { User } from "../types/user";
import { Admin, AdminListResponse, LoginResponse } from "../types/admin";

// Use the environment variable for API URL
const baseURL = import.meta.env.VITE_API_URL;

// Create axios instance with the baseURL
const api = axios.create({
	baseURL: baseURL,
	// Disable credentials for CORS requests
	withCredentials: false,
});

// Add request interceptor for authentication
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("adminToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Add response interceptor for handling 401 errors
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem("adminToken");
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

// Admin API functions
export const loginAdmin = async (
	email: string,
	password: string
): Promise<LoginResponse> => {
	const response = await api.post("/admin/login", { email, password });
	localStorage.setItem("adminToken", response.data.token);
	return response.data;
};

export const getAdminProfile = async (): Promise<Admin> => {
	const response = await api.get("/admin/profile");
	return response.data.admin;
};

export const getAdmins = async (
	page = 1,
	limit = 10
): Promise<AdminListResponse> => {
	const response = await api.get(`/admin?page=${page}&limit=${limit}`);
	return response.data;
};

export const createAdmin = async (data: {
	email: string;
	password: string;
	role: string;
}): Promise<Admin> => {
	const response = await api.post("/admin", data);
	return response.data;
};

export const logoutAdmin = () => {
	localStorage.removeItem("adminToken");
	window.location.href = "/login";
};

export const getUsers = async (): Promise<User[]> => {
	const response = await api.get("/users");
	return response.data?.data;
};

export const getUser = async (id: string): Promise<User> => {
	const response = await api.get(`/users/${id}`);
	return response.data;
};

export const createUser = async (data: Partial<User>): Promise<User> => {
	const response = await api.post("/users", data);
	return response.data;
};

export const updateUser = async (
	id: string,
	data: Partial<User>
): Promise<User> => {
	const response = await api.put(`/users/${id}`, data);
	return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
	await api.delete(`/users/${id}`);
};
