const { MongoClient, ObjectId } = require("mongodb");
const { config } = require("../config/index");

const MONGO_URI = "mongodb+srv://pijuanesgi_inf:1234@cluster0.nmdnx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI);
    this.dbName = config.DB_NAME;
  }

  async connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = this.client.connect().then(() => {
        console.log("Conectado a la BBDD");
        return this.client.db(this.dbName);
      }).catch((err) => {
        console.error("error en la conexión con la BBDD", err);
        throw err;
      });
    }
    return MongoLib.connection;
  }

  getAll(collection, query = {}) {
    console.log("getAll llamado en MongoLib", collection, query);
    return this.connect().then((db) =>
      db.collection(collection).find(query).toArray()
    );
  }

  async create(collection, data) {
    const db = await this.connect();
    const result = await db.collection(collection).insertOne(data);
    return result.insertedId;
  }

  async delete(collection, id) {
  return this.connect().then((db) =>
    db.collection(collection).deleteOne({ _id: new ObjectId(id) })
  );
}

}

module.exports = MongoLib;
