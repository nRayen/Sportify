"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
import SideBar from "./SideBar";

const SideBarController = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<>
				<header className=" sidebar lg:hidden text-default bg-gradient-to-b to-background from-backgroundTone dark:to-background-dark dark:from-backgroundTone-dark  h-14 flex justify-between items-center px-2">
					<h1 className="text-lg text-default">Sportify</h1>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="h-full sidebarbutton"
					>
						<Menu
							strokeWidth={1}
							onClick={() => setIsOpen(!isOpen)}
							height={35}
							width={35}
						/>
					</button>
				</header>

				<div>
					<SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
				</div>
			</>
		</>
	);
};

export default SideBarController;
