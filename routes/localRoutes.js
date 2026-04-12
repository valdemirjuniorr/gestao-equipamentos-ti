const express = require("express")
const router = express.Router()

const localController = require("../controllers/localController")
const WithAuth = require("../middleware/auth")

router.get("/", WithAuth, localController.getLocais)

router.post("/", WithAuth, localController.createLocal)

router.delete("/:id", WithAuth, localController.deleteLocal)

router.put("/:id", WithAuth, localController.updateLocal)

module.exports = router