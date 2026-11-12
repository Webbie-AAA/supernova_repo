const db = require('../database/connector');

async function getAllFlashcards() {
    const result = await db.query(
        'SELECT flashcard_id, question, answer, explanation FROM flashcards ORDER BY flashcard_id'
    );

    return result.rows;
}

module.exports = {
    getAllFlashcards
};