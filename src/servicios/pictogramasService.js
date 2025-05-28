const MongoLib = require('../lib/mongo');

class PictogramasService {
    constructor() {
        this.collection = 'pictogramas';
        this.mongoDB = new MongoLib();
    }

    async getPictogramas(query) {
    console.log("Antes de llamar a getAll de MongoLib");
    const pictos = await this.mongoDB.getAll(this.collection, query);
    console.log("Después de llamar a getAll de MongoLib");
    return pictos || [];
    }

}

module.exports = PictogramasService;
