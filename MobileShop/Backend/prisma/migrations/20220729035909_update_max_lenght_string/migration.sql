-- AlterTable
ALTER TABLE `manufacturers` MODIFY `thumbail` VARCHAR(2732) NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `thumbail` VARCHAR(2732) NOT NULL,
    MODIFY `images` VARCHAR(2732) NOT NULL;
