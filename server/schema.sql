-- CREATE DATABASE chat;

USE chat;

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` INT AUTO_INCREMENT,
  `username` INT,
  `message` VARCHAR(256),
  `roomname` INT,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT,
  `name` VARCHAR(24),
  PRIMARY KEY (`id`),
  UNIQUE KEY (`name`)
);

DROP TABLE IF EXISTS `rooms`;

CREATE TABLE `rooms` (
  `id` INT AUTO_INCREMENT,
  `name` VARCHAR(12),
  PRIMARY KEY (`id`),
  UNIQUE KEY (`name`)
);

ALTER TABLE `messages` ADD FOREIGN KEY (username) REFERENCES `users` (`id`);
ALTER TABLE `messages` ADD FOREIGN KEY (roomname) REFERENCES `rooms` (`id`);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
