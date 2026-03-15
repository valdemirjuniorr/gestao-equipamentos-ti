const User = require("../models/User")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {

    try {

        const { nome, email, senha } = req.body

        if (!nome || !email || !senha) {
            return res.status(400).json({
                message: "Nome, email e senha são obrigatórios"
            })
        }

        const user = new User({
            nome,
            email,
            senha
        })

        await user.save()

        res.status(201).json({
            message: "Usuário criado com sucesso"
        })

    } catch (error) {

        res.status(500).json({
            message: "Erro ao criar usuário",
            error: error.message
        })

    }

}


exports.login = async (req, res) => {

    try {

        const { email, senha } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Usuário não encontrado"
            })
        }

        if (user.senha !== senha) {
            return res.status(400).json({
                message: "Senha incorreta"
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.json({
            message: "Login realizado",
            token
        })

    } catch (error) {

        res.status(500).json({
            message: "Erro no login",
            error: error.message
        })

    }

}