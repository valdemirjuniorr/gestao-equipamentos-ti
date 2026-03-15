const express = require("express")

const router = express.Router()

const {
    getLocais,
    createLocal,
    deleteLocal,
    updateLocal
} = require("../controllers/localController")

router.get("/", getLocais)

router.post("/", createLocal)

router.delete("/:id", deleteLocal)

router.put("/:id", updateLocal)

module.exports = router