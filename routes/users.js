const { request } = require('express');
let express = require('express');
let routes = express.Router();
let NeDB = require('nedb');

let db = new NeDB({
    filename: 'users.db',
    autoload: true
});

//retorna todos
routes.get('/users', (req, res) => {
    db.find({}).sort({ name: 1 }).exec((err, users) => {
        if (err) {
            console.log(`error ${err}`);
            res.status(400).json({ error: err });
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
                //users: users
                users
            });
        }
    });

    //retorna um unico registro
    routes.get('/users/:id', (req, res) => {
        db.findOne({ _id: req.params.id }).sort({ name: 1 }).exec((err, user) => {
            if (err) {
                console.log(`error ${err}`);
                res.status(400).json({ error: err });
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    user
                });
            }
        });

    });
});

routes.post('/users', (req, res) => {  //npm install body-parser 
    db.insert(req.body, (err, user) => {
        if (err) {
            console.log(`error ${err}`);
            res.status(400).json({ error: err });
        }
        else {
            res.status(200).json(user);
        }
    });
});

//alterar
routes.put('/users/:id', (req, res) => {
    db.update({ _id: req.params.id }, req.body, err => {
        if (err) {
            res.status(400).json({ error: err });
        } else {
           // res.status(200).json(req.body);
           res.status(200).json(Object.assign(req.params, req.body));
        }
    });
});

//excluir
routes.delete('/users/:id', (req, res) => {
    db.remove({ _id: req.params.id }, {}, err => {
        if (err) {
            res.status(400).json({ error: err });
        } else {
             res.status(200).json(req.params);
        }
    });
});

routes.get('/users/admin', (req, res) => {  //routes.get('/admin', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        users: [

        ]
    });
});

module.exports = routes;