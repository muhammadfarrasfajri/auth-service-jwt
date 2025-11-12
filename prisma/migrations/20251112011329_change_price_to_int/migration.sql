/*
  Warnings:

  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_username_fkey`;

-- DropIndex
DROP INDEX `product_username_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` MODIFY `price` INTEGER NOT NULL,
    MODIFY `username` VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_username_fkey` FOREIGN KEY (`username`) REFERENCES `user`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
