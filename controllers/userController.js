import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"


// Registro de usuário
// Rota POST /api/users/register
// Pública
export const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    res.status(400)
    throw new Error("Preencha todos os campos");
  }
  const userAvailable = await User.findOne({ email })
  if (userAvailable) {
    res.status(400)
    throw new Error("Usuário já registrado.");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  console.log("Senha Hashed:", hashedPassword)

  const user = await User.create({
    username,
    email,
    password: hashedPassword
  })

  console.log(`Usuário criado ${user}`)
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email })
  } else {
    res.status(400)
    throw new Error("Dados do Usuário não são válidos")
  }
}
)
// Login de usuário
// Rota POST /api/users/login
// Pública
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error("Preencha todos os campos");
  }

  const user = await User.findOne({ email })
  // compara a senha com a senha criptografada
  if(user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({
      user: {
        username: user.username,
        email: user.email,
        id: user.id
      }
    },process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2m"}
  )
    res.status(200).json({accessToken})
  } else {
    res.status(401)
    throw new Error("Email ou senha inválidos")
  }
}
)

//@desc Informação do usuário atual
//@route Post /api/users/current
//@access private
export const currentUser = asyncHandler(async (req, res) => {
  console.log(req.user);
  res.json(req.user);
}
);