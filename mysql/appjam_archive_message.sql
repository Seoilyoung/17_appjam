-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: aws-rds-mysql.cha09o5yjew5.ap-northeast-2.rds.amazonaws.com    Database: appjam
-- ------------------------------------------------------
-- Server version	5.6.23-log

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
-- Table structure for table `archive_message`
--

DROP TABLE IF EXISTS `archive_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `archive_message` (
  `mid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `title` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8_unicode_ci,
  `music_title` longtext CHARACTER SET utf8,
  `music_artist` longtext CHARACTER SET utf8,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`mid`),
  KEY `archive_uid_idx` (`uid`),
  CONSTRAINT `archive_uid` FOREIGN KEY (`uid`) REFERENCES `archive_userinfo` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archive_message`
--

LOCK TABLES `archive_message` WRITE;
/*!40000 ALTER TABLE `archive_message` DISABLE KEYS */;
INSERT INTO `archive_message` VALUES (6,11,'test1',NULL,NULL,NULL,'2016-01-11 21:31:19'),(7,11,'test2',NULL,NULL,NULL,'2016-01-11 21:31:23'),(8,11,'test3',NULL,NULL,NULL,'2016-01-11 21:31:26'),(9,10,'test4',NULL,NULL,NULL,'2016-01-11 21:31:30'),(10,10,'test5',NULL,NULL,NULL,'2016-01-11 21:31:32'),(11,10,'test6',NULL,NULL,NULL,'2016-01-11 21:31:34'),(15,16,'1234',NULL,'asdasdasds',NULL,'2016-01-13 13:55:00'),(96,16,'안녕하세요',' ',' ',' ','2016-01-15 13:14:02'),(111,20,'드디어끝','가디단에서 밤샘','넋','40','2016-01-15 19:00:30'),(112,20,'아쉽다','아쉽게 끝남!','Officially Missing You','긱스','2016-01-15 19:09:16'),(132,20,'노노',' ',' ',' ','2016-01-16 04:44:55'),(176,16,'안녕',' ',' ',' ','2016-01-17 06:56:01'),(191,46,'추워','디지겟네',' ',' ','2016-01-18 20:35:33'),(192,46,'ㄹㄹㄹㄹㅇㅌㅌㅇㅇㅇ','무지',' ',' ','2016-01-18 20:36:13'),(290,72,'늘 취업하기 전을 떠올리며 나태해지지',' ',' ',' ','2016-04-06 14:56:59'),(292,73,'^^♡',' ',' ',' ','2016-04-11 17:22:15'),(302,77,'여수여행','여수여행 진짜 재밌었다 다음엔 소중한 내 가족들이랑 가고싶다','인생의회전목마 (人生のメリ-ゴ-)','히사이시 조','2016-05-05 15:37:20'),(304,79,'가족을 사랑하자',' ','겨울사랑','더 원','2016-05-09 10:52:49'),(310,81,'지빈이가 쌩쌩. 몰랑몰랑한 기분. 우',' ',' ',' ','2016-06-02 13:07:08'),(311,81,'휴지통 완전 힐링웹툰',' ',' ',' ','2016-06-02 13:09:34'),(316,83,'언니가 너무 보고싶다 짜증난다','언니가 너무 보고싶다 왜 안오지',' ',' ','2016-06-11 11:05:09'),(317,83,'우어ㅓ',' ',' ',' ','2016-06-11 11:05:26'),(318,83,'어야어',' ',' ',' ','2016-06-11 11:05:37'),(319,83,'오어어ㅠㅇ유유',' ',' ',' ','2016-06-11 11:05:43');
/*!40000 ALTER TABLE `archive_message` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-08 12:07:14
