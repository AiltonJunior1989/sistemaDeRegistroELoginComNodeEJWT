import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Por favor add o nome do usuário']
  },
  email: {
    type: String,
    required: [true, 'Por favor add o endereço de email'],
    unique: [true, 'Email adress already taken']
  },
  password: {
    type: String,
    required: [true, 'Por favor add a senha do usuário']
  }
},
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);