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
INSERT INTO `ipl_daily_score` VALUES (1136561,8180,0.00,3.10,5.00,0.00,8.10,'2018-04-09 20:34:57'),(1136561,28081,0.00,0.50,0.00,0.00,0.50,'2018-04-09 20:34:57'),(1136561,29264,1.00,1.30,0.00,0.00,2.30,'2018-04-09 20:34:57'),(1136561,33141,1.00,4.20,0.00,0.00,5.20,'2018-04-09 20:34:57'),(1136561,33335,0.00,0.40,0.00,0.00,0.40,'2018-04-09 20:34:57'),(1136561,34102,1.00,3.00,0.00,0.00,4.00,'2018-04-09 20:34:57'),(1136561,40618,0.00,0.20,3.00,0.00,3.20,'2018-04-09 20:34:57'),(1136561,51439,0.00,21.30,1.00,5.00,27.30,'2018-04-09 20:34:57'),(1136561,234675,0.00,1.70,0.00,0.00,1.70,'2018-04-09 20:34:57'),(1136561,290716,0.00,4.90,0.00,0.00,4.90,'2018-04-09 20:34:57'),(1136561,319439,0.00,0.00,3.00,0.00,3.00,'2018-04-09 20:34:57'),(1136561,330902,1.00,0.00,3.00,0.00,4.00,'2018-04-09 20:34:57'),(1136561,351588,1.00,0.10,1.00,0.00,2.10,'2018-04-09 20:34:57'),(1136561,431901,1.00,0.00,0.00,0.00,1.00,'2018-04-09 20:34:57'),(1136561,446507,1.00,9.30,0.00,0.00,10.30,'2018-04-09 20:34:57'),(1136561,447261,0.00,0.00,4.00,0.00,4.00,'2018-04-09 20:34:57'),(1136561,471342,1.00,11.60,0.00,0.00,12.60,'2018-04-09 20:34:57'),(1136561,625371,0.00,3.20,10.00,0.00,13.20,'2018-04-09 20:34:57'),(1136561,625383,1.00,0.00,3.00,0.00,4.00,'2018-04-09 20:34:57'),(1136561,720471,1.00,7.00,0.00,0.00,8.00,'2018-04-09 20:34:57'),(1136561,1081442,0.00,0.00,11.00,0.00,11.00,'2018-04-09 20:34:57'),(1136562,4864,0.00,2.30,3.00,0.00,5.30,'2018-04-09 21:04:32'),(1136562,26421,0.00,0.00,4.00,0.00,4.00,'2018-04-09 21:04:32'),(1136562,28763,0.00,12.00,0.00,0.00,12.00,'2018-04-09 21:04:32'),(1136562,31107,0.00,0.00,1.00,0.00,1.00,'2018-04-09 21:04:32'),(1136562,36084,0.00,2.20,0.00,0.00,2.20,'2018-04-09 21:04:32'),(1136562,232359,0.00,0.40,0.00,0.00,0.40,'2018-04-09 21:04:32'),(1136562,277912,1.00,0.00,3.00,0.00,4.00,'2018-04-09 21:04:32'),(1136562,321777,0.00,2.90,0.00,0.00,2.90,'2018-04-09 21:04:32'),(1136562,325012,0.00,3.20,0.00,0.00,3.20,'2018-04-09 21:04:32'),(1136562,398438,0.00,1.70,0.00,0.00,1.70,'2018-04-09 21:04:32'),(1136562,398439,0.00,13.50,0.00,0.00,13.50,'2018-04-09 21:04:32'),(1136562,422108,1.00,18.10,0.00,5.00,24.10,'2018-04-09 21:04:32'),(1136562,423838,0.00,1.40,3.00,0.00,4.40,'2018-04-09 21:04:32'),(1136562,439952,0.00,4.20,3.00,0.00,7.20,'2018-04-09 21:04:32'),(1136562,459508,1.00,0.00,1.00,0.00,2.00,'2018-04-09 21:04:32'),(1136562,477021,1.00,1.30,0.00,0.00,2.30,'2018-04-09 21:04:32'),(1136562,481896,2.00,0.00,0.00,0.00,2.00,'2018-04-09 21:04:32'),(1136562,537119,0.00,0.00,5.00,0.00,5.00,'2018-04-09 21:04:32'),(1136562,554691,1.00,0.00,2.00,0.00,3.00,'2018-04-09 21:04:32'),(1136562,642519,0.00,2.10,0.00,0.00,2.10,'2018-04-09 21:04:32'),(1136562,931581,0.00,5.80,0.00,0.00,5.80,'2018-04-09 21:04:32'),(1136562,974109,1.00,0.00,5.00,0.00,6.00,'2018-04-09 21:04:32'),(1136563,6033,1.00,0.00,3.00,0.00,4.00,'2018-04-09 21:36:15'),(1136563,30045,0.00,5.50,0.00,0.00,5.50,'2018-04-09 21:36:15'),(1136563,32966,0.00,0.00,3.00,0.00,3.00,'2018-04-09 21:36:15'),(1136563,35582,0.00,2.30,0.00,0.00,2.30,'2018-04-09 21:36:15'),(1136563,35731,1.00,1.10,5.00,0.00,7.10,'2018-04-09 21:36:15'),(1136563,37737,1.00,10.30,0.00,0.00,11.30,'2018-04-09 21:36:15'),(1136563,44936,2.00,12.90,0.00,0.00,14.90,'2018-04-09 21:36:15'),(1136563,230558,0.00,18.00,3.00,5.00,26.00,'2018-04-09 21:36:15'),(1136563,247235,0.00,1.00,10.00,0.00,11.00,'2018-04-09 21:36:15'),(1136563,253802,0.00,4.60,0.00,0.00,4.60,'2018-04-09 21:36:15'),(1136563,276298,1.00,3.50,1.00,0.00,5.50,'2018-04-09 21:36:15'),(1136563,326637,0.00,1.00,0.00,0.00,1.00,'2018-04-09 21:36:15'),(1136563,376116,0.00,0.00,5.00,0.00,5.00,'2018-04-09 21:36:15'),(1136563,379143,1.00,0.90,0.00,0.00,1.90,'2018-04-09 21:36:15'),(1136563,398506,0.00,10.70,0.00,0.00,10.70,'2018-04-09 21:36:15'),(1136563,430246,0.00,0.00,1.00,0.00,1.00,'2018-04-09 21:36:15'),(1136563,559235,0.00,0.00,1.00,0.00,1.00,'2018-04-09 21:36:15'),(1136563,604527,0.00,6.40,4.00,0.00,10.40,'2018-04-09 21:36:15'),(1136563,642525,0.00,0.60,0.00,0.00,0.60,'2018-04-09 21:36:15'),(1136563,719715,0.00,0.00,3.00,0.00,3.00,'2018-04-09 21:36:15'),(1136563,723105,1.00,1.10,0.00,0.00,2.10,'2018-04-09 21:36:15'),(1136563,1083033,0.00,0.00,1.00,0.00,1.00,'2018-04-09 21:36:15'),(1136564,28235,0.00,18.20,0.00,5.00,23.20,'2018-04-10 01:10:27'),(1136564,32498,2.00,0.00,0.00,0.00,2.00,'2018-04-10 01:10:27'),(1136564,56143,0.00,0.00,6.00,0.00,6.00,'2018-04-10 01:10:27'),(1136564,277906,2.00,6.10,0.00,0.00,8.10,'2018-04-10 01:10:27'),(1136564,277916,0.00,2.30,0.00,0.00,2.30,'2018-04-10 01:10:27'),(1136564,277955,0.00,0.30,1.00,0.00,1.30,'2018-04-10 01:10:27'),(1136564,279810,2.00,1.00,0.00,0.00,3.00,'2018-04-10 01:10:27'),(1136564,290630,1.00,0.00,0.00,0.00,1.00,'2018-04-10 01:10:27'),(1136564,308798,0.00,0.90,1.00,0.00,1.90,'2018-04-10 01:10:27'),(1136564,308967,0.00,0.60,0.00,0.00,0.60,'2018-04-10 01:10:27'),(1136564,311158,0.00,0.50,1.00,0.00,1.50,'2018-04-10 01:10:27'),(1136564,315623,1.00,0.10,1.00,0.00,2.10,'2018-04-10 01:10:27'),(1136564,326016,0.00,0.00,3.00,0.00,3.00,'2018-04-10 01:10:27'),(1136564,326017,0.00,0.00,7.00,0.00,7.00,'2018-04-10 01:10:27'),(1136564,344580,0.00,2.80,2.00,0.00,4.80,'2018-04-10 01:10:27'),(1136564,390484,0.00,0.10,3.00,0.00,3.10,'2018-04-10 01:10:27'),(1136564,424377,0.00,0.00,0.00,0.00,0.00,'2018-04-10 01:10:27'),(1136564,425943,0.00,7.40,0.00,0.00,7.40,'2018-04-10 01:10:27'),(1136564,446763,0.00,2.70,0.00,0.00,2.70,'2018-04-10 01:10:27'),(1136564,533042,0.00,0.00,3.00,0.00,3.00,'2018-04-10 01:10:27'),(1136564,793463,2.00,0.00,4.00,0.00,6.00,'2018-04-10 01:10:27'),(1136565,8180,0.00,11.70,5.00,0.00,16.70,'2018-04-11 11:24:09'),(1136565,28081,1.00,4.00,0.00,0.00,5.00,'2018-04-11 11:24:09'),(1136565,29264,1.00,0.00,4.00,0.00,5.00,'2018-04-11 11:24:09'),(1136565,30045,1.00,4.60,0.00,0.00,5.60,'2018-04-11 11:24:09'),(1136565,32966,0.00,0.00,3.00,0.00,3.00,'2018-04-11 11:24:09'),(1136565,33141,0.00,8.40,0.00,0.00,8.40,'2018-04-11 11:24:09'),(1136565,33335,2.00,2.40,0.00,0.00,4.40,'2018-04-11 11:24:09'),(1136565,35582,1.00,6.90,0.00,0.00,7.90,'2018-04-11 11:24:09'),(1136565,35731,1.00,0.00,0.00,0.00,1.00,'2018-04-11 11:24:09'),(1136565,40618,0.00,0.00,1.00,0.00,1.00,'2018-04-11 11:24:09'),(1136565,51439,1.00,2.10,0.00,0.00,3.10,'2018-04-11 11:24:09'),(1136565,230558,0.00,3.20,5.00,0.00,8.20,'2018-04-11 11:24:09'),(1136565,234675,0.00,2.10,3.00,0.00,5.10,'2018-04-11 11:24:09'),(1136565,276298,0.00,26.30,1.00,0.00,27.30,'2018-04-11 11:24:09'),(1136565,297628,0.00,17.60,0.00,5.00,22.60,'2018-04-11 11:24:09'),(1136565,326637,0.00,4.20,0.00,0.00,4.20,'2018-04-11 11:24:09'),(1136565,447261,0.00,0.00,0.00,0.00,0.00,'2018-04-11 11:24:09'),(1136565,475281,0.00,0.00,3.00,0.00,3.00,'2018-04-11 11:24:09'),(1136565,550235,0.00,0.20,4.00,0.00,4.20,'2018-04-11 11:24:09'),(1136565,559235,0.00,0.00,3.00,0.00,3.00,'2018-04-11 11:24:09'),(1136565,604527,0.00,2.60,0.00,0.00,2.60,'2018-04-11 11:24:09'),(1136565,723105,0.00,0.20,0.00,0.00,0.20,'2018-04-11 11:24:09'),(1136566,31872,0.00,0.00,5.00,0.00,5.00,'2018-04-12 11:30:48'),(1136566,232359,0.00,0.00,0.00,0.00,0.00,'2018-04-12 11:30:48'),(1136566,277912,0.00,0.00,3.00,0.00,3.00,'2018-04-12 11:30:48'),(1136566,277916,0.00,7.00,0.00,0.00,7.00,'2018-04-12 11:30:48'),(1136566,277955,0.00,0.00,2.00,0.00,2.00,'2018-04-12 11:30:48'),(1136566,308798,0.00,1.10,0.00,0.00,1.10,'2018-04-12 11:30:48'),(1136566,308967,2.00,5.90,0.00,0.00,7.90,'2018-04-12 11:30:48'),(1136566,311158,1.00,3.10,0.00,0.00,4.10,'2018-04-12 11:30:48'),(1136566,315623,0.00,0.00,5.00,0.00,5.00,'2018-04-12 11:30:48'),(1136566,325026,0.00,3.70,0.00,0.00,3.70,'2018-04-12 11:30:48'),(1136566,390484,0.00,0.00,3.00,0.00,3.00,'2018-04-12 11:30:48'),(1136566,423838,0.00,0.00,1.00,0.00,1.00,'2018-04-12 11:30:48'),(1136566,424377,2.00,0.20,0.00,0.00,2.20,'2018-04-12 11:30:48'),(1136566,425943,0.00,8.70,0.00,5.00,13.70,'2018-04-12 11:30:48'),(1136566,439952,1.00,3.70,1.00,0.00,5.70,'2018-04-12 11:30:48'),(1136566,446763,0.00,2.50,0.00,0.00,2.50,'2018-04-12 11:30:48'),(1136566,477021,1.00,0.30,0.00,0.00,1.30,'2018-04-12 11:30:48'),(1136566,481896,0.00,0.00,3.00,0.00,3.00,'2018-04-12 11:30:48'),(1136566,642519,0.00,0.00,0.00,0.00,0.00,'2018-04-12 11:30:48'),(1136566,931581,1.00,3.50,0.00,0.00,4.50,'2018-04-12 11:30:48'),(1136567,28235,1.00,10.50,0.00,0.00,11.50,'2018-04-13 11:08:28'),(1136567,32498,1.00,2.40,0.00,0.00,3.40,'2018-04-13 11:08:28'),(1136567,34102,0.00,2.60,0.00,0.00,2.60,'2018-04-13 11:08:28'),(1136567,56143,1.00,1.70,3.00,0.00,5.70,'2018-04-13 11:08:28'),(1136567,230371,0.00,1.40,1.00,0.00,2.40,'2018-04-13 11:08:28'),(1136567,230559,1.00,6.30,0.00,0.00,7.30,'2018-04-13 11:08:28'),(1136567,277906,1.00,1.10,0.00,0.00,2.10,'2018-04-13 11:08:28'),(1136567,279545,0.00,0.00,1.00,0.00,1.00,'2018-04-13 11:08:28'),(1136567,279810,0.00,3.70,0.00,0.00,3.70,'2018-04-13 11:08:28'),(1136567,290630,0.00,1.60,0.00,0.00,1.60,'2018-04-13 11:08:28'),(1136567,326017,0.00,0.00,5.00,0.00,5.00,'2018-04-13 11:08:28'),(1136567,330902,1.00,0.00,10.00,0.00,11.00,'2018-04-13 11:08:28'),(1136567,431901,0.00,6.40,0.00,0.00,6.40,'2018-04-13 11:08:28'),(1136567,438362,1.00,0.00,5.00,0.00,6.00,'2018-04-13 11:08:28'),(1136567,446507,0.00,4.80,0.00,0.00,4.80,'2018-04-13 11:08:28'),(1136567,471342,1.00,2.50,1.00,0.00,4.50,'2018-04-13 11:08:28'),(1136567,497121,1.00,4.70,0.00,0.00,5.70,'2018-04-13 11:08:28'),(1136567,533042,0.00,1.00,5.00,0.00,6.00,'2018-04-13 11:08:28'),(1136567,625383,1.00,0.40,5.00,0.00,6.40,'2018-04-13 11:08:28'),(1136567,720471,2.00,1.90,0.00,0.00,3.90,'2018-04-13 11:08:28'),(1136567,793463,0.00,0.00,5.00,5.00,10.00,'2018-04-13 11:08:28'),(1136567,1081442,0.00,1.10,13.00,0.00,14.10,'2018-04-13 11:08:28'),(1136568,5334,0.00,0.00,0.00,0.00,0.00,'2018-04-14 16:05:32'),(1136568,26421,0.00,6.80,5.00,0.00,11.80,'2018-04-14 16:05:32'),(1136568,36084,0.00,0.90,0.00,0.00,0.90,'2018-04-14 16:05:32'),(1136568,37737,0.00,0.00,0.00,0.00,0.00,'2018-04-14 16:05:32'),(1136568,44936,0.00,14.70,0.00,0.00,14.70,'2018-04-14 16:05:32'),(1136568,247235,0.00,0.10,5.00,0.00,5.10,'2018-04-14 16:05:32'),(1136568,253802,1.00,4.10,0.00,0.00,5.10,'2018-04-14 16:05:32'),(1136568,325012,0.00,2.10,0.00,0.00,2.10,'2018-04-14 16:05:32'),(1136568,376116,1.00,0.00,11.00,5.00,17.00,'2018-04-14 16:05:32'),(1136568,379143,3.00,9.00,0.00,0.00,12.00,'2018-04-14 16:05:32'),(1136568,398438,0.00,3.00,0.00,0.00,3.00,'2018-04-14 16:05:32'),(1136568,398439,2.00,4.40,0.00,0.00,6.40,'2018-04-14 16:05:32'),(1136568,398506,0.00,2.70,0.00,0.00,2.70,'2018-04-14 16:05:32'),(1136568,422108,1.00,10.70,0.00,0.00,11.70,'2018-04-14 16:05:32'),(1136568,430246,0.00,0.00,3.00,0.00,3.00,'2018-04-14 16:05:32'),(1136568,459508,0.00,0.70,3.00,0.00,3.70,'2018-04-14 16:05:32'),(1136568,537119,0.00,0.10,0.00,0.00,0.10,'2018-04-14 16:05:32'),(1136568,554691,0.00,0.20,3.00,0.00,3.20,'2018-04-14 16:05:32'),(1136568,642525,2.00,0.00,0.00,0.00,2.00,'2018-04-14 16:05:32'),(1136568,719715,0.00,1.90,6.00,0.00,7.90,'2018-04-14 16:05:32'),(1136568,974109,1.00,0.00,3.00,0.00,4.00,'2018-04-14 16:05:32'),(1136568,1083033,0.00,0.00,5.00,0.00,5.00,'2018-04-14 16:05:32');
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

-- Dump completed on 2018-04-14 16:12:59
