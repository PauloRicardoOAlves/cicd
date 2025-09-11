const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

const app = express();
app.use(express.json());

// Habilita CORS para todas as origens
app.use(cors());

// Inicializa tabela
const initDB = async () => {
  try {
    const client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name TEXT
      )
    `);
    client.release();
    console.log('Banco de dados pronto.');
  } catch (err) {
    console.error('Erro ao inicializar o banco:', err);
  }
};

initDB();

// Rotas
app.get('/api/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

app.post('/api/items', async (req, res) => {
  const { name } = req.body;
  try {
    await pool.query('INSERT INTO items (name) VALUES ($1)', [name]);
    res.json({ message: 'Item inserido!' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
