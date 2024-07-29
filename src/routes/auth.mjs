import passport from "passport";

import { Router } from 'express';

const router = Router()

router.post("/api/auth", passport.authenticate("local"), (request, response) => {
    console.log(request.user)
    response.sendStatus(200)
})

router.post("/api/auth/logout", (request, response) => {
    if (!request.user) return response.sendStatus(401)
    request.logOut((err) => {
        if (err) return response.sendStatus(400)
        response.send(200)
    })
})


router.get("/api/auth/status", (request, response) => {
    console.log('Session:', request.session);
    console.log('User:', request.user);

    return request.user ? response.send(request.user) : response.sendStatus(401)
})

export default router