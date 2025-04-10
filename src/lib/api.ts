/// <reference types="vite/client" />
import axios from "axios";
import { User } from "../types/user";

// Use the relative path from the environment variable
const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log("🚀 ~ baseURL:", baseURL);

// Create axios instance with the baseURL
const api = axios.create({
	baseURL: baseURL,
	// Add withCredentials to handle cookies if needed
	withCredentials: true,
});

// Add request interceptor for debugging
api.interceptors.request.use(
	(config) => {
		console.log("🚀 ~ Request URL:", config.url);
		console.log("🚀 ~ Full URL:", `${config.baseURL}${config.url}`);
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

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
