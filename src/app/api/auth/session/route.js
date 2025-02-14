import { cookies } from "next/headers";
import { NextResponse } from "next/server"
import { decrypt, deleteSession, getSession } from "../../../libs/session";
import { redirect } from "next/navigation";

// Méthode pour récupérer la session
export async function GET() {
    const session = getSession()

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


export async function DELETE() {

    try {
        await deleteSession()
        // return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'))
        return NextResponse.json(
            {message: "Erreur lors de la suppression de la session", code: 200},
            {status: 200}
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {error: "Erreur lors de la suppression de la session", code: 404},
            {status: 404}
        )
    }
}