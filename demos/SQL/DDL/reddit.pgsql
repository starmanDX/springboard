-- CREATE TABLE posts (
--     title TEXT,
--     username TEXT,
--     link TEXT
-- );
DROP DATABASE reddit_db;
CREATE DATABASE reddit_db;

\c reddit_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    comment_text TEXT NOT NULL
);

CREATE TABLE subreddits (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(15) NOT NULL,
    description TEXT,
    subscribers INTEGER CHECK (subscribers > 0) DEFAULT 1,
    is_private BOOLEAN DEFAULT false
);

INSERT INTO users (username, password)
VALUES
('graylady', 'abc123'),
('stevie-chicks', 'abc1234');

INSERT INTO comments (user_id, comment_text)
VALUES
(2, 'cluck cluck'),
(2, 'bock bock'),
(1, 'asdfadsf');

INSERT INTO subreddits
(name, user_id)
VALUES
('chickens', 2),
('waterluvrs', 1);

ALTER TABLE subreddits DROP COLUMN description;
ALTER TABLE subreddits RENAME COLUMN user_id TO owner_id;
ALTER TABLE users ADD COLUMN permissions TEXT DEFAULT 'user';

CREATE INDEX subreddit_name_index ON subreddits(name);
DROP INDEX subreddit_name_index;