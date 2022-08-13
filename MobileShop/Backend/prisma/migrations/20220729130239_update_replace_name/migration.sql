-- CreateTable
CREATE TABLE `Series` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sort_name` VARCHAR(191) NOT NULL,
    `manufacture_id` INTEGER NOT NULL,

    UNIQUE INDEX `Series_name_key`(`name`),
    UNIQUE INDEX `Series_sort_name_key`(`sort_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `thumbail` LONGTEXT NOT NULL,
    `images` LONGTEXT NOT NULL,
    `description` LONGTEXT NOT NULL,
    `serie_id` INTEGER NOT NULL,

    UNIQUE INDEX `Products_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Series` ADD CONSTRAINT `Series_manufacture_id_fkey` FOREIGN KEY (`manufacture_id`) REFERENCES `Manufactures`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_serie_id_fkey` FOREIGN KEY (`serie_id`) REFERENCES `Series`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
