"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
	const router = useRouter()
	const [session, setSession] = useState(null);


	// Charger la session si existante
	useEffect(() => {
		async function loadSession() {
			const response = await fetch("/api/auth/session", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const res = await response.json()
			setSession(res)
			return res
		}
		loadSession();
	}, []);


	// Déconnexion
	const logout = () => {
		async function deleteSession() {
			const response = await fetch("/api/auth/session", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const res = await response.json()
			setSession(null)
			return res
		}
		deleteSession().then(() => {
			router.push('/login')
		});
	}


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
