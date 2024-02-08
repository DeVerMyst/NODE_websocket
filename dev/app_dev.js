// app.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let readingInterval;

wss.on('connection', (ws) => {
  console.log('Client connecté');

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    handleClientAction(ws, data);
  });

  ws.on('close', () => {
    console.log('Client déconnecté');
  });
});

function handleClientAction(ws, data) {
  switch (data.action) {
    case 'connect':
      console.log('Client demande la connexion');
      // Répondre au client avec un message de connexion réussie
      ws.send(JSON.stringify({ action: 'connect', status: 'success' }));
      break;
    case 'disconnect':
      console.log('Client demande la déconnexion');
      // Répondre au client avec un message de déconnexion réussie
      ws.send(JSON.stringify({ action: 'disconnect', status: 'success' }));
      break;
    case 'startReading':
      console.log('Client demande de démarrer la lecture');
      startReading(ws);
      // Répondre au client avec un message de démarrage de la lecture réussi
      ws.send(JSON.stringify({ action: 'startReading', status: 'success' }));
      break;
    case 'stopReading':
      console.log('Client demande d\'arrêter la lecture');
      stopReading();
      // Répondre au client avec un message d'arrêt de la lecture réussi
      ws.send(JSON.stringify({ action: 'stopReading', status: 'success' }));
      break;
    default:
      console.log('Action non reconnue');
      // Répondre au client avec un message d'action non reconnue
      ws.send(JSON.stringify({ action: data.action, status: 'error', message: 'Action non reconnue' }));
  }
}

// function startReading(ws) {
//   if (!readingInterval) {
//     readingInterval = setInterval(() => {
//       const randomValue = Math.floor(Math.random() * 100);
//       const message = `Le nombre aléatoire est : ${randomValue}`;
//       console.log(randomValue)
//       ws.send(JSON.stringify({ action: 'startReading', status: 'success', message }));
//       broadcastServerUpdate({ serverStatus: 'Reading' });
//     }, 1000);
//   }
// }

function startReading(ws) {
  if (!readingInterval) {
    readingInterval = setInterval(() => {
      const randomNumbers = generateRandomNumbers(5); // Générer une liste de 5 nombres aléatoires
      const message = `La liste de nombres aléatoires est : ${randomNumbers.join(', ')}`;
      ws.send(JSON.stringify({ action: 'startReading', status: 'success', numbers: randomNumbers }));
      broadcastServerUpdate({ serverStatus: 'Reading' });
    }, 1000);
  }
}

function generateRandomNumbers(count) {
  const randomNumbers = [];
  for (let i = 0; i < count; i++) {
    randomNumbers.push(Math.floor(Math.random() * 100));
  }
  return randomNumbers;
}

function stopReading() {
  clearInterval(readingInterval);
  readingInterval = null;
  broadcastServerUpdate({ serverStatus: 'Stopped' });
}

function broadcastServerUpdate(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ action: 'serverUpdate', data }));
    }
  });
}

// Configurer le serveur HTTP
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('Serveur en écoute sur le port 3000');
});
