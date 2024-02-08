// src/utils/logger.js
const path = require('path');
const fs = require('fs');

function logToFile(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;

  const logFilePath = path.join(__dirname, '..', '..', 'logs', 'app.log');

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Erreur lors de l\'écriture dans le fichier de log :', err);
    }
  });
}

module.exports = {
  logToFile,
};
