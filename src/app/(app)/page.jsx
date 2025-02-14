"use client";
import React from "react";
import { useSession } from "../../hooks/useSession";

const AppHome = () => {
	const { session } = useSession();
	// console.log(session.session);

	return (
		<>
			<h1 className="text-7xl m-auto">AppHome</h1>
			{session ? <p>Salut utilisateur</p> : <p>Vous n'etes pas connectés</p>}
		</>
	);
};

export default AppHome;
