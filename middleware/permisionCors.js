import cors from "cors"

export const permision = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5000/api/users/register")
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
  res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  app.use(cors())
  next()
}