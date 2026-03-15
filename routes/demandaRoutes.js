const express = require("express")

const router = express.Router()

const {
    getDemandas,
    createDemanda,
    deleteDemanda,
    updateDemanda
} = require("../controllers/demandaController")

router.get("/", getDemandas)

router.post("/", createDemanda)

router.delete("/:id", deleteDemanda)

router.put("/:id", updateDemanda)

module.exports = router