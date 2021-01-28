export const getPost = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`),
        result = await response.json()
    // console.log(result)
    return result
}
export const editPost = async (id, body) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: new Headers({ 'Content-Type': 'application/json'})
    }),
        result = await response.json()
    // console.log(result)
    return result
}