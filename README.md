
Descrição das rotas da api, logo abaixo de cada endpoint, possui o formato json para o body da requisição.

endereço para acessar API: https://peticoes-giovannizanotti.vercel.app/

---Rotas usuario para autenticação---

usuario/cadastrar - rota usada para cadastrar um usuario

{ 
  "nome": "Giovanni", 
  "email": "giovanni@gmail.com", 
  "senha": "123456"
}

usuario/login - rota para autenticar um usuario, retornando um token

{ 
  "nome": "Giovanni", 
  "email": "giovanni@gmail.com", 
  "senha": "123456"
}



---Rotas peticao para gerenciar as peticoes---

peticao - rota para receber todas as peticoes

peticao/:idPeticao - rota para receber uma peticao especifica

peticao/cadastrarPeticao - rota para cadastrar uma peticao

{
  "titulo": "reforma",
  "assinados": [],
  "criador": "Giovanni",
  "descricao": "reforma no campus",
  "imagem": "http://image"
}

peticao/assinar/:idPeticao - rota para um usuario assinar uma peticao

{ 
  "idUsuario":""
}

peticao/deletar/:peticaoId - rota para deletar uma peticao

{ 
  "idUsuario":"638fed52b6e678387e0472da"
}

peticao/atualizarPeticao - rota para atualizar um peticao

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

peticao/assinadas/:idUsuario - rota para retornar as peticoes que o usuario assinou