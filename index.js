require('dotenv').config() //cria e envia as variáveis de ambiente para poder fazer o deploy para o heroku
const express = require("express")
const path = require("path")
const routes = require("./routes/routes")
const connectDB = require("./database/db")

connectDB();
const app = express()
const port = process.env.PORT

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded())
app.use(routes)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})

/* const os = require("os")

console.log(os.hostname()) */



