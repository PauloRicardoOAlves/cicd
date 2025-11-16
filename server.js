const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');
const { log } = require('console');

dotenv.config();

let lista = [
  {
    "nome": "Alberto",
    "idade": 37,
    "email": "alberto@teste.com"
  },
  {
    "nome": "Bruna",
    "idade": 45,
    "email": "bruna@teste.com"
  }
]

const app = express();
app.use(express.json());

app.use(cors());

// Rotas
app.get("/itens", (req, res) => {
  console.log("chegou")
  return res.status(200).json(lista)
})

app.post("/itens", (req, res) => {
  const body = req.body
  
  const verificacao = lista.find(e => {
    return e.email == body.email
  })

  console.log(verificacao);

  if(verificacao){
    return res.status(400).json({"erro": "O e-mail já cadastrado!"})
  }

  lista.push(body)

  return res.status(201).json(body)
})

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(3000)
}

module.exports = app

