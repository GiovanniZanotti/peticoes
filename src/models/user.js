const mongoose = require('../database/dbConnection');
const bcrypt = require('bcryptjs')

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true
  },
  senha: {
    type: String,
    required: true,
    select: false
  }
});

UsuarioSchema.pre('save', async function (next){
  const hashPass = await bcrypt.hash(this.senha, 10);
  this.senha = hashPass;

  next();
});

const Usuario = mongoose.model('usuarios', UsuarioSchema);

module.exports = Usuario;