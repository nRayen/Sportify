import { getUser } from "@/libs/dal";
import { NextResponse } from "next/server";


// Requete API pour récupérer une User
export async function GET () {
    try {
        const user = await getUser()
        return NextResponse.json(
            user, {status: 200}
        )
    } catch (error) {
        return NextResponse.json({ error: "Erreur de chargement" }, { status: 500 });
    }


}