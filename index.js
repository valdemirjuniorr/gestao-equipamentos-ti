const express = require("express")
const bodyParser = require("body-parser")

const connectDB = require("./config/db")

const equipamentoRoutes = require("./routes/equipamentoRoutes")
const localRoutes = require("./routes/localRoutes")
const demandaRoutes = require("./routes/demandaRoutes")
const userRoutes = require("./routes/userRoutes")

const app = express()

app.use(bodyParser.json())

connectDB()

app.use("/api/equipamentos", equipamentoRoutes)
app.use("/api/locais", localRoutes)
app.use("/api/demandas", demandaRoutes)
app.use("/api/users", userRoutes)

app.listen(3000, () => {
    console.log("Aplicação rodando na porta 3000")
})