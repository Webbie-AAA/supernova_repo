DROP TABLE IF EXISTS flashcards;
CREATE TABLE flashcards (
    flashcard_id  INTEGER      PRIMARY KEY,
    question      VARCHAR(255) NOT NULL,
    answer        VARCHAR(255) NOT NULL,
    explanation   TEXT
);

INSERT INTO flashcards (flashcard_id, question, answer, explanation) VALUES
(1,  'When was the Battle of Hastings?',
     '14 October 1066',
     'It was fought on Senlac Hill, about 7 miles from Hastings. The town of Battle stands there today.'),
(2,  'What started the succession crisis of 1066?',
     'Edward the Confessor died with no children',
     'Edward died on 5 January 1066 without an heir, so several men claimed the throne.'),
(3,  'What was Harold Godwinson''s claim to the throne?',
     'Edward named him on his deathbed, and the Witan chose him',
     'Harold was Earl of Wessex. He was crowned King Harold II on 6 January 1066.');
