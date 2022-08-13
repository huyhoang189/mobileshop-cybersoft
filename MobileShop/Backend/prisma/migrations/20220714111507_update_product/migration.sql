/*
  Warnings:

  - You are about to drop the column `thumail` on the `manufacturers` table. All the data in the column will be lost.
  - Added the required column `thumbail` to the `Manufacturers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `manufacturers` DROP COLUMN `thumail`,
    ADD COLUMN `thumbail` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `thumbail` VARCHAR(191) NOT NULL,
    `images` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `serie_id` INTEGER NOT NULL,

    UNIQUE INDEX `Products_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_serie_id_fkey` FOREIGN KEY (`serie_id`) REFERENCES `Series`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
