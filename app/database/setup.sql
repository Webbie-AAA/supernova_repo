DROP mock_table IF EXISTS;

CREATE TABLE mock_table (
    id INT GENERATED ALWAYS AS IDENTITY,
    col_1 VARCHAR(100) NOT NULL
);

INSERT INTO mock_table (col_1)
VALUES ('is the connection working?');