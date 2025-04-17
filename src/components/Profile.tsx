import { useQuery } from "@tanstack/react-query";
import { getAdminProfile, logoutAdmin } from "../lib/api";
import { Admin } from "../types/admin";

interface ProfileProps {
	onClose: () => void;
}

export const Profile = ({ onClose }: ProfileProps) => {
	const { data: admin, isLoading } = useQuery<Admin>({
		queryKey: ["adminProfile"],
		queryFn: getAdminProfile,
	});

	if (isLoading) {
		return (
			<div className="p-4">
				<div className="text-center">Loading...</div>
			</div>
		);
	}

	if (!admin) {
		return null;
	}

	return (
		<div className="p-4">
			<div className="mb-4">
				<h3 className="text-lg font-medium text-gray-900">
					Profile Information
				</h3>
			</div>
			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Email
					</label>
					<div className="mt-1 text-sm text-gray-900">{admin.email}</div>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Role
					</label>
					<div className="mt-1 text-sm text-gray-900">{admin.role}</div>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Last Login
					</label>
					<div className="mt-1 text-sm text-gray-900">
						{new Date(admin.lastLogin).toLocaleString()}
					</div>
				</div>
			</div>
			<div className="mt-6 flex justify-end space-x-3">
				<button
					onClick={onClose}
					className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
				>
					Close
				</button>
				<button
					onClick={logoutAdmin}
					className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
				>
					Logout
				</button>
			</div>
		</div>
	);
};
