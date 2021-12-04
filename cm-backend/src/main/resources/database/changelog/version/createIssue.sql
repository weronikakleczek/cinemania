--liquibase formatted sql

--changeset cinemania:1
DROP TABLE IF EXISTS issue;
DROP SEQUENCE IF EXISTS issue_issue_id_seq;

--changeset cinemania:2
CREATE TABLE issue (
      issue_id serial PRIMARY KEY,
      issue_name text NOT NULL
);
--rollback drop table issue;

--changeset cinemania:3
INSERT INTO issue(issue_name) values ('issue_one');
INSERT INTO issue(issue_name) values ('issue_two');
INSERT INTO issue(issue_name) values ('issue_three');