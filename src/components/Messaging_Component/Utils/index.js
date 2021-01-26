export const getUser = async (userId) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/profiles/${userId}`),
        result = await response.json()
    console.log(result)
    return result
}

export const postMessage = async (payload) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/chat`, {
        method: 'POST',
        body: JSON.stringify(payload)
    }),
        result = await response.json()
    console.log(result)
    return result
}