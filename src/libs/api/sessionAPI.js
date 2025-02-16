export const apiGetSession = async () => {


    try {
        const response = await fetch("/api/auth/session", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) throw new Error("Erreur lors de la récupération de la session")

        const session = await response.json();
        return session;
    } catch (error) {
        console.log(error)
    }
}



// Requete API pour se déconnecter
export const apiLogout = async () => {
    try {

        const response = await fetch("/api/auth/session", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (!response.ok) throw new Error("Erreur lors de la récupération de la session")
        const res = await response.json()
        return res
        } catch (error) {
            console.log(error)
        }
}
