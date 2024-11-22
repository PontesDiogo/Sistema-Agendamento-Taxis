const {MongoClient} = require('mongodb');

async function connect() {
    const client = new MongoClient(process.env.MONGODB_HOST);
    await client.connect();

    client.db(process.env.MONGODB_DATABASE);

    const db = client.db('test');
    return db;
}