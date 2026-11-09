const db = require('./connector')
const fs = require('fs');
require('dotenv').config()

const sql = fs.readFileSync('./database/setup.sql').toString()

db.query(sql)
    .then(data => {
        db.end()
        console.log('connection set up successfully')
    })
    .catch(error=>console.log(error))