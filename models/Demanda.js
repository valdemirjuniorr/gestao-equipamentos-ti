const mongoose = require("mongoose")

const demanda = new mongoose.Schema({

    titulo: {
        type: String,
        required: true
    },

    descricao: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "aberta"
    },

    local: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Local"
    },

    equipamento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipamento"
    },

    dataAbertura: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Demanda", demanda)