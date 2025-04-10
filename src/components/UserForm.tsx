import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "../types/user";

const userSchema = z.object({
	phone: z
		.string()
		.min(10, "Phone number must be at least 10 characters")
		.max(15, "Phone number must not exceed 15 characters"),
	name: z.string().min(2, "Name must be at least 2 characters").optional(),
	role: z.string().default("user"),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
	onSubmit: (data: UserFormData) => void;
	initialData?: User;
	onCancel: () => void;
}

export function UserForm({ onSubmit, initialData, onCancel }: UserFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<UserFormData>({
		resolver: zodResolver(userSchema),
		defaultValues: initialData,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Phone
					</label>
					<div className="relative rounded-md shadow-sm">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-gray-400"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
							</svg>
						</div>
						<input
							type="text"
							{...register("phone")}
							className={`block w-full pl-10 pr-3 py-2.5 border ${
								errors.phone
									? "border-red-300 focus:ring-red-500 focus:border-red-500"
									: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
							} rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm`}
							placeholder="Enter phone number"
						/>
					</div>
					{errors.phone && (
						<p className="mt-1 text-sm text-red-600 flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 mr-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
									clipRule="evenodd"
								/>
							</svg>
							{errors.phone.message}
						</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Name
					</label>
					<div className="relative rounded-md shadow-sm">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-gray-400"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<input
							type="text"
							{...register("name")}
							className={`block w-full pl-10 pr-3 py-2.5 border ${
								errors.name
									? "border-red-300 focus:ring-red-500 focus:border-red-500"
									: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
							} rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm`}
							placeholder="Enter name (optional)"
						/>
					</div>
					{errors.name && (
						<p className="mt-1 text-sm text-red-600 flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 mr-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
									clipRule="evenodd"
								/>
							</svg>
							{errors.name.message}
						</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Role
					</label>
					<div className="relative rounded-md shadow-sm">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-gray-400"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<input
							type="text"
							{...register("role")}
							className={`block w-full pl-10 pr-3 py-2.5 border ${
								errors.role
									? "border-red-300 focus:ring-red-500 focus:border-red-500"
									: "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
							} rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm`}
							placeholder="Enter role"
						/>
					</div>
					{errors.role && (
						<p className="mt-1 text-sm text-red-600 flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 mr-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
									clipRule="evenodd"
								/>
							</svg>
							{errors.role.message}
						</p>
					)}
				</div>
			</div>

			<div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
				<button
					type="button"
					onClick={onCancel}
					className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
				>
					Cancel
				</button>
				<button
					type="submit"
					disabled={isSubmitting}
					className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 flex items-center"
				>
					{isSubmitting ? (
						<>
							<svg
								className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Saving...
						</>
					) : (
						<>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 mr-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							Save
						</>
					)}
				</button>
			</div>
		</form>
	);
}
