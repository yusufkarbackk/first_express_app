import { Router } from "express";
const router = Router()

router.get("/api/products", (request, response) => {
    request.sessionStore.get(request.sessionID, (err, session) => {
        console.log(session)
    })

    return request.session.user ? response.status(200).send([{
        id: 123, name: "chiken breast", price: 12.99
    }]) :
        response.status(401).send({ msg: "Not Authenticated" })
})

export default router