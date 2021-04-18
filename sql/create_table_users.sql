CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username varchar(64) unique not null,
    email varchar(128) unique not null,
    created datetime not null,
    firstname varchar(64) not null,
    lastname varchar(64) not null,
    password_hash varchar(128) not null
);