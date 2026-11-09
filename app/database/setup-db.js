
const fs = require('fs');
require('dotenv').config()
const db = require('./connector')

const sql = fs.readFileSync('./database/setup.sql').toString()

db.query(sql)
    .then(data => {
        db.end()
        console.log('connection set up successfully')
    })
    .catch(error=>console.log(error))

/Users/umelbaneen/Desktop/project_alpha_g2/app/database/setup-db.js
/Users/umelbaneen/Desktop/project_alpha_g2/app/database/setup.sql