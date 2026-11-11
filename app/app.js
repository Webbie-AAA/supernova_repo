const express = require('express');
const cors = require('cors');
const app = express()
const userRouting = require('./routers/route')
app.use(cors())
app.use(express.json())

app.use(express.json());

app.use('/', '/userRouting' )
app.post('/users/register', (req, res) => {
    console.log(req.body);

    res.status(201).json({
        message: "Registration successful"
    });
});

app.post('/users/login', (req, res)=> {
    console.log(req.body);

    res.status(200).json({
        message: "login successful"
    });
});

app.use('/users/login', (req, res)=>{
    console.log(log.method, log.URL)
})

module.exports = app

