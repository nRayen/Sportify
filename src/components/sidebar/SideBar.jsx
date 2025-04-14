"use client";
import Link from "next/link";
import LogoutButton from "../LogoutButton";
import { LogOut, Settings } from "lucide-react";
import React, { useEffect } from "react";
import SideBarNav from "./SideBarNav";
import SideBarProfile from "./SideBarProfile";
import SideBarThemeSwitch from "./SideBarThemeSwitch";

const SideBar = ({ isOpen, setIsOpen }) => {
	const itemstyle =
		"py-3 px-4 w-full flex items-center gap-3 rounded-xl transition-all duration-300 hover:bg-primary/5 hover:text-primary";

	// Fonction pour gérer le clic en dehors de la sidebar
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (event.target.closest(".sidebar") === null) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<aside
			className={`bg-bgtone flex flex-col w-full fixed top-14 bottom-0 left-0 transition-transform duration-350 lg:w-[250px] lg:h-full lg:static lg:border-r-[1px] dark:lg:border-white/5
			${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
		>
			{/* Profile Section */}
			<div className="p-4 border-b-[1px] border-black/5 dark:border-white/5">
				<SideBarProfile />
			</div>

			{/* Navigation */}
			<div className="flex-1 overflow-y-auto p-4">
				<h3 className="text-sm font-medium text-text-secondary px-4 mb-2">
					Navigation
				</h3>
				<SideBarNav itemstyle={itemstyle} />
			</div>

			{/* Bottom Section */}
			<div className="p-4 border-t-[1px] border-black/5 dark:border-white/5">
				<h3 className="text-sm font-medium text-text-secondary px-4 mb-2">
					Réglages
				</h3>
				<div className="flex flex-col gap-1">
					<SideBarThemeSwitch className={itemstyle}>Thème</SideBarThemeSwitch>

					<Link href={"/settings"} className={itemstyle}>
						<Settings strokeWidth={1.5} size={20} />
						Paramètres
					</Link>

					<LogoutButton className={itemstyle}>
						<LogOut strokeWidth={1.5} size={20} />
						Déconnexion
					</LogoutButton>
				</div>
			</div>
		</aside>
	);
};

export default SideBar;
