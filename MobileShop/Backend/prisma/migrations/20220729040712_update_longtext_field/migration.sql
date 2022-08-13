-- AlterTable
ALTER TABLE `manufacturers` MODIFY `description` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `description` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `name` LONGTEXT NOT NULL;
