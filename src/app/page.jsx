import ThemeSwitch from "@/components/ThemeSwitch";
import { getUser } from "../libs/dal";

export default async function Home() {
	const user = await getUser();
	console.log(user);

	return (
		<>
			<h1 className="text-7xl m-auto">Landing Page</h1>
			{user ? <p>Salut {user.pseudo}</p> : <p>Vous n'etes pas connecté</p>}
			<ThemeSwitch />
		</>
	);
}
