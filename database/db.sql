CREATE DATABASE qar;

USE qar;

CREATE TABLE users(
    id INT(11) NOT NULL,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(80) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

ALTER TABLE users
    ADD role INT(1) NOT NULL;
/* 
    0 = PASSENGER
    1 = DRIVER
 */


/* AVAILABILITY */
CREATE TABLE driver_av (
  id INT(11) NOT NULL,
  from_place VARCHAR(100) NOT NULL,
  to_place VARCHAR(100) NOT NULL,
  description TEXT,
  hidden INT(1) NOT NULL,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE driver_av
    ADD PRIMARY KEY (id);

ALTER TABLE driver_av
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE api_keys (
  id INT(11) NOT NULL,
  api_key VARCHAR(20) NOT NULL
);

ALTER TABLE api_keys
    ADD PRIMARY KEY (id);

ALTER TABLE api_keys
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

INSERT INTO api_keys (api_key) VALUES ("rb80MAY9Urqw3eiejJzr");

/* PROCEDURES */
CREATE PROCEDURE userAddOrEdit (
    IN _id INT NOT NULL,
    IN _email VARCHAR(100) NOT NULL,
    IN _password VARCHAR(60) NOT NULL,
    IN _fullname VARCHAR(80) NOT NULL
);

IF _id = 0 THEN
    INSERT INTO users (email, password, fullname) VALUES (_email, _password, _fullname);
    SET _id = LAST_INSERT_ID();
ELSE
    UPDATE users SET fullname = _fullname WHERE id = _id;
END IF

SELECT _id AS id;
END
