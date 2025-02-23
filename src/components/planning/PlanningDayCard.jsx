import { Clock } from "lucide-react";
import React from "react";

const PlanningDayCard = ({
	date,
	getSessionsForDate,
	className,
	compact = false,
}) => {
	return (
		<div
			key={date.toISOString()}
			className={
				"bg-bgtone rounded-xl border-[1px] border-black/10 dark:border-white/5 overflow-hidden flex-1 min-w-[280px] sm:min-w-[320px] lg:min-w-[170px] " +
				className
			}
		>
			{/* Day Header */}
			<div className="p-3 sm:p-4 border-b border-black/10 dark:border-white/5">
				<div
					className={
						"flex items-baseline gap-2 " + compact
							? ""
							: "sm:gap-0 sm:flex-col sm:items-center"
					}
				>
					<p className={"font-medium " + (compact ? "" : "sm:text-center")}>
						{date.toLocaleDateString("fr-FR", {
							weekday: "short",
							day: "numeric",
						})}
						{compact ? " " : <br />}
						<span className="text-text-secondary text-sm">
							{date.toLocaleDateString("fr-FR", { month: "long" })}
						</span>
					</p>
				</div>
			</div>

			{/* Sessions List */}
			<div className="p-3 sm:p-4">
				{getSessionsForDate(date).map((session) => (
					<div
						key={session.id}
						className="bg-primary/10 rounded-lg p-3 mb-2 last:mb-0 cursor-pointer hover:bg-primary/20 transition-colors"
					>
						<h3 className="font-medium text-sm mb-1">{session.title}</h3>
						<div className="flex items-center gap-2 text-text-secondary text-xs">
							<Clock size={12} />
							<span>{session.time}</span>
							<span>•</span>
							<span>{session.duration} min</span>
						</div>
						<p className="text-xs text-text-secondary mt-1">{session.type}</p>
					</div>
				))}
				{getSessionsForDate(date).length === 0 && (
					<p className="text-sm text-text-secondary text-center py-2">
						Aucune séance
					</p>
				)}
			</div>
		</div>
	);
};

export default PlanningDayCard;
