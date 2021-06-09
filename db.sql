--  https://www.postgresqltutorial.com/



--  TO ADD A NEW COLUMN:
--  add column: ALTER TABLE tablename ADD COLUMN new_column_name data_type

--  TO DELETE A NEW COLUMN:
--  ALTER TABLE table_name DROP COLUMN column_name;

--  TO DELETE A TABLE:
--  DROP TABLE tablename;

--  add to items to table
--  insert into tablename ('name', 'username', 'password') values('maria', 'lupe', 'mlupe')

--  delete database: DROP DATABASE
--  create database: CREATE DATABASE name;
--  create table: copy paste into psql
--  connect to database: \c databasename
--  clear screen: \! clear
--  list table: \d
--  show table: \d tablename
--  display table: SELECT * FROM tablename;

-- before creating the table copy paste into psql CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 
--  https://www.postgresqltutorial.com/postgresql-uuid/
CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);

--  sample data
INSERT INTO users (user_name, user_email, user_password)
VALUES ('lola', 'lola123@gmail.com', 'lola1122')

CREATE TABLE quote (
  id SERIAL PRIMARY KEY,
  quote TEXT,
  author TEXT
);

CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  query TEXT,
  videoId TEXT,
  videoName TEXT,
  videoThumbnail TEXT
);




"No problem can be solved from the same level of consciousness that created it."
Albert Einstein




insert into quote (quote, author) values ('If you tell the truth, you dont have to remember anything.', 'Mark Twain');

insert into quote (quote, author) values ('A man who stands for nothing will fall for anything.', 'Malcom X');

insert into quote (quote, author) values ('In the middle of difficulty lies opportunity.', 'Albert Einstein');

insert into quote (quote, author) values ('No one can make you feel inferior without your consent.', 'Eleanor Roosevelt');

insert into quote (quote, author) values ('If you cant explain it simply, you dont understand it well enough.', 'Albert Einstein');

insert into quote (quote, author) values ('Insanity is doing the same thing over and over again and expecting different results.', 'Albert Einstein');

insert into quote (quote, author) values ('Life is ten percent what happens to you and ninety percent how you respond to it.', 'Charles Swindoll');

insert into quote (quote, author) values ('No problem can be solved from the same level of consciousness that created it.', 'Albert Einstein');

insert into quote (quote, author) values ('If you come to the conclusion on your own is a lot more valuable than if i give you the answer', 'Tim');

insert into quote (quote, author) values ('Never announce your moves before you make them', 'Buddha');


UPDATE quote
SET quote = 'If you come to the conclusion on your own is a lot more valuable than if i give you the answer.' 
WHERE id=10;

UPDATE courses
SET published_date = '2020-08-01' 
WHERE course_id = 3;


