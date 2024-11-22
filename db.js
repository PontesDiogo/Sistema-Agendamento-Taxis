const { name } = require('ejs');
const { ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'AgendaTaxi';
const connectionString = url + '/' + dbName;
const client = new MongoClient(connectionString);
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function question(prompt) {
  return new Promise((resolve, reject) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

module.exports = { question };

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
  console.log('Método insert chamado com sucesso'); 
  
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


async function confirmDelete(id) {
  const db = client.db(dbName);
  const collection = db.collection('customers');
  const doc = await collection.findOne({_id: id});
  if (doc) {
    // Exibe a confirmação de exclusão
    console.log(`Tem certeza que deseja excluir o documento com ID ${id}? (s/n)`);
    const response = await readline.question('');
    if (response.toLowerCase() === 's') {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

async function remove(id) {
  const db = client.db(dbName);
  const collection = db.collection('customers');
  const result = await collection.deleteOne({_id: id});
  return result;
}

async function find() {
    const db = client.db(dbName);
    const collection = db.collection('customers');
    const customers = await collection.find().toArray();
    return customers;
  }

module.exports = {
  connect,
  close,
  insert,
  read,
  update,
  remove,
  find,
};