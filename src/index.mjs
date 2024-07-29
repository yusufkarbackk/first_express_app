import express from "express";
import usersRoute from './routes/users.mjs';
import productsRoute from './routes/products.mjs'
import cartRoute from './routes/cart.mjs'
import authRoute from './routes/auth.mjs'
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import "./strategies/local-strategy.mjs"

const app = express()
dotenv.config()
const mongoUri = process.env.MONGO_URI
mongoose.connect(mongoUri)
    .then(() => console.log("connected to database"))
    .catch((err) => console.log(`Error: ${err}`))

app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
    }
}))
app.use(passport.authenticate('session'))
app.use(usersRoute)
app.use(productsRoute)
app.use(cartRoute)
app.use(authRoute)
app.use(passport.initialize())
app.use(passport.session())
const PORT = process.env.PORT || 3000

app.get("/", (request, response) => {
})

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})