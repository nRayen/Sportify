import { Loader2, X } from "lucide-react";

export default function AddExerciseForm({
	exercise,
	onUpdate,
	onRemove,
	personalExercises,
	loading,
}) {


	return (
		<div className="bg-background dark:bg-background-dark rounded-lg p-4 border-[1px] border-black/10 dark:border-white/5">
			<div className="flex items-start justify-between gap-4">
				<div className="flex-1 space-y-4">
					{loading ? (
						<div className="flex items-center justify-center h-full">
							<Loader2 className="animate-spin" />
						</div>
					) : (
						<>
							<select
								required
								className="w-full p-2 rounded-lg bg-bgtone dark:bg-backgroundTone-dark border-[1px] border-black/10 dark:border-white/5"
								value={exercise.id_exercice}
								onChange={(e) => {
									onUpdate(exercise.id, "id_exercice", parseInt(e.target.value));
								}}
							>
								<option value="">Sélectionner un exercice</option>
								{personalExercises.map((personalExercise) => (
									<option
										key={personalExercise.id}
										value={personalExercise.id}
										className=""
									>
										{personalExercise.title}
									</option>
								))}
							</select>
						</>
					)}
					<div className="grid grid-cols-3 gap-2">
						<div>
							<label className="block text-xs text-text-secondary mb-1">
								Séries
							</label>
							<input
								required
								type="number"
								className="w-full p-2 rounded-lg bg-bgtone dark:bg-backgroundTone-dark border-[1px] border-black/10 dark:border-white/5"
								placeholder="3"
								value={exercise.sets}
								onChange={(e) =>
									onUpdate(exercise.id, "sets", parseInt(e.target.value))
								}
							/>
						</div>
						<div>
							<label className="block text-xs text-text-secondary mb-1">
								Répétitions
							</label>
							<input
								required
								type="number"
								className="w-full p-2 rounded-lg bg-bgtone dark:bg-backgroundTone-dark border-[1px] border-black/10 dark:border-white/5"
								placeholder="12"
								value={exercise.reps}
								onChange={(e) =>
									onUpdate(exercise.id, "reps", parseInt(e.target.value))
								}
							/>
						</div>
						<div>
							<label className="block text-xs text-text-secondary mb-1">
								Poids (kg)
							</label>
							<input
								required
								type="number"
								className="w-full p-2 rounded-lg bg-bgtone dark:bg-backgroundTone-dark border-[1px] border-black/10 dark:border-white/5"
								placeholder="20"
								value={exercise.weight}
								onChange={(e) =>
									onUpdate(exercise.id, "weight", parseFloat(e.target.value))
								}
							/>
						</div>
					</div>
				</div>
				<button
					type="button"
					onClick={() => onRemove(exercise.id)}
					className="p-1 hover:bg-background dark:hover:bg-background-dark rounded-lg transition-colors text-text-secondary"
				>
					<X size={20} />
				</button>
			</div>
		</div>
	);
}
