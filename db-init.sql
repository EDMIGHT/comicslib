-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: comicslib
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `Author`
--

DROP TABLE IF EXISTS `Author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Author` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `login` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Author_login_key` (`login`),
  KEY `Author_login_idx` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Author`
--

LOCK TABLES `Author` WRITE;
/*!40000 ALTER TABLE `Author` DISABLE KEYS */;
/*!40000 ALTER TABLE `Author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Bookmark`
--

DROP TABLE IF EXISTS `Bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Bookmark` (
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comic_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `chapter_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `page_number` tinyint unsigned NOT NULL,
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`user_id`,`comic_id`),
  KEY `Bookmark_chapter_id_page_number_idx` (`chapter_id`,`page_number`),
  KEY `Bookmark_comic_id_fkey` (`comic_id`),
  CONSTRAINT `Bookmark_chapter_id_fkey` FOREIGN KEY (`chapter_id`) REFERENCES `Chapter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Bookmark_chapter_id_page_number_fkey` FOREIGN KEY (`chapter_id`, `page_number`) REFERENCES `Page` (`chapter_id`, `number`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Bookmark_comic_id_fkey` FOREIGN KEY (`comic_id`) REFERENCES `Comic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Bookmark_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bookmark`
--

LOCK TABLES `Bookmark` WRITE;
/*!40000 ALTER TABLE `Bookmark` DISABLE KEYS */;
/*!40000 ALTER TABLE `Bookmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Chapter`
--

DROP TABLE IF EXISTS `Chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Chapter` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comic_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number` double NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Chapter_comic_id_fkey` (`comic_id`),
  KEY `Chapter_user_id_fkey` (`user_id`),
  CONSTRAINT `Chapter_comic_id_fkey` FOREIGN KEY (`comic_id`) REFERENCES `Comic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Chapter_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Chapter`
--

LOCK TABLES `Chapter` WRITE;
/*!40000 ALTER TABLE `Chapter` DISABLE KEYS */;
/*!40000 ALTER TABLE `Chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comic`
--

DROP TABLE IF EXISTS `Comic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comic` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc` text COLLATE utf8mb4_unicode_ci,
  `img` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `released_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Comic_title_idx` (`title`),
  KEY `Comic_status_id_fkey` (`status_id`),
  CONSTRAINT `Comic_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `Status` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comic`
--

LOCK TABLES `Comic` WRITE;
/*!40000 ALTER TABLE `Comic` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comment`
--

DROP TABLE IF EXISTS `Comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comment` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comic_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `reply_to_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Comment_reply_to_id_fkey` (`reply_to_id`),
  KEY `Comment_comic_id_fkey` (`comic_id`),
  KEY `Comment_user_id_fkey` (`user_id`),
  CONSTRAINT `Comment_comic_id_fkey` FOREIGN KEY (`comic_id`) REFERENCES `Comic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Comment_reply_to_id_fkey` FOREIGN KEY (`reply_to_id`) REFERENCES `Comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comment`
--

LOCK TABLES `Comment` WRITE;
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CommentVote`
--

DROP TABLE IF EXISTS `CommentVote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CommentVote` (
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('up','down') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`,`comment_id`),
  KEY `CommentVote_comment_id_fkey` (`comment_id`),
  CONSTRAINT `CommentVote_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `Comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CommentVote_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CommentVote`
--

LOCK TABLES `CommentVote` WRITE;
/*!40000 ALTER TABLE `CommentVote` DISABLE KEYS */;
/*!40000 ALTER TABLE `CommentVote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Folder`
--

DROP TABLE IF EXISTS `Folder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Folder` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` tinyint unsigned NOT NULL,
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Folder_user_id_fkey` (`user_id`),
  CONSTRAINT `Folder_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Folder`
--

LOCK TABLES `Folder` WRITE;
/*!40000 ALTER TABLE `Folder` DISABLE KEYS */;
/*!40000 ALTER TABLE `Folder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Genre`
--

DROP TABLE IF EXISTS `Genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Genre` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Genre_title_key` (`title`),
  KEY `Genre_title_idx` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Genre`
--

LOCK TABLES `Genre` WRITE;
/*!40000 ALTER TABLE `Genre` DISABLE KEYS */;
INSERT INTO `Genre` VALUES ('09518885-c1df-4fb2-b1c1-0fa86069d39b','Adventure'),('dacb7c1c-7778-4db5-9b17-3c0324b6dbee','Comedy'),('825f9020-3335-47b4-8217-d03f47fa2206','Crime'),('50b99bef-9c70-4de2-8e55-05ff40026519','Drama'),('c1ed89ae-6d64-4958-a96d-b7c114ebe6e2','Fantasy'),('d4c51ae0-efe3-41ff-abf1-cac739f6487e','Historical'),('0bf98874-e62c-49ac-841c-a0e9bdf4aadc','Horror'),('9a16cac8-fa34-4bb9-aa8f-bf0dae9af0fc','Isekai'),('7003fadd-23b1-46a8-ac65-f3651d14dbe6','Mecha'),('6ffe522e-1d42-407c-8948-0409a3bf4d3c','Medical'),('cab5e654-dbd9-4fd3-8b16-b134a7a365e9','Mystery'),('e32ddf3c-ac35-4745-8d20-f51681a959c0','Philosophical'),('d8f2e64f-ccd1-41c7-841e-9442ec43320e','Psychological'),('f915b8ec-3649-4a9d-a259-f25ac7be59cb','Romance'),('2dc70de4-9f19-4528-ba05-c693408d66fd','Sports'),('43cbc221-4109-4689-80e5-23b06abf6b7b','Superhero'),('914a0af8-7fbc-4f3b-84fd-0bc1f5c3efcf','Thriller'),('4a249d4f-61b3-476d-89a2-114399b90941','Tragedy');
/*!40000 ALTER TABLE `Genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Page`
--

DROP TABLE IF EXISTS `Page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Page` (
  `chapter_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` tinyint unsigned NOT NULL,
  `img` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`chapter_id`,`number`),
  CONSTRAINT `Page_chapter_id_fkey` FOREIGN KEY (`chapter_id`) REFERENCES `Chapter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Page`
--

LOCK TABLES `Page` WRITE;
/*!40000 ALTER TABLE `Page` DISABLE KEYS */;
/*!40000 ALTER TABLE `Page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rating`
--

DROP TABLE IF EXISTS `Rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rating` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comic_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` int NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Rating_comic_id_fkey` (`comic_id`),
  KEY `Rating_user_id_fkey` (`user_id`),
  CONSTRAINT `Rating_comic_id_fkey` FOREIGN KEY (`comic_id`) REFERENCES `Comic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Rating_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rating`
--

LOCK TABLES `Rating` WRITE;
/*!40000 ALTER TABLE `Rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `Rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Session`
--

DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Session` (
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refresh_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `Session_refresh_token_key` (`refresh_token`),
  CONSTRAINT `Session_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Session`
--

LOCK TABLES `Session` WRITE;
/*!40000 ALTER TABLE `Session` DISABLE KEYS */;
/*!40000 ALTER TABLE `Session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Status`
--

DROP TABLE IF EXISTS `Status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Status` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` enum('ongoing','completed','hiatus','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Status_name_key` (`name`),
  KEY `Status_name_idx` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Status`
--

LOCK TABLES `Status` WRITE;
/*!40000 ALTER TABLE `Status` DISABLE KEYS */;
INSERT INTO `Status` VALUES ('ec4eba8d-5971-4d1a-85ca-71ea0589882d','ongoing'),('ba41b605-0e17-41a9-9a4e-745a1c8d730a','completed'),('6d74024b-8243-45d1-9fc4-42e88c3093cc','hiatus'),('b1253d31-e61c-4ec8-a7a1-3dc7d91bdd4b','cancelled');
/*!40000 ALTER TABLE `Status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Theme`
--

DROP TABLE IF EXISTS `Theme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Theme` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Theme_title_key` (`title`),
  KEY `Theme_title_idx` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Theme`
--

LOCK TABLES `Theme` WRITE;
/*!40000 ALTER TABLE `Theme` DISABLE KEYS */;
INSERT INTO `Theme` VALUES ('4ab482c7-ed5b-42c3-a1f3-dd282bbe602b','Aliens'),('aa31521f-2bc3-49ec-8f2c-506a25c48368','Animals'),('cb67c885-74a7-400b-b9d0-4987e56d0ba8','Cooking'),('74556628-24c8-4837-b040-852bde2758fc','Demons'),('f55378a8-939a-4260-aa66-cf19ba7bffbe','Ghosts'),('2b42c7d2-282a-4fa5-bbb1-a12068f228d8','Mafia'),('5e16168f-6f35-40b1-b8c7-4ef09261fd7a','Magic'),('59f45f07-5ce7-4e93-a5c7-035d932985f8','Military'),('bb30c324-ff56-4e15-9775-3e2df5baa110','Monsters'),('9ae45fab-00d3-4c15-a2e5-028d466b4bb8','Music'),('510e9727-e133-424b-a139-4eb1b73c3397','Ninja'),('1cafd33f-bc94-4176-8f05-d69a4d04f98c','Office Workers'),('ec77d687-d64a-4a92-8f76-027c7bd58401','Police'),('6019a90f-e583-4ef7-af56-b8821a7ffc41','Post-Apocalyptic'),('20d84713-2b7b-49a2-98b8-c480e3ee2972','Reincarnation'),('bd41b5d6-3aa7-4f29-900a-65b42fa13403','Samurai'),('fc3826b0-858c-4830-994b-4cf6cf413a8a','School Life'),('c698415a-4c88-47ae-a161-e233ab070367','Survival'),('f83c0bad-c88c-45a0-878f-67bdb99509d8','Time Travel'),('22edb0f2-a556-48d0-83ee-17050eb5e88d','Traditional Games'),('e74bf79f-7599-42bc-ab08-0da10900bf4c','Vampires'),('41f2ff6e-258e-49f7-a715-aa27603b769c','Video Games'),('15a5e424-0bf4-4655-bb10-d81803e3f369','Virtual Reality'),('0faa7639-60eb-4b3a-b395-730bf0085d82','Zombies');
/*!40000 ALTER TABLE `Theme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `login` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `img` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `provider` enum('google','github') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_login_key` (`login`),
  KEY `User_login_idx` (`login`),
  KEY `User_provider_provider_id_idx` (`provider`,`provider_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_AuthorToComic`
--

DROP TABLE IF EXISTS `_AuthorToComic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_AuthorToComic` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `_AuthorToComic_AB_unique` (`A`,`B`),
  KEY `_AuthorToComic_B_index` (`B`),
  CONSTRAINT `_AuthorToComic_A_fkey` FOREIGN KEY (`A`) REFERENCES `Author` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_AuthorToComic_B_fkey` FOREIGN KEY (`B`) REFERENCES `Comic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_AuthorToComic`
--

LOCK TABLES `_AuthorToComic` WRITE;
/*!40000 ALTER TABLE `_AuthorToComic` DISABLE KEYS */;
/*!40000 ALTER TABLE `_AuthorToComic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_ComicToFolder`
--

DROP TABLE IF EXISTS `_ComicToFolder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_ComicToFolder` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `_ComicToFolder_AB_unique` (`A`,`B`),
  KEY `_ComicToFolder_B_index` (`B`),
  CONSTRAINT `_ComicToFolder_A_fkey` FOREIGN KEY (`A`) REFERENCES `Comic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_ComicToFolder_B_fkey` FOREIGN KEY (`B`) REFERENCES `Folder` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_ComicToFolder`
--

LOCK TABLES `_ComicToFolder` WRITE;
/*!40000 ALTER TABLE `_ComicToFolder` DISABLE KEYS */;
/*!40000 ALTER TABLE `_ComicToFolder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_ComicToGenre`
--

DROP TABLE IF EXISTS `_ComicToGenre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_ComicToGenre` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `_ComicToGenre_AB_unique` (`A`,`B`),
  KEY `_ComicToGenre_B_index` (`B`),
  CONSTRAINT `_ComicToGenre_A_fkey` FOREIGN KEY (`A`) REFERENCES `Comic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_ComicToGenre_B_fkey` FOREIGN KEY (`B`) REFERENCES `Genre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_ComicToGenre`
--

LOCK TABLES `_ComicToGenre` WRITE;
/*!40000 ALTER TABLE `_ComicToGenre` DISABLE KEYS */;
/*!40000 ALTER TABLE `_ComicToGenre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_ComicToTheme`
--

DROP TABLE IF EXISTS `_ComicToTheme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_ComicToTheme` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `_ComicToTheme_AB_unique` (`A`,`B`),
  KEY `_ComicToTheme_B_index` (`B`),
  CONSTRAINT `_ComicToTheme_A_fkey` FOREIGN KEY (`A`) REFERENCES `Comic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_ComicToTheme_B_fkey` FOREIGN KEY (`B`) REFERENCES `Theme` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_ComicToTheme`
--

LOCK TABLES `_ComicToTheme` WRITE;
/*!40000 ALTER TABLE `_ComicToTheme` DISABLE KEYS */;
/*!40000 ALTER TABLE `_ComicToTheme` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-19  9:07:31
