const app = require('./app');
('dotenv').config()
const PORT = 3000;


app.listen(PORT, ()=> {
    console.log(`Listening to port ${PORT}`)
})