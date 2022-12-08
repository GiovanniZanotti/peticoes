const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Peticao = require('../models/peticao');


const router = express.Router();

router.get('/', async(req, res)=>{
  try{
    const peticao = await Peticao.find();
    return res.send(peticao);
  }catch(e){
    return res.status(400).send({status: `erro ao receber peticoes`});
  }
});

router.get('/assinadas/:idUsuario', async(req, res)=>{
  let idUsuario = req.params.idUsuario;
  try{
    const peticoes = await Peticao.find();

    const peticoesSigned = [];

    if(peticoes != null){

      for(let i = 0; i < peticoes.length; i++){
        if(peticoes[i].assinados.length > 0){
          for(let j = 0; j < peticoes[i].assinados.length; j++){
            if(peticoes[i].assinados[j] == idUsuario){
              peticoesSigned.push(peticoes[i]);
            }
          }
        }
        else{
          console.log("peticao vazia");
        }
      }
    }else{
      console.log("não existem peticoes");
    }

    return res.send(peticoesSigned);
  }catch(e){
    return res.status(400).send({status: `erro ao receber peticoes assinadas`});
  }
});

router.get('/:peticaoId', async(req, res)=>{
  const peticaoId = req.params.peticaoId;
  try{
    const peticao = await Peticao.findById(peticaoId);
    return res.send(peticao);
  }catch(e){
    return res.status(404).send({status: `erro ao receber peticao com o id ${peticaoId}`});
  }
});

router.use(authMiddleware);

router.post('/cadastrarPeticao', async (req, res)=>{
  const { titulo, descricao, criador, imagem } = req.body;
  try{
    const peticao = await Peticao.create({
      titulo: titulo,
      descricao: descricao,
      criador: criador,
      imagem: imagem
    });
    return res.send({status: `peticao ${titulo} foi cadastrada`, '_id': String(peticao._id)});
  }catch(e){
    return res.status(400).send({error: `erro ao cadastrar peticao ${titulo}`});
  }
});

router.put('/atualizarPeticao', async(req, res)=>{
  let idPeticao = req.body._id;
  try{
    const peticao = await Peticao.findById(idPeticao);
    if(peticao.criador !== req.body.idUsuario)
      return res.status(403).send({error: `usuario incorreto`});
    const obj = {};
    if(req.body.titulo)
      obj['titulo'] = req.body.titulo;
    if(req.body.descricao)
      obj['descricao'] = req.body.descricao;
      if(req.body.imagem)
      obj['imagem'] = req.body.imagem;
  
    if(!Object.keys(obj).length)
      res.status(400).send({status: 'peticao não atualizada'});
  
    await Peticao.updateOne({_id: idPeticao}, obj);
  
    return res.send({status: `peticao ${idPeticao} atualizada`});
  } catch(e){
    res.status(400).send({error: `erro ao atualizar peticao ${idPeticao}`});
  }
});

router.post('/assinar/:idPeticao', async(req, res)=>{
  let idPeticao = req.params.idPeticao;
  try{
    const peticao = await Peticao.findById(idPeticao);
    if(!peticao)
      return res.status(404).send({error: `peticao ${idPeticao} não encontrada`});
    if(!peticao.assinados.includes(String(req.body.idUsuario)))
      peticao.assinados.push(String(req.body.idUsuario));
    else
     return res.status(302).send({error: `peticao ${idPeticao} ja assinada`});
    await Peticao.updateOne({_id: idPeticao}, peticao);
    return res.send({status: `peticao ${idPeticao} assinada com sucesso`});
  }catch(e){
    return res.status(400).send({status: `erro ao assinar peticao ${idPeticao}`});
  }
});

router.delete('/deletar/:idPeticao', async (req,res)=>{
  let idPeticao = req.params.idPeticao;
  try{
    const peticao = await Peticao.findById(idPeticao);
    if(!peticao)
      return res.status(404).send({error: `peticao ${idPeticao} não encontrada`});
    if(peticao.criador !== req.body.idUsuario)
      return res.status(403).send({error: `usuario incorreto`});
    await Peticao.deleteOne({_id: idPeticao});
    return res.send({status: `peticao ${idPeticao} deletada com sucesso`});;
  }catch(e){
    return res.status(400).send({status: `erro ao deletar peticao ${idPeticao}`});
  }
});

module.exports = app => app.use('/peticao', router);