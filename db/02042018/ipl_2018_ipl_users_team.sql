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
-- Table structure for table `ipl_users_team`
--

DROP TABLE IF EXISTS `ipl_users_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ipl_users_team` (
  `ipl_users_team_un` varchar(100) NOT NULL,
  `ipl_users_team_player_one` int(11) NOT NULL,
  `ipl_users_team_player_two` int(11) NOT NULL,
  `ipl_users_team_player_three` int(11) NOT NULL,
  `ipl_users_team_player_four` int(11) NOT NULL,
  `ipl_users_team_player_five` int(11) NOT NULL,
  `ipl_users_team_player_six` int(11) NOT NULL,
  `ipl_users_team_player_seven` int(11) NOT NULL,
  `ipl_users_team_player_eight` int(11) NOT NULL,
  `ipl_users_team_player_nine` int(11) NOT NULL,
  `ipl_users_team_player_ten` int(11) NOT NULL,
  `ipl_users_team_player_eleven` int(11) NOT NULL,
  `ipl_users_team_tstamp` datetime NOT NULL,
  PRIMARY KEY (`ipl_users_team_un`),
  CONSTRAINT `ipl_user_name_FK` FOREIGN KEY (`ipl_users_team_un`) REFERENCES `ipl_users_cred` (`ipl_users_cred_username`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ipl_users_team`
--

LOCK TABLES `ipl_users_team` WRITE;
/*!40000 ALTER TABLE `ipl_users_team` DISABLE KEYS */;
/*!40000 ALTER TABLE `ipl_users_team` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-02 20:15:19
