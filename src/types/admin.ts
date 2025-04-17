export interface Admin {
	_id: string;
	email: string;
	role: "admin" | "superadmin";
	createdAt: string;
	updatedAt: string;
	lastLogin: string;
}

export interface AdminResponse {
	success: boolean;
	admin: Admin;
}

export interface AdminListResponse {
	success: boolean;
	count: number;
	pagination: {
		page: number;
		limit: number;
		next?: {
			page: number;
			limit: number;
		};
	};
	data: Admin[];
}

export interface LoginResponse {
	success: boolean;
	token: string;
	admin: Admin;
}
