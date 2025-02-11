"use client"
import React from "react";
import { useDarkMode } from "@/hooks/useDarkMode";

const ThemeSwitch = () => {
    const { theme, toggleTheme } = useDarkMode();


	return (
		<button
			onClick={toggleTheme}
			className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
		>
			{theme === "dark" ? (
				"mettre light"
			) : (
				"mettre dark"
			)}
		</button>
	);
};

export default ThemeSwitch;
