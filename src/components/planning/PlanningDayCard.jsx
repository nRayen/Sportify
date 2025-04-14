import { Clock, Pencil, Trash2 } from "lucide-react";
import React from "react";

const PlanningDayCard = ({
	date,
	getSeancesForDate,
	openEditSeanceModal,
	handleDeleteSeance,
	className,
	compact = false,
	editButton = false,
}) => {
	// console.log(date);
	// console.log(getSeancesForDate(date));

	const nbSeances = getSeancesForDate(date).length;

	return (
		<div
			onClick={() => console.log(date.toISOString().split("T")[0])}
			key={date.toISOString()}
			className={
				"bg-bgtone rounded-xl border-[1px] border-black/10 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col " +
				className
			}
		>
			{/* Day Header */}
			<div className="p-4 border-b border-black/10 dark:border-white/5 bg-background/50 dark:bg-background-dark/50">
				<div
					className={
						"flex items-baseline gap-2 " + compact
							? ""
							: "sm:gap-0 sm:flex-col sm:items-center"
					}
				>
					<p
						className={
							"font-medium " + (compact ? "" : "sm:text-center")
						}
					>
						{date.toLocaleDateString("fr-FR", {
							weekday: "short",
							day: "numeric",
						})}
						{compact ? " " : <br />}
						<span className="text-text-secondary text-sm">
							{date.toLocaleDateString("fr-FR", {
								month: "long",
							})}
						</span>
					</p>
				</div>
			</div>

			{/* Seances List */}
			<div className="p-4 space-y-3 flex-1 overflow-y-auto">
				{getSeancesForDate(date).map((seance) => (
					<div
						key={seance.id}
						className="group relative rounded-r-lg bg-background dark:bg-background-dark border-l-4 border-primary hover:border-primary/50 transition-all duration-300"
					>
						<div className="p-4">
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<h3 className="font-medium text-base group-hover:text-primary transition-colors">
										{seance.title}
									</h3>
									<div className="flex items-center gap-2 text-text-secondary text-sm">
										<div className="flex items-center gap-1.5 bg-primary/10 dark:bg-primary/20 px-2 py-1 rounded">
											<Clock size={14} className="text-primary" />
											<span>{seance.date.split("T")[1].slice(0, 5)}</span>
										</div>
										<span className="lg:hidden text-primary/60">•</span>
										<span className="lg:hidden bg-primary/10 dark:bg-primary/20 px-2 py-1 rounded">
											{seance.duration} min
										</span>
									</div>
								</div>
								<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity md:flex-col">
									{editButton && (
										<button
											className="p-1.5 hover:bg-primary/10 rounded-md transition-colors"
											onClick={() => openEditSeanceModal(seance)}
										>
											<Pencil
												strokeWidth={1.5}
												// size={16}
												className="text-primary h-5 md:h-4 w-5 md:w-4"
											/>
										</button>
									)}
									<button
										className="p-1.5 hover:bg-red-500/10 rounded-md transition-colors"
										onClick={() => handleDeleteSeance(seance.id)}
									>
										<Trash2
											strokeWidth={1.5}
											// size={16}
											className="text-red-500 h-5 md:h-4 w-5 md:w-4"
										/>
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
				{nbSeances === 0 && (
					<p className="text-sm text-text-secondary text-center py-6">
						Aucune séance
					</p>
				)}
			</div>
		</div>
	);
};

export default PlanningDayCard;
