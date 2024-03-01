-- DropIndex
DROP INDEX `Vacation_vacationTypeId_fkey` ON `vacation`;

-- DropIndex
DROP INDEX `VacationEmployees_employeeId_fkey` ON `vacationemployees`;

-- AlterTable
ALTER TABLE `vacation` ADD COLUMN `title` VARCHAR(191) NOT NULL DEFAULT 'Vacation';

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
