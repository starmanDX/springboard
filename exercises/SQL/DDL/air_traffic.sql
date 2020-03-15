-- from the terminal run:
-- psql < air_traffic.sql


-- SELECT first_name, last_name, seat, departure, arrival, airline, dep_location, arr_location
-- FROM passengers p JOIN flights f
--   ON p.flight=f.id
--   JOIN destinations d
--   ON f.dep_location=d.id;


DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE destinations
(
  id SERIAL PRIMARY KEY,
  city TEXT NOT NULL,
  country TEXT NOT NULL
);

CREATE TABLE flights
(
  id SERIAL PRIMARY KEY,
  airline TEXT NOT NULL,
  departure TIMESTAMP NOT NULL,
  dep_location INTEGER REFERENCES destinations,
  arrival TIMESTAMP NOT NULL,
  arr_location INTEGER REFERENCES destinations
);

CREATE TABLE passengers
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  flight INTEGER REFERENCES flights,
  seat VARCHAR(3)
);

INSERT INTO destinations
  (city, country)
VALUES
  ('Washington DC', 'United States'),
  ('Seattle', 'United States'),
  ('Tokyo', 'Japan'),
  ('London', 'United Kingdom'),
  ('Los Angeles', 'United States'),
  ('Las Vegas', 'United States'),
  ('Mexico City', 'Mexico'),
  ('Paris', 'France'),
  ('Casablanca', 'Morocco'),
  ('Dubai', 'UAE'),
  ('Beijing', 'China'),
  ('New York', 'United States'),
  ('Charlotte', 'United States'),
  ('Cedar Rapids', 'United States'),
  ('Chicago', 'United States'),
  ('New Orleans', 'United States'),
  ('Sao Paolo', 'Brazil'),
  ('Santiago', 'Chile');


INSERT INTO flights
  (airline, departure, dep_location, arrival, arr_location)
VALUES
  ('United', '2018-04-08 09:00:00', 1, '2018-04-08 12:00:00', 2),
  ('British Airways', '2018-12-19 12:45:00', 3, '2018-12-19 16:15:00', 4),
  ('Delta', '2018-01-02 07:00:00', 5, '2018-01-02 08:03:00', 6),
  ('Delta', '2018-04-15 16:50:00', 2, '2018-04-15 21:00:00', 7),
  ('TUI Fly Belgium', '2018-08-01 18:30:00', 8, '2018-08-01 21:50:00', 9),
  ('Air China', '2018-10-31 01:15:00', 10, '2018-10-31 12:55:00', 11),
  ('United', '2019-02-06 06:00:00', 12, '2019-02-06 07:47:00', 13),
  ('American Airlines', '2018-12-22 14:42:00', 14, '2018-12-22 15:56:00', 15),
  ('American Airlines', '2019-02-06 16:28:00', 13, '2019-02-06 19:18:00', 16),
  ('Avianca Brazil', '2019-01-20 19:30:00', 17, '2019-01-20 22:45:00', 18);

INSERT INTO passengers
  (first_name, last_name, flight, seat)
VALUES
  ('Jennifer', 'Finch', 1, '33B'),
  ('Thadeus', 'Gathercoal', 2, '8A'),
  ('Sonja', 'Pauley', 3, '12F'),
  ('Jennifer', 'Finch', 4, '20A'),
  ('Waneta', 'Skeleton', 5, '23D'),
  ('Thadeus', 'Gathercoal', 6, '18C'),
  ('Berkie', 'Wycliff', 7, '9E'),
  ('Alvin', 'Leathes', 8, '1A'),
  ('Berkie', 'Wycliff', 9, '32B'),
  ('Cory', 'Squibbes', 10, '10D');

-- CREATE TABLE cities
-- (
--   id SERIAL PRIMARY KEY,
--   name TEXT NOT NULL
-- );

-- CREATE TABLE countries
-- (
--   id SERIAL PRIMARY KEY,
--   name TEXT NOT NULL
-- );

-- CREATE TABLE airlines
-- (
--   id SERIAL PRIMARY KEY,
--   name TEXT NOT NULL
-- );

-- CREATE TABLE tickets
-- (
--   id SERIAL PRIMARY KEY,
--   first_name INTEGER REFERENCES passengers,
--   last_name INTEGER REFERENCES passengers,
--   seat TEXT NOT NULL,
--   departure TIMESTAMP NOT NULL,
--   arrival TIMESTAMP NOT NULL,
--   airline TEXT NOT NULL,
--   from_city TEXT NOT NULL,
--   from_country TEXT NOT NULL,
--   to_city TEXT NOT NULL,
--   to_country TEXT NOT NULL
-- );

-- INSERT INTO cities
--   (name)
-- VALUES
--   ('Washington DC'),
--   ('Tokyo'),
--   ('Seattle'),
--   ('Los Angeles'),
--   ('Las Vegas'),
--   ('London'),
--   ('Mexico City'),
--   ('Paris'),
--   ('Casablanca'),
--   ('Dubai'),
--   ('Beijing'),
--   ('New York'),
--   ('Charlotte'),
--   ('Cedar Rapids'),
--   ('Chicago'),
--   ('New Orleans'),
--   ('Sao Paolo'),
--   ('Santiago');

-- INSERT INTO countries
--   (name)
-- VALUES
--   ('United States'),
--   ('Japan'),
--   ('United Kingdom'),
--   ('Mexico'),
--   ('France'),
--   ('Morocco'),
--   ('UAE'),
--   ('China'),
--   ('Brazil'),
--   ('Chile');

-- INSERT INTO seating
--   (seat_number)
-- VALUES
--   (1),
--   (2),
--   (3),
--   (4),
--   (5),
--   (6),
--   (7),
--   (8),
--   (9),
--   (10),
--   (11),
--   (12),
--   (13),
--   (14),
--   (15),
--   (16),
--   (17),
--   (18),
--   (19),
--   (20),
--   (21),
--   (22),
--   (23),
--   (24),
--   (25),
--   (26),
--   (27),
--   (28),
--   (29),
--   (30),
--   (31),
--   (32),
--   (33);

-- INSERT INTO seat_letters
--   (seat_letter)
-- VALUES
--   ('A'),
--   ('B'),
--   ('C'),
--   ('D'),
--   ('E'),
--   ('F');

-- INSERT INTO airlines
--   (name)
-- VALUES
--   ('American Airlines'),
--   ('Avianca Brazil'),
--   ('Air China'),
--   ('British Airways'),
--   ('Delta'),
--   ('TUI Fly Belgium'),
--   ('United');

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