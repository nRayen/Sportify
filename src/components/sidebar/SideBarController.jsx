"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import SideBar from "./SideBar";
import LogoSVG from "../SVG/LogoSVG";

const SideBarController = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="sidebar">
			<header className="lg:hidden text-default bg-bgtone border-b-[1px] border-black/10 dark:border-white/5 h-16 flex justify-between items-center px-4">
				<div className="flex items-center gap-2">
					<LogoSVG className="fill-primary w-6 h-6" />
					<h1 className="text-lg font-medium">Sportify</h1>
				</div>
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="p-2 hover:bg-background dark:hover:bg-background-dark rounded-lg transition-colors"
				>
					{isOpen ? (
						<X strokeWidth={1} size={24} />
					) : (
						<Menu strokeWidth={1} size={24} />
					)}
				</button>
			</header>
			<SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
		</div>
	);
};

export default SideBarController;
