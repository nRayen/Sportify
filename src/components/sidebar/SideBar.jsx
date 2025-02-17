'use client'
import Link from "next/link";
import LogoutButton from "../LogoutButton";
import { LogOut, Settings } from "lucide-react";
import React, { useEffect } from "react";
import SideBarNav from "./SideBarNav";
import SideBarProfile from "./SideBarProfile";
import SideBarThemeSwitch from "./SideBarThemeSwitch";

const SideBar = ({ isOpen, setIsOpen }) => {
	const itemstyle =
		"py-3 px-1 w-full h-8 flex items-center box-border hover:bg-backgroundItem dark:hover:bg-backgroundItem-dark gap-2 rounded-md";

	// Fonction pour gérer le clic en dehors de la sidebar
	useEffect(() => {
		// Fonction pour vérifier si le clic est en dehors de la sidebar
		const handleClickOutside = (event) => {
			// Vérifie si le clic est en dehors de la sidebar et de ses éléments enfants
			if (event.target.closest(".sidebar") === null) {
				setIsOpen(false); // Ferme la sidebar
			}
		};

		// Ajoute l'écouteur d'événements au document
		document.addEventListener("mousedown", handleClickOutside);

		// Nettoie l'écouteur lors du démontage du composant
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<aside
			className={`bg-bgtone p-4 flex  flex-col justify-between w-full absolute bottom-0 left-0 transition-transform duration-350 rounded-t-2xl shadow-[_0px_-5px_rgba(16,_185,_129,_0.2),_0px_-10px_rgba(16,_185,_129,_0.1),_0px_-15px_rgba(16,_185,_129,_0.05),_0px_-20px_rgba(16,_185,_129,_0.025)] lg:shadow-none  lg:w-[350px] lg:h-full lg:static lg:translate-x-0 lg:transform-none lg:duration-0 lg:rounded-none lg:border-l-[1px] dark:lg:border-white/5
			${isOpen ? "translate-y-0" : "translate-y-full shadow-none"}`}
		>
			{/* Barre profil */}
			<SideBarProfile />

			{/* Navigation */}
			<nav>
				<h3 className="text-xs font-medium text-text-secondary my-2 px-1">
					Navigation
				</h3>
				<SideBarNav itemstyle={itemstyle} />
			</nav>

			{/* Boutons en bas */}
			<section className="w-full fill-black dark:fill-white text-sm gap-1 flex flex-col">
				<SideBarThemeSwitch className={itemstyle}>Thème</SideBarThemeSwitch>

				<Link href={"/settings"} className={itemstyle}>
					<Settings strokeWidth={1} size={25} />
					Paramètres
				</Link>

				<LogoutButton className={itemstyle}>
					<LogOut strokeWidth={1} size={25} />
					Déconnexion
				</LogoutButton>
			</section>
		</aside>
	);
};

export default SideBar;
