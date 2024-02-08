// src/server/app.js
const path = require('path');
const express = require('express');
const http = require('http');

require('dotenv').config();

const { configureSockets } = require('./sockets');
const { configureRoutes } = require('./routes');

const { logToFile } = require('../utils/logger');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// Configuration du moteur de modèle EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/js', express.static(path.join(__dirname, '../public/js')));

// Configurer les sockets
configureSockets(server);

// Configurer les routes
configureRoutes(app);

server.listen(PORT, () => {
  logToFile(`Serveur en écoute sur le port ${PORT}`);
  console.log(`Serveur en écoute sur le port ${PORT}`);
});

