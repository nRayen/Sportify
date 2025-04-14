"use client";

import { useState } from "react";
import ToggleSwitch from "../ui/ToggleSwitch";
import Modal from "../ui/Modal";

const NewExerciseModal = ({ isOpen, onClose, onCreate }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [isPublic, setIsPublic] = useState(false);
	const [errors, setErrors] = useState({});

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

		// Create new exercise
		onCreate({
			title,
			description,
			public: isPublic,
		});

		// Reset form and close modal
		setTitle("");
		setDescription("");
		setIsPublic(false);
		setErrors({});
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Nouvel exercice">
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label htmlFor="title" className="block text-sm font-medium mb-1">
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
						Créer
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default NewExerciseModal;
