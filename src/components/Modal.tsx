import { ReactNode, useEffect } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "auto";
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
				onClick={onClose}
			/>

			<div className="relative w-full max-w-lg mx-4 bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 ease-out scale-0 opacity-0 animate-modal">
				<div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-indigo-100 border-b border-indigo-100">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-medium text-indigo-800">{title}</h3>
						<button
							onClick={onClose}
							className="text-indigo-500 hover:text-indigo-700 focus:outline-none transition-colors duration-200"
						>
							<svg
								className="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</div>

				<div className="px-6 py-4">{children}</div>
			</div>
		</div>
	);
}
