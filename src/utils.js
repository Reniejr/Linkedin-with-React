export const getAllProfiles = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/profiles`),
        result = await response.json()
        // const allUser = result.filter(user => user.username !== currentUser)
        const allUser = result
        // console.log(allUser)
    return allUser
}
