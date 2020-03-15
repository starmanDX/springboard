-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE passengers
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE cities
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE countries
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE seat_numbers
(
  id SERIAL PRIMARY KEY,
  seat_number INTEGER NOT NULL,
);

CREATE TABLE seat_letters
(
  id SERIAL PRIMARY KEY,
  seat_letter VARCHAR(1) NOT NULL
);

CREATE TABLE airlines
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE flights
(
  id SERIAL PRIMARY KEY,
  airline INTEGER REFERENCES airlines,
  departure DATETIME NOT NULL,
  dep_city INTEGER REFERENCES cities,
  dep_country INTEGER REFERENCES countries,
  arrival DATETIME NOT NULL,
  arr_city INTEGER REFERENCES cities,
  arr_country INTEGER REFERENCES countries
);

-- CREATE TABLE tickets
-- (
--   id SERIAL PRIMARY KEY,
--   first_name INTEGER REFERENCES passengers,
--   last_name INTEGER REFERENCES passengers,
--   seat TEXT NOT NULL,
--   departure DATETIME NOT NULL,
--   arrival DATETIME NOT NULL,
--   airline TEXT NOT NULL,
--   from_city TEXT NOT NULL,
--   from_country TEXT NOT NULL,
--   to_city TEXT NOT NULL,
--   to_country TEXT NOT NULL
-- );

INSERT INTO passengers
  (first_name, last_name)
VALUES
  ('Jennifer', 'Finch'),
  ('Thadeus', 'Gathercoal'),
  ('Sonja', 'Pauley'),
  ('Waneta', 'Skeleton'),
  ('Berkie', 'Wycliff'),
  ('Alvin', 'Leathes'),
  ('Cory', 'Squibbes');

INSERT INTO cities
  (name)
VALUES
  ('Washington DC'),
  ('Tokyo'),
  ('Seattle'),
  ('Los Angeles'),
  ('Las Vegas'),
  ('London'),
  ('Mexico City'),
  ('Paris'),
  ('Casablanca'),
  ('Dubai'),
  ('Beijing'),
  ('New York'),
  ('Charlotte'),
  ('Cedar Rapids'),
  ('Chicago'),
  ('New Orleans'),
  ('Sao Paolo'),
  ('Santiago');

INSERT INTO countries
  (name)
VALUES
  ('United States'),
  ('Japan'),
  ('United Kingdom'),
  ('Mexico'),
  ('France'),
  ('Morocco'),
  ('UAE'),
  ('China'),
  ('Brazil'),
  ('Chile');

INSERT INTO seat_numbers
  (seat_number)
VALUES
  (1),
  (2),
  (3),
  (4),
  (5),
  (6),
  (7),
  (8),
  (9),
  (10),
  (11),
  (12),
  (13),
  (14),
  (15),
  (16),
  (17),
  (18),
  (19),
  (20),
  (21),
  (22),
  (23),
  (24),
  (25),
  (26),
  (27),
  (28),
  (29),
  (30),
  (31),
  (32),
  (33);

INSERT INTO seat_letters
  (seat_letter)
VALUES
  ('A'),
  ('B'),
  ('C'),
  ('D'),
  ('E'),
  ('F');

INSERT INTO airlines
  (name)
VALUES
  ('American Airlines'),
  ('Avianca Brazil'),
  ('Air China'),
  ('British Airways'),
  ('Delta'),
  ('TUI Fly Belgium'),
  ('United');

INSERT INTO flights
  (airline, departure, dep_city, dep_country, arrival, arr_city, arr_country)
VALUES
  (7, '2018-04-08 09:00:00', 1, 1, '2018-04-08 12:00:00', 3, 1),
  (4, '2018-12-19 12:45:00', 2, 2, '2018-12-19 16:15:00', 6, 3),
  (5, '2018-01-02 07:00:00', 4, 1, '2018-01-02 08:03:00', 5, 1),
  (5, '2018-04-15 16:50:00', 3, 1, '2018-04-15 21:00:00', 7, 4),
  (6, '2018-08-01 18:30:00', 8, 5, '2018-08-01 21:50:00', 9, 6),
  (3, '2018-10-31 01:15:00', 10, 7, '2018-10-31 12:55:00', 11, 8),
  (7, '2019-02-06 06:00:00', 12, 1, '2019-02-06 07:47:00', 13, 1),
  (1, '2018-12-22 14:42:00', 14, 1, '2018-12-22 15:56:00', 15, 1),
  (1, '2019-02-06 16:28:00', 13, 1, '2019-02-06 19:18:00', 16, 1),
  (2, '2019-01-20 19:30:00', 17, 9, '2019-01-20 22:45:00', 18, 10);

-- INSERT INTO tickets
--   (first_name, last_name, seat, departure, arrival, airline, from_city, from_country, to_city, to_country)
-- VALUES
--   ('Jennifer', 'Finch', '33B', '2018-04-08 09:00:00', '2018-04-08 12:00:00', 'United', 'Washington DC', 'United States', 'Seattle', 'United States'),
--   ('Thadeus', 'Gathercoal', '8A', '2018-12-19 12:45:00', '2018-12-19 16:15:00', 'British Airways', 'Tokyo', 'Japan', 'London', 'United Kingdom'),
--   ('Sonja', 'Pauley', '12F', '2018-01-02 07:00:00', '2018-01-02 08:03:00', 'Delta', 'Los Angeles', 'United States', 'Las Vegas', 'United States'),
--   ('Jennifer', 'Finch', '20A', '2018-04-15 16:50:00', '2018-04-15 21:00:00', 'Delta', 'Seattle', 'United States', 'Mexico City', 'Mexico'),
--   ('Waneta', 'Skeleton', '23D', '2018-08-01 18:30:00', '2018-08-01 21:50:00', 'TUI Fly Belgium', 'Paris', 'France', 'Casablanca', 'Morocco'),
--   ('Thadeus', 'Gathercoal', '18C', '2018-10-31 01:15:00', '2018-10-31 12:55:00', 'Air China', 'Dubai', 'UAE', 'Beijing', 'China'),
--   ('Berkie', 'Wycliff', '9E', '2019-02-06 06:00:00', '2019-02-06 07:47:00', 'United', 'New York', 'United States', 'Charlotte', 'United States'),
--   ('Alvin', 'Leathes', '1A', '2018-12-22 14:42:00', '2018-12-22 15:56:00', 'American Airlines', 'Cedar Rapids', 'United States', 'Chicago', 'United States'),
--   ('Berkie', 'Wycliff', '32B', '2019-02-06 16:28:00', '2019-02-06 19:18:00', 'American Airlines', 'Charlotte', 'United States', 'New Orleans', 'United States'),
--   ('Cory', 'Squibbes', '10D', '2019-01-20 19:30:00', '2019-01-20 22:45:00', 'Avianca Brasil', 'Sao Paolo', 'Brazil', 'Santiago', 'Chile');