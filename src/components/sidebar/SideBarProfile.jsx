"use client"
import { apiGetUser } from "@/libs/api/userAPI";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SideBarProfile = () => {

	const [user, setUser] = useState()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedUser = await apiGetUser()
				setUser(fetchedUser)
			} catch (error) {
				console.log(error)
			}
		};

		fetchData();
	  }, []);

	return (
		<section>
			<div className="w-full bg-bgcolor h-16 rounded-lg p-2 box-border flex gap-2">
				<Image
					src={"/images/default_avatar.png"}
					width={48}
					height={48}
					alt="avatar"
					className="rounded-md"
				/>
				<div>
					<p className="text-sm font-medium">{user ? user.pseudo : "..."}</p>
					<Link
						href={"profile"}
						className="text-xs text-primary hover:underline"
					>
						Modifier mon profil
					</Link>
				</div>
			</div>
		</section>
	);
};

export default SideBarProfile;
