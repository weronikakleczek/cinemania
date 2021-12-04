--liquibase formatted sql

--changeset cinemania:4
DROP TABLE IF EXISTS book;
DROP SEQUENCE IF EXISTS book_book_id_seq;

--changeset cinemania:5
CREATE TABLE book (
                       book_id serial PRIMARY KEY,
                       book_name text NOT NULL
);
--rollback drop table issue;

--changeset cinemania:6
INSERT INTO book(book_name) values ('book_one');
INSERT INTO book(book_name) values ('book_two');
INSERT INTO book(book_name) values ('book_three');