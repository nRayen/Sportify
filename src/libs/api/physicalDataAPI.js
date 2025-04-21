export const postAPI_PhysicalData = async (taille, poids) => {
    const response = await fetch("/api/physical-data", {
        method: "POST",
        body: JSON.stringify({ taille, poids }),
    });
    return response.json();
}

export const getAPI_PhysicalData = async () => {
    const response = await fetch("/api/physical-data/");
    return response.json();
}

export const deleteAPI_PhysicalData = async (id) => {
    const response = await fetch(`/api/physical-data/${id}`, {
        method: "DELETE",
    });
    return response.json();
}

export const putAPI_PhysicalData = async (id, data) => {
    const response = await fetch(`/api/physical-data/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    return response.json();
}
