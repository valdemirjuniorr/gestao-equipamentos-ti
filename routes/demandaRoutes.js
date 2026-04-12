const express = require("express")

const router = express.Router()

const {
    getDemandas,
    createDemanda,
    deleteDemanda,
    updateDemanda
} = require("../controllers/demandaController")

const WithAuth = require("../middleware/auth")

router.get("/", WithAuth, getDemandas)

router.post("/", WithAuth, createDemanda)

router.delete("/:id", WithAuth, deleteDemanda)

router.put("/:id", WithAuth, updateDemanda)

module.exports = router