// Import prenotazione model
Prenotazione = require('../models/prenotazioneModel');

// Handle create prenotazione actions
exports.new = function (req, res) {
    var prenotazione = new Prenotazione();
    prenotazione.id_cliente = req.body.id_cliente
    prenotazione.id_palestra = req.headers.id;
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
        id_palestra : req.headers.id
    }, function (err, prenotazione) {
        if (err)
            res.send(err);
        res.json({
            message: 'Prenotazione details loading..',
            data: prenotazione
        });
    });
};

// Handle update orario prenotazione
exports.update = function (req, res) {
    Prenotazione.findOne({
        $and:[
            {id_cliente : req.body.id_cliente },
            {id_palestra : req.headers.id },
            {orario_prenotazione : req.body.orario_prenotazione }
        ]
    }, function (err, prenotazione) {
        if (err)
            res.send(err);
        
        if(req.body.new_orario_prenotazione){
            prenotazione.orario_prenotazione = req.body.new_orario_prenotazione;
        }
        
        // save the prenotazione and check for errors
        prenotazione.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Orario prenotazione aggiornato',
                data: prenotazione
            });
        });
    });
};

// Handle delete prenotazione
exports.delete = function (req, res) {
    Prenotazione.deleteOne({
        $and:[
            {id_cliente : req.body.id_cliente },
            {id_palestra : req.headers.id },
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

// Handle view segnalazione prenotazione info
exports.segnalazione = function (req, res) {
    Prenotazione.find({
        $and:[
            {id_palestra : req.headers.id},
            {id_cliente : req.body.id_cliente },
        ]
        
    }, function (err, prenotazione) {
        if (err)
            res.send(err);
        res.json({
            message: 'Prenotazione details loading..',
            data: prenotazione
        });
    });
};