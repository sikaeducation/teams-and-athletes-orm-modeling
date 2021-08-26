const express = require("express")
const app = express()

app.use(express.json())

app.use("/teams", require("./routes/teams"))
app.use("/athletes", require("./routes/athletes"))

app.use((error, request, response, next){
    console.error(error.message)
    response.sendStatus(500)
})

module.exports = app
