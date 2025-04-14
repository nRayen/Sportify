import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) return null;

	return (
		<>
			{/* Background */}
			<div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

			{/* Modal */}
			<div className="fixed inset-x-0 bottom-0 z-50 h-fit animate-slide-up sm:p-6 lg:inset-y-[50px] m-auto">
				<div className="bg-bgtone rounded-2xl rounded-b-none sm:rounded-b-2xl w-full max-w-4xl mx-auto max-h-[85vh] overflow-hidden flex flex-col">
					{/* Header */}
					<div className="sticky top-0 bg-bgtone p-4 sm:p-6 border-b border-black/10 dark:border-white/5 z-10 flex-shrink-0">
						<div className="flex items-center justify-between">
							<h2 className="text-xl sm:text-2xl font-medium">{title}</h2>
							<button
								onClick={onClose}
								className="p-2 hover:bg-background dark:hover:bg-background-dark rounded-lg transition-colors"
							>
								<X size={20} />
							</button>
						</div>
					</div>

					{/* Content */}
					<div className="p-4 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
						{children}
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
