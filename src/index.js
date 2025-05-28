const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const { config } = require('./config/index');
const { logErrors, errorHandler } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
const validationHandler = require('./utils/middleware/validationHandler');

const pictogramasAPI = require('./routes/pictogramas');
const frasesAPI = require('./routes/frases');
const usuariosAPI = require('./routes/usuarios');

console.log("✅ Backend iniciado");

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Rutas API
pictogramasAPI(app);
frasesAPI(app);
usuariosAPI(app);

// Servir Angular (SPA) estático DESPUÉS de las rutas API
app.use(express.static('public'));


// Middlewares de error
app.use(logErrors);
app.use(errorHandler);
app.use(notFoundHandler);
app.use(validationHandler);

app.listen(config.port, () => {
  console.log(`Servidor escuchando en puerto ${config.port}`);
});
