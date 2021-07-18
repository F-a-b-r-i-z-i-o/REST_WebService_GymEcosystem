mongoose = require('mongoose');

// Setup schema
var segnalazioneSchema = mongoose.Schema({
    id_cliente: {
        type: String
    }
});

// Export Prenotazione model
var Segnalazione = module.exports = mongoose.model('segnalazione', segnalazioneSchema);

module.exports.get = function (callback, limit) {
    Segnalazione.find(callback).limit(limit);
}