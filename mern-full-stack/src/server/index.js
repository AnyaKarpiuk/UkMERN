const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

const server = express();

const dbname = 'myDatabase'; 

server.use(express.static('dist'));

//the URL from the database
const dbroute = process.env.MONGODB_URL || `mongodb+srv://Anna:Blah2020!@cluster0-o8zv3.mongodb.net/test`;

let db;

//connect to the database
MongoClient.connect(dbroute, (err, client) => {
  if (err) throw err;
  db = client.db(dbname);
  server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
});

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//retrieve all places objects from the database
server.get('/api/places', (req, res) => {
  db.collection('places').find().toArray((err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

//retrieve all food objects from the database
server.get('/api/food', (req, res) => {
  db.collection('food').find().toArray((err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

//retrieve places with a specific id from the database
server.get('/api/places/:id', (req, res) => {
  db.collection('places').findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

//retrieve food with a specific id from the database
server.get('/api/food/:id', (req, res) => {
  db.collection('food').findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

//delete place with a specific id from the database
server.delete('/api/places', (req, res) => {
  db.collection('places').deleteOne( {_id: new ObjectID(req.body.id) }, err => {
    if (err) return res.send(err);

    console.log('deleted from database');
    return res.send({ success: true });
  });
});

//delete food with a specific if from the database
server.delete('/api/food', (req, res) => {
  db.collection('food').deleteOne( {_id: new ObjectID(req.body.id) }, err => {
    if (err) return res.send(err);

    console.log('deleted from database');
    return res.send({ success: true });
  });
});

//create a new place
server.post('/api/places', (req, res) => {
  db.collection('places').insertOne(req.body, (err, result) => {
    if (err) throw err;

    console.log('created in database');
    res.redirect('/');
  });
});

//create a new food
server.post('/api/food', (req, res) => {
  db.collection('food').insertOne(req.body, (err, result) => {
    if (err) throw err;

    console.log('created in database');
    res.redirect('/');
  });
});

//update a place
server.put('/api/places', (req, res) => {
  
  const id  = req.body._id;
  
  delete req.body._id;
  
  db.collection('places').updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});

//update a food
server.put('/api/food', (req, res) => {
  
  const id  = req.body._id;
  
  delete req.body._id;
  
  db.collection('food').updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});
