"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PageAnimation = ({ children }) => {
	const pathname = usePathname();

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={pathname}
				className="w-full min-h-screen flex flex-col-reverse lg:flex-row overflow-y-auto overflow-x-hidden relative custom-scrollbar"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4, ease: "easeInOut" }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};

export default PageAnimation;
