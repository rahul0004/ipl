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
-- Table structure for table `ipl_users_cred`
--

DROP TABLE IF EXISTS `ipl_users_cred`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ipl_users_cred` (
  `ipl_users_cred_username` varchar(100) NOT NULL,
  `ipl_users_cred_pwd` varchar(500) NOT NULL,
  `ipl_users_cred_id` int(11) NOT NULL AUTO_INCREMENT,
  `ipl_users_cred_name` varchar(100) NOT NULL,
  PRIMARY KEY (`ipl_users_cred_username`),
  UNIQUE KEY `ipl_users_cred_id_UNIQUE` (`ipl_users_cred_id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ipl_users_cred`
--

LOCK TABLES `ipl_users_cred` WRITE;
/*!40000 ALTER TABLE `ipl_users_cred` DISABLE KEYS */;
INSERT INTO `ipl_users_cred` VALUES ('aminder.singh','BtaSjn@G',26,'Aminder Singh'),('amol.r.kulkarni','8C+UXJH9',36,'Amol Kulkarni'),('anand.k.gopal','ve3ze9yZ',13,'Anand Gopal'),('aniket.ashok.more','dX65DqYA',30,'Aniket More'),('aniruddha.parlikar','69fHP5Mn',5,'Aniruddha Parlikar'),('ankita.hemant.raut','6FV2YEGW',44,'Ankita Raut'),('anmol.arora','BUc2AtGk',25,'Anmol Arora'),('anuj.c.saxena','57QBccFe',56,'Anuj Saxena'),('arjun.e.singh','hJ@9FyWG',34,'Arjun Singh'),('ashish.c.sinha','FMfj6ny+',17,'Ashish Sinha'),('brijesh.d.kumar','T9TwzCmV',28,'Brijesh Kumar'),('c.william.tuscano','qcYmUT@@',41,'Chris Tuscano'),('cheena.middha','D5dCwhh+',57,'Cheena Middha'),('darshil.a.surti','xnVwtsu@',42,'Darshil Surti'),('deep.arvind.kataria','+SNAets9',21,'Deep Kataria'),('dipti.shah.futarmal','uH5eW4E4',18,'Dipti Futarmal'),('ganesh.babu.bandekar','HxPBywrS',32,'Ganesh Bandekar'),('j.amrutlal.oswal','u5ARtuaa',24,'J Oswal'),('jainam.chetan.sheth','a4AGd8ZJ',48,'Jainam Sheth'),('jenish.hemant.shah','GNDSv6dZ',59,'Jenish Shah'),('jitendra.d.giri','rjM@9HYF',9,'Jitendra Giri'),('jyotsna.mondkar','s79Yy48a',27,'Jyotsna Mondkar'),('kirti.praveen','vTWmPSyt',23,'Kirti Praveen'),('manish.gulab.thorat','xX@NFVEp',37,'Manish Thorat'),('mukul.mohan.ghate','WGHGEBvx',50,'Mukul Ghate'),('n.sachithanandam','7eB@mEAy',51,'Navin Sachitanandam'),('nikhil.c.gupta','MX@fZfRt',39,'Nikhil Gupta'),('nirbhay.sharma','bY3w8Sxx',52,'Nirbhay Sharma'),('nitin.roman','A3pZJB5y',45,'Nitin Roman'),('pankaj.b.jain','GRfBKTzK',61,'Pankaj Jain'),('pragun.varshney','gtUDztp7',55,'Pragun Varshney'),('prakash.gopikant.jha','@Fzsnec@',20,'Prakash Jha'),('priyanka.r.gupta','Cf4Gm3pr',11,'Priyanka Gupta'),('rahul.b.shah','bf@2@nB2',46,'Rahul Shah'),('rahul.sadanshiv','fJeDXKYj',49,'Rahul Sadanshiv'),('rahul.vilas.kasar','W@9Z39WU',2,'Rahul Kasar'),('rajesh.sitaram.patil','XDJSzzWJ',47,'Rajesh Patil'),('rama.chandra.khandai','vaEbZpGG',22,'Rama Khandai'),('rekha.rajesh.dudhiya','kvR3jxSd',60,'Rekha Dudhiya'),('rinky.dhiren.sejpal','thAyEF35',29,'Rinky Sejpal'),('ruturaj.ramesh.patil','dehaq7rK',54,'Ruturaj Patil'),('sagar.dighe','EgMRvhKw',4,'Sagar Dighe'),('sandeep.mohan.kumar','NCxayMHS',35,'Sandeep Kumar'),('santosh.prusty','aScw4d3K',62,'Santosh Prusty'),('sarthak.bhagwat.taru','yteSaevC',7,'Sarthak Taru'),('shrutika.s.kawa','rHT4JPKs',14,'Shrutika Kawa'),('sumil.k.dhamecha','a7bh3a65',40,'Sumil Dhamecha'),('suraj.chavan','yWPz2h3w',31,'Suraj Chavan'),('suyashkumar.ratner','eXK@P3Xn',8,'Suyashkumar Ratner'),('swapnali.a.jadhav','kDa8nbDq',33,'Swapnali  Jadhav'),('swapnil.pramod.patil','QMuPzkzK',10,'Swapnil Patil'),('swapnil.r.sanagar','kGypg+26',6,'Swapnil Sanagar'),('tarun.vora','eJt2jeTz',43,'Tarun Vora'),('v.narendra.trivedi','2eb5GbTB',1,'Vikram Trivedi'),('vaibhav.parmar','hQ@VEfSa',15,'Vaibhav Parmar'),('venkat.naresh','F@WB@+23',12,'Venkat Naresh'),('venkata.r.namana','uxXCqRm3',3,'Venkata Namana'),('venkatesh.b.kesari','yUc6atVR',38,'Venkatesh Kesari'),('vipin.k.nair','D5dCwhh+',58,'Vipin Nair'),('vishal.m.sanghavi','69vrbqbf',19,'Vishal Sanghavi'),('yatish.s.mahajan','SXMtYMGS',53,'Yatish Mahajan'),('yogesh.sunil.palekar','rBM25TvC',16,'Yogesh Palekar');
/*!40000 ALTER TABLE `ipl_users_cred` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-07 15:31:16
