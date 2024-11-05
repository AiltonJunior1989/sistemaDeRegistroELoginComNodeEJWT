import express, { json } from "express"
import dotenv from "dotenv"
import userRouter from "./routes/userRoutes.js"
import { erroHandler } from "./middleware/errorHandler.js"
import cors from "cors"
import { connectDb } from "./config/dbConnection.js"

dotenv.config()
connectDb()
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(json())
app.use('/api/users', userRouter)
app.use(erroHandler)
// app.use(permision)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}...`)
})