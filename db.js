const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'AgendaTaxi';
const connectionString = url + '/' + dbName;
const client = new MongoClient(connectionString);

async function connect() {
  await client.connect();
  console.log('Conectado ao banco de dados!');
}

async function close() {
  await client.close();
  console.log('Conexão com o banco de dados fechada!');
}

async function insert(customer) {
  const db = client.db(dbName);
  const collection = db.collection('customers');
  const result = await collection.insertOne(customer);
  return result;
}

async function read() {
  const db = client.db(dbName);
  const collection = db.collection('customers');
  const customers = await collection.find().toArray();
  return customers;
}

async function update(id, customer) {
  const db = client.db(dbName);
  const collection = db.collection('customers');
  const result = await collection.updateOne({_id: id}, {$set: customer});
  return result;
}

async function remove(id) {
  const db = client.db(dbName);
  const collection = db.collection('customers');
  const result = await collection.deleteOne({_id: id});
  return result;
}

module.exports = {
  connect,
  close,
  insert,
  read,
  update,
  remove,
};