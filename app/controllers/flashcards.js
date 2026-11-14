const flashcardsModel = require('../models/flashcards');

async function getAllFlashcards(req, res) {
    try {
        const flashcards = await flashcardsModel.getAllFlashcards();

        res.status(200).json(flashcards);
    } catch (error) {
        res.status(404).send({error: error.message});

        res.status(500).send({error: error.status});
    }
}


module.exports = {
    getAllFlashcards
};