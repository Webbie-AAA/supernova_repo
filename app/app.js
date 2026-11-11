const express = require('express');
const cors = require('cors');
const app = express()
const routing = require('./routers/user');
const userRouter = require('./routers/user');
app.use(cors())
app.use(express.json())

app.use('/users',userRouter)

app.get ('/',(req,res)=>{
    res.send('Hello There! Hang on x')
})

app.use("/users", userRouter)


app.use((req, res, next)=>{
    console.log(`${req.method} ${req.path} (${req.url})`)
    next();
})


module.exports = app

