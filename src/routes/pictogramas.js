const express = require("express");
const PictogramasService = require("../servicios/pictogramasService");

function pictogramasAPI(app) {
  const router = express.Router();
  app.use("/api/pictogramas", router);

  const pictogramasService = new PictogramasService();

  router.get("/", async function (req, res, next) {
    try {
      console.log("Entrando al endpoint de pictogramas");
      const pictos = await pictogramasService.getPictogramas({});
      console.log("Pictogramas obtenidos:", pictos.length);
      res.status(200).json({
        data: pictos,
        message: "Pictogramas devueltos con éxito",
      });
    } catch (err) {
      console.log("Error en el endpoint:", err);
      next(err);
    }
  });
}

module.exports = pictogramasAPI;
