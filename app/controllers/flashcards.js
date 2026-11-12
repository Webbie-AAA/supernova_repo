const flashcardsModel = require('../models/flashcards');

async function getAllFlashcards(req, res) {
    try {
        const flashcards = await flashcardsModel.getAllFlashcards();

        res.status(200).json(flashcards);
    } catch (error) {
        console.error('Error retrieving flashcards:', error);

        res.status(500).json({
            message: 'Unable to retrieve flashcards'
        });
    }
}

module.exports = {
    getAllFlashcards
};