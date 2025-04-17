import { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
	getUsers,
	createUser,
	updateUser,
	deleteUser,
	getAdminProfile,
} from "./lib/api";
import { User } from "./types/user";
import { Admin } from "./types/admin";
import { Modal } from "./components/Modal";
import { UserForm } from "./components/UserForm";
import { DeleteConfirmation } from "./components/DeleteConfirmation";
import { Login } from "./components/Login";
import { Profile } from "./components/Profile";
import { AdminList } from "./components/AdminList";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const token = localStorage.getItem("adminToken");
	if (!token) {
		return <Navigate to="/login" />;
	}
	return <>{children}</>;
};

function App() {
	const queryClient = useQueryClient();
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const { data: users = [], isLoading: isLoadingUsers } = useQuery({
		queryKey: ["users"],
		queryFn: getUsers,
	});

	const { data: admin, isLoading: isLoadingAdmin } = useQuery<Admin>({
		queryKey: ["adminProfile"],
		queryFn: getAdminProfile,
		enabled: !!localStorage.getItem("adminToken"),
	});

	// Pagination logic
	const totalPages = Math.ceil(users.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentUsers = users.slice(startIndex, endIndex);

	const createMutation = useMutation({
		mutationFn: createUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			setIsFormOpen(false);
			toast.success("User created successfully");
		},
		onError: (error: any) => {
			toast.error(error.response?.data?.message || "Failed to create user");
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
			updateUser(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			setIsFormOpen(false);
			setSelectedUser(null);
			toast.success("User updated successfully");
		},
		onError: (error: any) => {
			toast.error(error.response?.data?.message || "Failed to update user");
		},
	});

	const deleteMutation = useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			setIsDeleteOpen(false);
			setSelectedUser(null);
			toast.success("User deleted successfully");
		},
		onError: (error: any) => {
			toast.error(error.response?.data?.message || "Failed to delete user");
		},
	});

	const handleSubmit = (data: Partial<User>) => {
		if (selectedUser) {
			updateMutation.mutate({ id: selectedUser._id, data });
		} else {
			createMutation.mutate(data);
		}
	};

	const handleEdit = (user: User) => {
		setSelectedUser(user);
		setIsFormOpen(true);
	};

	const handleDelete = (user: User) => {
		setSelectedUser(user);
		setIsDeleteOpen(true);
	};

	const confirmDelete = () => {
		if (selectedUser) {
			deleteMutation.mutate(selectedUser._id);
		}
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	if (isLoadingUsers || isLoadingAdmin) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-xl">Loading...</div>
			</div>
		);
	}

	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<div className="container mx-auto px-4 py-8 max-w-6xl">
								<div className="flex justify-between items-center mb-8">
									<h1 className="text-3xl font-bold text-gray-800">
										User Management
									</h1>
									<div className="flex items-center gap-4">
										{admin?.role === "superadmin" && (
											<button
												onClick={() => (window.location.href = "/admins")}
												className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2 shadow-md"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
												</svg>
												Admin List
											</button>
										)}
										<button
											onClick={() => {
												setSelectedUser(null);
												setIsFormOpen(true);
											}}
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
											Add User
										</button>
										<button
											onClick={() => setIsProfileOpen(true)}
											className="bg-gray-100 text-gray-700 p-2.5 rounded-lg hover:bg-gray-200 transition-colors duration-200"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
													clipRule="evenodd"
												/>
											</svg>
										</button>
									</div>
								</div>

								<div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
									<table className="min-w-full divide-y divide-gray-200">
										<thead className="bg-gradient-to-r from-indigo-50 to-indigo-100">
											<tr>
												<th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
													Phone
												</th>
												<th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
													Name
												</th>
												<th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
													Role
												</th>
												<th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
													Actions
												</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{currentUsers.map((user) => (
												<tr
													key={user._id}
													className="hover:bg-gray-50 transition-colors duration-150"
												>
													<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
														{user.phone}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														{user.name || "-"}
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														<span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
															{user.role}
														</span>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
														<button
															onClick={() => handleEdit(user)}
															className="text-indigo-600 bg-indigo-100 p-2 rounded-md hover:text-indigo-900 mr-4 transition-colors duration-200"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-5 w-5"
																viewBox="0 0 20 20"
																fill="currentColor"
															>
																<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
															</svg>
														</button>
														<button
															onClick={() => handleDelete(user)}
															className="text-red-600 bg-red-100 p-2 rounded-md hover:text-red-900 transition-colors duration-200"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-5 w-5"
																viewBox="0 0 20 20"
																fill="currentColor"
															>
																<path
																	fillRule="evenodd"
																	d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
																	clipRule="evenodd"
																/>
															</svg>
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>

									{/* Pagination */}
									{totalPages > 1 && (
										<div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
											<div className="text-sm text-gray-700">
												Showing{" "}
												<span className="font-medium">{startIndex + 1}</span> to{" "}
												<span className="font-medium">
													{Math.min(endIndex, users.length)}
												</span>{" "}
												of <span className="font-medium">{users.length}</span>{" "}
												results
											</div>
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
													{ length: totalPages },
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
													disabled={currentPage === totalPages}
													className={`px-3 py-1 rounded-md ${
														currentPage === totalPages
															? "bg-gray-100 text-gray-400 cursor-not-allowed"
															: "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
													}`}
												>
													Next
												</button>
											</div>
										</div>
									)}
								</div>

								<Modal
									isOpen={isFormOpen}
									onClose={() => setIsFormOpen(false)}
									title={selectedUser ? "Edit User" : "Add User"}
								>
									<UserForm
										onSubmit={handleSubmit}
										initialData={selectedUser || undefined}
										onCancel={() => setIsFormOpen(false)}
									/>
								</Modal>

								<Modal
									isOpen={isDeleteOpen}
									onClose={() => setIsDeleteOpen(false)}
									title="Delete User"
								>
									<DeleteConfirmation
										onConfirm={confirmDelete}
										onCancel={() => setIsDeleteOpen(false)}
									/>
								</Modal>
							</div>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admins"
					element={
						<ProtectedRoute>
							<AdminList />
						</ProtectedRoute>
					}
				/>
			</Routes>

			<Modal
				isOpen={isProfileOpen}
				onClose={() => setIsProfileOpen(false)}
				title="Profile"
			>
				<Profile onClose={() => setIsProfileOpen(false)} />
			</Modal>
		</Router>
	);
}

export default App;
