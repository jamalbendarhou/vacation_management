/*
  Warnings:

  - You are about to drop the column `employeeId` on the `vacation` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Vacation_employeeId_fkey` ON `vacation`;

-- DropIndex
DROP INDEX `Vacation_vacationTypeId_fkey` ON `vacation`;

-- AlterTable
ALTER TABLE `vacation` DROP COLUMN `employeeId`;

-- CreateTable
CREATE TABLE `VacationEmployees` (
    `vacationId` INTEGER NOT NULL,
    `employeeId` INTEGER NOT NULL,

    UNIQUE INDEX `VacationEmployees_vacationId_employeeId_key`(`vacationId`, `employeeId`),
    PRIMARY KEY (`vacationId`, `employeeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EmployeeToVacation` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EmployeeToVacation_AB_unique`(`A`, `B`),
    INDEX `_EmployeeToVacation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Vacation` ADD CONSTRAINT `Vacation_vacationTypeId_fkey` FOREIGN KEY (`vacationTypeId`) REFERENCES `VacationType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VacationEmployees` ADD CONSTRAINT `VacationEmployees_vacationId_fkey` FOREIGN KEY (`vacationId`) REFERENCES `Vacation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VacationEmployees` ADD CONSTRAINT `VacationEmployees_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeToVacation` ADD CONSTRAINT `_EmployeeToVacation_A_fkey` FOREIGN KEY (`A`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeToVacation` ADD CONSTRAINT `_EmployeeToVacation_B_fkey` FOREIGN KEY (`B`) REFERENCES `Vacation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
