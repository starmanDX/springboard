-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE galaxies
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL
);

CREATE TABLE stars
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  galaxy INTEGER REFERENCES galaxies
);

CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  orbits_around INTEGER REFERENCES stars,
  galaxy INTEGER REFERENCES galaxies,
  has_moons BOOLEAN
);

CREATE TABLE moons
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbits_around INTEGER REFERENCES planets
);

INSERT INTO galaxies 
  (name, type)
VALUES
  ('Milky Way', 'Spiral');

INSERT INTO stars
  (name, galaxy)
VALUES
  ('The Sun', 1), 
  ('Proxima Centauri', 1), 
  ('Gliese 876', 1);

INSERT INTO planets
  (name, orbital_period_in_years, orbits_around, galaxy, has_moons)
VALUES
  ('Earth', 1.00, 1, 1, true),
  ('Mars', 1.88, 1, 1, true),
  ('Venus', 0.62, 1, 1, false),
  ('Neptune', 164.8, 1, 1, true),
  ('Proxima Centauri b', 0.03, 2, 1, false),
  ('Gliese 876 b', 0.23, 3, 1, false);

INSERT INTO moons
  (name, orbits_around)
VALUES
  ('The Moon', 1), 
  ('Phobos', 2), 
  ('Deimos', 2), 
  ('Naiad', 4),
  ('Thalassa', 4), 
  ('Despina', 4), 
  ('Galatea', 4), 
  ('Larissa', 4),
  ('S/2004 N 1', 4), 
  ('Proteus', 4), 
  ('Triton', 4), 
  ('Nereid', 4), 
  ('Halimede', 4), 
  ('Sao', 4), 
  ('Laomedeia', 4), 
  ('Psamathe', 4), 
  ('Neso', 4);