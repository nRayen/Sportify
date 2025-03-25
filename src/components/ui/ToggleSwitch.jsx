"use client";

import { useState, useEffect } from "react";

const ToggleSwitch = ({
	isChecked = false,
	onChange,
	label,
	description,
	id = "toggle-switch",
}) => {
	const [checked, setChecked] = useState(isChecked);

	useEffect(() => {
		setChecked(isChecked);
	}, [isChecked]);

	const handleChange = (e) => {
		setChecked(e.target.checked);
		if (onChange) onChange(e.target.checked);
	};

	return (
		<div className="flex items-start">
			<div className="flex items-center h-5">
				<button
					type="button"
					role="switch"
					aria-checked={checked}
					id={id}
					onClick={() => {
						const newValue = !checked;
						setChecked(newValue);
						if (onChange) onChange(newValue);
					}}
					className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
						checked ? "bg-primary" : "bg-black/10 dark:bg-white/10"
					}`}
				>
					<span
						className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
							checked ? "translate-x-6" : "translate-x-1"
						}`}
					/>
				</button>
			</div>
			{(label || description) && (
				<div className="ml-3 text-sm">
					{label && (
						<label htmlFor={id} className="font-medium cursor-pointer">
							{label}
						</label>
					)}
					{description && (
						<p className="text-text-secondary text-xs mt-1">{description}</p>
					)}
				</div>
			)}
		</div>
	);
};

export default ToggleSwitch;
