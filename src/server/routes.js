// routes.js
const path = require('path');
const { logToFile } = require('../utils/logger');

function configureRoutes(app) {
  app.get('/', (req, res) => {
    const filePath = path.join(__dirname, '/../views/index.ejs'); // Modifier le chemin du fichier EJS

    res.render(filePath, (err, html) => { 
      if (err) {
        const errorMessage = `Erreur lors du rendu du fichier EJS : ${err}`;
        console.error(errorMessage);
        logToFile(errorMessage); // Enregistrer l'erreur dans le fichier de log
        res.status(500).send('Erreur interne du serveur');
      } else {
        res.send(html);
      }
    });
  });
}

module.exports = {
  configureRoutes,
};
