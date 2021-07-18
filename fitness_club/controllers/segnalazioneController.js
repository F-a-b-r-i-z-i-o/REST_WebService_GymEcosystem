Segnalazione = require('../models/segnalazioneModel');

// Handle index actions
exports.index = function (req, res) {
    Segnalazione.get(function (err, segnalazioni) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Segnalazioni recuperate con successo",
            data: segnalazioni
        });
    });
};

// Handle create prenotazione actions
exports.new = function (req, res) {
    var segnalazione = new Segnalazione();
    segnalazione.id_cliente  = req.headers.id;
    // save the prenotazione and check for errors
    segnalazione.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New segnalazione created!',
            data: segnalazione
        });
    });
};

exports.view = function (req, res) {
    Segnalazione.find({
        id_cliente : req.headers.id
    }, function (err, segnalazione) {
        if (err)
            res.send(err);
        res.json({
            message: 'segnalazione details loading..',
            data: segnalazione
        });
    });
};

// Handle delete segnalazione
exports.delete = function (req, res) {
    Segnalazione.deleteOne({
            id_cliente : req.headers.id
    }, function (err, segnalazione) {
        if (err)
            res.send(err);res.json({
            status: "success",
            message: 'Segnalazione deleted'
        });
    });
};