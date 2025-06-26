import { getUser } from "@/libs/dal";
import capitalize from "@/utils/Capitalize";
import {
	ChevronRight,
	Calendar,
	Dumbbell,
	TrendingUp,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const PageDashboard = async () => {
	const user = await getUser();
	const date = new Date()
		.toLocaleDateString("fr-FR", {
			weekday: "long",
			day: "2-digit",
			month: "long",
		})
		.split(" ");

	return (
		<div className="h-full w-full p-4 pb-20 sm:p-6 sm:pb-24 lg:p-8 lg:pb-32">
			{/* Welcome & Date */}
			<div className="bg-bgtone p-6 rounded-2xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5 mb-8">
				<h2 className="text-4xl font-medium mb-2">
					Bienvenue,{" "}
					<span className="text-primary">{user.firstname}</span>
				</h2>
				<p className="text-text-secondary">
					{capitalize(date[0])}{" "}
					<span className="text-primary">{date[1]}</span>{" "}
					{capitalize(date[2])}
				</p>
			</div>

			{/* Navigation Links */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Planning Link */}
				<Link
					href="/planning"
					className="bg-bgtone p-6 rounded-xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/10 transition-all duration-300 group"
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-primary/10 rounded-lg">
								<Calendar className="text-primary" size={28} />
							</div>
							<div>
								<h3 className="text-xl font-medium mb-1">Planning</h3>
								<p className="text-text-secondary">Gérer vos séances</p>
							</div>
						</div>
						<ChevronRight
							strokeWidth={2}
							size={25}
							className="group-hover:translate-x-1 group-hover:stroke-primary group-hover:scale-110 transition-all duration-300"
						/>
					</div>
				</Link>

				{/* Exercices Link */}
				<Link
					href="/exercices"
					className="bg-bgtone p-6 rounded-xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/10 transition-all duration-300 group"
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-primary/10 rounded-lg">
								<Dumbbell className="text-primary" size={28} />
							</div>
							<div>
								<h3 className="text-xl font-medium mb-1">Exercices</h3>
								<p className="text-text-secondary">Bibliothèque d'exercices</p>
							</div>
						</div>
						<ChevronRight
							strokeWidth={2}
							size={25}
							className="group-hover:translate-x-1 group-hover:stroke-primary group-hover:scale-110 transition-all duration-300"
						/>
					</div>
				</Link>

				{/* Suivi Link */}
				<Link
					href="/suivi"
					className="bg-bgtone p-6 rounded-xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/10 transition-all duration-300 group"
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-primary/10 rounded-lg">
								<TrendingUp className="text-primary" size={28} />
							</div>
							<div>
								<h3 className="text-xl font-medium mb-1">Suivi</h3>
								<p className="text-text-secondary">Suivre vos progrès</p>
							</div>
						</div>
						<ChevronRight
							strokeWidth={2}
							size={25}
							className="group-hover:translate-x-1 group-hover:stroke-primary group-hover:scale-110 transition-all duration-300"
						/>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default PageDashboard;
