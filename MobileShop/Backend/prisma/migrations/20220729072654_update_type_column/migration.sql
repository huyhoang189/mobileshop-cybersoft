-- AlterTable
ALTER TABLE `manufacturers` MODIFY `thumbail` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `thumbail` LONGTEXT NOT NULL,
    MODIFY `images` LONGTEXT NOT NULL;
