const express = require('express');
const cors = require('cors');
const app = express()
const routing = require('./routers/userRouter')
app.use(cors())
app.use(express.json())

app.use('/login',routing)

app.get ('/',(req,res)=>{
    res.send('Hello There! Hang on x')
})

app.post('/users/register', (req, res) => {
    console.log(req.body);

    res.status(201).json({
        message: "Registration successful"
    });
});


module.exports = app

