const express = require("express")
const router = express.Router()

const equipamentoController = require("../controllers/equipamentoController")
const WithAuth = require("../middleware/auth")

router.get("/", WithAuth, equipamentoController.getEquipamentos)
router.post("/", equipamentoController.createEquipamento)
router.delete("/:id", equipamentoController.deleteEquipamento)
router.put("/:id", equipamentoController.updateEquipamento)

module.exports = router