// Import prenotazione model
Cliente = require('../models/clienteModel');

const crypto = require('crypto');

// Handle create cliente actions
exports.new = function (req, res) {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    Cliente.createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
    });
};

exports.getById = (req, res) => {
    Cliente.findById(req.body.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.view = function (req, res) {
    Cliente.find({
        _id : req.headers.id
    }, function (err, cliente) {
        if (err)
            res.send(err);
        res.json({
            message: 'Cliente details loading..',
            data: cliente
        });
    });
};


exports.patchById = function (req, res) {
    Cliente.findOne({
        _id : req.headers.id 
    }, function (err, cliente) {
        if (err)
            res.send(err);
        
        if(req.body.firstName){
            cliente.firstName = req.body.firstName;
        }
        if(req.body.lastName){
            cliente.lastName = req.body.lastName;
        }
        if(req.body.email){
            cliente.email = req.body.email;
        }
        if(req.body.password){
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
            req.body.password = salt + "$" + hash;
            cliente.password = req.body.password;
        }
        // save the contact and check for errors
        cliente.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Cliente Info updated',
                data: cliente
            });
        });
    });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 1000;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    Cliente.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

// Handle delete prenotazione
exports.removeById = function (req, res) {
    Cliente.deleteMany({
            _id : req.headers.id  
    }, function (err, cliente) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Cliente deleted'
        });
    });
};