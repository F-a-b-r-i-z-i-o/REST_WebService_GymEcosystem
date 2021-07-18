// Import model
Prenotazione = require('../models/prenotazioneModel');

// Handle create prenotazione actions
exports.new = function (req, res) {
    var prenotazione = new Prenotazione();
    prenotazione.id_cliente = req.headers.id
    prenotazione.id_palestra = req.body.id_palestra;
    prenotazione.phone = req.body.phone;
    prenotazione.name_palestra = req.body.name_palestra;
    prenotazione.orario_prenotazione = req.body.orario_prenotazione;
    // save the prenotazione and check for errors
    prenotazione.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New prenotazione created!',
            data: prenotazione
        });
    });
};

// Handle view prenotazione info
exports.view = function (req, res) {
    Prenotazione.find({
        id_cliente : req.headers.id
    }, function (err, prenotazione) {
        if (err)
            res.send(err);
        res.json({
            message: 'Prenotazione details loading..',
            data: prenotazione
        });
    });
};

// Handle update prenotazione info
exports.update = function (req, res) {
    Prenotazione.findOne({
        $and:[
            {id_cliente : req.headers.id },
            {id_palestra : req.body.id_palestra },
            {orario_prenotazione : req.body.orario_prenotazione }
        ]
    }, function (err, prenotazione) {
        if (err)
            res.send(err);
        if(req.body.phone){
            prenotazione.phone = req.body.phone;
        }
        if(req.body.new_orario_prenotazione){
            prenotazione.orario_prenotazione = req.body.new_orario_prenotazione;
        }
        // save the contact and check for errors
        prenotazione.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Prenotazione Info updated',
                data: prenotazione
            });
        });
    });
};

// Handle delete prenotazione
exports.delete = function (req, res) {
    Prenotazione.deleteOne({
        $and:[
            {id_cliente : req.headers.id },
            {id_palestra : req.body.id_palestra },
            {orario_prenotazione : req.body.orario_prenotazione }
        ]
    }, function (err, prenotazione) {
        if (err)
            res.send(err);res.json({
            status: "success",
            message: 'Prenotazione deleted'
        });
    });
};