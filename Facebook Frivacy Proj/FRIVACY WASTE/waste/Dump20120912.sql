CREATE DATABASE  IF NOT EXISTS `frivacy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `frivacy`;
-- MySQL dump 10.13  Distrib 5.5.16, for Win32 (x86)
--
-- Host: lersais.exp.sis.pitt.edu    Database: frivacy
-- ------------------------------------------------------
-- Server version	5.5.22-log

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
-- Table structure for table `old_listmember`
--

DROP TABLE IF EXISTS `old_listmember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `old_listmember` (
  `listID` bigint(20) NOT NULL,
  `friendFID` bigint(20) NOT NULL,
  `friendName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `old_listmember`
--

LOCK TABLES `old_listmember` WRITE;
/*!40000 ALTER TABLE `old_listmember` DISABLE KEYS */;
/*!40000 ALTER TABLE `old_listmember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `time` int(11) NOT NULL,
  `userFBId` bigint(20) NOT NULL,
  `typeRef` int(11) NOT NULL,
  `dumpRef` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_transaction_transactionType1` (`typeRef`),
  KEY `fk_transaction_dump1` (`dumpRef`),
  CONSTRAINT `fk_transaction_transactionType1` FOREIGN KEY (`typeRef`) REFERENCES `transactiontype` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_transaction_dump1` FOREIGN KEY (`dumpRef`) REFERENCES `dump` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,1346963284,504592327,1,1),(2,1346963893,504592327,1,2),(3,1346964361,504592327,1,3),(4,1346964635,504592327,1,4),(5,1346965746,504592327,1,5),(6,1346965784,504592327,1,6),(7,1346965874,504592327,1,7),(8,1346965948,504592327,1,8),(9,1346982226,504592327,1,9),(10,1346982250,504592327,1,10),(11,1346982406,504592327,1,11),(12,1347018262,504592327,1,12),(13,1347018333,504592327,1,13),(14,1347390749,504592327,1,16);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dump`
--

DROP TABLE IF EXISTS `dump`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dump` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `time` int(11) NOT NULL,
  `data` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dump`
--

LOCK TABLES `dump` WRITE;
/*!40000 ALTER TABLE `dump` DISABLE KEYS */;
INSERT INTO `dump` VALUES (1,1346963284,'Array'),(2,1346963893,'Array'),(3,1346964361,'Array'),(4,1346964635,'Array'),(5,1346965746,'Array'),(6,1346965784,'Array'),(7,1346965874,'Array'),(8,1346965948,'Array'),(9,1346982226,'Array'),(10,1346982250,'Array'),(11,1346982406,'Array'),(12,1347018262,'Array'),(13,1347018333,'Array'),(14,1347019290,'Array'),(15,1347019386,'Array'),(16,1347390749,'Array');
/*!40000 ALTER TABLE `dump` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list`
--

DROP TABLE IF EXISTS `list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `list` (
  `transactionRef` bigint(20) NOT NULL,
  `listFBId` bigint(20) NOT NULL,
  PRIMARY KEY (`listFBId`,`transactionRef`),
  KEY `fk_friendlist_record1` (`transactionRef`),
  CONSTRAINT `fk_friendlist_record1` FOREIGN KEY (`transactionRef`) REFERENCES `transaction` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list`
--

LOCK TABLES `list` WRITE;
/*!40000 ALTER TABLE `list` DISABLE KEYS */;
/*!40000 ALTER TABLE `list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setting`
--

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
INSERT INTO `setting` VALUES (1,'who can look you up using the email address or phone number you provided?'),(2,'who can send you friend requests?<a class=\"mls helplink hidden_elem uihelplink\" data-hover=\"tooltip\" title=\"people you subscribe to can still send you friend requests.\" href=\"/help/?faq=217125868312360\"></a>'),(3,'who can send you facebook messages?'),(4,'who can send you friend requests?'),(5,'who can post on your timeline?'),(6,'who can see what others post on your timeline?'),(7,'review posts friends tag you in before they appear on your timeline'),(8,'who can see posts you\'ve been tagged in on your timeline?'),(9,'review tags friends add to your own posts on facebook'),(10,'who sees tag suggestions when photos that look like you are uploaded?'),(11,'about me:'),(12,'current city:'),(13,'hometown:'),(14,'where have you worked?'),(15,'where did you go to college/university?'),(16,'where did you go to high school?'),(17,'favorite quotations:'),(18,'relationship status:'),(19,'family:'),(20,'birthday:'),(21,'interested in:'),(22,'languages:'),(23,'religion:'),(24,'political views:');
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `old_settings`
--

DROP TABLE IF EXISTS `old_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `old_settings` (
  `id` bigint(20) NOT NULL,
  `transactionId` bigint(20) NOT NULL,
  `objectType` varchar(45) NOT NULL COMMENT 'fixed/album/?',
  `objectName` varchar(100) NOT NULL COMMENT 'setting text / album name',
  `objectFID` bigint(20) DEFAULT NULL COMMENT 'for objects that have id such as photo albums',
  `prm` char(1) NOT NULL COMMENT 'P/F (Permitted/Forbidden)\nE/D (Enabled/Disabled)',
  `subjectType` varchar(45) NOT NULL COMMENT 'fixed/friend/list',
  `subjectName` varchar(45) NOT NULL,
  `subjectFID` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_setting_record` (`transactionId`),
  CONSTRAINT `fk_setting_record` FOREIGN KEY (`transactionId`) REFERENCES `transaction` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `old_settings`
--

LOCK TABLES `old_settings` WRITE;
/*!40000 ALTER TABLE `old_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `old_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersetting`
--

DROP TABLE IF EXISTS `usersetting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usersetting` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `transactionRef` bigint(20) NOT NULL,
  `settingRef` int(11) NOT NULL,
  `settingValue` varchar(45) NOT NULL,
  `settingValueId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_userSetting_setting1` (`settingRef`),
  KEY `fk_userSetting_transaction1` (`transactionRef`),
  CONSTRAINT `fk_userSetting_setting1` FOREIGN KEY (`settingRef`) REFERENCES `setting` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_userSetting_transaction1` FOREIGN KEY (`transactionRef`) REFERENCES `transaction` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersetting`
--

LOCK TABLES `usersetting` WRITE;
/*!40000 ALTER TABLE `usersetting` DISABLE KEYS */;
INSERT INTO `usersetting` VALUES (1,14,1,'everyone',NULL),(2,14,4,'everyone',NULL),(3,14,3,'everyone',NULL),(4,14,5,'friends',NULL),(5,14,6,'custom_value','111'),(6,14,6,'friends','40'),(7,14,6,'lists_x','120479517327'),(8,14,7,'off',NULL),(9,14,8,'friends',NULL),(10,14,9,'off',NULL),(11,14,10,'friends',NULL),(12,14,11,'custom_value','50'),(13,14,14,'custom_value','111'),(14,14,14,'friends','50'),(15,14,14,'list_x_anon','10150713843402328'),(16,14,14,'ids_x_anon','622983691'),(17,14,15,'custom_value','50'),(18,14,16,'custom_value','50'),(19,14,20,'friends',NULL),(20,14,21,'custom_value','50'),(21,14,18,'only me',NULL),(22,14,22,'custom_value','50'),(23,14,23,'friends',NULL),(24,14,24,'friends',NULL),(25,14,19,'friends',NULL),(26,14,17,'custom_value','50'),(27,14,12,'custom_value','50'),(28,14,13,'custom_value','50');
/*!40000 ALTER TABLE `usersetting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friend` (
  `transactionRef` bigint(20) NOT NULL,
  `friendFBId` bigint(20) NOT NULL,
  PRIMARY KEY (`transactionRef`,`friendFBId`),
  KEY `fk_friend_record1` (`transactionRef`),
  CONSTRAINT `fk_friend_record1` FOREIGN KEY (`transactionRef`) REFERENCES `transaction` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactiontype`
--

DROP TABLE IF EXISTS `transactiontype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactiontype` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL COMMENT 'e.g., policy, friends, fiendlists, ?',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactiontype`
--

LOCK TABLES `transactiontype` WRITE;
/*!40000 ALTER TABLE `transactiontype` DISABLE KEYS */;
INSERT INTO `transactiontype` VALUES (1,'userSettings'),(2,'friends');
/*!40000 ALTER TABLE `transactiontype` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2012-09-12 15:49:40
