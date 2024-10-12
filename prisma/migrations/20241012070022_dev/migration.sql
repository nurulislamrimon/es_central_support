/*
  Warnings:

  - Added the required column `subject` to the `Mailing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mailing` ADD COLUMN `subject` VARCHAR(191) NOT NULL;
