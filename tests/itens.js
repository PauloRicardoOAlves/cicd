const request = require("supertest");
const app = require("../server"); 

describe("Testando POST /itens", () => {
  let lista;

  beforeEach(() => {
    lista = [
      { email: "teste@gmail.com" }
    ];

    app.locals.lista = lista;
  });

  test("Não deve cadastrar se o email já existir", async () => {
    const res = await request(app)
      .post("/itens")
      .send({ email: "teste@gmail.com" });

    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toBe("O e-mail já está cadastrado!");
  });

  test("✔ Deve cadastrar se o email for novo", async () => {
    const res = await request(app)
      .post("/itens")
      .send({ email: "novo@gmail.com" });

    expect(res.statusCode).toBe(200);
    expect(res.body.mensagem).toBe("Cadastro realizado com sucesso!");
  });
});
