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
-- Table structure for table `ipl_teams`
--

DROP TABLE IF EXISTS `ipl_teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ipl_teams` (
  `ipl_team_id` int(11) NOT NULL,
  `ipl_team_abbr` varchar(10) DEFAULT NULL,
  `ipl_team_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ipl_team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='ipl teams table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ipl_teams`
--

LOCK TABLES `ipl_teams` WRITE;
/*!40000 ALTER TABLE `ipl_teams` DISABLE KEYS */;
INSERT INTO `ipl_teams` VALUES (1,'KKR','KOLKATA KNIGHT RIDERS'),(2,'CSK','CHENNAI SUPER KINGS'),(3,'MI','MUMBAI INDIANS'),(4,'DD','DELHI DAREDEVILS'),(5,'RR','RAJASHTHAN ROYALS'),(6,'KXP','KINGS XI PUNJAB'),(7,'RCB','ROYAL CHALLENGERS BANGLORE'),(8,'SRH','SUNRISERS HYDERABAD');
/*!40000 ALTER TABLE `ipl_teams` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-02 20:15:18
