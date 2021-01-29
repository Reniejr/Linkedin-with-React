export const getUser = async (userId) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/profiles/${userId}`),
        result = await response.json()
    // console.log(result)
    return result
}
export const getAllProfiles = async (currentUser) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/profiles`),
        result = await response.json()
        // const allUser = result.filter(user => user.username !== currentUser)
        const allUser = result
        // console.log(allUser)
    return allUser
}

export const updateChannel = async (array, channelId, body) => {
    let updateArray = [...array]
    const index = updateArray.findIndex(channel => channel.chatId === channelId)
    updateArray[index].chat.push(body)
    // console.log(updateArray, channelId, index)
    return updateArray

}
