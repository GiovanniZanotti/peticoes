
Descrição das rotas da api, logo abaixo de cada endpoint, possui o formato json para o body da requisição.

Endereço para acessar API: https://peticoes-giovannizanotti.vercel.app/



---Rotas usuario para autenticação---

[POST] usuario/cadastrar - rota usada para cadastrar um usuario

{ 
  "nome": "Giovanni", 
  "email": "giovanni@gmail.com", 
  "senha": "123456"
}



[POST] usuario/login - rota para autenticar um usuario, retornando um token

{ 
  "nome": "Giovanni", 
  "email": "giovanni@gmail.com", 
  "senha": "123456"
}



---Rotas peticao para gerenciar as peticoes---

[GET] peticao - rota para receber todas as peticoes



[GET] peticao/:idPeticao - rota para receber uma peticao especifica(deve-se passar o id de uma peticao como parâmentro na url)



[POST] peticao/cadastrarPeticao - rota para cadastrar uma peticao(no campo criador, é utilizado o nome do usuário)

{
  "titulo": "reforma",
  "assinados": [],
  "criador": "Giovanni",
  "descricao": "reforma no campus",
  "imagem": "http://image"
}



[POST] peticao/assinar/:idPeticao - rota para um usuario assinar uma peticao(deve-se passar o id de uma peticao como parâmetro na url)

{ 
  "idUsuario":"638fed52b6e678387e0472da"
}



[DELETE] peticao/deletar/:peticaoId - rota para deletar uma peticao(deve-se passar o id de uma peticao como parâmetro na url)

{ 
  "idUsuario":"638fed52b6e678387e0472da"
}



[PUT] peticao/atualizarPeticao - rota para atualizar um peticao

{
    "_id": "638f3c94f0c2b25149e9e0f1",
    "titulo": "cinema",
    "assinados": [
        "638e5ee987f2ad4dd39dcdfb"
    ],
    "criador": "638e5ee987f2ad4dd39dcdfb",
    "descricao": "cinema no campus",
    "imagem": "http://image",
    "dataCriacao": "2022-12-06T12:59:00.478Z",
    "__v": 0
}



[GET] peticao/assinadas/:idUsuario - rota para retornar as peticoes que o usuario assinou(deve-se passar o id de um usuário como parâmetro na url)


