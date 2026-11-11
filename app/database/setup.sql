DROP TABLE IF EXISTS mock_table;
DROP TABLE IF EXISTS student_scores;
DROP TABLE IF EXISTS enrolled_students;
DROP TABLE IF EXISTS flashcards;

CREATE TABLE mock_table (
    id INT GENERATED ALWAYS AS IDENTITY,
    word VARCHAR(100) NOT NULL,
    num VARCHAR(30) NOT NULL
);

INSERT INTO mock_table (word, num)
VALUES 
    ('is it connected?', 200);

CREATE TABLE enrolled_students (
    id INT GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    class_group VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR NOT NULL UNIQUE,
    PRIMARY KEY(id)
);


INSERT INTO enrolled_students (first_name, last_name, class_group, email, password)
VALUES 
    ('Anna', 'Sosnowska', 'class A', 'anna_sosnowska@lafosse.outlook.com', 'anna123'),
    ('Dunjee', 'Jamsran', 'class A', 'dunjee_jamsran@lafosse.outlook.com', 'dunjee456'),
    ('Nathan', 'Min Hein', 'class A', 'nathan_min_hein@lafosse.outlook.com', 'nathan789'),
    ('Umel', 'Al-Mousawi', 'class A', 'umel_al_mousawi@lafosee.outlook.com', 'umel101');


CREATE TABLE student_scores (
    id INT GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    scores INT NOT NULL DEFAULT 0,
    student_id INT NOT NULL,
    FOREIGN KEY (student_id)
    REFERENCES enrolled_students (id)
);

INSERT INTO student_scores (scores, student_id)
VALUES 
    (0, (SELECT id FROM enrolled_students WHERE email = 'anna_sosnowska@lafosse.outlook.com')),
    (0, (SELECT id FROM enrolled_students WHERE email = 'dunjee_jamsran@lafosse.outlook.com')),
    (0, (SELECT id FROM enrolled_students WHERE email = 'nathan_min_hein@lafosse.outlook.com')),
    (0, (SELECT id FROM enrolled_students WHERE email = 'umel_al_mousawi@lafosee.outlook.com'));





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
     'Harold was Earl of Wessex. He was crowned King Harold II on 6 January 1066.'),
(4,  'What was William of Normandy''s claim to the throne?',
     'Edward promised him the throne, and Harold swore an oath to support him',
     'William said Edward promised him the throne around 1051, and that Harold swore an oath on holy relics in 1064.'),
(5,  'What happened at the Battle of Stamford Bridge?',
     'Harold defeated and killed Harald Hardrada',
     '25 September 1066. Harold marched about 185 miles north and beat the Norwegian king, Harald Hardrada, and his own brother Tostig.'),
(6,  'Where and when did William land in England?',
     'Pevensey, 28 September 1066',
     'The wind finally changed. Harold was still in the north, so nobody stopped the landing.'),
(7,  'What was the shield wall?',
     'The English tactic of locking shields together in a line',
     'Harold''s army formed it on top of Senlac Hill. It held off the Normans for most of the day.'),
(8,  'What is the difference between housecarls and the fyrd?',
     'Housecarls were full-time, trained soldiers. The fyrd were part-time farmers.',
     'Housecarls fought with large two-handed Dane axes. The fyrd were often poorly armed.'),
(9,  'What was a feigned retreat?',
     'Pretending to run away to draw the enemy out of position',
     'English soldiers chased the "fleeing" Normans down the hill and were cut down, which weakened the shield wall.'),
(10, 'What is the Bayeux Tapestry?',
     'An embroidery about 70 m long showing the Norman Conquest',
     'It was probably commissioned by Bishop Odo, William''s half-brother, so it shows events from a Norman point of view.');

