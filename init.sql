-- Hall
CREATE TABLE IF NOT EXISTS hall (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

INSERT INTO hall (name) VALUES
    ('Hall A'),
    ('Hall B'),
    ('Hall C');

-- Movie
CREATE TABLE IF NOT EXISTS movie (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    year INT
);

INSERT INTO movie (name, year) VALUES
    ('Movie 1', 2022),
    ('Movie 2', 2023),
    ('Movie 3', 2021);


-- Seat
CREATE TABLE IF NOT EXISTS seat (
    id SERIAL PRIMARY KEY,
    row INT,
    number INT,
    hall_id INT REFERENCES hall(id)
);

INSERT INTO seat (row, number, hall_id) VALUES
    (1, 1, 1),
    (1, 2, 1),
    (1, 3, 1),
    (2, 1, 2),
    (2, 2, 2),
    (2, 3, 2),
    (3, 1, 3),
    (3, 2, 3),
    (3, 3, 3);

-- Session
CREATE TABLE IF NOT EXISTS session (
    id SERIAL PRIMARY KEY,
		session_date DATE,
    start_time TIME,
    end_time TIME,
    hall_id INT REFERENCES hall(id),
    movie_id INT REFERENCES movie(id)
);

INSERT INTO session (session_date, start_time, end_time, hall_id, movie_id) VALUES
    ('2023-01-01', '11:00:00', '12:00:00', 1, 1),
    ('2023-01-02', '10:00:00', '11:00:00', 3, 3);
