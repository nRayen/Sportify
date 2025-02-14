"use client";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

const SideBarThemeSwitch = ({className}) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className={className}
		>
			{theme == "dark" ? <Moon strokeWidth={1}/> : <Sun strokeWidth={1}/>}
            Thème
		</button>
	);
};

export default SideBarThemeSwitch;
