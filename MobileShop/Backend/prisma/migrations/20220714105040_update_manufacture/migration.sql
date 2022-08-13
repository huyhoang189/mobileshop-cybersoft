-- CreateTable
CREATE TABLE `Manufacturers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `thumail` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Manufacturers_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Series` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sort_name` VARCHAR(191) NOT NULL,
    `manufacturer_id` INTEGER NOT NULL,

    UNIQUE INDEX `Series_name_key`(`name`),
    UNIQUE INDEX `Series_sort_name_key`(`sort_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Series` ADD CONSTRAINT `Series_manufacturer_id_fkey` FOREIGN KEY (`manufacturer_id`) REFERENCES `Manufacturers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
