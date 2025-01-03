var express = require('express');
var router = express.Router();
const db = require('../db');


/* GET home page. */
router.get('/', async(req, res, next) => {
  const result = await db.find();
  res.render('index', { title: 'Express' , result});
});

router.post('/save', async(req, res) =>{
  console.log('Rota /save chamada!');
  
  const customer = req.body;
  const result = await db.insert(customer);
  console.log(result);
  res.json(result);
  });


// router.delete('/delete/:id', async (req, res) => {
//   const id = req.params.id;
//   const objectId = new ObjectId(id);

//   // Verifica se o usuário realmente quer deletar
//   const confirm = await db.confirmDelete(objectId);
//   if (confirm) {
//     const result = await db.remove(objectId);
//     res.json(result);
//   } else {
//     res.status(400).json({ message: 'Exclusão cancelada' });
//   }
// });

// router.delete('/delete/:id', async (req, res) => {
//   const id = req.params.id;
//   const objectId = new ObjectId(id);
//   const confirm = await db.confirmDelete(objectId);
//   if (confirm) {
//     const result = await db.remove(objectId);
//     res.json(result);
//   } else {
//     res.status(400).json({ message: 'Exclusão cancelada' });
//   }
// });
router.post('/delete', async(req, res) =>{
  console.log('Rota /delete chamada!');
  
  const id = req.body.id;
  const result = await db.delete(id);
  console.log(result);
  res.json(result);
  });

console.log('Conectado ao banco de dados!');

module.exports = router;
