const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// HTTP szerver
const server = http.createServer(app);

// Socket.IO szerver
const io = new Server(server, {
  cors: {
    origin: "*",  // fejlesztés alatt engedélyezünk mindent
    methods: ["GET", "POST"]
  }
});

// Ha valaki csatlakozik
io.on('connection', (socket) => {
  console.log(`Új játékos csatlakozott: ${socket.id}`);

  // Ha mobot küld a másikhoz
  socket.on('sendMob', (data) => {
    console.log(`Mob indítva:`, data);
    // továbbítjuk a másik játékosnak
    socket.broadcast.emit('receiveMob', data);
  });

  // Ha tornyot épít/fejleszt
  socket.on('upgradeTower', (data) => {
    console.log(`Torony upgrade:`, data);
    socket.broadcast.emit('towerUpgraded', data);
  });

  // Ha kilép
  socket.on('disconnect', () => {
    console.log(`Játékos kilépett: ${socket.id}`);
  });
});

// Indítás
const PORT = process.env.GAME_PORT || 4000;
server.listen(PORT, () => {
  console.log(`Game-server fut a http://localhost:${PORT} címen`);
});
