const Demanda = require("../models/Demanda")

const getDemandas = async (req, res) => {

    try {

        const demandas = await Demanda.find()
            .populate("local")
            .populate("equipamento")

        res.json(demandas)

    } catch (error) {

        res.status(500).json({
            message: "Erro ao buscar demandas"
        })

    }

}

const createDemanda = async (req, res) => {

    try {

        const { titulo, descricao, local, equipamento } = req.body

        if (!titulo || !descricao) {

            return res.status(400).json({
                message: "Título e descrição são obrigatórios"
            })

        }

        const demanda = new Demanda({
            titulo,
            descricao,
            local,
            equipamento
        })

        await demanda.save()

        res.status(201).json({
            message: "Demanda criada",
            demanda
        })

    } catch (error) {

        res.status(500).json({
            message: "Erro ao criar demanda"
        })

    }

}

const deleteDemanda = async (req, res) => {

    const { id } = req.params

    await Demanda.findByIdAndDelete(id)

    res.json({
        message: "Demanda deletada"
    })

}

const updateDemanda = async (req, res) => {

    const { id } = req.params

    const { titulo, descricao, status } = req.body

    await Demanda.findByIdAndUpdate(id, {
        titulo,
        descricao,
        status
    })

    res.json({
        message: "Demanda atualizada"
    })

}

module.exports = {
    getDemandas,
    createDemanda,
    deleteDemanda,
    updateDemanda
}