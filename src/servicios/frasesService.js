const MongoLib = require("../lib/mongo");

class FrasesService {
  constructor() {
    this.collection = "frases";
    this.mongoDB = new MongoLib();
  }
  async getFrases(usuario_id) {
    return await this.mongoDB.getAll(this.collection, {
      usuario_id: usuario_id,
    });
  }

  async getFrasesPorFecha(usuario_id, desde, hasta) {
    const query = {
      usuario_id: usuario_id,
    };
    if (desde && hasta) {
      query.inicio = { $gte: new Date(desde), $lte: new Date(hasta) };
    }
    return await this.mongoDB.getAll(this.collection, query);
  }

  async createFrase(frase) {
    if (frase.userId && !frase.usuario_id) {
      frase.usuario_id = frase.userId;
      delete frase.userId;
    }
    if (!frase.usuario_id) {
      throw new Error("Falta usuario_id");
    }

    // Convierte inicio y fin a Date si son strings
    if (frase.inicio && typeof frase.inicio === "string") {
      frase.inicio = new Date(frase.inicio);
    }
    if (frase.fin && typeof frase.fin === "string") {
      frase.fin = new Date(frase.fin);
    }

    return await this.mongoDB.create(this.collection, frase);
  }

  async deleteFrase(id) {
    return await this.mongoDB.delete(this.collection, id);
  }
}

module.exports = FrasesService;
