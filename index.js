const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db")

const equipamentoRoutes = require("./routes/equipamentoRoutes")
const localRoutes = require("./routes/localRoutes")
const demandaRoutes = require("./routes/demandaRoutes")
const userRoutes = require("./routes/userRoutes")

const app = express()
app.use(cors())
app.use(express.json())

connectDB()

app.get("/", (req, res) => {
    res.send("API Gestão de Equipamentos rodando")
})

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

app.use("/api/equipamentos", equipamentoRoutes)
app.use("/api/locais", localRoutes)
app.use("/api/demandas", demandaRoutes)
app.use("/api/users", userRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}`)
})