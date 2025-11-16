const request = require("supertest");
const app = require("../app"); // ajuste o caminho se necessário

describe("Testes da API /itens", () => {

  test("GET /itens deve retornar lista com 2 itens iniciais", async () => {
    const response = await request(app).get("/itens");
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
  });

  test("POST /itens deve adicionar novo item", async () => {
    const novo = {
      nome: "Carlos",
      idade: 30,
      email: "carlos@teste.com"
    };

    const response = await request(app)
      .post("/itens")
      .send(novo);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(novo);
  });

  test("POST /itens não deve permitir e-mail duplicado", async () => {
    const duplicado = {
      nome: "Bruna",
      idade: 45,
      email: "bruna@teste.com"
    };

    const response = await request(app)
      .post("/itens")
      .send(duplicado);

    expect(response.status).toBe(400);
    expect(response.body.erro).toBe("O e-mail já cadastrado!");
  });

});
