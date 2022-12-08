const supertest = require('supertest');
const app = require('../index');

token = "";
peticaoId = "";

describe('usuario', () => {
    describe('rota para cadastrar um usuario', () => {

        let id = Math.floor(Math.random() * 100001);

        it('deve retornar o codigo 200', async () => {
            await supertest(app).post("/usuario/cadastrar")
            .send({ 
                "nome": "Giovanni", 
                "email": `"giovanni${id}@gmail.com`, 
                "senha": "123456"
              }).expect(200);
        });
    });

    describe('rota para logar um usuario(retorna o token de autenticacao)', () => {
        it('deve retornar o codigo 200', async () => {
            await supertest(app).post("/usuario/login")
            .send({ 
                "nome": "Giovanni", 
                "email": "giovanni@gmail.com", 
                "senha": "123456"
                }).expect(200)
                .then((req) => {
                    token = req.body.token;
                })
        });
    });
});

describe('peticao', () => {

    describe('rota para todas as peticoes', () => {
        it('deve retornar o codigo 200', async () => {
            await supertest(app).get("/peticao").expect(200);
        });
    });

    describe('rota para uma unica peticao', () => {
        it('deve retornar o codigo 200', async () => {
            await supertest(app).get("/peticao/6392674ac7a00c6fb2c5bbce")
            .set('Authorization', 'bearer '+token)
            .expect(200);
        });
    });

    describe('rota para cadastrar uma peticao', () => {
        it('deve retornar o codigo 200', async () => {
            await supertest(app).post("/peticao/cadastrarPeticao")
            .set('Authorization', 'bearer '+token)
            .send({
                "titulo": "reforma",
                "assinados": [],
                "criador": "63914317edd963dae8079d04",
                "descricao": "reforma no campus",
                "imagem": "http://image"
              })
              .expect(200)
              .then((req) => {
                peticaoId = req.body._id;
            })
        });
    });

    describe('rota para assinar uma peticao', () => {
        it('deve retornar o codigo 200', async () => {
            await supertest(app).post("/peticao/assinar/"+peticaoId)
            .set('Authorization', 'bearer '+token)
            .send({ 
                "idUsuario":"63914317edd963dae8079d04"
              }).expect(200);
        });
    });

    describe('rota para deletar uma peticao com usuario nao autenticado', () => {
        it('deve retornar o codigo 403', async () => {
            await supertest(app).del("/peticao/deletar/6392669ab3bccbb79915dfb4") 
            .send({ 
                "idUsuario":"63914317edd963dae8079d04"
              }).expect(401);
        });
    });

    describe('rota para editar uma peticao', () => {

        let idAlteracao = Math.floor(Math.random() * 101);

        it('deve retornar o codigo 200', async () => {
            await supertest(app).put("/peticao/atualizarPeticao")
            .set('Authorization', 'bearer '+token)
            .send({
                "_id": "63926b210062d5547376d827",
                "titulo": "reforma 2",
                "criador": "63914317edd963dae8079d04",
                "idUsuario":"63914317edd963dae8079d04",
                "descricao": "reforma no campus2"
            }).expect(200);
        });
    });

    describe('rota para retornar todas as peticoes assinadas pelo usuario', () => {
        it('deve retornar o codigo 200', async () => {
            await supertest(app).get("/peticao/assinadas/63914317edd963dae8079d04")
            .set('Authorization', 'bearer '+token)
            .expect(200);
        });
    });

});