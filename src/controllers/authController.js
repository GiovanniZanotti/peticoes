const express = require('express');
const UsuarioModel = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')

generateToken = (params) => jwt.sign({id: String(params.id)}, authConfig.secret, authConfig.expires);

router.post('/cadastrar', async(req, res)=>{
  try{
    await UsuarioModel.create(req.body);
    res.send({status: 'Usuario cadastrado'});
  }catch(e){
    return res.status(400).send({error: 'erro no cadastro'});
  }
});

router.post('/login', async(req, res)=>{
  const { email, senha } = req.body;
  console.log(`usuario ${email} logando`);
  try{
    const Usuario = await UsuarioModel.findOne({email}).select('+senha');
    
    if(!(Usuario && await bcrypt.compare(senha, Usuario.senha)))
      return res.status(401).send({error: 'usuario ou senha incorreta'});
  
    return res.send({token: generateToken(Usuario), id: Usuario.id});
  }catch(e){
    return res.status(400).send({error: 'erro no login'});
  }
});

module.exports = app => app.use('/usuario', router);
