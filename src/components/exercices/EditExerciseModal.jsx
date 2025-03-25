"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import ToggleSwitch from "../ui/ToggleSwitch";

const EditExerciseModal = ({ isOpen, onClose, exercise, onUpdate }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [isPublic, setIsPublic] = useState(false);
	const [errors, setErrors] = useState({});

	// Initialize form with exercise data when modal opens
	useEffect(() => {
		if (exercise) {
			setTitle(exercise.title || "");
			setDescription(exercise.description || "");
			setIsPublic(exercise.public || false);
		}
	}, [exercise, isOpen]);

	// Fonction pour mettre à jour l'exercice
	const handleSubmit = (e) => {
		e.preventDefault();

		// Validation
		const newErrors = {};
		if (!title.trim()) {
			newErrors.title = "Le titre est requis";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		// Update exercise
		onUpdate({
			...exercise,
			title,
			description,
			public: isPublic || false,
		});

		// Reset errors and close modal
		setErrors({});
		onClose();
	};

	if (!isOpen) return null;

	return (
		<>
			<div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
			<div className="fixed inset-x-0 bottom-0 z-50 p-4 animate-slide-up sm:p-6 lg:inset-y-[50px]">
				<div className="bg-bgtone rounded-2xl w-full max-w-2xl mx-auto overflow-hidden flex flex-col">
					<div className="sticky top-0 bg-bgtone p-4 sm:p-6 border-b border-black/10 dark:border-white/5 z-10 flex-shrink-0">
						<div className="flex items-center justify-between">
							<h2 className="text-xl sm:text-2xl font-medium">
								Modifier l'exercice
							</h2>
							<button
								onClick={onClose}
								className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
							>
								<X size={20} />
							</button>
						</div>
					</div>

					<div className="p-4 sm:p-6 overflow-y-auto flex-grow">
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label
									htmlFor="title"
									className="block text-sm font-medium mb-1"
								>
									Titre <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="title"
									className={`w-full p-2 rounded-xl bg-bgtone border ${
										errors.title
											? "border-red-500"
											: "border-black/10 dark:border-white/5"
									}`}
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									placeholder="Ex: Développé couché"
								/>
								{errors.title && (
									<p className="text-red-500 text-sm mt-1">{errors.title}</p>
								)}
							</div>

							<div className="mb-4">
								<label
									htmlFor="description"
									className="block text-sm font-medium mb-1"
								>
									Description
								</label>
								<textarea
									id="description"
									className="w-full p-2 rounded-xl bg-bgtone border border-black/10 dark:border-white/5 min-h-[100px]"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									placeholder="Décrivez l'exercice..."
								/>
							</div>

							<div className="mb-6">
								<ToggleSwitch
									id="isPublic"
									isChecked={isPublic}
									onChange={setIsPublic}
									label="Rendre cet exercice public"
									description="Les exercices publics sont visibles par tous les utilisateurs"
								/>
							</div>

							<div className="flex justify-end gap-2">
								<button
									type="button"
									onClick={onClose}
									className="px-4 py-2 rounded-xl border border-black/10 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5"
								>
									Annuler
								</button>
								<button
									type="submit"
									className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90"
								>
									Enregistrer
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditExerciseModal;
