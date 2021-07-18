mongoose = require('mongoose');

// Setup schema
var palestraSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postal_code:String,
    email: String,
    password: String,
    orario_apertura: String,
    orario_chiusura: String,
    permissionLevel: Number
});

// Export Prenotazione model
var Palestra = module.exports = mongoose.model('palestra', palestraSchema);

module.exports.get = function (callback, limit) {
    Palestra.find(callback).limit(limit);
}

// Ensure virtual fields are serialised.
palestraSchema.set('toJSON', {
    virtuals: true
});

module.exports.createUser = (userData) => {
    const palestra = new Palestra(userData);
    return palestra.save();
};

module.exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Palestra.find({}).select('name address postal_code orario_apertura orario_chiusura posti_fascia_oraria')
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, palestra) {
                if (err) {
                    reject(err);
                } else {
                    resolve(palestra);
                }
            })
    });
};

module.exports.findByEmail = (email) => {
    return Palestra.find({email: email});
};