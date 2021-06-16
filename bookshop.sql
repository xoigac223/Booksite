-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: bookshop
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AspNetRoleClaims`
--

DROP TABLE IF EXISTS `AspNetRoleClaims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetRoleClaims` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `RoleId` varchar(100) NOT NULL,
  `ClaimType` text,
  `ClaimValue` text,
  PRIMARY KEY (`Id`),
  KEY `IX_AspNetRoleClaims_RoleId` (`RoleId`),
  CONSTRAINT `FK_AspNetRoleClaims_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `AspNetRoles` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetRoleClaims`
--

LOCK TABLES `AspNetRoleClaims` WRITE;
/*!40000 ALTER TABLE `AspNetRoleClaims` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetRoleClaims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AspNetRoles`
--

DROP TABLE IF EXISTS `AspNetRoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetRoles` (
  `Id` varchar(100) NOT NULL,
  `Name` varchar(256) DEFAULT NULL,
  `NormalizedName` varchar(256) DEFAULT NULL,
  `ConcurrencyStamp` text,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `RoleNameIndex` (`NormalizedName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetRoles`
--

LOCK TABLES `AspNetRoles` WRITE;
/*!40000 ALTER TABLE `AspNetRoles` DISABLE KEYS */;
INSERT INTO `AspNetRoles` VALUES ('3b51f547-627a-4deb-8c95-daccdd03294b','Admin','ADMIN','2d9f2497-2805-492c-809f-98b1cbc2519d'),('727b98a1-9fe2-4bbc-9fdc-7812265a9094','User','USER','2c8af853-51b4-490a-b299-88e704d2a124');
/*!40000 ALTER TABLE `AspNetRoles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AspNetUserClaims`
--

DROP TABLE IF EXISTS `AspNetUserClaims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUserClaims` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserId` varchar(100) NOT NULL,
  `ClaimType` text,
  `ClaimValue` text,
  PRIMARY KEY (`Id`),
  KEY `IX_AspNetUserClaims_UserId` (`UserId`),
  CONSTRAINT `FK_AspNetUserClaims_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetUserClaims`
--

LOCK TABLES `AspNetUserClaims` WRITE;
/*!40000 ALTER TABLE `AspNetUserClaims` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetUserClaims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AspNetUserLogins`
--

DROP TABLE IF EXISTS `AspNetUserLogins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUserLogins` (
  `LoginProvider` varchar(100) NOT NULL,
  `ProviderKey` varchar(100) NOT NULL,
  `ProviderDisplayName` text,
  `UserId` varchar(100) NOT NULL,
  PRIMARY KEY (`LoginProvider`,`ProviderKey`),
  KEY `IX_AspNetUserLogins_UserId` (`UserId`),
  CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetUserLogins`
--

LOCK TABLES `AspNetUserLogins` WRITE;
/*!40000 ALTER TABLE `AspNetUserLogins` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetUserLogins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AspNetUserRoles`
--

DROP TABLE IF EXISTS `AspNetUserRoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUserRoles` (
  `UserId` varchar(100) NOT NULL,
  `RoleId` varchar(100) NOT NULL,
  PRIMARY KEY (`UserId`,`RoleId`),
  KEY `IX_AspNetUserRoles_RoleId` (`RoleId`),
  CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `AspNetRoles` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetUserRoles`
--

LOCK TABLES `AspNetUserRoles` WRITE;
/*!40000 ALTER TABLE `AspNetUserRoles` DISABLE KEYS */;
INSERT INTO `AspNetUserRoles` VALUES ('5cb5f6de-6f0b-427f-bc3c-42db77322908','727b98a1-9fe2-4bbc-9fdc-7812265a9094'),('5fd44a64-deae-4ae5-a5a9-30c82e2bb07b','727b98a1-9fe2-4bbc-9fdc-7812265a9094'),('60d13613-1085-4d07-b113-5fa3baf249b9','727b98a1-9fe2-4bbc-9fdc-7812265a9094'),('68a65bd3-67b3-4d4d-bc9c-6402a576cf9e','727b98a1-9fe2-4bbc-9fdc-7812265a9094'),('75888047-dbc7-471d-9021-e26430129621','727b98a1-9fe2-4bbc-9fdc-7812265a9094'),('d8f2e2c2-6674-47f7-a700-16941002b4d0','727b98a1-9fe2-4bbc-9fdc-7812265a9094'),('ec690e26-6aff-47b6-8a7e-87a85019a188','727b98a1-9fe2-4bbc-9fdc-7812265a9094'),('fc4cab11-5e57-44ae-934d-ade1a24b5061','727b98a1-9fe2-4bbc-9fdc-7812265a9094');
/*!40000 ALTER TABLE `AspNetUserRoles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AspNetUserTokens`
--

DROP TABLE IF EXISTS `AspNetUserTokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUserTokens` (
  `UserId` varchar(100) NOT NULL,
  `LoginProvider` varchar(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Value` text,
  PRIMARY KEY (`UserId`,`LoginProvider`,`Name`),
  CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetUserTokens`
--

LOCK TABLES `AspNetUserTokens` WRITE;
/*!40000 ALTER TABLE `AspNetUserTokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetUserTokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AspNetUsers`
--

DROP TABLE IF EXISTS `AspNetUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUsers` (
  `Id` varchar(100) NOT NULL,
  `UserName` varchar(256) DEFAULT NULL,
  `NormalizedUserName` varchar(256) DEFAULT NULL,
  `Email` varchar(256) DEFAULT NULL,
  `NormalizedEmail` varchar(256) DEFAULT NULL,
  `EmailConfirmed` tinyint(1) NOT NULL,
  `PasswordHash` text,
  `SecurityStamp` text,
  `ConcurrencyStamp` text,
  `PhoneNumber` text,
  `PhoneNumberConfirmed` tinyint(1) NOT NULL,
  `TwoFactorEnabled` tinyint(1) NOT NULL,
  `LockoutEnd` timestamp NULL DEFAULT NULL,
  `LockoutEnabled` tinyint(1) NOT NULL,
  `AccessFailedCount` int NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UserNameIndex` (`NormalizedUserName`),
  KEY `EmailIndex` (`NormalizedEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetUsers`
--

LOCK TABLES `AspNetUsers` WRITE;
/*!40000 ALTER TABLE `AspNetUsers` DISABLE KEYS */;
INSERT INTO `AspNetUsers` VALUES ('5cb5f6de-6f0b-427f-bc3c-42db77322908','test12345','TEST12345',NULL,NULL,0,'AQAAAAEAACcQAAAAENYz9aRPXFhTArLavmnrvRda0/scQn+g4eW4SZWnml0fG1cq0JEQ48Oy5XYX3OxxvA==','KCCIMZSPKDXICNGWVGXUXWXLY5OJXRWH','af72b44b-4c76-4676-ba4a-746db681d05d',NULL,0,0,NULL,1,0),('5fd44a64-deae-4ae5-a5a9-30c82e2bb07b','user12345','USER12345',NULL,NULL,0,'AQAAAAEAACcQAAAAEGrqcuFbFsQnIfCtPEyr3hlQTYb7xBB8xR/YB6/E8jv7sK8UufPqRKrrQpEihjxJRw==','F7YLFSESTL4IG4XNT6FYFBGRWGO25TXT','92af6bcb-9c37-4a76-b372-4c4ad7342a6f',NULL,0,0,NULL,1,0),('60d13613-1085-4d07-b113-5fa3baf249b9','demo123','DEMO123',NULL,NULL,0,'AQAAAAEAACcQAAAAECMPfekmRGPLIpjYglzzDqvrkSoBHRyh1cWvri+E6Wco5TYAhJAL0708ytNAfY/64w==','ICZ4ES3LR4Z5XY7HGA66JVUP537T36KM','531f07b6-2317-41a4-aa1f-5323a14280e4',NULL,0,0,NULL,1,0),('68a65bd3-67b3-4d4d-bc9c-6402a576cf9e','test1234','TEST1234',NULL,NULL,0,'AQAAAAEAACcQAAAAECFeKYd6VZelGNMRmrCFoeZsOkSF9CVlOpAwZHMJ1P9PSrys6iX2s6SJZpP/bGRiVA==','WTAFJ46JKGNM6FLI4B5ZREPZMQPR3I53','84bc8893-6fd4-409e-9ab0-617109315ae6',NULL,0,0,NULL,1,0),('75888047-dbc7-471d-9021-e26430129621','user1234','USER1234',NULL,NULL,0,'AQAAAAEAACcQAAAAEF713CivwDwpEVY3m8I0X9Z1y8lR4nkv/FexVkT2WsAVrn2Yr+LYgcoxptU9w3odYw==','M2UQ7IGW7UNSFFGD62EQQFZ4NPGRJW5B','58e9440e-a285-4f0c-ae3f-31269f5864c0',NULL,0,0,NULL,1,0),('d8f2e2c2-6674-47f7-a700-16941002b4d0','user123','USER123',NULL,NULL,0,'AQAAAAEAACcQAAAAEKyslF3EIG1+cZdcd1XgOqVbkbFGe1IuTdR1MCnCdvWg5RjdF9Da/38vLvcokMFcXA==','YYABW5H3QRTECXTRAQUEKKTMBS6APEAE','1de4aefc-91c0-4006-87b3-1735f04eca98',NULL,0,0,NULL,1,0),('ec690e26-6aff-47b6-8a7e-87a85019a188','xoigac223','XOIGAC223',NULL,NULL,0,'AQAAAAEAACcQAAAAEDdVISrtxDT22lxuUvb7iyjY7LZHu0a18OUNMO9JX5pQ8uukAsq/NP2odfj4s7j+oA==','Y6ZJPPRZAT3WVGK37ITE6XG67K4RBHKO','120b5d46-4b70-49af-9453-7ae5452c57a4',NULL,0,0,NULL,1,0),('fc4cab11-5e57-44ae-934d-ade1a24b5061','demo888','DEMO888',NULL,NULL,0,'AQAAAAEAACcQAAAAEC6tG3n4z7J/JEtGecvQIhlvALoJrBI8pxvPHtTKwg10ti79MXQYAqXS/BA1p6nCiQ==','35VCDGLLTBGKSIZPCWMMUNGNM5TGJGB6','689acb64-28f1-4df8-92d8-736d6c10f2a3',NULL,0,0,NULL,1,0);
/*!40000 ALTER TABLE `AspNetUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `__EFMigrationsHistory`
--

DROP TABLE IF EXISTS `__EFMigrationsHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__EFMigrationsHistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__EFMigrationsHistory`
--

LOCK TABLES `__EFMigrationsHistory` WRITE;
/*!40000 ALTER TABLE `__EFMigrationsHistory` DISABLE KEYS */;
INSERT INTO `__EFMigrationsHistory` VALUES ('20210613150818_Tmp','5.0.7'),('20210613151547_Initial','5.0.7'),('20210613163451_Initial123','5.0.7');
/*!40000 ALTER TABLE `__EFMigrationsHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('admin','admin');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `price` float NOT NULL,
  `status` tinyint NOT NULL,
  `pages` int NOT NULL,
  `author` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `publisher` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `publishing_year` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `details` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `image_url` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'Người Truy Án',229500,1,628,'Thiên Vũ Chi Thành','Đang cập nhật','2021','Một thanh tra trẻ đầy khát vọng tìm ra hung thủ trong bản án thảm sát năm xưa. Một tên tội phạm IQ cao, kẻ từng là luật sư tài ba khao khát được minh oan','Ngày xuất bản: 15/06/2021, Nhà phát hành: Đang cập nhật, Kích thước: 16.0 x 24.0 x 2.0 cm, Trọng lượng: 1,000 gram','/images/books/nguoi-truy-an_115765_1.jpg'),(2,'Thay Đổi Cuộc Sống Với Nhân Số Học',155000,1,342,'David A. Phillips','First News - Trí Việt','2020','Cuốn sách Thay đổi cuộc sống với Nhân số học là tác phẩm được chị Lê Đỗ Quỳnh Hương phát triển từ tác phẩm gốc “The Complete Book of Numerology” của tiến sỹ David A. Phillips, khiến bộ môn Nhân số học khởi nguồn từ nhà toán học Pythagoras trở nên gần gũi, dễ hiểu hơn với độc giả Việt Nam.','Kích thước: 16 x 24 cm, Dịch giả: Lê Đỗ Quỳnh Hương, Loại bìa: Bìa gập, Nhà xuất bản: Nhà Xuất Bản Tổng hợp TP.HCM','/images/books/thay-doi-cuoc-song-voi-nhan-so-hoc_112464_1.jpg'),(3,'Cân Bằng Cảm Xúc, Cả Lúc Bão Giông',63800,1,336,'Richard Nicholls','Skybooks','2019','Một ngày, chúng ta có khoảng 16 tiếng tiếp xúc với con người, công việc, các nguồn thông tin từ mạng xã hội, loa đài báo giấy… Việc này mang đến cho bạn vô vàn cảm xúc, cả tiêu cực lẫn tích cực.','Kích thước: 13,5 x 20,5 cm, Dịch Giả: Phương Nguyễn, Loại bìa: Bìa mềm','/images/books/can-bang-cam-xuc-ca-luc-bao-giong_96525_1.jpg'),(4,'Chúng Ta Rồi Sẽ Hạnh Phúc, Theo Những Cách Khác Nhau',57100,1,208,'Thảo Thảo','Người Trẻ Việt','2021','CHÚNG TA RỒI SẼ HẠNH PHÚC, THEO NHỮNG CÁCH KHÁC NHAU – THẢO THẢO  Bạn có từng đắm chìm trong vô vọng và không tìm ra lối thoát cho chuỗi ngày vụng dại tuổi trẻ của mình?  Bạn có từng muốn ngủ một giấc thật dài, sau khi tỉnh dậy sẽ chỉ còn những niềm vui ở lại?','Kích thước: 13 x 20.5 cm, Loại bìa: Bìa mềm, Nhà xuất bản: Nhà Xuất Bản Văn Học','/images/books/chungta.png'),(5,'Rất Thích Rất Thích Em',92000,1,504,'Vãn Tình','Bloom Books','2021','Sự trở lại của nữ hoàng dòng sách truyền cảm hứng Vãn Tình, cùng một cuốn sách mới lạ và hấp dẫn. Dành tặng bạn một giấc mơ thanh xuân vừa ngọt ngào vừa có chút đắng ngắt, vừa hết mình vừa pha lẫn ít nhiều tiếc nuối.','Kích thước: 14.5 x 20 cm, Loại bìa: Bìa mềm, Nhà xuất bản: Nhà xuất bản thế giới','/images/books/rat-thich-rat-thich-em-_114889_1.png'),(6,'English Grammar in Use Book w Ans',174440,1,0,'Raymond Murphy','Cambridge University','2020','The world\'s best-selling grammar series for learners of English. English Grammar in Use Fourth edition is an updated version of the world\'s best-selling grammar title. It has a fresh, appealing new design and clear layout','Tuy nhiên tuỳ vào từng loại sản phẩm hoặc phương thức, địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh','/images/books/english.jpg'),(7,'Đắc Nhân Tâm',50700,1,320,'Dale Carnegie','First News - Trí Việt','2016','Đắc nhân tâm của Dale Carnegie là quyển sách duy nhất về thể loại self-help liên tục đứng đầu danh mục sách bán chạy nhất (best-selling Books) do báo The New York Times bình chọn suốt 10 năm liền. Được xuất bản năm 1936, với số lượng bán ra hơn 15 triệu bản, tính đến nay, sách đã được dịch ra ở hầu hết các ngôn ngữ, trong đó có cả Việt Nam, và đã nhận được sự đón tiếp nhiệt tình của đọc giả ở hầu hết các quốc gia.','Kích thước: 14.5 x 20.5 cm, Loại bìa: Bìa mềm','/images/books/dac-nhan-tam.jpg'),(8,'NAPOLEON Đại Đế',456000,1,1200,'Andrew Roberts','Omega Plus','2017','NAPOLEON Đại Đế là sách đứng đầu bảng xếp hạng bán chạy nhất của New York Times nhiều tuần liên tiếp.The Telegraph (Anh) gọi cuốn sách là \"số ít tác phẩm toát lên khí chất Napoleon\"','Kích thước: 16 x 24 cm, Dịch Giả: Lê Đình Chi, Loại bìa: Bìa cứng, Nhà xuất bản: Nhà Xuất Bản Thế Giới','/images/books/napoleon.jpg');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Kỹ năng sống'),(2,'Sách văn học'),(3,'Trinh Thám'),(4,'Ngôn tình');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_book`
--

DROP TABLE IF EXISTS `category_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_book` (
  `category` int NOT NULL,
  `book` int NOT NULL,
  PRIMARY KEY (`category`,`book`),
  KEY `book` (`book`),
  CONSTRAINT `category_book_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category` (`id`),
  CONSTRAINT `category_book_ibfk_2` FOREIGN KEY (`book`) REFERENCES `book` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_book`
--

LOCK TABLES `category_book` WRITE;
/*!40000 ALTER TABLE `category_book` DISABLE KEYS */;
INSERT INTO `category_book` VALUES (3,1),(1,2),(1,3),(2,4),(1,5),(4,5);
/*!40000 ALTER TABLE `category_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--
DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(100) NOT NULL,
  `fullname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('demo123',NULL,NULL,NULL,NULL),('demo888','Demo ','Hà Nội','0385242221','test@email.com'),('guest',NULL,NULL,NULL,NULL),('test123','test123',NULL,NULL,NULL),('test1234',NULL,NULL,NULL,NULL),('test12345',NULL,NULL,NULL,NULL),('user123','Nguyen Van B','Hà Nội','0385242203','test123@gmail.com'),('user1234',NULL,NULL,NULL,NULL),('user12345',NULL,NULL,NULL,NULL),('xoigac223',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date_bill` datetime NOT NULL,
  `fullname` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `shipping` float NOT NULL,
  `status` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `username` (`username`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (7,'user123','2021-06-16 11:10:34','Nguyen Van A','Hà Nội','0385242203','test123@gmail.com',30000,0),(8,'user123','2021-06-16 12:30:23','Nguyen Van A','Hà Nội','0385242203','test123@gmail.com',30000,0),(9,'user123','2021-06-16 12:32:19','Nguyen Van B','Hà Nội','0385242203','test123@gmail.com',30000,0);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `order_id` int NOT NULL,
  `book_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`order_id`,`book_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (7,7,2),(7,8,1),(8,2,2),(8,7,1),(9,1,1),(9,4,1);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-16 19:36:31
