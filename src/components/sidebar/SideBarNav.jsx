"use client";
import { usePathname } from "next/navigation";
import { Home, Dumbbell, Calendar, ChartLine } from "lucide-react";
import React from "react";
import Link from "next/link";

const SideBarNav = ({ itemstyle }) => {
	const path = usePathname();

	const nav = [
		{
			link: "/dashboard",
			text: "Tableau de bord",
			icon: Home,
		},
		{
			link: "/planning",
			text: "Planning",
			icon: Calendar,
		},
		{
			link: "/exercices",
			text: "Exercices",
			icon: Dumbbell,
		},
		{
			link: "/suivi",
			text: "Suivi",
			icon: ChartLine,
		},
	];

	return (
		<nav className="flex flex-col gap-1">
			{nav.map(({ link, text, icon }) => {
				const isActive = link === path;

				return (
					<Link
						key={link}
						href={link}
						className={`${itemstyle} ${
							isActive ? "bg-primary/10 text-primary" : ""
						}`}
					>
						{React.createElement(icon, {
							strokeWidth: 1.5,
							size: 20,
						})}
						{text}
					</Link>
				);
			})}
		</nav>
	);
};

export default SideBarNav;
