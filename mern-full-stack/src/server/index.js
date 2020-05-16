const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const withAuth = require('./middleware');

const server = express();

const dbname = 'myDatabase';

const secret = 'secret_should_not_be_in_git';

server.use(express.static('dist'));

//the URL from the database
const dbroute = process.env.MONGODB_URL || `mongodb+srv://Anna:Blah2020!@cluster0-o8zv3.mongodb.net/test`;

let db;

MongoClient.connect(dbroute, (err, client) => {
    if (err) throw err;
    db = client.db(dbname);
    server.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
});

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cookieParser());

mongoose.set('useCreateIndex', true);

mongoose.connect(
    process.env.MONGOLAB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    function (err) {
        if (err) {
            throw err;
        } else {
            console.log(`Successfully connected to ${process.env.MONGOLAB_URI}`);
        }
    }
);

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
    db.collection('places').findOne({ _id: new ObjectID(req.params.id) }, (err, result) => {
        if (err) throw err;

        console.log(result);
        res.send(result);
    });
});

//retrieve food with a specific id from the database
server.get('/api/food/:id', (req, res) => {
    db.collection('food').findOne({ _id: new ObjectID(req.params.id) }, (err, result) => {
        if (err) throw err;

        console.log(result);
        res.send(result);
    });
});

//delete place with a specific id from the database
server.delete('/api/places', (req, res) => {
    db.collection('places').deleteOne({ _id: new ObjectID(req.body.id) }, err => {
        if (err) return res.send(err);

        console.log('deleted from database');
        return res.send({ success: true });
    });
});

//delete food with a specific if from the database
server.delete('/api/food', (req, res) => {
    db.collection('food').deleteOne({ _id: new ObjectID(req.body.id) }, err => {
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

    const id = req.body._id;

    delete req.body._id;

    db.collection('places').updateOne({ _id: new ObjectID(id) }, { $set: req.body }, (err, result) => {
        if (err) throw err;

        console.log('updated in database');
        return res.send({ success: true });
    });
});

//update a food
server.put('/api/food', (req, res) => {

    const id = req.body._id;

    delete req.body._id;

    db.collection('food').updateOne({ _id: new ObjectID(id) }, { $set: req.body }, (err, result) => {
        if (err) throw err;

        console.log('updated in database');
        return res.send({ success: true });
    });
});

server.get("/api/users", function (req, res) {
    User.find({}, function (err, data) {
        if (err) throw err;
        res.send(data);
    });
});

server.post('/api/register', function (req, res) {
    const { email, password } = req.body;
    const user = new User({ email, password });
    user.save(function (err) {
        if (err) {
            console.log(err);
            res.status(500).send('Error registering new user please try again.');
        } else {
            res.status(200).send('Welcome to the club!');
        }
    });
});

server.post('/api/authenticate', function (req, res) {
    const { email, password } = req.body;
    User.findOne({ email }, function (err, user) {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        } else if (!user) {
            res.status(401)
                .json({
                    error: 'Incorrect email or password'
                });
        } else {
            user.isCorrectPassword(password, function (err, same) {
                if (err) {
                    res.status(500)
                        .json({
                            error: 'Internal error please try again'
                        });
                } else if (!same) {
                    res.status(401)
                        .json({
                            error: 'Incorrect email or password'
                        });
                } else {
                    // Issue token
                    const payload = { email };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    res.cookie('token', token, { httpOnly: true }).sendStatus(200);
                }
            });
        }
    });
});

server.get('/api/checkToken', withAuth, function (req, res) {
    res.sendStatus(200);
});

server.get('/api/logout', withAuth, function (req, res) {
    res.cookie('token', '', { httpOnly: true }).sendStatus(200);;
});

server.listen(process.env.PORT || 8080);
