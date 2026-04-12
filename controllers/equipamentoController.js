const Equipamento = require("../models/Equipamento")


const getEquipamentos = async (req, res) => {

    try {

        const equipamentos = await Equipamento.find()

        res.json(equipamentos)

    } catch (error) {

        res.status(500).json({
            message: "Erro ao buscar equipamentos",
            error: error.message
        })

    }

}



const createEquipamento = async (req, res) => {

    try {

        const { nome, tipo, tombamento, status } = req.body

        if (!nome || !tipo || !tombamento) {

            return res.status(400).json({
                message: "Nome, tipo e tombamento são obrigatórios"
            })

        }

        const equipamento = new Equipamento({
            nome,
            tipo,
            tombamento,
            status
        })

        await equipamento.save()

        res.status(201).json({
            message: "Equipamento cadastrado com sucesso",
            equipamento
        })

    } catch (error) {

        res.status(500).json({
            message: "Erro ao cadastrar equipamento",
            error: error.message
        })

    }

}



const deleteEquipamento = async (req, res) => {

    try {

        const { id } = req.params

        await Equipamento.findByIdAndDelete(id)

        res.json({
            message: "Equipamento removido"
        })

    } catch (error) {

        res.status(500).json({
            message: "Erro ao remover equipamento",
            error: error.message
        })

    }

}



const updateEquipamento = async (req, res) => {

    try {

        const { id } = req.params
        const { nome, tipo, tombamento, status } = req.body

        await Equipamento.findByIdAndUpdate(id, {
            nome,
            tipo,
            tombamento,
            status
        })

        res.json({
            message: "Equipamento atualizado"
        })

    } catch (error) {

        res.status(500).json({
            message: "Erro ao atualizar equipamento",
            error: error.message
        })

    }

}


module.exports = {
    getEquipamentos,
    createEquipamento,
    deleteEquipamento,
    updateEquipamento
}