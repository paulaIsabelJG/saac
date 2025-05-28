const express = require("express");
const FrasesService = require("../servicios/frasesService");
const router = express.Router();

function frasesAPI(app) {
  app.use("/api/frases", router);

  const frasesService = new FrasesService();

  // Crear frase
  router.post("/", async (req, res, next) => {
    try {
      const created = await frasesService.createFrase(req.body);
      res
        .status(201)
        .json({ data: created, message: "Frase guardada con éxito" });
    } catch (err) {
      next(err);
    }
  });

  // Obtener frases (todas o por fecha, pero siempre por usuario_id)
  router.get("/", async (req, res, next) => {
    try {
      const { usuario_id, desde, hasta } = req.query;
      if (!usuario_id) {
        return res.status(400).json({ message: "Falta el parámetro usuario_id" });
      }
      let frases;
      if (desde && hasta) {
        frases = await frasesService.getFrasesPorFecha(usuario_id, desde, hasta);
      } else {
        frases = await frasesService.getFrases(usuario_id);
      }
      res
        .status(200)
        .json({ data: frases, message: "Frases devueltas con éxito" });
    } catch (err) {
      next(err);
    }
  });

  // Eliminar frase por id
  router.delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await frasesService.deleteFrase(id);
      res
        .status(200)
        .json({ data: deleted, message: "Frase eliminada con éxito" });
    } catch (err) {
      next(err);
    }
  });

}

module.exports = frasesAPI;
