import { response, Router } from 'express';
import { mockUsers } from '../utils/contstants.mjs';
import { validationResult, body, matchedData, checkSchema } from "express-validator";
import { createUserValidationSchema } from '../utils/validationSchemas.mjs';
import { resolveIndexByUserId } from '../middleware/middlewares.mjs';
import { User } from '../mongoose/schemas/users.mjs';
import { hashPassword } from '../utils/helper.mjs';
const router = Router()

router.get("/api/users", (request, response) => {
    console.log(request.session)
    console.log(request.session.id)
    const { query: { filter, value } } = request //deconstructing query

    if (filter && value)
        return response.send(mockUsers.filter((user) => user[filter].includes(value)))
    return response.send(mockUsers)
})

router.post("/api/users", checkSchema(createUserValidationSchema), async (req, res) => {
    const result = validationResult(req)
    console.log(result)

    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() })
    }

    const data = matchedData(req)
    data.password = hashPassword(data.password)
    try {
        const newUser = new User(data)
        const savedUser = await newUser.save()
        console.log(savedUser)

        return res.status(201).send(savedUser)

    } catch (error) {
        console.log(error)
        return response.sendStatus(400)
    }
})

router.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { findUserIndex } = req

    const findUser = mockUsers[findUserIndex]
    if (!findUser) return res.sendStatus(404);
    return res.send(findUser)
})

router.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
    const { body, findUserIndex } = request
    mockUsers[findUserIndex] = { id: findUserIndex, ...body }
    return response.sendStatus(200)
})

router.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
    const { body, findUserIndex } = request // get the request body and the id from params

    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
    return response.sendStatus(200)
})

router.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
    const { findUserIndex } = request
    mockUsers.splice(findUserIndex, 1)
    return response.sendStatus(200)
})

export default router