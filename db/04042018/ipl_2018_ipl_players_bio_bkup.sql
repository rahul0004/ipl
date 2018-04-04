-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ipl_2018
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ipl_players_bio_bkup`
--

DROP TABLE IF EXISTS `ipl_players_bio_bkup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ipl_players_bio_bkup` (
  `ipl_players_bio_bkup_team_id` int(11) NOT NULL,
  `ipl_players_bio_bkup_id` varchar(45) NOT NULL,
  `ipl_players_bio_bkup_country` varchar(45) NOT NULL,
  `ipl_players_bio_bkup_profile` varchar(3000) NOT NULL,
  `ipl_players_bio_bkup_img_url` varchar(5000) DEFAULT NULL,
  `ipl_players_bio_bkup_bat_style` varchar(200) DEFAULT NULL,
  `ipl_players_bio_bkup_bowl_style` varchar(200) DEFAULT NULL,
  `ipl_players_bio_bkup_major_teams` varchar(5000) DEFAULT NULL,
  `ipl_players_bio_bkup_full_name` varchar(200) DEFAULT NULL,
  `ipl_players_bio_bkup_name` varchar(200) DEFAULT NULL,
  `ipl_players_bio_bkup_category` varchar(45) DEFAULT NULL,
  `ipl_players_bio_bkup_playing_role` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ipl_players_bio_bkup_team_id`,`ipl_players_bio_bkup_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-04 22:52:08
