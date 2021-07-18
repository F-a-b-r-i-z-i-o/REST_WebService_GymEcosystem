mongoose = require('mongoose');

// Setup schema
var clienteSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: String,
    password: String,
    permissionLevel: Number
});

// Export Cliente model
var Cliente = module.exports = mongoose.model('cliente', clienteSchema);

module.exports.get = function (callback, limit) {
    Cliente.find(callback).limit(limit);
}

clienteSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
clienteSchema.set('toJSON', {
    virtuals: true
});

module.exports.createUser = (userData) => {
    const cliente = new Cliente(userData);
    return cliente.save();
};

module.exports.findById = (id) => {
    return Cliente.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

module.exports.patchUser = (id, req) => {
    return Cliente.findOne({
        _id: id
    }, function(err, cliente){
        if (err)
            res.send(err);
    
        cliente.firstName = req.body.firstName;
        cliente.lastName = req.body.lastName;
        // save the contact and check for errors
        cliente.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Prenotazione Info updated',
                data: cliente
            });
        });
    });
};

module.exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Cliente.find({})
            .select('firstName lastName email')
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, cliente) {
                if (err) {
                    reject(err);
                } else {
                    resolve(cliente);
                }
            })
    });
};

module.exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        Cliente.deleteMany({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

module.exports.findByEmail = (email) => {
    return Cliente.find({email: email});
};