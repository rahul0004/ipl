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
  `ipl_users_team_tstamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ipl_users_team`
--

LOCK TABLES `ipl_users_team` WRITE;
/*!40000 ALTER TABLE `ipl_users_team` DISABLE KEYS */;
INSERT INTO `ipl_users_team` VALUES ('rahul.vilas.kasar',34102,28235,30045,253802,604527,398438,234675,311158,326016,793463,625383,'2018-04-06 18:16:39'),('darshil.a.surti',28081,253802,28763,33335,34102,625383,6033,793463,311158,398438,471342,'2018-04-09 14:09:35'),('anand.k.gopal',253802,471342,28763,6033,625383,793463,311158,28081,398438,33335,34102,'2018-04-06 14:04:50'),('prakash.gopikant.jha',28081,253802,720471,793463,326016,311158,625371,446763,625383,277906,34102,'2018-04-05 08:14:01'),('aminder.singh',36084,34102,28763,253802,44936,446507,325026,230558,311158,625383,279545,'2018-04-06 18:10:25'),('shrutika.s.kawa',34102,625383,379143,720471,793463,311158,471342,398438,6033,33335,253802,'2018-04-06 11:36:26'),('j.amrutlal.oswal',253802,793463,28235,311158,28763,471342,625383,390484,446763,30045,277916,'2018-04-06 11:44:46'),('ganesh.babu.bandekar',253802,793463,33335,30045,720471,311158,732291,625371,625383,28235,232359,'2018-04-06 14:16:50'),('anuj.c.saxena',230558,276298,44936,325012,28235,253802,625383,35928,422992,33335,34102,'2018-04-06 16:16:01'),('jyotsna.mondkar',28235,253802,326016,625383,793463,44936,311158,625371,1070173,326637,720471,'2018-04-06 16:31:58'),('jitendra.d.giri',471342,35582,625383,44936,720471,311158,28235,326016,793463,253802,34102,'2018-04-06 16:56:54'),('venkatesh.b.kesari',44936,253802,34102,33335,321777,51439,625371,625383,1070188,550215,604527,'2018-04-06 16:51:34'),('suraj.chavan',28081,230559,5334,253802,34102,625371,625383,44828,1132005,33141,1081442,'2018-04-06 16:52:10'),('brijesh.d.kumar',30045,604527,34102,253802,28235,28763,311158,230558,793463,625383,471342,'2018-04-06 17:12:13'),('suyashkumar.ratner',253802,33335,390484,471342,8180,290630,459508,277912,446763,422108,30045,'2018-04-06 17:28:14'),('rama.chandra.khandai',34102,1070168,604527,625383,326016,325026,51439,253802,459508,44936,33335,'2018-04-06 17:31:47'),('n.sachithanandam',28081,33335,253802,29264,8180,51880,36084,277916,422992,326637,420644,'2018-04-06 17:32:01'),('ankita.hemant.raut',253802,28763,34102,720471,471342,311158,326016,625383,28081,793463,28235,'2018-04-06 17:33:30'),('swapnil.r.sanagar',326637,253802,422108,720471,446763,28081,288992,326016,625371,311592,311158,'2018-04-06 17:33:42'),('arjun.e.singh',34102,793463,720471,311158,471342,30045,28235,625383,28763,326016,253802,'2018-04-06 17:34:16'),('amol.r.kulkarni',6033,398438,253802,625383,30045,471342,277906,793463,311158,34102,33335,'2018-04-06 17:37:27'),('cheena.middha',253802,625383,28081,793463,311158,471342,398438,6033,28763,33335,34102,'2018-04-06 17:42:06'),('jainam.chetan.sheth',28081,34102,1070173,326637,253802,321777,29264,422992,459508,51880,32498,'2018-04-06 17:46:23'),('yogesh.sunil.palekar',34102,28235,253802,33335,398438,28081,311158,471342,326016,625383,40618,'2018-04-06 17:46:55'),('aniket.ashok.more',1070173,321777,34102,253802,326637,44936,311158,625371,732291,326016,625383,'2018-04-06 18:00:11'),('swapnil.pramod.patil',253802,326016,430246,230558,1070168,311158,51880,34102,44828,604527,30045,'2018-04-06 18:04:02'),('sumil.k.dhamecha',44936,44828,34102,253802,446507,481896,537119,326016,51439,33335,471342,'2018-04-06 18:09:46'),('ruturaj.ramesh.patil',253802,326016,625383,230558,51880,34102,311158,1070168,33335,720471,30045,'2018-04-07 12:24:50'),('sagar.dighe',253802,398438,376324,33335,51880,261354,326016,44936,44932,35582,28763,'2018-04-06 18:12:32'),('c.william.tuscano',253802,30045,34102,625383,793463,642525,326016,471342,439952,326637,33335,'2018-04-06 18:13:30'),('sarthak.bhagwat.taru',253802,28235,321777,439952,532856,447587,33335,625383,471342,44936,230558,'2018-04-06 18:15:06'),('tarun.vora',253802,44936,28235,398438,276298,326637,33335,471342,326016,625383,793463,'2018-04-06 18:17:59'),('sandeep.mohan.kumar',625383,326016,30045,311158,34102,253802,398438,230558,51439,720471,28763,'2018-04-07 11:58:50'),('rekha.rajesh.dudhiya',30045,232359,311158,326016,325026,625383,430246,326637,446763,604527,253802,'2018-04-07 12:19:59'),('pragun.varshney',33335,326016,28081,51880,28763,471342,720471,321777,430246,625383,253802,'2018-04-07 12:28:27'),('pankaj.b.jain',253802,28763,625383,793463,398438,326016,44936,471342,311158,28235,33335,'2018-04-07 12:36:31'),('nitin.roman',253802,325026,5334,471342,720471,326016,430246,40618,30045,28763,35582,'2018-04-07 12:39:04'),('venkat.naresh',28763,230558,528067,505773,625371,26421,530773,35582,33335,253802,28081,'2018-04-07 12:43:04'),('santosh.prusty',33335,326637,793463,230558,34102,439952,28235,471342,1070188,28081,253802,'2018-04-09 15:49:37'),('priyanka.r.gupta',253802,34102,290630,422108,720471,30045,471342,326016,475281,625383,311158,'2018-04-07 13:11:30'),('nirbhay.sharma',253802,446763,326016,28235,56143,793463,44936,430246,55395,398438,33335,'2018-04-07 13:22:26'),('vishal.m.sanghavi',253802,28235,625383,793463,326016,44936,311158,471342,277906,604527,34102,'2018-04-07 17:11:56'),('rinky.dhiren.sejpal',34102,625383,279545,230558,28763,325026,311158,446507,44936,253802,36084,'2018-04-09 13:32:27'),('swapnali.a.jadhav',28763,326016,253802,230558,44936,1081442,51439,311158,720471,277916,34102,'2018-04-09 13:35:55'),('deep.arvind.kataria',44936,33335,28235,28763,793463,51439,625383,34102,471342,253802,1081442,'2018-04-09 14:05:32'),('vipin.k.nair',33335,28081,326016,253802,277906,604527,471342,330902,34102,311158,230558,'2018-04-09 15:22:01'),('jenish.hemant.shah',230558,30045,253802,34102,308798,33335,604527,439952,326016,471342,793463,'2018-04-09 15:29:16'),('vaibhav.parmar',253802,33335,642519,604527,793463,422108,326016,230558,51439,471342,28081,'2018-04-09 16:07:11'),('aniruddha.parlikar',34102,311592,1070173,1070188,311158,625383,625371,44936,28763,277906,253802,'2018-04-09 16:39:25'),('saurabh.j.patil',379143,625383,311158,51439,422108,604527,720471,253802,277916,326016,230558,'2018-04-09 19:04:49');
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

-- Dump completed on 2018-04-10 19:33:28
