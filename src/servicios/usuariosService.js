const MongoLib = require('../lib/mongo');

class UsuariosService {
    constructor() {
        this.collection = 'usuarios';
        this.mongoDB = new MongoLib();
    }

    async getUsuarios(query) {
        console.log("Antes de llamar a getAll de MongoLib en usuarios");
        const usuarios = await this.mongoDB.getAll(this.collection, query);
        console.log("Después de llamar a getAll de MongoLib en usuarios");
        return usuarios || [];
    }
}

module.exports = UsuariosService;
