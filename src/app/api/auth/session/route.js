import { cookies } from "next/headers";
import { NextResponse } from "next/server"
import { decrypt } from "../../../libs/session";

// Méthode pour récupérer la session
export async function GET() {
    const session = (await cookies()).get('session')?.value

    if (!session) {
        return NextResponse.json(
            {message: "Aucune session trouvée", code: 404},
            {code: 404}
        )
    }

    try {
        const decoded = await decrypt(session)
        return NextResponse.json({ session: decoded }); // Réponse avec statut 200 par défaut
    } catch (error) {
        console.log(error)
        return NextResponse.json({ session: null }, { status: 401 }); // Retourne 401 en cas d'erreur
    }
}