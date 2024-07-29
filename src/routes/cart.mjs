import { Router } from 'express';
import { validationResult, checkSchema } from "express-validator";
import { createCartSchema } from '../utils/validationSchemas.mjs';
const router = Router()

router.post("/api/cart", checkSchema(createCartSchema), (request, response) => {
    if (!request.session.user) return response.sendStatus(401)

    const result = validationResult(request) //check for errors in the request

    if (!result.isEmpty()) {
        return response.status(400).send({ errors: result.array() })
    }
    const { body: item } = request
    const { cart } = request.session

    if (cart) {
        cart.push(item)
    } else {
        request.session.cart = [item]
    }

    return response.status(201).send(item)
})

router.get("/api/cart", (request, response) => {
    if (!request.session.user) return response.sendStatus(401)
    return response.send(request.session.cart) ?? []
})

export default router