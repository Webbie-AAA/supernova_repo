const { Router } = require('express');
const flashcardsController = require('../controllers/flashcards');

const flashcardsRouter = Router();

flashcardsRouter.get('/', flashcardsController.getAllFlashcards);

module.exports = flashcardsRouter;