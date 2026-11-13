const express = require('express');
const cors = require('cors');

const app = express();

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

api.get("/", (req, res) => {
    res.redirect('../../client/homepage/homepage.html');
})

module.exports = app;
