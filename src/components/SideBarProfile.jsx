import { getUser } from "@/app/libs/dal";
import Image from "next/image";
import Link from "next/link";

const SideBarProfile = async () => {

    const user = await getUser()
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
					<p className="text-sm font-medium">{user.pseudo}</p>
                    <Link href={"profile"} className="text-xs text-primary hover:underline">Modifier mon profil</Link>
				</div>
			</div>
		</section>
	);
};

export default SideBarProfile;
