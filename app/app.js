const express = require('express');
const cors = require('cors');
const app = express()
// const routing = require('./routers/route')
app.use(cors())
app.use(express.json())

app.use(express.json());

app.post('/users/register', (req, res) => {
    console.log(req.body);

    res.status(201).json({
        message: "Registration successful"
    });
});


module.exports = app

