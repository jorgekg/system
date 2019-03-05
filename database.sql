-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.14 - MySQL Community Server - GPL
-- OS do Servidor:               macos10.14
-- HeidiSQL Versão:              10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Copiando estrutura para tabela lobby.company
CREATE TABLE IF NOT EXISTS `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `active` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2;

-- Copiando dados para a tabela lobby.company: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` (`id`, `name`, `active`) VALUES
	(1, 'Jorge Company', 'S');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;

-- Copiando estrutura para tabela lobby.company_user
CREATE TABLE IF NOT EXISTS `company_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `active` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `company_user_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3;

-- Copiando dados para a tabela lobby.company_user: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `company_user` DISABLE KEYS */;
INSERT INTO `company_user` (`id`, `company_id`, `email`, `password`, `active`) VALUES
	(1, 1, 'jorgekg3@gmail.com', '8cb2237d0679ca88db6464eac60da96345513964', 'S');
/*!40000 ALTER TABLE `company_user` ENABLE KEYS */;

-- Copiando estrutura para tabela lobby.contact
CREATE TABLE IF NOT EXISTS `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) NOT NULL,
  `contact_type_id` int(11) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `person_id` (`person_id`),
  KEY `contact_type_id` (`contact_type_id`),
  CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`),
  CONSTRAINT `contact_ibfk_2` FOREIGN KEY (`contact_type_id`) REFERENCES `contact_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56;

-- Copiando dados para a tabela lobby.contact: ~24 rows (aproximadamente)
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` (`id`, `person_id`, `contact_type_id`, `contact`, `update_at`) VALUES
	(32, 34, 1, 'jorgekg3@gmail.com', '2019-02-23 16:50:21'),
	(33, 34, 2, '47989138092', '2019-02-23 16:50:21'),
	(34, 35, 1, 'maria@maria', '2019-02-23 16:52:20'),
	(35, 35, 2, '87982738273', '2019-02-23 16:52:20'),
	(36, 36, 1, 'Maria da Silva', '2019-02-23 16:54:27'),
	(37, 36, 2, '54567897658', '2019-02-23 16:54:27'),
	(38, 37, 1, 'joao@carmo.com.br', '2019-02-23 17:11:42'),
	(39, 37, 2, '90349093000', '2019-02-23 17:11:42'),
	(40, 38, 1, 'jessica@maria.com.br', '2019-02-23 17:36:29'),
	(41, 38, 2, '28409289042', '2019-02-23 17:36:29'),
	(42, 39, 1, 'jessica@maria.com.br', '2019-02-23 17:36:30'),
	(43, 39, 2, '28409289042', '2019-02-23 17:36:30'),
	(44, 40, 1, 'key@key.com', '2019-02-23 17:44:48'),
	(45, 40, 2, '99909009999', '2019-02-23 17:44:48'),
	(46, 41, 1, 'valde.kohn3@gmail.com', '2019-02-24 13:27:10'),
	(47, 41, 2, '4733325019', '2019-02-24 13:27:10'),
	(48, 42, 1, 'andri@kon.com.br', '2019-02-24 15:02:36'),
	(49, 42, 2, '28349290098', '2019-02-24 15:02:36'),
	(50, 43, 1, 'aline@luiza.com', '2019-02-24 15:04:45'),
	(51, 43, 2, '30929429943', '2019-02-24 15:04:45'),
	(52, 44, 1, 'nelita@mullher.com', '2019-02-25 22:35:03'),
	(53, 44, 2, '23742749827', '2019-02-25 22:35:03'),
	(54, 45, 1, 'adriner@adrine', '2019-02-27 21:59:24'),
	(55, 45, 2, '20394290923', '2019-02-27 21:59:24');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;

-- Copiando estrutura para tabela lobby.contact_type
CREATE TABLE IF NOT EXISTS `contact_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `label` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3;

-- Copiando dados para a tabela lobby.contact_type: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `contact_type` DISABLE KEYS */;
INSERT INTO `contact_type` (`id`, `type`, `label`) VALUES
	(1, 'email', 'E-mail'),
	(2, 'phone', 'Telefone');
/*!40000 ALTER TABLE `contact_type` ENABLE KEYS */;

-- Copiando estrutura para tabela lobby.document
CREATE TABLE IF NOT EXISTS `document` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) NOT NULL,
  `document_type_id` int(11) NOT NULL,
  `document` varchar(255) NOT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `person_id` (`person_id`),
  KEY `document_type_id` (`document_type_id`),
  CONSTRAINT `document_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`),
  CONSTRAINT `document_ibfk_2` FOREIGN KEY (`document_type_id`) REFERENCES `document_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33;

-- Copiando dados para a tabela lobby.document: ~12 rows (aproximadamente)
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
INSERT INTO `document` (`id`, `person_id`, `document_type_id`, `document`, `update_at`) VALUES
	(21, 34, 2, '087.668.259-03', '2019-02-23 16:50:21'),
	(22, 35, 2, '087.668.039-87', '2019-02-23 16:52:20'),
	(23, 36, 2, '197.321.793-71', '2019-02-23 16:54:27'),
	(24, 37, 2, '456.748.903-23', '2019-02-23 17:11:42'),
	(25, 38, 2, '234.238.409-28', '2019-02-23 17:36:29'),
	(26, 39, 2, '234.238.409-28', '2019-02-23 17:36:30'),
	(27, 40, 2, '192.830.809-12', '2019-02-23 17:44:48'),
	(28, 41, 2, '329.842.394-03', '2019-02-24 13:27:10'),
	(29, 42, 2, '239.042.930-42', '2019-02-24 15:02:36'),
	(30, 43, 2, '340.289.048-20', '2019-02-24 15:04:45'),
	(31, 44, 2, '098.028.049-23', '2019-02-25 22:35:03'),
	(32, 45, 2, '840.834.839-08', '2019-02-27 21:59:24');
/*!40000 ALTER TABLE `document` ENABLE KEYS */;

-- Copiando estrutura para tabela lobby.document_type
CREATE TABLE IF NOT EXISTS `document_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `label` varchar(100) NOT NULL,
  `mask` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3;

-- Copiando dados para a tabela lobby.document_type: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `document_type` DISABLE KEYS */;
INSERT INTO `document_type` (`id`, `type`, `label`, `mask`) VALUES
	(2, 'CPF', 'CPF', '000.000.000-00');
/*!40000 ALTER TABLE `document_type` ENABLE KEYS */;

-- Copiando estrutura para tabela lobby.hibernate_sequence
CREATE TABLE IF NOT EXISTS `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=MyISAM;

-- Copiando dados para a tabela lobby.hibernate_sequence: 1 rows
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` (`next_val`) VALUES
	(7);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;

-- Copiando estrutura para tabela lobby.lobby
CREATE TABLE IF NOT EXISTS `lobby` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `start_date` time NOT NULL,
  `end_date` time NOT NULL,
  `company_user` int(11) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `lobby_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4;

-- Copiando dados para a tabela lobby.lobby: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `lobby` DISABLE KEYS */;
INSERT INTO `lobby` (`id`, `company_id`, `name`, `start_date`, `end_date`, `company_user`, `create_at`, `update_at`) VALUES
	(1, 1, 'Portaria Jessica', '08:00:00', '18:48:00', NULL, NULL, '2019-02-18 23:05:55'),
	(2, 1, 'Portaria Jorge', '08:00:00', '18:30:00', NULL, NULL, '2019-02-18 23:04:56');
/*!40000 ALTER TABLE `lobby` ENABLE KEYS */;

-- Copiando estrutura para tabela lobby.person
CREATE TABLE IF NOT EXISTS `person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `active` varchar(1) DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `responsible` varchar(2) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46;

-- Copiando dados para a tabela lobby.person: ~12 rows (aproximadamente)
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` (`id`, `name`, `active`, `update_at`, `responsible`, `company_id`) VALUES
	(34, 'Jorge Guilherme Kohn', 'S', '2019-02-23 16:50:21', 'S', 1),
	(35, 'Maria da Silva', 'S', '2019-02-23 16:52:20', 'S', 2),
	(36, 'Maria da Silva', 'S', '2019-02-23 16:54:27', 'S', 1),
	(37, 'João do Carmo', 'S', '2019-02-23 17:11:42', 'S', 1),
	(38, 'Jessica Maria de ', 'S', '2019-02-23 17:36:29', 'S', 1),
	(39, 'Jessica Maria de ', 'S', '2019-02-23 17:36:30', 'S', 1),
	(40, 'Keyton Soares', 'S', '2019-02-23 17:44:48', 'S', 1),
	(41, 'Valdemir Eldor Kohn', 'S', '2019-02-24 13:27:10', 'N', 1),
	(42, 'Andriele Mara Kohn', 'S', '2019-02-24 15:02:36', 'S', 1),
	(43, 'Aline Luiza Kohn', 'S', '2019-02-24 15:04:45', 'N', 1),
	(44, 'Nelita Mullher', 'S', '2019-02-25 22:35:03', 'S', 1),
	(45, 'Adriner Andrade', 'S', '2019-02-27 21:59:24', 'N', 1);
/*!40000 ALTER TABLE `person` ENABLE KEYS */;

-- Copiando estrutura para tabela lobby.procedures
CREATE TABLE IF NOT EXISTS `procedures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `detail` text,
  `active` varchar(255) DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `time` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `procedures_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7;

-- Copiando dados para a tabela lobby.procedures: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `procedures` DISABLE KEYS */;
INSERT INTO `procedures` (`id`, `company_id`, `name`, `price`, `detail`, `active`, `update_at`, `time`) VALUES
	(3, 1, 'Manutenção do aparelho ortodontico', 90, '', NULL, '2019-02-18 22:37:15', '00:30:00'),
	(5, 1, 'Limpeza de pele', 35.99, NULL, NULL, '2019-02-18 22:45:09', '00:25:00'),
	(6, 1, 'Remoção de carie', 70, NULL, NULL, '2019-02-20 21:20:48', '00:20:00');
/*!40000 ALTER TABLE `procedures` ENABLE KEYS */;

-- Copiando estrutura para tabela lobby.procedures_requirement
CREATE TABLE IF NOT EXISTS `procedures_requirement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `procedure_id` int(11) NOT NULL,
  `requirement_id` int(11) NOT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  KEY `requirement_id` (`requirement_id`),
  KEY `procedure_id` (`procedure_id`),
  CONSTRAINT `procedures_requirement` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `procedures_requirement_ibfk_2` FOREIGN KEY (`requirement_id`) REFERENCES `requirement` (`id`),
  CONSTRAINT `procedures_requirement_ibfk_3` FOREIGN KEY (`procedure_id`) REFERENCES `procedures` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11;

-- Copiando dados para a tabela lobby.procedures_requirement: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `procedures_requirement` DISABLE KEYS */;
INSERT INTO `procedures_requirement` (`id`, `company_id`, `procedure_id`, `requirement_id`, `update_at`) VALUES
	(5, 1, 3, 9, '2019-02-18 19:54:06'),
	(7, 1, 3, 12, '2019-02-18 21:08:14'),
	(10, 1, 5, 9, '2019-02-18 22:39:44');
/*!40000 ALTER TABLE `procedures_requirement` ENABLE KEYS */;

-- Copiando estrutura para tabela lobby.requirement
CREATE TABLE IF NOT EXISTS `requirement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `has_cost` varchar(1) DEFAULT NULL,
  `active` varchar(1) DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `requirement_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13;

-- Copiando dados para a tabela lobby.requirement: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `requirement` DISABLE KEYS */;
INSERT INTO `requirement` (`id`, `company_id`, `name`, `price`, `has_cost`, `active`, `update_at`) VALUES
	(9, 1, 'Maior de 18 anos ou declaração do responsável.', 0, NULL, NULL, '2019-02-18 15:05:22'),
	(10, 1, 'Anestesistas', 359.99, NULL, NULL, '2019-02-18 20:41:01'),
	(12, 1, 'Estar em jejum', 0, NULL, NULL, '2019-02-18 20:47:37');
/*!40000 ALTER TABLE `requirement` ENABLE KEYS */;

-- Copiando estrutura para tabela lobby.scheduling
CREATE TABLE IF NOT EXISTS `scheduling` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `lobby_id` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `active` varchar(1) NOT NULL,
  `situation` int(11) NOT NULL,
  `abs_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lobby_id` (`lobby_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `scheduling_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `scheduling_ibfk_2` FOREIGN KEY (`lobby_id`) REFERENCES `lobby` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=110;

-- Copiando dados para a tabela lobby.scheduling: ~91 rows (aproximadamente)
/*!40000 ALTER TABLE `scheduling` DISABLE KEYS */;
INSERT INTO `scheduling` (`id`, `company_id`, `name`, `lobby_id`, `start_date`, `end_date`, `active`, `situation`, `abs_id`) VALUES
	(19, 1, 'Agendamento', 2, '2019-02-28 21:00:00', '2019-02-28 21:30:00', 'N', 1, NULL),
	(20, 1, 'Agendamento', 1, '2019-02-28 21:15:00', '2019-02-28 22:00:00', 'N', 1, NULL),
	(21, 1, 'Agendamento', 2, '2019-03-01 00:00:00', '2019-03-01 00:30:00', 'N', 1, NULL),
	(22, 1, 'Agendamento', 2, '2019-03-01 00:00:00', '2019-03-01 00:30:00', 'N', 1, NULL),
	(23, 1, 'Agendamento', 1, '2019-03-01 00:15:00', '2019-03-01 01:00:00', 'N', 1, NULL),
	(24, 1, 'Agendamento', 1, '2019-03-01 00:15:00', '2019-03-01 01:00:00', 'N', 1, NULL),
	(25, 1, 'Agendamento', 1, '2019-03-01 00:15:00', '2019-03-01 01:00:00', 'N', 1, NULL),
	(26, 1, 'Agendamento', 1, '2019-03-01 00:15:00', '2019-03-04 01:00:00', 'N', 1, NULL),
	(27, 1, 'Agendamento', 1, '2019-03-01 03:15:00', '2019-03-03 04:00:00', 'N', 1, NULL),
	(28, 1, 'Agendamento', 1, '2019-03-01 03:15:00', '2019-03-03 04:00:00', 'N', 1, NULL),
	(29, 1, 'Agendamento', 1, '2019-03-01 03:15:00', '2019-03-03 04:00:00', 'N', 1, NULL),
	(30, 1, 'Agendamento', 1, '2019-03-01 03:15:00', '2019-03-03 04:00:00', 'N', 1, NULL),
	(31, 1, 'Agendamento', 2, '2019-03-03 20:00:00', '2019-03-03 21:00:00', 'N', 1, NULL),
	(32, 1, 'Agendamento', 2, '2019-03-03 23:00:00', '2019-03-04 01:00:00', 'N', 1, NULL),
	(33, 1, 'Agendamento', 2, '2019-03-04 02:00:00', '2019-03-04 04:00:00', 'N', 1, NULL),
	(34, 1, 'Agendamento', 2, '2019-03-04 02:00:00', '2019-03-04 04:00:00', 'N', 1, NULL),
	(35, 1, 'Agendamento', 2, '2019-03-04 02:00:00', '2019-03-04 04:00:00', 'N', 1, NULL),
	(36, 1, 'Agendamento', 1, '2019-03-03 19:45:00', '2019-03-03 20:00:00', 'N', 1, NULL),
	(37, 1, 'Agendamento', 1, '2019-03-03 22:45:00', '2019-03-03 23:00:00', 'N', 1, NULL),
	(38, 1, 'Agendamento', 1, '2019-03-04 01:45:00', '2019-03-04 02:13:00', 'N', 1, NULL),
	(39, 1, 'Agendamento', 1, '2019-03-04 04:45:00', '2019-03-04 05:15:00', 'N', 1, NULL),
	(40, 1, 'Agendamento', 1, '2019-03-03 22:45:00', '2019-03-04 00:00:00', 'N', 1, NULL),
	(41, 1, 'Agendamento', 1, '2019-03-04 01:45:00', '2019-03-04 03:05:00', 'N', 1, NULL),
	(42, 1, 'Agendamento', 1, '2019-03-04 01:45:00', '2019-03-04 03:06:00', 'N', 1, NULL),
	(43, 1, 'Agendamento', 1, '2019-03-04 01:45:00', '2019-03-04 03:07:00', 'N', 1, NULL),
	(44, 1, 'Agendamento', 1, '2019-03-04 04:45:00', '2019-03-04 07:05:00', 'N', 1, NULL),
	(45, 1, 'Agendamento', 1, '2019-03-04 07:45:00', '2019-03-04 10:06:00', 'N', 1, NULL),
	(46, 1, 'Agendamento', 1, '2019-03-04 07:45:00', '2019-03-04 10:08:00', 'N', 1, NULL),
	(47, 1, 'Agendamento', 1, '2019-03-04 10:45:00', '2019-03-04 13:09:00', 'N', 1, NULL),
	(48, 1, 'Agendamento', 1, '2019-03-04 10:45:00', '2019-03-04 13:11:00', 'N', 1, NULL),
	(49, 1, 'Agendamento', 1, '2019-03-04 10:45:00', '2019-03-04 13:14:00', 'N', 1, NULL),
	(50, 1, 'Agendamento', 1, '2019-03-04 13:45:00', '2019-03-04 16:10:00', 'N', 1, NULL),
	(51, 1, 'Agendamento', 1, '2019-03-04 13:45:00', '2019-03-04 16:13:00', 'N', 1, NULL),
	(52, 1, 'Agendamento', 1, '2019-03-04 13:45:00', '2019-03-04 16:14:00', 'N', 1, NULL),
	(53, 1, 'Agendamento', 1, '2019-03-04 13:45:00', '2019-03-04 16:15:00', 'N', 1, NULL),
	(54, 1, 'Agendamento', 1, '2019-03-04 13:45:00', '2019-03-04 16:16:00', 'N', 1, NULL),
	(55, 1, 'Agendamento', 1, '2019-03-04 13:45:00', '2019-03-04 16:17:00', 'N', 1, NULL),
	(56, 1, 'Agendamento', 1, '2019-03-04 16:45:00', '2019-03-04 19:18:00', 'N', 1, NULL),
	(57, 1, 'Agendamento', 1, '2019-03-04 16:45:00', '2019-03-04 19:20:00', 'N', 1, NULL),
	(58, 1, 'Agendamento', 1, '2019-03-04 16:45:00', '2019-03-04 19:22:00', 'N', 1, NULL),
	(59, 1, 'Agendamento', 1, '2019-03-04 16:45:00', '2019-03-04 19:24:00', 'N', 1, NULL),
	(60, 1, 'Agendamento', 1, '2019-03-04 19:45:00', '2019-03-04 22:29:00', 'N', 1, NULL),
	(61, 1, 'Agendamento', 1, '2019-03-04 19:45:00', '2019-03-04 22:30:00', 'N', 1, NULL),
	(62, 1, 'Agendamento', 1, '2019-03-04 22:45:00', '2019-03-05 01:51:00', 'N', 1, '5c7c36349ab93'),
	(63, 1, 'Agendamento', 1, '2019-03-04 22:45:00', '2019-03-05 01:54:00', 'N', 1, '5c7c36359e322'),
	(64, 1, 'Agendamento', 1, '2019-03-05 01:45:00', '2019-03-05 04:55:00', 'N', 1, '5c7c36d917565'),
	(65, 1, 'Agendamento', 1, '2019-03-05 01:45:00', '2019-03-05 04:56:00', 'N', 1, '5c7c36da2f27c'),
	(66, 1, 'Agendamento', 1, '2019-03-05 01:45:00', '2019-03-05 04:57:00', 'N', 1, '5c7c36db38d93'),
	(67, 1, 'Agendamento', 1, '2019-03-05 01:45:00', '2019-03-05 04:53:00', 'N', 1, '5c7c37659190b'),
	(68, 1, 'Agendamento', 1, '2019-03-05 01:45:00', '2019-03-05 04:54:00', 'N', 1, '5c7c37a1a9061'),
	(69, 1, 'Agendamento', 1, '2019-03-05 01:45:00', '2019-03-05 04:54:00', 'N', 1, '5c7c381a7e67f'),
	(70, 1, 'Agendamento', 1, '2019-03-05 01:45:00', '2019-03-05 04:54:00', 'N', 1, '5c7c36349ab93'),
	(71, 1, 'Agendamento', 1, '2019-03-05 04:45:00', '2019-03-05 07:55:00', 'N', 1, '5c7c37659190b'),
	(72, 1, 'Agendamento', 1, '2019-03-05 04:45:00', '2019-03-05 07:56:00', 'N', 1, '5c7c37659190b'),
	(73, 1, 'Agendamento', 1, '2019-03-05 07:45:00', '2019-03-05 10:58:00', 'N', 1, '5c7c37659190b'),
	(74, 1, 'Agendamento', 1, '2019-03-05 07:45:00', '2019-03-05 11:00:00', 'N', 1, '5c7c37659190b'),
	(75, 1, 'Agendamento', 2, '2019-03-03 20:32:00', '2019-03-03 21:30:00', 'N', 1, '5c7c397e1fc2a'),
	(76, 1, 'Agendamento', 2, '2019-03-03 23:32:00', '2019-03-04 00:30:00', 'N', 1, '5c7c397e1fc2a'),
	(77, 1, 'Agendamento', 2, '2019-03-04 02:32:00', '2019-03-04 03:30:00', 'N', 1, '5c7c397e1fc2a'),
	(78, 1, 'Agendamento', 2, '2019-03-04 02:32:00', '2019-03-04 03:30:00', 'N', 1, '5c7c397e1fc2a'),
	(79, 1, 'Agendamento', 2, '2019-03-04 05:32:00', '2019-03-04 07:30:00', 'N', 1, '5c7c397e1fc2a'),
	(80, 1, 'Agendamento', 2, '2019-03-04 05:32:00', '2019-03-04 07:30:00', 'N', 1, '5c7c397e1fc2a'),
	(81, 1, 'Agendamento', 2, '2019-03-04 08:32:00', '2019-03-04 11:30:00', 'N', 1, '5c7c397e1fc2a'),
	(82, 1, 'Agendamento', 2, '2019-03-04 08:32:00', '2019-03-04 11:30:00', 'N', 1, '5c7c397e1fc2a'),
	(83, 1, 'Agendamento', 1, '2019-03-05 10:45:00', '2019-03-05 14:00:00', 'N', 1, '5c7c37659190b'),
	(84, 1, 'Agendamento', 2, '2019-03-04 11:32:00', '2019-03-04 14:30:00', 'N', 1, '5c7c397e1fc2a'),
	(85, 1, 'Agendamento', 2, '2019-03-04 11:32:00', '2019-03-04 14:30:00', 'N', 1, '5c7c397e1fc2a'),
	(86, 1, 'Agendamento', 2, '2019-03-04 14:32:00', '2019-03-04 17:30:00', 'N', 1, '5c7c397e1fc2a'),
	(87, 1, 'Agendamento', 2, '2019-03-04 17:32:00', '2019-03-04 20:30:00', 'N', 1, '5c7c397e1fc2a'),
	(88, 1, 'Agendamento', 2, '2019-03-04 17:32:00', '2019-03-04 20:30:00', 'N', 1, '5c7c397e1fc2a'),
	(89, 1, 'Agendamento', 2, '2019-03-04 17:32:00', '2019-03-04 20:30:00', 'N', 1, '5c7c397e1fc2a'),
	(90, 1, 'Agendamento', 2, '2019-03-04 17:33:00', '2019-03-04 20:30:00', 'N', 1, '5c7c397e1fc2a'),
	(91, 1, 'Agendamento', 2, '2019-03-04 20:33:00', '2019-03-04 23:30:00', 'N', 1, '5c7c397e1fc2a'),
	(92, 1, 'Agendamento', 2, '2019-03-04 20:33:00', '2019-03-04 23:30:00', 'N', 1, '5c7c397e1fc2a'),
	(93, 1, 'Agendamento', 1, '2019-03-05 13:45:00', '2019-03-05 17:00:00', 'N', 1, '5c7c37659190b'),
	(94, 1, 'Agendamento', 1, '2019-03-05 16:45:00', '2019-03-05 20:00:00', 'N', 1, '5c7c37659190b'),
	(95, 1, 'Agendamento', 2, '2019-03-05 19:45:00', '2019-03-05 23:00:00', 'N', 1, '5c7c37659190b'),
	(96, 1, 'Agendamento', 2, '2019-03-05 22:45:00', '2019-03-06 02:00:00', 'S', 3, '5c7c37659190b'),
	(97, 1, 'Agendamento', 2, '2019-03-04 23:33:00', '2019-03-05 02:30:00', 'N', 1, '5c7c397e1fc2a'),
	(98, 1, 'Agendamento', 2, '2019-03-04 11:30:00', '2019-03-04 12:00:00', 'N', 1, '5c7d0aee3ebe9'),
	(99, 1, 'Agendamento', 2, '2019-03-04 14:30:00', '2019-03-04 15:00:00', 'S', 3, '5c7d0aee3ebe9'),
	(100, 1, 'Agendamento', 2, '2019-03-05 02:33:00', '2019-03-05 05:30:00', 'N', 1, '5c7c397e1fc2a'),
	(101, 1, 'Agendamento', 2, '2019-03-05 02:33:00', '2019-03-05 05:30:00', 'N', 1, '5c7c397e1fc2a'),
	(102, 1, 'Agendamento', 2, '2019-03-05 02:33:00', '2019-03-05 05:30:00', 'N', 1, '5c7c397e1fc2a'),
	(103, 1, 'Agendamento', 2, '2019-03-05 05:33:00', '2019-03-05 08:30:00', 'N', 1, '5c7c397e1fc2a'),
	(104, 1, 'Agendamento', 2, '2019-03-05 08:33:00', '2019-03-05 11:30:00', 'N', 1, '5c7c397e1fc2a'),
	(105, 1, 'Agendamento', 2, '2019-03-05 08:33:00', '2019-03-05 11:30:00', 'N', 1, '5c7c397e1fc2a'),
	(106, 1, 'Agendamento', 2, '2019-03-05 08:33:00', '2019-03-05 11:30:00', 'S', 3, '5c7c397e1fc2a'),
	(107, 1, 'Agendamento', 2, '2019-03-04 18:30:00', '2019-03-04 19:00:00', 'S', 3, '5c7d627563b1f'),
	(108, 1, 'Agendamento', 1, '2019-03-04 19:30:00', '2019-03-04 20:00:00', 'S', 3, '5c7d7a2521d8b'),
	(109, 1, 'Agendamento', 2, '2019-03-04 20:00:00', '2019-03-04 21:00:00', 'S', 4, '5c7d82a03de78');
/*!40000 ALTER TABLE `scheduling` ENABLE KEYS */;

-- Copiando estrutura para tabela lobby.scheduling_procedures
CREATE TABLE IF NOT EXISTS `scheduling_procedures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `scheduling_id` int(11) NOT NULL,
  `procedure_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `scheduling_id` (`scheduling_id`),
  KEY `procedure_id` (`procedure_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `scheduling_procedures_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `scheduling_procedures_ibfk_2` FOREIGN KEY (`scheduling_id`) REFERENCES `scheduling` (`id`),
  CONSTRAINT `scheduling_procedures_ibfk_3` FOREIGN KEY (`procedure_id`) REFERENCES `procedures` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=146;

-- Copiando dados para a tabela lobby.scheduling_procedures: ~128 rows (aproximadamente)
/*!40000 ALTER TABLE `scheduling_procedures` DISABLE KEYS */;
INSERT INTO `scheduling_procedures` (`id`, `company_id`, `scheduling_id`, `procedure_id`) VALUES
	(18, 1, 19, 3),
	(19, 1, 20, 3),
	(20, 1, 20, 5),
	(21, 1, 21, 3),
	(22, 1, 22, 3),
	(23, 1, 23, 3),
	(24, 1, 23, 5),
	(25, 1, 24, 3),
	(26, 1, 24, 5),
	(27, 1, 25, 3),
	(28, 1, 25, 5),
	(29, 1, 26, 3),
	(30, 1, 26, 5),
	(31, 1, 27, 3),
	(32, 1, 27, 5),
	(33, 1, 28, 3),
	(34, 1, 28, 5),
	(35, 1, 29, 3),
	(36, 1, 29, 5),
	(37, 1, 30, 3),
	(38, 1, 31, 3),
	(39, 1, 31, 5),
	(40, 1, 32, 3),
	(41, 1, 32, 5),
	(42, 1, 33, 3),
	(43, 1, 33, 5),
	(44, 1, 34, 3),
	(45, 1, 34, 5),
	(46, 1, 35, 3),
	(47, 1, 35, 5),
	(48, 1, 36, 3),
	(49, 1, 37, 3),
	(50, 1, 38, 3),
	(51, 1, 39, 3),
	(52, 1, 40, 3),
	(53, 1, 41, 3),
	(54, 1, 42, 3),
	(55, 1, 43, 3),
	(56, 1, 44, 3),
	(57, 1, 45, 3),
	(58, 1, 46, 3),
	(59, 1, 47, 3),
	(60, 1, 48, 3),
	(61, 1, 49, 3),
	(62, 1, 50, 3),
	(63, 1, 51, 3),
	(64, 1, 52, 3),
	(65, 1, 53, 3),
	(66, 1, 54, 3),
	(67, 1, 55, 3),
	(68, 1, 56, 3),
	(69, 1, 57, 3),
	(70, 1, 58, 3),
	(71, 1, 59, 3),
	(72, 1, 60, 3),
	(73, 1, 61, 3),
	(74, 1, 62, 3),
	(75, 1, 63, 3),
	(76, 1, 64, 3),
	(77, 1, 65, 3),
	(78, 1, 66, 3),
	(79, 1, 67, 3),
	(80, 1, 68, 3),
	(81, 1, 69, 3),
	(82, 1, 70, 3),
	(83, 1, 71, 3),
	(84, 1, 72, 3),
	(85, 1, 73, 3),
	(86, 1, 74, 3),
	(87, 1, 75, 3),
	(88, 1, 76, 3),
	(89, 1, 77, 3),
	(90, 1, 78, 3),
	(91, 1, 79, 3),
	(92, 1, 80, 3),
	(93, 1, 81, 3),
	(94, 1, 82, 3),
	(95, 1, 83, 3),
	(96, 1, 84, 3),
	(97, 1, 84, 5),
	(98, 1, 85, 3),
	(99, 1, 85, 5),
	(100, 1, 85, 6),
	(101, 1, 86, 3),
	(102, 1, 86, 5),
	(103, 1, 87, 3),
	(104, 1, 87, 5),
	(105, 1, 88, 3),
	(106, 1, 88, 5),
	(107, 1, 89, 3),
	(108, 1, 89, 5),
	(109, 1, 90, 3),
	(110, 1, 90, 5),
	(111, 1, 91, 3),
	(112, 1, 91, 5),
	(113, 1, 92, 3),
	(114, 1, 92, 5),
	(115, 1, 93, 3),
	(116, 1, 93, 5),
	(117, 1, 94, 3),
	(118, 1, 94, 5),
	(119, 1, 95, 3),
	(120, 1, 95, 5),
	(121, 1, 96, 3),
	(122, 1, 96, 5),
	(123, 1, 97, 3),
	(124, 1, 97, 5),
	(125, 1, 98, 6),
	(126, 1, 98, 5),
	(127, 1, 99, 6),
	(128, 1, 99, 5),
	(129, 1, 100, 3),
	(130, 1, 100, 5),
	(131, 1, 101, 3),
	(132, 1, 101, 5),
	(133, 1, 102, 3),
	(134, 1, 102, 5),
	(135, 1, 103, 3),
	(136, 1, 103, 5),
	(137, 1, 104, 3),
	(138, 1, 104, 5),
	(139, 1, 105, 3),
	(140, 1, 105, 5),
	(141, 1, 106, 3),
	(142, 1, 106, 5),
	(143, 1, 107, 3),
	(144, 1, 108, 3),
	(145, 1, 109, 3);
/*!40000 ALTER TABLE `scheduling_procedures` ENABLE KEYS */;

-- Copiando estrutura para tabela lobby.scheduling_responsible
CREATE TABLE IF NOT EXISTS `scheduling_responsible` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `scheduling_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `active` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  KEY `scheduling_id` (`scheduling_id`),
  KEY `person_id` (`person_id`),
  CONSTRAINT `scheduling_responsible_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `scheduling_responsible_ibfk_2` FOREIGN KEY (`scheduling_id`) REFERENCES `scheduling` (`id`),
  CONSTRAINT `scheduling_responsible_ibfk_3` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115;

-- Copiando dados para a tabela lobby.scheduling_responsible: ~99 rows (aproximadamente)
/*!40000 ALTER TABLE `scheduling_responsible` DISABLE KEYS */;
INSERT INTO `scheduling_responsible` (`id`, `company_id`, `scheduling_id`, `person_id`, `active`) VALUES
	(16, 1, 19, 34, 'S'),
	(17, 1, 20, 34, 'S'),
	(18, 1, 21, 34, 'S'),
	(19, 1, 22, 34, 'S'),
	(20, 1, 23, 34, 'S'),
	(21, 1, 24, 34, 'S'),
	(22, 1, 25, 34, 'S'),
	(23, 1, 26, 34, 'S'),
	(24, 1, 27, 34, 'S'),
	(25, 1, 28, 34, 'S'),
	(26, 1, 29, 34, 'S'),
	(27, 1, 30, 34, 'S'),
	(28, 1, 31, 34, 'S'),
	(29, 1, 32, 34, 'S'),
	(30, 1, 33, 34, 'S'),
	(31, 1, 34, 34, 'S'),
	(32, 1, 35, 34, 'S'),
	(33, 1, 35, 44, 'S'),
	(34, 1, 36, 34, 'S'),
	(35, 1, 37, 34, 'S'),
	(36, 1, 38, 34, 'S'),
	(37, 1, 39, 34, 'S'),
	(38, 1, 40, 34, 'S'),
	(39, 1, 41, 34, 'S'),
	(40, 1, 42, 34, 'S'),
	(41, 1, 43, 34, 'S'),
	(42, 1, 44, 34, 'S'),
	(43, 1, 45, 34, 'S'),
	(44, 1, 46, 34, 'S'),
	(45, 1, 47, 34, 'S'),
	(46, 1, 48, 34, 'S'),
	(47, 1, 49, 34, 'S'),
	(48, 1, 50, 34, 'S'),
	(49, 1, 51, 34, 'S'),
	(50, 1, 52, 34, 'S'),
	(51, 1, 53, 34, 'S'),
	(52, 1, 54, 34, 'S'),
	(53, 1, 55, 34, 'S'),
	(54, 1, 56, 34, 'S'),
	(55, 1, 57, 34, 'S'),
	(56, 1, 58, 34, 'S'),
	(57, 1, 59, 34, 'S'),
	(58, 1, 60, 34, 'S'),
	(59, 1, 61, 34, 'S'),
	(60, 1, 62, 34, 'S'),
	(61, 1, 63, 34, 'S'),
	(62, 1, 64, 34, 'S'),
	(63, 1, 65, 34, 'S'),
	(64, 1, 66, 34, 'S'),
	(65, 1, 67, 34, 'S'),
	(66, 1, 68, 34, 'S'),
	(67, 1, 69, 34, 'S'),
	(68, 1, 70, 34, 'S'),
	(69, 1, 71, 34, 'S'),
	(70, 1, 72, 34, 'S'),
	(71, 1, 73, 34, 'S'),
	(72, 1, 74, 34, 'S'),
	(73, 1, 75, 34, 'S'),
	(74, 1, 76, 34, 'S'),
	(75, 1, 76, 44, 'S'),
	(76, 1, 77, 34, 'S'),
	(77, 1, 77, 44, 'S'),
	(78, 1, 78, 34, 'S'),
	(79, 1, 78, 44, 'S'),
	(80, 1, 79, 34, 'S'),
	(81, 1, 79, 44, 'S'),
	(82, 1, 80, 34, 'S'),
	(83, 1, 81, 34, 'S'),
	(84, 1, 82, 34, 'S'),
	(85, 1, 83, 34, 'S'),
	(86, 1, 84, 34, 'S'),
	(87, 1, 85, 34, 'S'),
	(88, 1, 86, 34, 'S'),
	(89, 1, 87, 34, 'S'),
	(90, 1, 88, 34, 'S'),
	(91, 1, 89, 34, 'S'),
	(92, 1, 90, 34, 'S'),
	(93, 1, 91, 34, 'S'),
	(94, 1, 92, 34, 'S'),
	(95, 1, 93, 34, 'S'),
	(96, 1, 94, 34, 'S'),
	(97, 1, 95, 34, 'S'),
	(98, 1, 96, 34, 'S'),
	(99, 1, 97, 34, 'S'),
	(100, 1, 98, 34, 'S'),
	(101, 1, 99, 34, 'S'),
	(102, 1, 100, 34, 'S'),
	(103, 1, 101, 34, 'S'),
	(104, 1, 102, 34, 'S'),
	(105, 1, 103, 34, 'S'),
	(106, 1, 104, 34, 'S'),
	(107, 1, 104, 36, 'S'),
	(108, 1, 105, 34, 'S'),
	(109, 1, 105, 36, 'S'),
	(110, 1, 106, 34, 'S'),
	(111, 1, 106, 36, 'S'),
	(112, 1, 107, 34, 'S'),
	(113, 1, 108, 44, 'S'),
	(114, 1, 109, 34, 'S');
/*!40000 ALTER TABLE `scheduling_responsible` ENABLE KEYS */;

-- Copiando estrutura para tabela lobby.scheduling_visitor
CREATE TABLE IF NOT EXISTS `scheduling_visitor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `scheduling_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `active` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  KEY `scheduling_id` (`scheduling_id`),
  KEY `person_id` (`person_id`),
  CONSTRAINT `scheduling_visitor_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `scheduling_visitor_ibfk_2` FOREIGN KEY (`scheduling_id`) REFERENCES `scheduling` (`id`),
  CONSTRAINT `scheduling_visitor_ibfk_3` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=161;

-- Copiando dados para a tabela lobby.scheduling_visitor: ~145 rows (aproximadamente)
/*!40000 ALTER TABLE `scheduling_visitor` DISABLE KEYS */;
INSERT INTO `scheduling_visitor` (`id`, `company_id`, `scheduling_id`, `person_id`, `active`) VALUES
	(16, 1, 19, 44, 'S'),
	(17, 1, 19, 45, 'S'),
	(18, 1, 20, 38, 'S'),
	(19, 1, 20, 42, 'S'),
	(20, 1, 21, 44, 'S'),
	(21, 1, 21, 45, 'S'),
	(22, 1, 22, 44, 'S'),
	(23, 1, 22, 45, 'S'),
	(24, 1, 23, 38, 'S'),
	(25, 1, 23, 42, 'S'),
	(26, 1, 24, 38, 'S'),
	(27, 1, 24, 42, 'S'),
	(28, 1, 25, 38, 'S'),
	(29, 1, 25, 42, 'S'),
	(30, 1, 26, 38, 'S'),
	(31, 1, 26, 42, 'S'),
	(32, 1, 27, 38, 'S'),
	(33, 1, 27, 42, 'S'),
	(34, 1, 28, 38, 'S'),
	(35, 1, 28, 42, 'S'),
	(36, 1, 29, 38, 'S'),
	(37, 1, 29, 42, 'S'),
	(38, 1, 30, 38, 'S'),
	(39, 1, 30, 42, 'S'),
	(40, 1, 31, 38, 'S'),
	(41, 1, 31, 44, 'S'),
	(42, 1, 32, 38, 'S'),
	(43, 1, 33, 38, 'S'),
	(44, 1, 33, 35, 'S'),
	(45, 1, 34, 38, 'S'),
	(46, 1, 34, 35, 'S'),
	(47, 1, 34, 42, 'S'),
	(48, 1, 35, 38, 'S'),
	(49, 1, 35, 35, 'S'),
	(50, 1, 35, 42, 'S'),
	(51, 1, 36, 42, 'S'),
	(52, 1, 37, 42, 'S'),
	(53, 1, 37, 44, 'S'),
	(54, 1, 38, 42, 'S'),
	(55, 1, 38, 44, 'S'),
	(56, 1, 39, 42, 'S'),
	(57, 1, 39, 44, 'S'),
	(58, 1, 40, 42, 'S'),
	(59, 1, 41, 42, 'S'),
	(60, 1, 42, 42, 'S'),
	(61, 1, 43, 42, 'S'),
	(62, 1, 44, 42, 'S'),
	(63, 1, 45, 42, 'S'),
	(64, 1, 46, 42, 'S'),
	(65, 1, 47, 42, 'S'),
	(66, 1, 48, 42, 'S'),
	(67, 1, 49, 42, 'S'),
	(68, 1, 50, 42, 'S'),
	(69, 1, 51, 42, 'S'),
	(70, 1, 52, 42, 'S'),
	(71, 1, 53, 42, 'S'),
	(72, 1, 54, 42, 'S'),
	(73, 1, 55, 42, 'S'),
	(74, 1, 56, 42, 'S'),
	(75, 1, 57, 42, 'S'),
	(76, 1, 58, 42, 'S'),
	(77, 1, 59, 42, 'S'),
	(78, 1, 60, 42, 'S'),
	(79, 1, 61, 42, 'S'),
	(80, 1, 62, 42, 'S'),
	(81, 1, 63, 42, 'S'),
	(82, 1, 64, 42, 'S'),
	(83, 1, 65, 42, 'S'),
	(84, 1, 66, 42, 'S'),
	(85, 1, 67, 42, 'S'),
	(86, 1, 68, 42, 'S'),
	(87, 1, 69, 42, 'S'),
	(88, 1, 70, 42, 'S'),
	(89, 1, 71, 42, 'S'),
	(90, 1, 72, 42, 'S'),
	(91, 1, 73, 42, 'S'),
	(92, 1, 74, 42, 'S'),
	(93, 1, 75, 38, 'S'),
	(94, 1, 76, 38, 'S'),
	(95, 1, 77, 38, 'S'),
	(96, 1, 77, 42, 'S'),
	(97, 1, 78, 38, 'S'),
	(98, 1, 78, 42, 'S'),
	(99, 1, 78, 36, 'S'),
	(100, 1, 79, 38, 'S'),
	(101, 1, 79, 42, 'S'),
	(102, 1, 79, 36, 'S'),
	(103, 1, 80, 38, 'S'),
	(104, 1, 80, 42, 'S'),
	(105, 1, 80, 36, 'S'),
	(106, 1, 81, 38, 'S'),
	(107, 1, 81, 42, 'S'),
	(108, 1, 81, 36, 'S'),
	(109, 1, 82, 38, 'S'),
	(110, 1, 82, 42, 'S'),
	(111, 1, 82, 36, 'S'),
	(112, 1, 82, 44, 'S'),
	(113, 1, 83, 42, 'S'),
	(114, 1, 83, 35, 'S'),
	(115, 1, 84, 38, 'S'),
	(116, 1, 84, 42, 'S'),
	(117, 1, 84, 36, 'S'),
	(118, 1, 84, 44, 'S'),
	(119, 1, 85, 38, 'S'),
	(120, 1, 85, 42, 'S'),
	(121, 1, 85, 36, 'S'),
	(122, 1, 85, 44, 'S'),
	(123, 1, 86, 38, 'S'),
	(124, 1, 86, 42, 'S'),
	(125, 1, 86, 36, 'S'),
	(126, 1, 86, 44, 'S'),
	(127, 1, 87, 38, 'S'),
	(128, 1, 87, 42, 'S'),
	(129, 1, 87, 36, 'S'),
	(130, 1, 88, 38, 'S'),
	(131, 1, 88, 42, 'S'),
	(132, 1, 89, 38, 'S'),
	(133, 1, 90, 34, 'S'),
	(134, 1, 91, 34, 'S'),
	(135, 1, 92, 44, 'S'),
	(136, 1, 93, 42, 'S'),
	(137, 1, 93, 35, 'S'),
	(138, 1, 94, 42, 'S'),
	(139, 1, 95, 42, 'S'),
	(140, 1, 96, 42, 'S'),
	(141, 1, 97, 44, 'S'),
	(142, 1, 98, 44, 'S'),
	(143, 1, 99, 44, 'S'),
	(144, 1, 99, 42, 'S'),
	(145, 1, 100, 44, 'S'),
	(146, 1, 100, 34, 'S'),
	(147, 1, 101, 44, 'S'),
	(148, 1, 102, 44, 'S'),
	(149, 1, 102, 43, 'S'),
	(150, 1, 103, 44, 'S'),
	(151, 1, 104, 44, 'S'),
	(152, 1, 105, 44, 'S'),
	(153, 1, 105, 42, 'S'),
	(154, 1, 106, 44, 'S'),
	(155, 1, 106, 42, 'S'),
	(156, 1, 106, 41, 'S'),
	(157, 1, 107, 41, 'S'),
	(158, 1, 108, 34, 'S'),
	(159, 1, 109, 38, 'S'),
	(160, 1, 109, 37, 'S');
/*!40000 ALTER TABLE `scheduling_visitor` ENABLE KEYS */;

-- Copiando estrutura para tabela lobby.token
CREATE TABLE IF NOT EXISTS `token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expired` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`token`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `token_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8;

-- Copiando dados para a tabela lobby.token: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` (`id`, `company_id`, `token`, `expired`) VALUES
	(1, 1, '565af178cb8061f526bead516db99b709950f9b0', NULL),
	(2, 1, 'fb7a55cc711902445fcf9d2b8ca02f02e70b3c6a', NULL),
	(3, 1, '075e93662af7c841297a3cb7fe367bfca02b40f5', NULL),
	(4, 1, '5a5acc71996238e70cf631333c15238a139e0122', NULL),
	(5, 1, 'a140ee255aff0b32f2d3fba3255c79c3eccd8151', NULL),
	(6, 1, 'c44dd8fdf18397163a687ec10d407567cda81105', NULL),
	(7, 1, '818e894d1c681c679789e78f73e3e5943f3ff854', NULL);
/*!40000 ALTER TABLE `token` ENABLE KEYS */;

-- Copiando estrutura para tabela lobby.visitor_checkin
CREATE TABLE IF NOT EXISTS `visitor_checkin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visitor_id` int(11) NOT NULL,
  `checkin_date` datetime NOT NULL,
  `active` varchar(1) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `visitor_id` (`visitor_id`),
  CONSTRAINT `visitor_checkin_ibfk_1` FOREIGN KEY (`visitor_id`) REFERENCES `scheduling_visitor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48;

-- Copiando dados para a tabela lobby.visitor_checkin: ~40 rows (aproximadamente)
/*!40000 ALTER TABLE `visitor_checkin` DISABLE KEYS */;
INSERT INTO `visitor_checkin` (`id`, `visitor_id`, `checkin_date`, `active`, `company_id`) VALUES
	(8, 154, '2019-03-04 17:20:56', 'N', 1),
	(9, 156, '2019-03-04 17:34:42', 'N', 1),
	(10, 155, '2019-03-04 17:56:19', 'N', 1),
	(11, 156, '2019-03-04 18:09:12', 'N', 1),
	(12, 154, '2019-03-04 18:09:13', 'N', 1),
	(13, 155, '2019-03-04 18:09:14', 'N', 1),
	(14, 155, '2019-03-04 18:11:05', 'N', 1),
	(15, 155, '2019-03-04 18:22:20', 'N', 1),
	(16, 154, '2019-03-04 18:22:26', 'N', 1),
	(17, 155, '2019-03-04 18:22:56', 'N', 1),
	(18, 155, '2019-03-04 18:23:38', 'N', 1),
	(19, 154, '2019-03-04 18:25:17', 'N', 1),
	(20, 157, '2019-03-04 18:37:19', 'N', 1),
	(21, 157, '2019-03-04 18:43:39', 'N', 1),
	(22, 154, '2019-03-04 18:54:02', 'N', 1),
	(23, 156, '2019-03-04 18:56:13', 'N', 1),
	(24, 155, '2019-03-04 18:56:16', 'N', 1),
	(25, 154, '2019-03-04 18:56:17', 'N', 1),
	(26, 154, '2019-03-04 18:57:07', 'N', 1),
	(27, 158, '2019-03-04 19:20:14', 'N', 1),
	(28, 158, '2019-03-04 19:41:49', 'N', 1),
	(29, 158, '2019-03-04 19:42:15', 'N', 1),
	(30, 158, '2019-03-04 19:54:34', 'N', 1),
	(31, 160, '2019-03-04 19:55:38', 'N', 1),
	(32, 159, '2019-03-04 19:55:40', 'N', 1),
	(33, 158, '2019-03-04 19:56:37', 'S', 1),
	(34, 159, '2019-03-04 19:57:08', 'N', 1),
	(35, 159, '2019-03-04 19:57:59', 'N', 1),
	(36, 159, '2019-03-04 19:59:49', 'N', 1),
	(37, 159, '2019-03-04 20:02:27', 'N', 1),
	(38, 159, '2019-03-04 20:03:57', 'N', 1),
	(39, 159, '2019-03-04 20:06:22', 'N', 1),
	(40, 159, '2019-03-04 20:08:07', 'N', 1),
	(41, 160, '2019-03-04 20:08:11', 'N', 1),
	(42, 159, '2019-03-04 20:09:21', 'N', 1),
	(43, 159, '2019-03-04 20:10:20', 'N', 1),
	(44, 160, '2019-03-04 20:10:25', 'N', 1),
	(45, 159, '2019-03-04 20:10:38', 'N', 1),
	(46, 160, '2019-03-04 20:10:49', 'S', 1),
	(47, 159, '2019-03-04 20:31:14', 'S', 1);
/*!40000 ALTER TABLE `visitor_checkin` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
