"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import PlanningDayCard from "../planning/PlanningDayCard";

const NextTrainingCard = () => {
	const [currentWeek, setCurrentWeek] = useState(new Date());

	// Get current week's Monday
	const monday = new Date();
	monday.setDate(monday.getDate() - monday.getDay() + 1);

	const sessions = [
		{
			id: 1,
			title: "Upper Body Workout",
			date: monday.toISOString().split("T")[0],
			time: "08:00",
			type: "Musculation",
			duration: 60,
		},
		{
			id: 2,
			title: "Cardio HIIT",
			date: new Date(monday.setDate(monday.getDate() + 3))
				.toISOString()
				.split("T")[0],
			time: "17:30",
			type: "Cardio",
			duration: 30,
		},
	];

	// Get week dates
	const getWeekDates = () => {
		const dates = [];
		const startDate = new Date(currentWeek);
		startDate.setDate(startDate.getDate() - startDate.getDay() + 1);

		for (let i = 0; i < 2; i++) {
			const date = new Date(startDate);
			date.setDate(startDate.getDate() + i);
			dates.push(date);
		}
		return dates;
	};

	// Get sessions for a specific date
	const getSessionsForDate = (date) => {
		return sessions.filter(
			(session) => session.date === date.toISOString().split("T")[0]
		);
	};

	return (
		<section className="bg-bgtone p-4 rounded-lg border-[1px] border-black/10 dark:border-white/5 h-full shadow-md shadow-black/5 dark:shadow-white/5">
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
						getSessionsForDate={getSessionsForDate}
						compact={true}
					/>
				))}
			</div>
		</section>
	);
};

export default NextTrainingCard;
