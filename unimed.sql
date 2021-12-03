# Host: localhost  (Version 6.0.0-alpha-community-nt-debug)
# Date: 2021-12-03 10:00:11
# Generator: MySQL-Front 5.4  (Build 4.154) - http://www.mysqlfront.de/

/*!40101 SET NAMES utf8 */;

#
# Structure for table "cliente_plano"
#

DROP TABLE IF EXISTS `cliente_plano`;
CREATE TABLE `cliente_plano` (
  `cod` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cpf` varchar(45) NOT NULL,
  `cod_plano` int(10) unsigned NOT NULL,
  `data_inicio` datetime NOT NULL,
  `data_fim` datetime DEFAULT NULL,
  `numero_carteira` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cod`,`cod_plano`,`cpf`) USING BTREE,
  KEY `FK_cliente_plano_1` (`cpf`),
  CONSTRAINT `FK_cliente_plano_1` FOREIGN KEY (`cpf`) REFERENCES `clientes` (`cpf`),
  CONSTRAINT `FK_cliente_plano_2` FOREIGN KEY (`cod`) REFERENCES `exames` (`cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Data for table "cliente_plano"
#

INSERT INTO `cliente_plano` VALUES (1,'11111122233',1,'2021-12-03 00:00:00',NULL,'010203'),(2,'12345678',2,'2021-12-01 00:00:00',NULL,'000001');

#
# Structure for table "clientes"
#

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes` (
  `cpf` varchar(20) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `data_nasc` date NOT NULL,
  `nome_mae` varchar(85) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  PRIMARY KEY (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Data for table "clientes"
#

INSERT INTO `clientes` VALUES ('11111122233','Maria do Carmo','1988-01-30','Lurdes do Carmo','Rua América, 30'),('12345678','Jose Carlos Antonio','1999-12-12','Heloisa dos Santos','AVenida Brasil, 444');

#
# Structure for table "exames"
#

DROP TABLE IF EXISTS `exames`;
CREATE TABLE `exames` (
  `cod` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) NOT NULL,
  `status` char(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Data for table "exames"
#

INSERT INTO `exames` VALUES (1,'Exame 1','1'),(2,'Exame 2','1'),(3,'Exame 3','1');

#
# Structure for table "cliente_exame"
#

DROP TABLE IF EXISTS `cliente_exame`;
CREATE TABLE `cliente_exame` (
  `cod` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cpf` varchar(45) NOT NULL,
  `cod_exame` int(10) unsigned NOT NULL,
  `data` datetime DEFAULT NULL,
  PRIMARY KEY (`cod`,`cpf`,`cod_exame`),
  KEY `FK_cliente_exame_1` (`cpf`),
  CONSTRAINT `FK_cliente_exame_2` FOREIGN KEY (`cod`) REFERENCES `exames` (`cod`),
  CONSTRAINT `FK_cliente_exame_1` FOREIGN KEY (`cpf`) REFERENCES `clientes` (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Data for table "cliente_exame"
#

INSERT INTO `cliente_exame` VALUES (1,'11111122233',1,'2022-01-12 15:00:00'),(2,'12345678',2,'2022-02-01 07:00:00');

#
# Structure for table "planos"
#

DROP TABLE IF EXISTS `planos`;
CREATE TABLE `planos` (
  `cod` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) NOT NULL,
  `status` char(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Data for table "planos"
#

INSERT INTO `planos` VALUES (1,'Plano 1','1'),(2,'Plano 2','1'),(3,'Plano 3','1');
