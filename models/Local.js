const mongoose = require("mongoose")

const local = new mongoose.Schema({

    nome: {
        type: String,
        required: true
    },

    tipo: {
        type: String
    },

    endereco: {
        type: String
    }

})

module.exports = mongoose.model("Local", local)