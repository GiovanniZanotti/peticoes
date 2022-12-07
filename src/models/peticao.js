const mongoose = require('../database/dbConnection');

const Peticao = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  assinados: [
    {
        type: String,
    }
  ],
  dataCriacao: {
    type: Date,
    default: Date.now
  },
  criador: {
    type: String
  },
  descricao: {
    type: String,
    required: true
  },
  imagem: {
    type: String,
    required: true
  }
});

const Usuario = mongoose.model('peticao', Peticao);

module.exports = Usuario;