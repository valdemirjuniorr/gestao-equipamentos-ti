const mongoose = require("mongoose")

const equipamento = new mongoose.Schema({

    nome: {
        type: String,
        required: true
    },

    tipo: {
        type: String,
        required: true
    },

    tombamento: {
        type: String,
        required: true,
        unique: true
    },

    status: {
        type: String,
        default: "estoque"
    },

    local: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Local"
    },

    dataEnvio: {
        type: Date
    }

})

module.exports = mongoose.model("Equipamento", equipamento)