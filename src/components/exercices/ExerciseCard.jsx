"use client";

import { useState } from "react";
import { Edit, Trash, Globe, MoreVertical, Lock } from "lucide-react";
import EditExerciseModal from "./EditExerciseModal";

const ExerciseCard = ({
	exercise,
	onUpdate,
	onDelete,
	onMakePublic,
	isPersonal = false,
}) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [showOptions, setShowOptions] = useState(false);

	const handleClickOutside = () => {
		setShowOptions(false);
	};

	return (
		<div className="bg-bgtone p-4 h-full flex flex-col justify-between rounded-2xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5 relative">
			{isPersonal && (
				<div className="absolute top-4 right-4">
					<button
						onClick={() => setShowOptions(!showOptions)}
						className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
					>
						<MoreVertical size={18} className="text-text-secondary" />
					</button>

					{showOptions && (
						<>
							<div
								className="fixed inset-0 z-10"
								onClick={handleClickOutside}
							></div>
							<div className="absolute right-0 mt-1 w-40 bg-bgtone border border-black/10 dark:border-white/5 rounded-xl shadow-lg z-20">
								<button
									onClick={() => {
										setShowEditModal(true);
										setShowOptions(false);
									}}
									className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-black/5 dark:hover:bg-white/5 rounded-t-xl"
								>
									<Edit size={16} />
									<span>Modifier</span>
								</button>
								<button
									onClick={() => {
										onDelete(exercise.id);
										setShowOptions(false);
									}}
									className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-500 hover:bg-black/5 dark:hover:bg-white/5 rounded-b-xl"
								>
									<Trash size={16} />
									<span>Supprimer</span>
								</button>
							</div>
						</>
					)}
				</div>
			)}

			<h3 className="text-xl font-medium mb-2 pr-8">{exercise.title}</h3>
			<p className="text-text-secondary text-sm mb-4">
				{exercise.description || "Aucune description"}
			</p>

			<div className="flex items-center gap-1 text-primary text-sm">
				{exercise.public ? (
					<>
						<Globe size={14} />
						<span>Public</span>
					</>
				) : (
					<>
						<Lock size={14} />
						<span>Privé</span>
					</>
				)}
			</div>

			{isPersonal && (
				<EditExerciseModal
					isOpen={showEditModal}
					onClose={() => setShowEditModal(false)}
					exercise={exercise}
					onUpdate={onUpdate}
				/>
			)}
		</div>
	);
};

export default ExerciseCard;
