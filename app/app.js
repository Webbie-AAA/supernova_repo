const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const userRouter = require('./routers/user');
const flashcardsRouter = require('./routers/flashcards');


app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} (${req.url})`);
    next();
});

app.use('/users', userRouter);
app.use('/flashcards', flashcardsRouter);



app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/', (req, res) => {
    res.redirect('/homepage/homepage.html');
});





module.exports = app;