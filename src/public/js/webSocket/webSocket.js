// src/js/webSocket/webSocket.js
const messageContainer = document.getElementById('message-container');
const ws = new WebSocket('ws://localhost:3000');

ws.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);
    console.log('Parsed data:', data);

    if (data.numbers !== undefined) {
      console.log('Le message existe :', data.numbers);
      messageContainer.innerText = `La liste de nombres aléatoires est : ${data.numbers.join(', ')}`;
    }
  } catch (error) {
    console.error('Erreur lors de la parse du JSON:', error);
  }
};

function sendMessage(action) {
  console.log(`Demande d'action: ${action}`);
  ws.send(JSON.stringify({ action }));
}

function connectToServer() {
  sendMessage('connect');
}

function disconnectFromServer() {
  sendMessage('disconnect');
}

function startReading() {
  sendMessage('startReading');
}

function stopReading() {
  sendMessage('stopReading');
}

ws.onerror = (error) => {
  console.error('Erreur WebSocket côté client :', error);
};

ws.onopen = () => {
  console.log('Connexion au serveur établie');
};

ws.onclose = () => {
  console.log('Connexion au serveur fermée');
};