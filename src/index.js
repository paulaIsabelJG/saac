const express = require('express');
const cors = require('cors');
const path = require('path'); // <--- Añade esto
const app = express();
const { config } = require('./config/index');
const { logErrors, errorHandler } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
const validationHandler = require('./utils/middleware/validationHandler');

const pictogramasAPI = require('./routes/pictogramas');
const frasesAPI = require('./routes/frases'); 
const usuariosAPI = require('./routes/usuarios'); 

console.log("✅ Backend iniciado");

// Middlewares
app.use(express.static(path.join(__dirname, '../public/dist/programa-saac/browser'))); // <--- CAMBIA ESTA LÍNEA
app.use(cors());
app.use(express.json());

// Rutas
pictogramasAPI(app);
frasesAPI(app);
usuariosAPI(app);

// "Catch-all" para el frontend Angular (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist/programa-saac/browser/index.html'));
});

// Middlewares de error (siempre después de las rutas)
app.use(logErrors);
app.use(errorHandler);
app.use(notFoundHandler);
app.use(validationHandler);

app.listen(config.port, () => {
    console.log(`Servidor escuchando en puerto ${config.port}`);
});
