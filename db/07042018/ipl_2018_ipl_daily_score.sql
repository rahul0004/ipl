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
-- Table structure for table `ipl_daily_score`
--

DROP TABLE IF EXISTS `ipl_daily_score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ipl_daily_score` (
  `ipl_daily_score_match_id` int(11) NOT NULL,
  `ipl_daily_score_player_id` int(11) NOT NULL,
  `ipl_daily_score_fielding` decimal(11,2) NOT NULL,
  `ipl_daily_score_batting` decimal(11,2) NOT NULL,
  `ipl_daily_score_bowling` decimal(11,2) NOT NULL,
  `ipl_daily_score_mom` decimal(11,2) NOT NULL,
  `ipl_daily_score_total_points` decimal(11,2) NOT NULL,
  `ipl_daily_score_tstamp` datetime NOT NULL,
  PRIMARY KEY (`ipl_daily_score_match_id`,`ipl_daily_score_player_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ipl_daily_score`
--

LOCK TABLES `ipl_daily_score` WRITE;
/*!40000 ALTER TABLE `ipl_daily_score` DISABLE KEYS */;
INSERT INTO `ipl_daily_score` VALUES (1131241,53800,1.00,1.00,5.00,0.00,6.00,'2018-04-03 16:44:57'),(1131241,254168,0.00,10.00,0.00,0.00,9.00,'2018-04-03 16:44:57'),(1131241,263473,0.00,0.00,5.00,0.00,5.00,'2018-04-03 16:44:57'),(1131241,268889,0.00,0.00,0.00,0.00,0.00,'2018-04-03 16:44:57'),(1131241,275442,1.00,11.00,0.00,0.00,12.00,'2018-04-03 16:44:57'),(1131241,275486,1.00,7.00,0.00,0.00,7.00,'2018-04-03 16:44:57'),(1131241,275487,1.00,0.00,3.00,0.00,4.00,'2018-04-03 16:44:57'),(1131241,297074,0.00,0.00,0.00,0.00,0.00,'2018-04-03 16:44:57'),(1131241,297079,0.00,0.00,1.00,0.00,1.00,'2018-04-03 16:44:57'),(1131241,329336,1.00,21.00,0.00,5.00,26.00,'2018-04-03 16:44:57'),(1131241,374936,1.00,0.00,0.00,0.00,1.00,'2018-04-03 16:44:57'),(1131241,381258,1.00,0.00,0.00,0.00,1.00,'2018-04-03 16:44:57'),(1131241,381305,1.00,0.00,2.00,0.00,3.00,'2018-04-03 16:44:57'),(1131241,420314,0.00,0.00,10.00,0.00,10.00,'2018-04-03 16:44:57'),(1131241,466619,0.00,2.00,0.00,0.00,1.00,'2018-04-03 16:44:57'),(1131241,515874,1.00,4.00,0.00,0.00,5.00,'2018-04-03 16:44:57'),(1131241,515876,0.00,0.00,0.00,0.00,0.00,'2018-04-03 16:44:57'),(1131241,515905,0.00,8.00,1.00,0.00,8.00,'2018-04-03 16:44:57'),(1131241,580663,0.00,0.00,3.00,0.00,3.00,'2018-04-03 16:44:57'),(1131241,858809,1.00,10.00,4.00,0.00,14.00,'2018-04-03 16:44:57'),(1131241,874277,1.00,0.00,0.00,0.00,1.00,'2018-04-03 16:44:57'),(1131241,878039,0.00,0.00,1.00,0.00,1.00,'2018-04-03 16:44:57');
/*!40000 ALTER TABLE `ipl_daily_score` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-07 15:31:10
