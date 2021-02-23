
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE patch (
    id SERIAL PRIMARY KEY,
    title character varying(255),
    patch_notes character varying(2000),
    user_id integer NOT NULL,
    patch_image character varying(255),
    date_created date
);
CREATE UNIQUE INDEX patch_pkey ON patch(id int4_ops);

CREATE TABLE tag (
    id SERIAL PRIMARY KEY,
    name character varying(20) NOT NULL,
    user_id integer NOT NULL,
    color character varying(6) DEFAULT '999999'::character varying
);
CREATE UNIQUE INDEX tag_pkey ON tag(id int4_ops);

CREATE TABLE patch_tag (
    id SERIAL PRIMARY KEY,
    patch_id integer REFERENCES patch(id),
    tag_id integer REFERENCES tag(id)
);
CREATE UNIQUE INDEX patch_tag_pkey ON patch_tag(id int4_ops);