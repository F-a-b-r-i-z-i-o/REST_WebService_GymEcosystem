// Import prenotazione model
Prenotazione = require('../models/prenotazioneModel');

// Handle index actions
exports.index = function (req, res) {
    Prenotazione.get(function (err, prenotazioni) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Prenotazioni recuperate con successo",
            data: prenotazioni
        });
    });
};

// Handle create prenotazione actions
exports.new = function (req, res) {
    var prenotazione = new Prenotazione();

    prenotazione.id_cliente = req.body.id_cliente ? req.body.id_cliente : prenotazione.id_cliente;
    prenotazione.id_palestra = req.body.id_palestra;
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