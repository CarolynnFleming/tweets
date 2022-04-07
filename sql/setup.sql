-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS github_users;
DROP TABLE IF EXISTS tweets;

CREATE TABLE github_users (
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    photo TEXT NOT NULL
);

CREATE TABLE tweets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    text TEXT NOT NULL,
    username TEXT REFERENCES users(github_username)
);