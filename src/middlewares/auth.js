const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) =>{
  const authHeader = req.headers.authorization;
  if(!authHeader){
    return res.status(401).send({error: 'nenhum token cadastrado'});
  }

  const splitedToken = authHeader.split(' ');

  if(splitedToken.lenght === 2){
    return res.status(401).send({error: 'token invalido'});
  }

  const [ scheme, token ] = splitedToken;

  if(!(/^Bearer$/i.test(scheme))){
    return res.status(401).send({error: 'Token com erro'});
  }

  jwt.verify(token, authConfig.secret, (err, decoded)=>{
    if(err){
      return res.status(401).send({error: 'token invalido'});
    }
    
    req.userId = decoded.id;

    return next();
  });
};