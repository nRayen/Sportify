export const getAPI_Seances = async () => {
    const response = await fetch('/api/seances')
    const data = await response.json()
    return data
}

export const postAPI_Seances = async (seance) => {
    const response = await fetch('/api/seances', {
        method: 'POST',
        body: JSON.stringify(seance)
    })
    const data = await response.json()
    return data
}


export const deleteAPI_Seances = async (id) => {
    const response = await fetch(`/api/seances/${id}`, {
        method: 'DELETE'
    })
    const data = await response.json()
    return data
}


export const putAPI_Seances = async (id, seance) => {
    const response = await fetch(`/api/seances/${id}`, {
        method: 'PUT',
        body: JSON.stringify(seance)
    })
    const data = await response.json()
    return data
}
