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
app.use('/api/flashcards', flashcardsRouter);

app.get('/', (req, res) => {
    res.send('Hello There! Hang on x');
});

module.exports = app;
