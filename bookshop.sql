-- Adminer 4.8.0 MySQL 8.0.25-0ubuntu0.20.04.1 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb3;

DROP TABLE IF EXISTS `__EFMigrationsHistory`;
CREATE TABLE `__EFMigrationsHistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;


DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

INSERT INTO `admin` (`username`, `password`) VALUES
('admin',	'admin');

DROP TABLE IF EXISTS `bill`;
CREATE TABLE `bill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `date_bill` datetime NOT NULL,
  `address` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `username` (`username`),
  CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;


DROP TABLE IF EXISTS `bill_detail`;
CREATE TABLE `bill_detail` (
  `bill_id` int NOT NULL,
  `book_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`bill_id`,`book_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `bill_detail_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`),
  CONSTRAINT `bill_detail_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;


DROP TABLE IF EXISTS `book`;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

INSERT INTO `book` (`id`, `name`, `price`, `status`, `pages`, `author`, `publisher`, `publishing_year`, `description`, `details`, `image_url`) VALUES
(1,	'Người Truy Án',	229500,	1,	628,	'Thiên Vũ Chi Thành',	'Đang cập nhật',	'2021',	'Một thanh tra trẻ đầy khát vọng tìm ra hung thủ trong bản án thảm sát năm xưa. Một tên tội phạm IQ cao, kẻ từng là luật sư tài ba khao khát được minh oan',	'Nhà xuất bản: NXB Văn Học, Ngày xuất bản: 15/06/2021, Nhà phát hành: Đang cập nhật, Kích thước: 16.0 x 24.0 x 2.0 cm, Số trang: 628 trang, Trọng lượng: 1,000 gram',	NULL),
(2,	'Thay Đổi Cuộc Sống Với Nhân Số Học',	155000,	1,	342,	'David A. Phillips',	'First News - Trí Việt',	'2020',	'Cuốn sách Thay đổi cuộc sống với Nhân số học là tác phẩm được chị Lê Đỗ Quỳnh Hương phát triển từ tác phẩm gốc “The Complete Book of Numerology” của tiến sỹ David A. Phillips, khiến bộ môn Nhân số học khởi nguồn từ nhà toán học Pythagoras trở nên gần gũi, dễ hiểu hơn với độc giả Việt Nam.',	'Kích thước: 16 x 24 cm, Dịch giả: Lê Đỗ Quỳnh Hương, Loại bìa: Bìa gập, Nhà xuất bản: Nhà Xuất Bản Tổng hợp TP.HCM',	NULL),
(3,	'Cân Bằng Cảm Xúc, Cả Lúc Bão Giông',	63800,	1,	336,	'Richard Nicholls',	'Skybooks',	'2019',	'Một ngày, chúng ta có khoảng 16 tiếng tiếp xúc với con người, công việc, các nguồn thông tin từ mạng xã hội, loa đài báo giấy… Việc này mang đến cho bạn vô vàn cảm xúc, cả tiêu cực lẫn tích cực.',	'Kích thước: 13,5 x 20,5 cm, Dịch Giả: Phương Nguyễn, Loại bìa: Bìa mềm',	NULL);

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

INSERT INTO `category` (`id`, `name`) VALUES
(1,	'Kỹ năng sống');

DROP TABLE IF EXISTS `category_book`;
CREATE TABLE `category_book` (
  `category` int NOT NULL,
  `book` int NOT NULL,
  PRIMARY KEY (`category`,`book`),
  KEY `book` (`book`),
  CONSTRAINT `category_book_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category` (`id`),
  CONSTRAINT `category_book_ibfk_2` FOREIGN KEY (`book`) REFERENCES `book` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

INSERT INTO `category_book` (`category`, `book`) VALUES
(1,	3);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;


-- 2021-06-12 06:22:23
