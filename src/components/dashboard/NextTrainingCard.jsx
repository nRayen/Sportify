"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PlanningDayCard from "../planning/PlanningDayCard";

const NextTrainingCard = () => {
	const [currentWeek, setCurrentWeek] = useState(new Date());
	const [seances, setSeances] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);


	// Get current week's Monday
	const monday = new Date();
	monday.setDate(monday.getDate() - monday.getDay() + 1);


	// Récupérer les seances
	useEffect(() => {
		try {
			setIsLoading(true);
			const fetchSeances = async () => {
				const seances = await getAPI_Seances();
				setSeances(seances);
			};
			fetchSeances();
		} catch (error) {
			setError(error.message);
			console.error("Erreur lors de la récupération des seances", error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	// Get week dates
	const getWeekDates = () => {
		const dates = [];
		const startDate = new Date(currentWeek);
		startDate.setDate(startDate.getDate() - startDate.getDay() + 1);

		for (let i = 0; i < 3; i++) {
			const date = new Date(startDate);
			date.setDate(startDate.getDate() + i);
			dates.push(date);
		}
		return dates;
	};

	// Get seances for a specific date
	const getSeancesForDate = (date) => {
		return seances.filter(
			(seance) => seance.date.toISOString().split("T")[0] === date.toISOString().split("T")[0]
		);
	};

	return (
		<section className="bg-bgtone p-4 rounded-lg border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5">
			<Link
				href={"/planning"}
				className="text-xl font-medium mb-4 flex items-center group"
			>
				Planning
				<ChevronRight
					strokeWidth={2}
					size={25}
					className="group-hover:translate-x-1 group-hover:stroke-primary group-hover:scale-110 transition-all duration-300"
				/>
			</Link>

			<div className="flex flex-col flex-wrap gap-4 h-fit">
				{getWeekDates().map((date) => (
					<PlanningDayCard
						key={date.toISOString()}
						date={date}
						className=""
						getSeancesForDate={getSeancesForDate}
						compact={true}
					/>
				))}
			</div>

		</section>
	);
};

export default NextTrainingCard;
