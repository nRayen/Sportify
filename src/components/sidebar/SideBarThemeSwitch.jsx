"use client";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

const SideBarThemeSwitch = ({className, children}) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className={className}
			type="button"
		>
			{theme == "dark" ? <Moon strokeWidth={1}/> : <Sun strokeWidth={1}/>}
            {children}
		</button>
	);
};

export default SideBarThemeSwitch;
