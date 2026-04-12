const express = require("express")
const router = express.Router()

const equipamentoController = require("../controllers/equipamentoController")
const WithAuth = require("../middleware/auth")

router.get("/", WithAuth, equipamentoController.getEquipamentos)

router.post("/", WithAuth, equipamentoController.createEquipamento)

router.delete("/:id", WithAuth, equipamentoController.deleteEquipamento)

router.put("/:id", WithAuth, equipamentoController.updateEquipamento)

module.exports = router