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

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({
                message: "Email já cadastrado"
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

        if (!email || !senha) {
            return res.status(400).json({
                message: "Email e senha são obrigatórios"
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Usuário não encontrado"
            })
        }

        user.isCorrectPassword(senha, (err, same) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao verificar senha",
                    error: err.message
                })
            }

            if (!same) {
                return res.status(400).json({
                    message: "Senha incorreta"
                })
            }

            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            )

            return res.status(200).json({
                message: "Login realizado com sucesso",
                token
            })
        })
    } catch (error) {
        res.status(500).json({
            message: "Erro no login",
            error: error.message
        })
    }
}