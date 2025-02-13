"use client"
import React from "react";
// import { useDarkMode } from "@/hooks/useDarkMode";
import { useTheme } from "@/hooks/useTheme";

const ThemeSwitch = () => {
    const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
		>
			{theme == "dark" ? <p>Mettre light</p> : <p>Mettre dark</p>}
		</button>
	);
};

export default ThemeSwitch;
