-- CreateTable
CREATE TABLE `Mailing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `receiver_mail` VARCHAR(191) NOT NULL,
    `sender` VARCHAR(191) NOT NULL,
    `template_path` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
