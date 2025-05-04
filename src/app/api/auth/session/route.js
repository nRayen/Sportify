import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server"
import { decrypt, deleteSession, getSession } from "../../../../libs/session";
import { redirect } from "next/navigation";

// Méthode pour récupérer la session
export async function GET() {
    const session = await getSession()

    if (session == null) {
        return NextResponse.json(
            {message: "Aucune session trouvée", code: 404},
            {status: 404}
        )
    } else {
        try {
            return NextResponse.json({ userId: session.userId }, {status: 200}); // Réponse avec statut 200 par défaut
        } catch (error) {
            console.log(error)
            return NextResponse.json({ session: null }, { status: 401 }); // Retourne 401 en cas d'erreur
        }
    }
}

// Méthode pour supprimer la session
export async function DELETE() {
    try {
        await deleteSession()
        return NextResponse.json(
            {message: "Session supprimée avec succès", code: 200},
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