// Import prenotazione model
Palestra = require('../models/palestraModel');

const crypto = require('crypto');

// Handle create palestra actions
exports.new = function (req, res) {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    Palestra.createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
    });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    Palestra.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.view = function (req, res) {
    Palestra.find({
        _id : req.headers.id
    }, function (err, palestra) {
        if (err)
            res.send(err);
        res.json({
            message: 'Palestra details loading..',
            data: palestra
        });
    });
};

exports.patchById = function (req, res) {
    Palestra.findOne({
        _id : req.headers.id 
    }, function (err, palestra) {
        if (err)
            res.send(err);
        
        if(req.body.name){
            palestra.name = req.body.name;
        }
        if(req.body.address){
            palestra.address = req.body.address;
        }
        if(req.body.postal_code){
            palestra.postal_code = req.body.postal_code;
        }
        if(req.body.email){
            palestra.email = req.body.email;
        }
        if(req.body.orario_apertura){
            palestra.orario_apertura = req.body.orario_apertura;
        }
        if(req.body.orario_chiusura){
            palestra.orario_chiusura = req.body.orario_chiusura;
        }
        if(req.body.password){
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
            req.body.password = salt + "$" + hash;
            palestra.password = req.body.password;
        }
        // save the contact and check for errors
        palestra.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Palestra Info updated',
                data: palestra
            });
        });
    });
};

exports.removeById = function (req, res) {
    Palestra.deleteMany({
            _id : req.headers.id  
    }, function (err, palestra) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Palestra deleted'
        });
    });
};