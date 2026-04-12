const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    }
})

userSchema.pre("save", function (next) {
    if (this.isNew || this.isModified("senha")) {
        bcrypt.hash(this.senha, 10, (err, hashedPassword) => {
            if (err) {
                return next(err)
            }

            this.senha = hashedPassword
            next()
        })
    } else {
        next()
    }
})

userSchema.methods.isCorrectPassword = function (senhaDigitada, callback) {
    bcrypt.compare(senhaDigitada, this.senha, (err, same) => {
        if (err) {
            return callback(err)
        }

        callback(null, same)
    })
}

module.exports = mongoose.model("User", userSchema)