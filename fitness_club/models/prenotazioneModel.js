mongoose = require('mongoose');

// Setup schema
var prenotazioneSchema = mongoose.Schema({
    id_cliente: {
        type: String,
        required: true
    },
    id_palestra: {
        type: String,
        required: true
    },
    name_palestra: {
        type: String,
    },
    phone: String,
    orario_prenotazione: {
        type: Date,
    }
});

// Export Prenotazione model
var Prenotazione = module.exports = mongoose.model('prenotazione', prenotazioneSchema);

module.exports.get = function (callback, limit) {
    Prenotazione.find(callback).limit(limit);
}