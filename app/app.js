const express = require('express');
const cors = require('cors');
const app = express()

app.use(cors())
app.use(express.json())

//Then use for the router



module.exports = app

