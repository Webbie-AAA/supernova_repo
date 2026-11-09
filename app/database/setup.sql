DROP TABLE IF EXISTS mock_table;

CREATE TABLE mock_table (
    id INT GENERATED ALWAYS AS IDENTITY,
    word VARCHAR(100) NOT NULL,
    num VARCHAR(30) NOT NULL
);

INSERT INTO mock_table (word, num)
VALUES 
    ('is it connected?', 200);