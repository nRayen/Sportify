import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { redirect } from "next/navigation";

import { headers } from "next/headers";
import NotFound from "@/components/NotFound";


const ResetPasswordPage = async ({ params }) => {
	const { key } = await params;
	
	const header = await headers()
	const baseUrl = header.get("host");
	const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

	try {
		// Requête API pour vérifier si la clé est valide
		const response = await fetch(`${protocol}://${baseUrl}/api/auth/password?key=${key}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			cache: "no-store",
		});
		const res = await response.json();

		// Ajout de l'erreur à l'affichage
		if (!response.ok) {
			return (
				<NotFound text={"Cette page n'existe pas"}/>
			)
		}
	} catch (error) {
		console.log(error.message);
	}

	return <ResetPasswordForm />;
};

export default ResetPasswordPage;
