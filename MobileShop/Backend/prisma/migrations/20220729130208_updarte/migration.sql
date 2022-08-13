/*
  Warnings:

  - You are about to drop the `manufacturers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `series` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `Products_serie_id_fkey`;

-- DropForeignKey
ALTER TABLE `series` DROP FOREIGN KEY `Series_manufacturer_id_fkey`;

-- DropTable
DROP TABLE `manufacturers`;

-- DropTable
DROP TABLE `products`;

-- DropTable
DROP TABLE `series`;

-- CreateTable
CREATE TABLE `Manufactures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `thumbail` LONGTEXT NOT NULL,

    UNIQUE INDEX `Manufactures_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
