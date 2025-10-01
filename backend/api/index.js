const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Teszt route
app.get('/', (req, res) => {
  res.send('Tower Defense API működik 🚀');
});

// Példa játékos lista
app.get('/players', (req, res) => {
  res.json([
    { id: 1, name: "Player1" },
    { id: 2, name: "Player2" }
  ]);
});

// Port beállítás
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API fut a http://localhost:${PORT} címen`);
});
