require('dotenv').config();
const {MongoClient} = require('mongodb');

let singleton;

async function connect() {

    if (singleton) {
        return singleton;
        console.log('Servidor conectado');
        
    }
    const client = new MongoClient(process.env.MONGODB_HOST);
    await client.connect();

    client.db(process.env.MONGODB_DATABASE);
    singleton = client.db(process.env.MONGODB_DATABASE);
    return singleton;
}

async function insert(customer){
    const db = await connect();
    return db.collection('customers').insertOne(customer);
}

module.exports = {
    insert
}