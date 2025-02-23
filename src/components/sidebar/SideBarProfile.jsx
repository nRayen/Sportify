"use client";
import { apiGetUser } from "@/libs/api/userAPI";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Settings } from "lucide-react";

const SideBarProfile = () => {
	const [user, setUser] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedUser = await apiGetUser();
				setUser(fetchedUser);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return (
		<section>
			<div className="w-full bg-bgtone rounded-xl border-[1px] border-black/10 dark:border-white/5 p-3 flex items-center justify-between group transition-all hover:border-primary/20">
				<div className="flex items-center gap-3">
					<div className="relative">
						<Image
							src={"/images/default_avatar.png"}
							width={40}
							height={40}
							alt="avatar"
							className="rounded-lg"
						/>
						<div className="absolute bottom-[-2px] right-[-2px] w-3 h-3 bg-primary rounded-full border-2 border-bgtone" />
					</div>
					<div>
						<p className="font-medium text-sm leading-none mb-1">
							{user ? user.pseudo : "..."}
						</p>
						<p className="text-xs text-text-secondary leading-none">En ligne</p>
					</div>
				</div>
				<Link
					href={"profile"}
					className="p-2 text-text-secondary hover:text-primary hover:bg-background dark:hover:bg-background-dark rounded-lg transition-colors"
				>
					<Settings size={18} />
				</Link>
			</div>
		</section>
	);
};

export default SideBarProfile;
