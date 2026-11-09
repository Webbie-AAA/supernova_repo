const app = require('./app')
require('dotenv').config()

app.listen(process.env.PORT, ()=>{
    console.log(`listening at ${process.env.PORT}`)
})