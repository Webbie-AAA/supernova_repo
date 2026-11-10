DROP TABLE IF EXISTS mock_table;
DROP TABLE IF EXISTS student_scores;
DROP TABLE IF EXISTS enrolled_students;

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
    

