const Local = require("../models/Local")

const getLocais = async (req, res) => {

    try {

        const locais = await Local.find()

        res.json(locais)

    } catch (error) {

        res.status(500).json({
            message: "Erro ao buscar locais"
        })

    }

}

const createLocal = async (req, res) => {

    try {

        const { nome, tipo, endereco } = req.body

        if (!nome) {
            return res.status(400).json({
                message: "Nome do local é obrigatório"
            })
        }

        const local = new Local({
            nome,
            tipo,
            endereco
        })

        await local.save()

        res.status(201).json({
            message: "Local criado",
            local
        })

    } catch (error) {

        res.status(500).json({
            message: "Erro ao criar local"
        })

    }

}

const deleteLocal = async (req, res) => {

    const { id } = req.params

    await Local.findByIdAndDelete(id)

    res.json({
        message: "Local deletado"
    })

}

const updateLocal = async (req, res) => {

    const { id } = req.params

    const { nome, tipo, endereco } = req.body

    await Local.findByIdAndUpdate(id, {
        nome,
        tipo,
        endereco
    })

    res.json({
        message: "Local atualizado"
    })

}

module.exports = {
    getLocais,
    createLocal,
    deleteLocal,
    updateLocal
}