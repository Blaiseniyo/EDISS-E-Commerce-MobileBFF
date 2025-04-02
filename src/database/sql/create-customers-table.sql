-- Description: SQL script to create Customers table
-- Author: Blaise Niyonkuru

CREATE TABLE IF NOT EXISTS `Customers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `address2` VARCHAR(255) NULL,
  `city` VARCHAR(255) NOT NULL,
  `state` VARCHAR(2) NOT NULL,
  `zipcode` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId_unique` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
