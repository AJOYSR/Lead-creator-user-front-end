import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdmins, createAdmin } from "../lib/api";
import { Admin } from "../types/admin";
import { Modal } from "./Modal";
import { AdminForm } from "./AdminForm";
import { toast } from "react-hot-toast";

export const AdminList = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const itemsPerPage = 10;
	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery({
		queryKey: ["admins", currentPage],
		queryFn: () => getAdmins(currentPage, itemsPerPage),
	});

	const createAdminMutation = useMutation({
		mutationFn: createAdmin,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admins"] });
			setIsFormOpen(false);
			toast.success("Admin created successfully");
		},
		onError: (error: any) => {
			toast.error(error.response?.data?.message || "Failed to create admin");
		},
	});

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleCreateAdmin = (data: {
		email: string;
		password: string;
		role: string;
	}) => {
		createAdminMutation.mutate(data);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-xl">Loading...</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8 max-w-6xl">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-gray-800">Admin Management</h1>
				<button
					onClick={() => setIsFormOpen(true)}
					className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2 shadow-md"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
							clipRule="evenodd"
						/>
					</svg>
					Add Admin
				</button>
			</div>

			<div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gradient-to-r from-indigo-50 to-indigo-100">
						<tr>
							<th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
								Email
							</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
								Role
							</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
								Created At
							</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
								Last Login
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{data?.data.map((admin: Admin) => (
							<tr
								key={admin._id}
								className="hover:bg-gray-50 transition-colors duration-150"
							>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									{admin.email}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span
										className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
											admin.role === "superadmin"
												? "bg-purple-100 text-purple-800"
												: "bg-indigo-100 text-indigo-800"
										}`}
									>
										{admin.role}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{new Date(admin.createdAt).toLocaleDateString()}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{admin.lastLogin
										? new Date(admin.lastLogin).toLocaleString()
										: "Never"}
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{/* Pagination */}
				<div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
					<div className="text-sm text-gray-700">
						Showing{" "}
						<span className="font-medium">
							{(currentPage - 1) * itemsPerPage + 1}
						</span>{" "}
						to{" "}
						<span className="font-medium">
							{Math.min(currentPage * itemsPerPage, data?.count || 0)}
						</span>{" "}
						of <span className="font-medium">{data?.count || 0}</span> results
					</div>
					{data && data.pagination && (
						<div className="flex space-x-2">
							<button
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
								className={`px-3 py-1 rounded-md ${
									currentPage === 1
										? "bg-gray-100 text-gray-400 cursor-not-allowed"
										: "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
								}`}
							>
								Previous
							</button>
							{Array.from(
								{ length: Math.ceil(data.count / itemsPerPage) },
								(_, i) => i + 1
							).map((page) => (
								<button
									key={page}
									onClick={() => handlePageChange(page)}
									className={`px-3 py-1 rounded-md ${
										currentPage === page
											? "bg-indigo-600 text-white"
											: "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
									}`}
								>
									{page}
								</button>
							))}
							<button
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={!data?.pagination?.next}
								className={`px-3 py-1 rounded-md ${
									!data?.pagination?.next
										? "bg-gray-100 text-gray-400 cursor-not-allowed"
										: "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
								}`}
							>
								Next
							</button>
						</div>
					)}
				</div>
			</div>

			<Modal
				isOpen={isFormOpen}
				onClose={() => setIsFormOpen(false)}
				title="Create New Admin"
			>
				<AdminForm
					onSubmit={handleCreateAdmin}
					onCancel={() => setIsFormOpen(false)}
				/>
			</Modal>
		</div>
	);
};
