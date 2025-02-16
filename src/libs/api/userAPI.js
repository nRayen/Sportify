// Récuperer le user depuis l'api
export const apiGetUser = async () => {
    try {

        const response = await fetch("/api/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (!response.ok) throw new Error("Erreur lors de la récupération de l'utilisateur")
        const res = await response.json()
        return res
        } catch (error) {
            console.log(error)
        }
}
