export const postAPI_PhysicalData = async (taille, poids) => {
    const response = await fetch("/api/physical-data", {
        method: "POST",
        body: JSON.stringify({ taille, poids }),
    });
    return response.json();
}

