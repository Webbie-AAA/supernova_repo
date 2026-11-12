DROP TABLE IF EXISTS enrolled_students CASCADE;

CREATE TABLE enrolled_students (
    id INT GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO enrolled_students (first_name, last_name, email, password)
VALUES 
    ('Anna', 'Sosnowska','anna_sosnowska@lafosse.outlook.com', 'anna123'),
    ('Dunjee', 'Jamsran','dunjee_jamsran@lafosse.outlook.com', 'dunjee456'),
    ('Nathan', 'Min Hein','nathan_min_hein@lafosse.outlook.com', 'nathan789'),
    ('Umel', 'Al-Mousawi','umel_al_mousawi@lafosee.outlook.com', 'umel101');