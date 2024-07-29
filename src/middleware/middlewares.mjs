import { mockUsers } from "../utils/contstants.mjs"

export const resolveIndexByUserId = (request, response, next) => {
    const { params: { id } } = request // get the id from params
    const parsedId = parseInt(id)

    if (isNaN(parsedId)) return response.sendStatus(400)
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId)
    if (findUserIndex === -1) return response.sendStatus(404)
    request.findUserIndex = findUserIndex
    next()
}