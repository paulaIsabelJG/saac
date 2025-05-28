const express = require("express");
const UsuariosService = require("../servicios/usuariosService");

function usuariosAPI(app) {
  const router = express.Router();
  app.use("/api/usuarios", router);

  const usuariosService = new UsuariosService();

  router.get("/", async function (req, res, next) {
    try {
      console.log("Entrando al endpoint de usuarios");
      const usuarios = await usuariosService.getUsuarios({});
      console.log("Usuarios obtenidos:", usuarios.length);
      res.status(200).json({
        data: usuarios,
        message: "Usuarios devueltos con éxito",
      });
    } catch (err) {
      console.log("Error en el endpoint:", err);
      next(err);
    }
  });
}

module.exports = usuariosAPI;
