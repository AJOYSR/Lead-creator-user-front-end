/// <reference types="vite/client" />
import axios from "axios";
import { User } from "../types/user";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
	baseURL: baseURL,
});

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
