ALTER TABLE `ipl_2018`.`ipl_users_cred` 
ADD COLUMN `ipl_users_cred_id` INT NOT NULL AUTO_INCREMENT AFTER `ipl_users_cred_pwd`,
ADD UNIQUE INDEX `ipl_users_cred_id_UNIQUE` (`ipl_users_cred_id` ASC);
