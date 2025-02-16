"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { apiGetSession, apiLogout } from "@/libs/api/sessionAPI";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
	const router = useRouter();
	const [session, setSession] = useState(null);

	// Charger la session si existante
	useEffect(() => {
		const exec = async () => {
			const session = await apiGetSession()
			setSession(session);
		}
		exec()
	}, []);

	// Déconnexion
	const logout = async () => {
		setSession(null);
		await apiLogout()
		router.push("/login");
	};

	return (
		<SessionContext.Provider value={{ session, logout }}>
			{children}
		</SessionContext.Provider>
	);
};

// Hook personnalisé pour utiliser le contexte
export function useSession() {
	const context = useContext(SessionContext);
	if (!context) {
		throw new Error("useSession must be used within a SessionProvider");
	}
	return context;
}
