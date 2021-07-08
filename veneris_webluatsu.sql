-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 03, 2021 at 04:20 AM
-- Server version: 10.2.37-MariaDB-log-cll-lve
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `veneris_webluatsu`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`veneris`@`localhost` PROCEDURE `getBookingByLawyerID` (IN `lawyerID` VARCHAR(36))  BEGIN
	SELECT * FROM Booking B
		WHERE B.LawyerID = lawyerID;
END$$

CREATE DEFINER=`veneris`@`localhost` PROCEDURE `getExperienceByLawyerID` (IN `lawyerID` VARCHAR(36))  BEGIN
	SELECT * FROM LawyerExperience LE
		JOIN Experience E
		ON LE.ExperienceID = E.ExperienceID
		WHERE LE.LawyerID = lawyerID;
END$$

CREATE DEFINER=`veneris`@`localhost` PROCEDURE `getFormationByLawyerID` (IN `lawyerID` VARCHAR(36))  BEGIN
	SELECT * FROM LawyerFormation LF
		JOIN Formation F
		ON LF.FormationID = F.FormationID
		WHERE LF.LawyerID = lawyerID;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Address`
--

CREATE TABLE `Address` (
  `AddressID` varchar(150) NOT NULL,
  `Street` varchar(150) NOT NULL,
  `District` varchar(20) NOT NULL,
  `Province` varchar(100) NOT NULL,
  `Zipcode` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Address`
--

INSERT INTO `Address` (`AddressID`, `Street`, `District`, `Province`, `Zipcode`) VALUES
('ad01', 'street 1', 'district 1', 'province 1', 1),
('ad02', 'street 2', 'district 2', 'province 2', 2),
('ad03', 'street 3', 'district 3', 'province 3', 3),
('ad04', 'street 4', 'district 4', 'province 4', 4),
('ad05', 'street 5', 'district 5', 'province 5', 5),
('ad06', 'street 6', 'district 6', 'province 6', 6);

--
-- Triggers `Address`
--
DELIMITER $$
CREATE TRIGGER `INSERT_Address_ID` BEFORE INSERT ON `Address` FOR EACH ROW BEGIN
	IF NEW.AddressID IS NULL THEN
		SET NEW.AddressID = UUID();
	END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Admin`
--

CREATE TABLE `Admin` (
  `AdminID` varchar(36) NOT NULL,
  `FirstName` varchar(30) DEFAULT NULL,
  `LastName` varchar(30) DEFAULT NULL,
  `CreatedDateTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedDateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Admin`
--

INSERT INTO `Admin` (`AdminID`, `FirstName`, `LastName`, `CreatedDateTime`, `UpdatedDateTime`) VALUES
('admin', 'admin', 'admin', '2021-01-01 18:20:08', '2021-01-01 18:20:08'),
('userid_admin1', 'Administrator 1', 'Last Name', '2021-01-01 18:20:08', '2021-01-01 18:20:08'),
('userid_admin2', 'Administrator 2', 'Last Name', '2021-01-01 18:20:24', '2021-01-01 18:20:24'),
('userid_admin3', 'Administrator 3', 'Last Name', '2021-01-01 18:20:24', '2021-01-01 18:20:24'),
('userid_admin4', 'Administrator 4', 'Last Name', '2021-01-01 18:20:24', '2021-01-01 18:20:24'),
('userid_admin5', 'Administrator 5', 'Last Name', '2021-01-01 18:20:24', '2021-01-01 18:20:24'),
('userid_admin6', 'Administrator 6', 'Last Name', '2021-01-01 18:20:24', '2021-01-01 18:20:24'),
('userid_admin7', 'Administrator 7', 'Last Name', '2021-01-19 20:55:42', '2021-01-19 20:55:42');

-- --------------------------------------------------------

--
-- Table structure for table `BillingAddress`
--

CREATE TABLE `BillingAddress` (
  `BillingAddressID` varchar(150) CHARACTER SET latin1 NOT NULL,
  `Address` varchar(150) CHARACTER SET latin1 NOT NULL,
  `City` varchar(100) CHARACTER SET latin1 NOT NULL,
  `Country` varchar(100) CHARACTER SET latin1 NOT NULL,
  `CodePostal` int(11) NOT NULL,
  `CreatedDateTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedDateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `BillingAddress`
--

INSERT INTO `BillingAddress` (`BillingAddressID`, `Address`, `City`, `Country`, `CodePostal`, `CreatedDateTime`, `UpdatedDateTime`) VALUES
('ba01', 'address 1', 'city 1', 'country 1', 1, '2021-03-20 14:57:55', '2021-03-20 14:57:55'),
('ba02', 'address 2', 'city 2', 'country 2', 2, '2021-03-20 14:57:55', '2021-03-20 14:57:55'),
('ba03', 'address 3', 'city 3', 'country 3', 3, '2021-03-20 14:57:55', '2021-03-20 14:57:55'),
('ba04', 'address 4', 'city 4', 'country 4', 4, '2021-03-20 14:57:55', '2021-03-20 14:57:55'),
('ba05', 'address 5', 'city 5', 'country 5', 5, '2021-03-20 14:57:55', '2021-03-20 14:57:55'),
('ba06', 'address 6', 'city 6', 'country 6', 6, '2021-03-20 14:57:55', '2021-03-20 14:57:55');

--
-- Triggers `BillingAddress`
--
DELIMITER $$
CREATE TRIGGER `INSERT_BillingAddress_ID` BEFORE INSERT ON `BillingAddress` FOR EACH ROW BEGIN
	IF NEW.BillingAddressID IS NULL THEN
		SET NEW.BillingAddressID = UUID();
	END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Booking`
--

CREATE TABLE `Booking` (
  `BookingID` varchar(36) NOT NULL,
  `ClientID` varchar(36) NOT NULL,
  `LawyerID` varchar(36) NOT NULL,
  `Title` varchar(100) DEFAULT NULL,
  `State` varchar(150) NOT NULL DEFAULT 'INIT',
  `BookingDate` date NOT NULL,
  `StartTime` varchar(8) NOT NULL,
  `EndTime` varchar(8) NOT NULL,
  `Content` text CHARACTER SET utf8 DEFAULT NULL,
  `CreatedDateTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedDateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Booking`
--

INSERT INTO `Booking` (`BookingID`, `ClientID`, `LawyerID`, `Title`, `State`, `BookingDate`, `StartTime`, `EndTime`, `Content`, `CreatedDateTime`, `UpdatedDateTime`) VALUES
('booking01', 'userid_client1', 'userid_lawyer1', 'booking 1', 'REQUESTED', '2021-04-01', '10:00:00', '11:00:14', 'booking 1 content', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('booking02', 'userid_client2', 'userid_lawyer1', 'booking 2', 'CONFIRMED', '2021-04-01', '12:00:00', '12:00:14', 'booking 2 content', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('booking03', 'userid_client1', 'userid_lawyer1', 'booking 3', 'CANCELLED', '2021-04-01', '13:00:00', '13:00:14', 'booking 3 content', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('booking04', 'userid_client3', 'userid_lawyer1', 'booking 4', 'REJECTED', '2021-04-01', '13:00:15', '13:00:30', 'booking 4 content', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('booking05', 'userid_client4', 'userid_lawyer2', 'booking 5', 'REQUESTED', '2021-04-02', '10:00:00', '11:00:15', 'booking 5 content', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('booking06', 'userid_client1', 'userid_lawyer2', 'booking 6', 'REQUESTED', '2021-04-01', '10:00:00', '11:00:15', 'booking 6 content', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('booking07', 'userid_client1', 'userid_lawyer2', 'booking 7', 'REQUESTED', '2021-04-03', '10:00:00', '11:00:15', 'booking 7 content', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('da9d0efe-91ff-11eb-a7ac-00163eae0811', '48735173-915d-11eb-a7ac-00163eae0811', '8e40468b-915e-11eb-a7ac-00163eae0811', 'New Booking', 'INIT', '0000-00-00', '', '', 'Testing Booking', '2021-03-31 09:02:43', '2021-03-31 09:02:43'),
('d3bd6cd5-9204-11eb-a7ac-00163eae0811', '48735173-915d-11eb-a7ac-00163eae0811', '8e40468b-915e-11eb-a7ac-00163eae0811', 'Khách hàng: Lê Tấn Long - SĐT: 0385553645 - Email: client_a1@example.com', 'INIT', '0000-00-00', '', '', 'Thanh toán chuyển khoản', '2021-03-31 09:38:19', '2021-03-31 09:38:19'),
('960ff11d-9205-11eb-a7ac-00163eae0811', '48735173-915d-11eb-a7ac-00163eae0811', '89c10793-9160-11eb-a7ac-00163eae0811', 'Khách hàng: Lê Tấn Long - SĐT: 0385553645 - Email: client_a1@example.com', 'INIT', '0000-00-00', '', '', 'Thanh toán chuyển khoản', '2021-03-31 09:43:45', '2021-03-31 09:43:45'),
('0c8b2b8b-9206-11eb-a7ac-00163eae0811', '48735173-915d-11eb-a7ac-00163eae0811', '89c10793-9160-11eb-a7ac-00163eae0811', 'Khách hàng: Lê Tấn Long - SĐT: 0385553645 - Email: client_a1@example.com', 'INIT', '2021-04-03', '11:00 AM', '', 'Thanh toán chuyển khoản', '2021-03-31 09:47:04', '2021-03-31 09:47:04'),
('79d389fa-9206-11eb-a7ac-00163eae0811', '48735173-915d-11eb-a7ac-00163eae0811', 'lawyer', 'Khách hàng: Lê Tấn Long - SĐT: 0385553645 - Email: client_a1@example.com', 'INIT', '2021-04-07', '11:00 Am', '', 'Thanh toán chuyển khoản', '2021-03-31 09:50:07', '2021-03-31 09:50:07'),
('9897fcb8-9209-11eb-a7ac-00163eae0811', '48735173-915d-11eb-a7ac-00163eae0811', '8e40468b-915e-11eb-a7ac-00163eae0811', 'Khách hàng: Lê Tấn Long - SĐT: 0385553645 - Email: client_a1@example.com', 'INIT', '2021-04-08', '11:00 AM', '', 'Thanh toán chuyển khoản', '2021-03-31 10:12:27', '2021-03-31 10:12:27'),
('57de7fc1-920a-11eb-a7ac-00163eae0811', '48735173-915d-11eb-a7ac-00163eae0811', '8e40468b-915e-11eb-a7ac-00163eae0811', 'Khách hàng: Lê Tấn Long - SĐT: 0385553645 - Email: client_a1@example.com', '2', '2021-04-08', '11:00 AM', '', 'Thanh toán chuyển khoản', '2021-03-31 10:17:48', '2021-03-31 10:17:48'),
('073a6fd5-920b-11eb-a7ac-00163eae0811', '48735173-915d-11eb-a7ac-00163eae0811', '8e40468b-915e-11eb-a7ac-00163eae0811', 'Khách hàng: Lê Tấn Long - SĐT: 0385553645 - Email: client_a1@example.com', '2', '2021-04-08', '11:00 AM', '', 'Thanh toán chuyển khoản', '2021-03-31 10:22:42', '2021-03-31 10:22:42'),
('89f0d05b-920c-11eb-a7ac-00163eae0811', '48735173-915d-11eb-a7ac-00163eae0811', '89c10793-9160-11eb-a7ac-00163eae0811', 'Khách hàng: Lê Long - SĐT: 0385553645 - Email: client_a1@example.com', '2', '2021-04-10', '12:00 AM', '', 'Thanh toán chuyển khoản', '2021-03-31 10:33:31', '2021-03-31 10:33:31'),
('22f2e5e1-9226-11eb-a7ac-00163eae0811', '48735173-915d-11eb-a7ac-00163eae0811', '8e40468b-915e-11eb-a7ac-00163eae0811', 'Khách hàng: Lê Tấn Long - SĐT: 0385553645 - Email: client_a1@example.com', '2', '2021-04-08', '10:00 AM', '', 'Thanh toán chuyển khoản', '2021-03-31 13:36:45', '2021-03-31 13:36:45'),
('518ad939-9227-11eb-a7ac-00163eae0811', '48735173-915d-11eb-a7ac-00163eae0811', '8e40468b-915e-11eb-a7ac-00163eae0811', 'Khách hàng: Lê Tấn Long - SĐT: 0385553645 - Email: client_a1@example.com', '2', '2021-04-09', '9:00 AM', '', 'Thanh toán chuyển khoản', '2021-03-31 13:45:13', '2021-03-31 13:45:13');

--
-- Triggers `Booking`
--
DELIMITER $$
CREATE TRIGGER `INSERT_Booking_ID` BEFORE INSERT ON `Booking` FOR EACH ROW BEGIN
	IF NEW.BookingID IS NULL THEN
		SET NEW.BookingID = UUID();
	END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Cases`
--

CREATE TABLE `Cases` (
  `CaseID` varchar(36) CHARACTER SET latin1 NOT NULL,
  `ClientID` varchar(36) CHARACTER SET latin1 NOT NULL,
  `LawyerID` varchar(36) CHARACTER SET latin1 NOT NULL,
  `Title` varchar(150) CHARACTER SET latin1 NOT NULL,
  `State` varchar(150) CHARACTER SET latin1 NOT NULL DEFAULT 'INIT',
  `Content` text CHARACTER SET utf8 NOT NULL,
  `CreatedDateTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedDateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Cases`
--

INSERT INTO `Cases` (`CaseID`, `ClientID`, `LawyerID`, `Title`, `State`, `Content`, `CreatedDateTime`, `UpdatedDateTime`) VALUES
('case01', 'userid_client1', 'userid_lawyer1', 'Case 1', 'INIT', 'Content of case 1', '2021-01-02 00:52:07', '2021-01-02 00:52:07'),
('case02', 'userid_client2', 'userid_lawyer2', 'Case 2', 'INIT', 'Content of case 2', '2021-01-02 00:52:07', '2021-01-02 00:52:07'),
('case03', 'userid_client3', 'userid_lawyer3', 'Case 3', 'INIT', 'Content of case 3', '2021-01-02 00:52:07', '2021-01-02 00:52:07'),
('case04', 'userid_client4', 'userid_lawyer4', 'Case 4', 'INIT', 'Content of case 4', '2021-01-02 00:52:07', '2021-01-02 00:52:07'),
('case05', 'userid_client4', 'userid_lawyer4', 'Case 5', 'INIT', 'Content of case 5', '2021-01-02 00:52:07', '2021-01-02 00:52:07'),
('case06', 'userid_client4', 'userid_lawyer4', 'Case 6', 'INIT', 'Content of case 6', '2021-01-02 00:52:07', '2021-01-02 00:52:07');

-- --------------------------------------------------------

--
-- Table structure for table `City`
--

CREATE TABLE `City` (
  `CityCode` int(11) NOT NULL,
  `Name` varchar(100) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `City`
--

INSERT INTO `City` (`CityCode`, `Name`) VALUES
(1, 'Hà Nội'),
(2, 'Hồ Chí Minh'),
(3, 'Thanh Hóa'),
(4, 'Hải Phòng'),
(5, 'Nam Định');

-- --------------------------------------------------------

--
-- Table structure for table `Client`
--

CREATE TABLE `Client` (
  `ClientID` varchar(36) NOT NULL,
  `FirstName` varchar(30) DEFAULT NULL,
  `LastName` varchar(30) DEFAULT NULL,
  `BirthDate` date DEFAULT NULL,
  `Avatar` varchar(100) DEFAULT NULL,
  `Gender` int(11) DEFAULT NULL,
  `FacebookProfile` varchar(30) DEFAULT NULL,
  `PhoneNumber` varchar(30) DEFAULT NULL,
  `Street` varchar(50) DEFAULT NULL,
  `District` varchar(20) DEFAULT NULL,
  `Province` varchar(20) DEFAULT NULL,
  `Zipcode` varchar(7) DEFAULT NULL,
  `CreatedDateTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedDateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Client`
--

INSERT INTO `Client` (`ClientID`, `FirstName`, `LastName`, `BirthDate`, `Avatar`, `Gender`, `FacebookProfile`, `PhoneNumber`, `Street`, `District`, `Province`, `Zipcode`, `CreatedDateTime`, `UpdatedDateTime`) VALUES
('client', 'Khách hàng', 'Long', NULL, '/client/uploads/avatar/default.png', NULL, NULL, '0123456789', NULL, NULL, NULL, NULL, '2021-01-06 22:18:50', '2021-03-31 16:09:01'),
('48735173-915d-11eb-a7ac-00163eae0811', 'Khách hàng', 'A2', NULL, '/client/uploads/avatar/48735173-915d-11eb-a7ac-00163eae0811.png', NULL, NULL, '0123456789', NULL, NULL, NULL, NULL, '2021-03-30 13:38:59', '2021-04-02 15:14:19');

-- --------------------------------------------------------

--
-- Table structure for table `Comments`
--

CREATE TABLE `Comments` (
  `CommentID` varchar(36) NOT NULL,
  `PostID` varchar(36) NOT NULL,
  `UserID` varchar(36) NOT NULL,
  `Content` text NOT NULL,
  `PublishedDateTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedDateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `CreditCardPayment`
--

CREATE TABLE `CreditCardPayment` (
  `CreditCardPaymentID` varchar(36) NOT NULL,
  `CreatedDateTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedDateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Domain`
--

CREATE TABLE `Domain` (
  `DomainID` int(11) NOT NULL,
  `Name` varchar(100) CHARACTER SET utf8 NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Domain`
--

INSERT INTO `Domain` (`DomainID`, `Name`) VALUES
(1, 'Dân Sự'),
(2, 'Hình Sự'),
(3, 'Kinh Tế'),
(4, 'Nhà Đất');

-- --------------------------------------------------------

--
-- Table structure for table `Experience`
--

CREATE TABLE `Experience` (
  `ExperienceID` varchar(36) NOT NULL,
  `PostName` varchar(50) NOT NULL,
  `ContractType` varchar(30) DEFAULT NULL,
  `Company` varchar(100) NOT NULL,
  `CompanyAddress` varchar(200) DEFAULT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date DEFAULT NULL,
  `IsCurrentPost` tinyint(1) DEFAULT NULL,
  `Description` varchar(100) DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Experience`
--

INSERT INTO `Experience` (`ExperienceID`, `PostName`, `ContractType`, `Company`, `CompanyAddress`, `StartDate`, `EndDate`, `IsCurrentPost`, `Description`) VALUES
('exp01', 'Post name 1', 'Contract Type 1', 'Company 1', 'Company address 1', '2019-02-28', '2010-01-09', 1, 'Description 1'),
('exp02', 'Post name 2', 'Contract Type 2', 'Company 2', 'Company address 2', '2020-01-10', NULL, 1, 'Description 2'),
('exp03', 'Post name 3', 'Contract Type 3', 'Company 3', 'Company address 3', '2020-01-10', NULL, 1, 'Description 3'),
('exp04', 'Post name 4', 'Contract Type 4', 'Company 4', 'Company address 4', '2020-01-10', NULL, 1, 'Description 4'),
('exp05', 'Post name 5', 'Contract Type 5', 'Company 5', 'Company address 5', '2020-01-10', NULL, 1, 'Description 5'),
('exp06', 'Post name 6', 'Contract Type 6', 'Company 6', 'Company address 6', '2020-01-10', NULL, 1, 'Description 6'),
('exp07', 'Post name 7', 'Contract Type 7', 'Company 7', 'Company address 7', '2020-01-10', NULL, 1, 'Description 7');

--
-- Triggers `Experience`
--
DELIMITER $$
CREATE TRIGGER `INSERT_Experience_ID` BEFORE INSERT ON `Experience` FOR EACH ROW BEGIN
	IF NEW.ExperienceID IS NULL THEN
		SET NEW.ExperienceID = UUID();
	END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Formation`
--

CREATE TABLE `Formation` (
  `FormationID` varchar(36) NOT NULL,
  `Institution` varchar(50) NOT NULL,
  `DegreeType` varchar(50) NOT NULL,
  `Major` varchar(50) NOT NULL,
  `StartYear` int(11) DEFAULT NULL,
  `EndYear` int(11) DEFAULT NULL,
  `Degree` varchar(50) DEFAULT NULL,
  `Description` varchar(100) DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Formation`
--

INSERT INTO `Formation` (`FormationID`, `Institution`, `DegreeType`, `Major`, `StartYear`, `EndYear`, `Degree`, `Description`) VALUES
('formation01', 'Instutition 1', 'DegreeType 1', 'Major 1', 2011, 2014, 'Degree', ''),
('formation02', 'Instutition 2', 'DegreeType 2', 'Major 2', 2012, 2015, 'Degree', ''),
('formation03', 'Instutition 3', 'DegreeType 3', 'Major 3', 2013, 2016, 'Degree', ''),
('formation04', 'Instutition 4', 'DegreeType 4', 'Major 4', 2014, 2017, 'Degree', ''),
('formation05', 'Instutition 5', 'DegreeType 5', 'Major 5', 2015, 2018, 'Degree', ''),
('formation06', 'Instutition 6', 'DegreeType 6', 'Major 6', 2016, 2019, 'Degree', '');

--
-- Triggers `Formation`
--
DELIMITER $$
CREATE TRIGGER `INSERT_Formation_ID` BEFORE INSERT ON `Formation` FOR EACH ROW BEGIN
	IF NEW.FormationID IS NULL THEN
		SET NEW.FormationID = UUID();
	END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `FullAdmin`
-- (See below for the actual view)
--
CREATE TABLE `FullAdmin` (
`UserID` varchar(36)
,`UserName` varchar(40)
,`PasswordHash` varchar(100)
,`Email` varchar(100)
,`LastLoginDateTime` timestamp
,`Role` enum('admin','lawyer','client')
,`FirstName` varchar(30)
,`LastName` varchar(30)
,`CreatedDateTime` timestamp
,`UpdatedDateTime` timestamp
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `FullClient`
-- (See below for the actual view)
--
CREATE TABLE `FullClient` (
`UserID` varchar(36)
,`UserName` varchar(40)
,`PasswordHash` varchar(100)
,`Email` varchar(100)
,`LastLoginDateTime` timestamp
,`Role` enum('admin','lawyer','client')
,`FirstName` varchar(30)
,`LastName` varchar(30)
,`BirthDate` date
,`Gender` int(11)
,`FacebookProfile` varchar(30)
,`PhoneNumber` varchar(30)
,`CreatedDateTime` timestamp
,`UpdatedDateTime` timestamp
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `FullLawyer`
-- (See below for the actual view)
--
CREATE TABLE `FullLawyer` (
`LawyerID` varchar(36)
,`UserName` varchar(40)
,`PasswordHash` varchar(100)
,`Email` varchar(100)
,`LastLoginDateTime` timestamp
,`Role` enum('admin','lawyer','client')
,`FirstName` varchar(36)
,`LastName` varchar(36)
,`PhoneNumber` varchar(30)
,`Avatar` varchar(150)
,`Rating` int(11)
,`Gender` int(11)
,`Desciption` varchar(500)
,`Specialize` int(11)
,`DoB` date
,`Fee` varchar(50)
,`CreatedDateTime` timestamp
,`UpdatedDateTime` timestamp
,`Street` varchar(150)
,`District` varchar(20)
,`Province` varchar(100)
,`Zipcode` int(11)
,`WorkingDaysInWeek` varchar(7)
,`StartTime` varchar(8)
,`EndTime` varchar(8)
);

-- --------------------------------------------------------

--
-- Table structure for table `Invoice`
--

CREATE TABLE `Invoice` (
  `InvoiceID` varchar(36) NOT NULL,
  `PaymentMethod` int(11) NOT NULL,
  `BillingAddressID` varchar(500) NOT NULL,
  `BookingID` varchar(36) NOT NULL,
  `CreatedDateTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedDateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Invoice`
--

INSERT INTO `Invoice` (`InvoiceID`, `PaymentMethod`, `BillingAddressID`, `BookingID`, `CreatedDateTime`, `UpdatedDateTime`) VALUES
('invoice01', 0, 'ad01', 'booking01', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('invoice02', 0, 'ad02', 'booking02', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('invoice03', 0, 'ad03', 'booking03', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('invoice04', 1, 'ad04', 'booking04', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('invoice05', 1, 'ad05', 'booking05', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('invoice06', 1, 'ad06', 'booking06', '2021-03-28 08:46:34', '2021-03-28 08:46:34');

-- --------------------------------------------------------

--
-- Table structure for table `Lawyer`
--

CREATE TABLE `Lawyer` (
  `LawyerID` varchar(36) NOT NULL,
  `FirstName` varchar(36) DEFAULT NULL,
  `LastName` varchar(36) DEFAULT NULL,
  `PhoneNumber` varchar(30) DEFAULT NULL,
  `Avatar` varchar(150) DEFAULT NULL,
  `Rating` int(11) DEFAULT NULL,
  `DoB` date DEFAULT NULL,
  `Gender` int(11) DEFAULT NULL,
  `Fee` varchar(50) DEFAULT NULL,
  `Desciption` varchar(500) DEFAULT NULL,
  `AddressID` varchar(36) DEFAULT NULL,
  `Specialize` int(11) DEFAULT 0,
  `ScheduleConfigID` varchar(36) DEFAULT NULL,
  `CreatedDateTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedDateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Lawyer`
--

INSERT INTO `Lawyer` (`LawyerID`, `FirstName`, `LastName`, `PhoneNumber`, `Avatar`, `Rating`, `DoB`, `Gender`, `Fee`, `Desciption`, `AddressID`, `Specialize`, `ScheduleConfigID`, `CreatedDateTime`, `UpdatedDateTime`) VALUES
('lawyer', 'Luật sư', 'A1', '0123856987', '/client/uploads/avatar/default.png', 8, NULL, NULL, '100,000', NULL, 'ad01', 0, NULL, '2021-01-06 22:18:50', '2021-03-31 16:13:06'),
('8e40468b-915e-11eb-a7ac-00163eae0811', 'Luật sư', 'A1', '0123456777', '/client/assets/img/team/team-3.jpg', 9, NULL, NULL, NULL, NULL, NULL, 0, NULL, '2021-03-30 13:48:06', '2021-03-31 16:15:44'),
('89c10793-9160-11eb-a7ac-00163eae0811', 'Luật sư', 'A2', '0123456999', '/client/uploads/avatar/89c10793-9160-11eb-a7ac-00163eae0811.jpeg', 7, NULL, NULL, NULL, NULL, NULL, 0, NULL, '2021-03-30 14:02:17', '2021-03-31 16:15:50');

-- --------------------------------------------------------

--
-- Table structure for table `LawyerDomain`
--

CREATE TABLE `LawyerDomain` (
  `LawyerID` varchar(36) NOT NULL,
  `DomainID` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `LawyerDomain`
--

INSERT INTO `LawyerDomain` (`LawyerID`, `DomainID`) VALUES
('userid_lawyer1', 1),
('userid_lawyer1', 2),
('userid_lawyer2', 2),
('userid_lawyer3', 3),
('userid_lawyer4', 1),
('userid_lawyer4', 2),
('userid_lawyer4', 3),
('userid_lawyer5', 2);

-- --------------------------------------------------------

--
-- Table structure for table `LawyerExperience`
--

CREATE TABLE `LawyerExperience` (
  `LawyerID` varchar(36) NOT NULL,
  `ExperienceID` varchar(36) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `LawyerExperience`
--

INSERT INTO `LawyerExperience` (`LawyerID`, `ExperienceID`) VALUES
('userid_lawyer1', 'exp01'),
('userid_lawyer1', 'exp02'),
('userid_lawyer1', 'exp03'),
('userid_lawyer2', 'exp04'),
('userid_lawyer2', 'exp05'),
('userid_lawyer3', 'exp01'),
('userid_lawyer4', 'exp01'),
('userid_lawyer5', 'exp01'),
('userid_lawyer5', 'exp06');

-- --------------------------------------------------------

--
-- Table structure for table `LawyerFormation`
--

CREATE TABLE `LawyerFormation` (
  `LawyerID` varchar(36) NOT NULL,
  `FormationID` varchar(36) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `LawyerFormation`
--

INSERT INTO `LawyerFormation` (`LawyerID`, `FormationID`) VALUES
('userid_lawyer1', 'formation01'),
('userid_lawyer1', 'formation02'),
('userid_lawyer1', 'formation03'),
('userid_lawyer2', 'formation04'),
('userid_lawyer2', 'formation05'),
('userid_lawyer3', 'formation01'),
('userid_lawyer4', 'formation01'),
('userid_lawyer5', 'formation01'),
('userid_lawyer5', 'formation06');

-- --------------------------------------------------------

--
-- Table structure for table `LawyerLocation`
--

CREATE TABLE `LawyerLocation` (
  `LawyerID` varchar(36) NOT NULL,
  `LocationID` varchar(36) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `LawyerLocation`
--

INSERT INTO `LawyerLocation` (`LawyerID`, `LocationID`) VALUES
('userid_lawyer1', 'location_id_1_1'),
('userid_lawyer1', 'location_id_1_2'),
('userid_lawyer2', 'location_id_2'),
('userid_lawyer3', 'location_id_3'),
('userid_lawyer4', 'location_id_4'),
('userid_lawyer5', 'location_id_5');

-- --------------------------------------------------------

--
-- Table structure for table `Location`
--

CREATE TABLE `Location` (
  `LocationID` varchar(36) NOT NULL,
  `ProvinceCode` int(11) NOT NULL,
  `Address` varchar(400) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Location`
--

INSERT INTO `Location` (`LocationID`, `ProvinceCode`, `Address`) VALUES
('location_id_1_1', 1, 'address 1'),
('location_id_1_2', 1, 'address 1'),
('location_id_2', 2, 'address 2'),
('location_id_3', 3, 'address 3'),
('location_id_4', 4, 'address 4'),
('location_id_5', 5, 'address 5');

-- --------------------------------------------------------

--
-- Table structure for table `Payment`
--

CREATE TABLE `Payment` (
  `PaymentID` varchar(36) NOT NULL,
  `Amount` float NOT NULL,
  `State` varchar(50) NOT NULL,
  `InvoiceID` varchar(36) NOT NULL,
  `CreatedDateTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedDateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Payment`
--

INSERT INTO `Payment` (`PaymentID`, `Amount`, `State`, `InvoiceID`, `CreatedDateTime`, `UpdatedDateTime`) VALUES
('payment01', 100, 'INIT', 'invoice01', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('payment02', 200, 'INIT', 'invoice02', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('payment03', 300, 'INIT', 'invoice03', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('payment04', 400, 'INIT', 'invoice04', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('payment05', 500, 'INIT', 'invoice05', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('payment06', 600, 'INIT', 'invoice06', '2021-03-28 08:46:34', '2021-03-28 08:46:34');

--
-- Triggers `Payment`
--
DELIMITER $$
CREATE TRIGGER `INSERT_Payment_ID` BEFORE INSERT ON `Payment` FOR EACH ROW BEGIN
	IF NEW.PaymentID IS NULL THEN
		SET NEW.PaymentID = UUID();
	END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Post`
--

CREATE TABLE `Post` (
  `PostID` varchar(36) NOT NULL,
  `Title` varchar(150) NOT NULL,
  `ImageUrl` varchar(150) DEFAULT NULL,
  `Content` text CHARACTER SET utf8 NOT NULL,
  `PublishedDateTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedDateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `AdminID` varchar(36) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Post`
--

INSERT INTO `Post` (`PostID`, `Title`, `ImageUrl`, `Content`, `PublishedDateTime`, `UpdatedDateTime`, `AdminID`) VALUES
('Po0001', 'test_post', NULL, 'Content of post 1', '2021-01-02 00:52:07', '2021-04-02 15:37:16', '1'),
('Po0002', 'Post 2', NULL, 'Content of post 2', '2021-01-02 00:52:07', '2021-01-02 00:52:07', 'userid_admin2'),
('Po0003', 'Post 3', NULL, 'Content of post 3', '2021-01-02 00:52:07', '2021-01-02 00:52:07', 'userid_admin3'),
('Po0004', 'Post 4', NULL, 'Content of post 4', '2021-01-02 00:52:07', '2021-01-02 00:52:07', 'userid_admin4'),
('Po0005', 'Post 5', NULL, 'Content of post 5', '2021-01-02 00:52:07', '2021-01-02 00:52:07', 'userid_admin5');

--
-- Triggers `Post`
--
DELIMITER $$
CREATE TRIGGER `INSERT_POST_ID` BEFORE INSERT ON `Post` FOR EACH ROW BEGIN
	IF NEW.PostID IS NULL THEN
		SET NEW.PostID = UUID();
	END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `PostTag`
--

CREATE TABLE `PostTag` (
  `PostID` varchar(36) NOT NULL,
  `TagID` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `PostTag`
--

INSERT INTO `PostTag` (`PostID`, `TagID`) VALUES
('Po0001', 1),
('Po0002', 3),
('Po0003', 1),
('Po0003', 2),
('Po0004', 2),
('Po0005', 1),
('Po0005', 3);

-- --------------------------------------------------------

--
-- Table structure for table `Province`
--

CREATE TABLE `Province` (
  `ProvinceCode` int(11) NOT NULL,
  `Name` varchar(100) CHARACTER SET utf8 NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Province`
--

INSERT INTO `Province` (`ProvinceCode`, `Name`) VALUES
(1, 'Hà Nội'),
(2, 'Hồ Chí Minh'),
(3, 'Thanh Hóa'),
(4, 'Hải Phòng'),
(5, 'Nam Định');

-- --------------------------------------------------------

--
-- Table structure for table `ScheduleConfig`
--

CREATE TABLE `ScheduleConfig` (
  `ScheduleConfigID` varchar(36) NOT NULL,
  `WorkingDaysInWeek` varchar(7) NOT NULL,
  `StartTime` varchar(8) NOT NULL,
  `EndTime` varchar(8) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ScheduleConfig`
--

INSERT INTO `ScheduleConfig` (`ScheduleConfigID`, `WorkingDaysInWeek`, `StartTime`, `EndTime`) VALUES
('sc01', '234567', '09:00:00', '18:00:00'),
('sc02', '23456', '08:00:00', '18:00:00'),
('sc03', '2345678', '10:00:00', '18:00:00'),
('sc04', '234567', '09:00:00', '17:00:00'),
('sc05', '34567', '09:00:00', '19:00:00'),
('sc06', '345678', '09:00:00', '20:00:00');

--
-- Triggers `ScheduleConfig`
--
DELIMITER $$
CREATE TRIGGER `INSERT_ScheduleConfig_ID` BEFORE INSERT ON `ScheduleConfig` FOR EACH ROW BEGIN
	IF NEW.ScheduleConfigID IS NULL THEN
		SET NEW.ScheduleConfigID = UUID();
	END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Tag`
--

CREATE TABLE `Tag` (
  `TagID` int(11) NOT NULL,
  `Name` varchar(100) CHARACTER SET utf8 NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Tag`
--

INSERT INTO `Tag` (`TagID`, `Name`) VALUES
(1, 'Ly dị'),
(2, 'Đất đai'),
(3, 'Thừa kế');

-- --------------------------------------------------------

--
-- Table structure for table `Token`
--

CREATE TABLE `Token` (
  `RefreshToken` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Token`
--

INSERT INTO `Token` (`RefreshToken`) VALUES
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxMjAwOTl9.9f7zld7Es6nwGky-liIo7dwpPRQvm0P6xv3R3qbwdhA'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxMjAyNTJ9.7m0hwM1BHrtEyb98u3dqUg9w1TbuI8cHADlXDU_s-xw'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxMjEyODR9.RvqhUTDWQaxDJmqYPKGse83kg9_s40Kj3Mxx_k1anq0'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxMjI4NjJ9.uEDVIp7NKEwFWAyLeOWI3BnZl_MeJ0rhiOC8rGFigEE'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxMjIyMzB9.X6Aj2sC01-f-JzZuSzRXSjDkrp2JdjLGqPuf44_brS0'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxMjM0OTd9.MVUwcwGTuACDP-f82nuhuGhHewxtz8pp2hvbWxMGfEo'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxMjQ4Mzh9.qOp4Jv6TJNSwBYocAvH42E59FCOWTL0zE272jHkCHqM'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxMjQyMjl9.GPvgZ2XVFuWXep45JMBHPmbkoD5t6AxzI7FDBvCgtD8'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxMjU1Mjh9.JQJzPwvn7iupCj2te6GuIgGCW4-NBSWr_3dLhsWz660'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxMjY4NTR9.vq5_lOkLm-gkQ0kdGDbxuNtBOuqxOy3TSOcu-BSRyh4'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxMjYyMjd9.OQv8ziU90168CL9o-g6nRTqYZ5ucfeWnUARzqGwUOXs'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxMTg5MTR9.BF6aDwZNdGyRPSMR9bfaXV8kPthNsMyLFePZc5u2AyM'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxMTgxNzd9.Y1o2KBp9_lzhgKbwAluaQgOXlFz5yYAT9erzQMwNCbw'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxMTk1MjN9.1mDmR8Q78gTny5W9fW66v6PiwaZ29AJOzB4mmVPmOdI'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxNTczMTd9.vr7xdm6hAVzRHGMxBJYXPRkCS6jphtmG-AlU90Bv4C0'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxODc1MDB9.8o4biyT3W1uYfFqUT0RVIq8vu3XJzvVuBoL3OovnT-g'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxODEyNjV9.hQSfUp1OLit2Erdz7o1R-c4LTcZdgGASh0uPUcNhVu4'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxODI4MTl9.1geC5F9tJloVko74tJhJORi9nUJZbFxWXmN2wW4-5fg'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxODM0ODl9.HjWUpKDrisbfuXSq9UNyd-9SA11OmsI2gqyifoosgQk'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxODQxODB9.1lViMj0SduqSDfBzD40e2bYk3h59j_DzQTlgLXGAWtU'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxODU1MjF9.N3Hp8uu-dyOTexcB7iIjHSwX1ffY7z7-4gXzBgrUPiw'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxODYxMzV9.3LFcZZnJFnEy6acTKiJU1vxuwtnC5tc82CkJ4eYQDoM'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxOTI4Mzl9.6OGyd6xlMx_7JgOTqJhLNKOOrJLxgv3kNWMXGJ1EzEc'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxOTI5NDN9.VYIzoFWQHtUWW8I4RzLb5VEwkQEIOKd8n983K93-t10'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxOTMwOTV9.ADpQomS4x8-hAuKPPXymTq_AKl_BoFMwTbaJpDzskuo'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxOTMzMTh9.nYzs7nFxucVcy9FvjVSUOT09wN9SWopBTpfy7uhatws'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcyMDkxNjF9.VXjENU-6NzSzE3OY9yDEJFwsudizQfLOLSlgN7agEPA'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcyNjY0Njd9.pNzRgOOh466P1ddOuvZ2bzScORAp8mozTm7bCIInNg4'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0ODczNTE3My05MTVkLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTczNzYzMzV9.O3uYTo4ftROnNkHbzHndF2Tv-71c7F9diZvuBA4wyM4'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI4OWMxMDc5My05MTYwLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxMTI5Mzh9.avYtfGQcPJrU3ABe4NgSlCYMR5BNiBgxGpZ2WbWN-8Y'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI4ZTQwNDY4Yi05MTVlLTExZWItYTdhYy0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcxMTIwODZ9.5bE0dhVPP9dZzFSrOhuA45oiOHFlPVjK5GZ9usZ58qg'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI5MDliYTNiMC05MGE2LTExZWItOWYzMi0wMDE2M2VhZTA4MTEiLCJpYXQiOjE2MTcwMzMwNjF9.OyP8FR3NJHYV0ZGWZ8i-i1Wkm-HRaIRCs0_iyg9m2Lc'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiJhZG1pbiIsImlhdCI6MTYxNzE4ODI2MX0.l_WzZRdnENA5VXUx9f82BoiBa9kBBztzBl8H2Qx4sAA'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiJhZG1pbiIsImlhdCI6MTYxNzE5Mjk1NH0.jmd5wluBMH7t_XQrbrB-EV-mmwJQhWW-uKMhKfZDQ8M'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiJhZG1pbiIsImlhdCI6MTYxNzE5NTQ3NH0.3RJ8bgsnPbff-tCiF-SD2SELraA39D_cNeqdgzaDMnk'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiJhZG1pbiIsImlhdCI6MTYxNzIwNzgyOH0.NvBG4wWtnszQKSvuKcHmZH4EWx9MO1JaF-SF59_NYzc');

-- --------------------------------------------------------

--
-- Table structure for table `Transaction`
--

CREATE TABLE `Transaction` (
  `TransactionID` int(11) NOT NULL,
  `LawyerID` varchar(50) DEFAULT NULL,
  `ClientID` varchar(50) DEFAULT NULL,
  `Payment` int(11) DEFAULT NULL,
  `BankName` varchar(50) DEFAULT NULL,
  `BankAccount` varchar(50) DEFAULT NULL,
  `BankInfo` varchar(50) DEFAULT NULL,
  `Status` int(11) DEFAULT NULL,
  `CreatedDateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `UpdatedDateTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `TransferPayment`
--

CREATE TABLE `TransferPayment` (
  `TransferPaymentID` varchar(36) NOT NULL,
  `AdminID` varchar(36) DEFAULT NULL,
  `CreatedDateTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedDateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `UserID` varchar(36) NOT NULL,
  `UserName` varchar(40) NOT NULL,
  `PasswordHash` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `LastLoginDateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Role` enum('admin','lawyer','client') NOT NULL DEFAULT 'client',
  `CreatedDateTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedDateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`UserID`, `UserName`, `PasswordHash`, `Email`, `LastLoginDateTime`, `Role`, `CreatedDateTime`, `UpdatedDateTime`) VALUES
('admin', 'admin', 'admin', 'admin@gmail.com', '2021-03-28 08:46:34', 'admin', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('userid_admin1', 'A0001', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'admin1@gmail.com', '2021-03-28 08:46:34', 'admin', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('userid_admin2', 'A0002', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'admin2@gmail.com', '2021-03-28 08:46:34', 'admin', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('userid_admin3', 'A0003', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'admin3@gmail.com', '2021-03-28 08:46:34', 'admin', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('userid_admin4', 'A0004', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'admin4@gmail.com', '2021-03-28 08:46:34', 'admin', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('userid_admin5', 'A0005', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'admin5@gmail.com', '2021-03-28 08:46:34', 'admin', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('userid_admin6', 'A0006', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'admin6@gmail.com', '2021-03-28 08:46:34', 'admin', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('userid_admin7', 'A0007', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'admin7@gmail.com', '2021-03-28 08:46:34', 'admin', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('client', 'client', 'client', 'client@gamil.com', '2021-03-28 08:46:34', 'client', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('lawyer', 'lawyer', 'laywer', 'lawyer@gmail.com', '2021-03-28 08:46:34', 'lawyer', '2021-03-28 08:46:34', '2021-03-28 08:46:34'),
('89c10793-9160-11eb-a7ac-00163eae0811', 'luatsu_a2', '1234567', 'luatsu_a2@example.com', '2021-03-30 14:02:17', 'lawyer', '2021-03-30 14:02:17', '2021-03-30 14:02:17'),
('48735173-915d-11eb-a7ac-00163eae0811', 'client_a1', '1234567', 'client_a1@example.com', '2021-03-30 13:38:59', 'client', '2021-03-30 13:38:59', '2021-03-30 13:38:59'),
('8e40468b-915e-11eb-a7ac-00163eae0811', 'luatsu_a1', '1234567', 'luatsu_a1@example.com', '2021-03-30 13:48:06', 'lawyer', '2021-03-30 13:48:06', '2021-03-30 13:48:06');

--
-- Triggers `User`
--
DELIMITER $$
CREATE TRIGGER `INSERT_USER_ID` BEFORE INSERT ON `User` FOR EACH ROW BEGIN
	IF NEW.UserID IS NULL THEN
		SET NEW.UserID = UUID();
	END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure for view `FullAdmin`
--
DROP TABLE IF EXISTS `FullAdmin`;

CREATE ALGORITHM=UNDEFINED DEFINER=`veneris`@`localhost` SQL SECURITY DEFINER VIEW `FullAdmin`  AS  select `U`.`UserID` AS `UserID`,`U`.`UserName` AS `UserName`,`U`.`PasswordHash` AS `PasswordHash`,`U`.`Email` AS `Email`,`U`.`LastLoginDateTime` AS `LastLoginDateTime`,`U`.`Role` AS `Role`,`A`.`FirstName` AS `FirstName`,`A`.`LastName` AS `LastName`,`A`.`CreatedDateTime` AS `CreatedDateTime`,`A`.`UpdatedDateTime` AS `UpdatedDateTime` from (`User` `U` join `Admin` `A` on(`U`.`UserID` = `A`.`AdminID`)) ;

-- --------------------------------------------------------

--
-- Structure for view `FullClient`
--
DROP TABLE IF EXISTS `FullClient`;

CREATE ALGORITHM=UNDEFINED DEFINER=`veneris`@`localhost` SQL SECURITY DEFINER VIEW `FullClient`  AS  select `U`.`UserID` AS `UserID`,`U`.`UserName` AS `UserName`,`U`.`PasswordHash` AS `PasswordHash`,`U`.`Email` AS `Email`,`U`.`LastLoginDateTime` AS `LastLoginDateTime`,`U`.`Role` AS `Role`,`C`.`FirstName` AS `FirstName`,`C`.`LastName` AS `LastName`,`C`.`BirthDate` AS `BirthDate`,`C`.`Gender` AS `Gender`,`C`.`FacebookProfile` AS `FacebookProfile`,`C`.`PhoneNumber` AS `PhoneNumber`,`C`.`CreatedDateTime` AS `CreatedDateTime`,`C`.`UpdatedDateTime` AS `UpdatedDateTime` from (`User` `U` join `Client` `C` on(`U`.`UserID` = `C`.`ClientID`)) ;

-- --------------------------------------------------------

--
-- Structure for view `FullLawyer`
--
DROP TABLE IF EXISTS `FullLawyer`;

CREATE ALGORITHM=UNDEFINED DEFINER=`veneris`@`localhost` SQL SECURITY DEFINER VIEW `FullLawyer`  AS  select `L`.`LawyerID` AS `LawyerID`,`U`.`UserName` AS `UserName`,`U`.`PasswordHash` AS `PasswordHash`,`U`.`Email` AS `Email`,`U`.`LastLoginDateTime` AS `LastLoginDateTime`,`U`.`Role` AS `Role`,`L`.`FirstName` AS `FirstName`,`L`.`LastName` AS `LastName`,`L`.`PhoneNumber` AS `PhoneNumber`,`L`.`Avatar` AS `Avatar`,`L`.`Rating` AS `Rating`,`L`.`Gender` AS `Gender`,`L`.`Desciption` AS `Desciption`,`L`.`Specialize` AS `Specialize`,`L`.`DoB` AS `DoB`,`L`.`Fee` AS `Fee`,`L`.`CreatedDateTime` AS `CreatedDateTime`,`L`.`UpdatedDateTime` AS `UpdatedDateTime`,`A`.`Street` AS `Street`,`A`.`District` AS `District`,`A`.`Province` AS `Province`,`A`.`Zipcode` AS `Zipcode`,`CS`.`WorkingDaysInWeek` AS `WorkingDaysInWeek`,`CS`.`StartTime` AS `StartTime`,`CS`.`EndTime` AS `EndTime` from (((`Lawyer` `L` left join `User` `U` on(`U`.`UserID` = `L`.`LawyerID`)) left join `Address` `A` on(`L`.`AddressID` = `A`.`AddressID`)) left join `ScheduleConfig` `CS` on(`CS`.`ScheduleConfigID` = `L`.`ScheduleConfigID`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Address`
--
ALTER TABLE `Address`
  ADD PRIMARY KEY (`AddressID`);

--
-- Indexes for table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`AdminID`);

--
-- Indexes for table `BillingAddress`
--
ALTER TABLE `BillingAddress`
  ADD PRIMARY KEY (`BillingAddressID`);

--
-- Indexes for table `Booking`
--
ALTER TABLE `Booking`
  ADD PRIMARY KEY (`BookingID`),
  ADD KEY `ClientID` (`ClientID`),
  ADD KEY `LawyerID` (`LawyerID`);

--
-- Indexes for table `Cases`
--
ALTER TABLE `Cases`
  ADD PRIMARY KEY (`CaseID`),
  ADD KEY `ClientID` (`ClientID`),
  ADD KEY `LawyerID` (`LawyerID`);

--
-- Indexes for table `City`
--
ALTER TABLE `City`
  ADD PRIMARY KEY (`CityCode`);

--
-- Indexes for table `Client`
--
ALTER TABLE `Client`
  ADD PRIMARY KEY (`ClientID`);

--
-- Indexes for table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`CommentID`),
  ADD KEY `PostID` (`PostID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `CreditCardPayment`
--
ALTER TABLE `CreditCardPayment`
  ADD PRIMARY KEY (`CreditCardPaymentID`);

--
-- Indexes for table `Domain`
--
ALTER TABLE `Domain`
  ADD PRIMARY KEY (`DomainID`);

--
-- Indexes for table `Experience`
--
ALTER TABLE `Experience`
  ADD PRIMARY KEY (`ExperienceID`);

--
-- Indexes for table `Formation`
--
ALTER TABLE `Formation`
  ADD PRIMARY KEY (`FormationID`);

--
-- Indexes for table `Invoice`
--
ALTER TABLE `Invoice`
  ADD PRIMARY KEY (`InvoiceID`),
  ADD KEY `BookingID` (`BookingID`),
  ADD KEY `BillingAddressID` (`BillingAddressID`(250));

--
-- Indexes for table `Lawyer`
--
ALTER TABLE `Lawyer`
  ADD PRIMARY KEY (`LawyerID`),
  ADD KEY `AddressID` (`AddressID`),
  ADD KEY `ScheduleConfigID` (`ScheduleConfigID`);

--
-- Indexes for table `LawyerDomain`
--
ALTER TABLE `LawyerDomain`
  ADD PRIMARY KEY (`LawyerID`,`DomainID`),
  ADD KEY `DomainID` (`DomainID`);

--
-- Indexes for table `LawyerExperience`
--
ALTER TABLE `LawyerExperience`
  ADD PRIMARY KEY (`LawyerID`,`ExperienceID`),
  ADD KEY `ExperienceID` (`ExperienceID`);

--
-- Indexes for table `LawyerFormation`
--
ALTER TABLE `LawyerFormation`
  ADD PRIMARY KEY (`LawyerID`,`FormationID`),
  ADD KEY `FormationID` (`FormationID`);

--
-- Indexes for table `LawyerLocation`
--
ALTER TABLE `LawyerLocation`
  ADD PRIMARY KEY (`LawyerID`,`LocationID`),
  ADD KEY `LawyerLocationToLocation_FK` (`LocationID`);

--
-- Indexes for table `Location`
--
ALTER TABLE `Location`
  ADD PRIMARY KEY (`LocationID`),
  ADD KEY `Province_FK` (`ProvinceCode`);

--
-- Indexes for table `Payment`
--
ALTER TABLE `Payment`
  ADD PRIMARY KEY (`PaymentID`),
  ADD KEY `InvoiceID` (`InvoiceID`);

--
-- Indexes for table `Post`
--
ALTER TABLE `Post`
  ADD PRIMARY KEY (`PostID`),
  ADD KEY `AdminID` (`AdminID`);

--
-- Indexes for table `PostTag`
--
ALTER TABLE `PostTag`
  ADD PRIMARY KEY (`PostID`,`TagID`),
  ADD KEY `TagID` (`TagID`);

--
-- Indexes for table `Province`
--
ALTER TABLE `Province`
  ADD PRIMARY KEY (`ProvinceCode`);

--
-- Indexes for table `ScheduleConfig`
--
ALTER TABLE `ScheduleConfig`
  ADD PRIMARY KEY (`ScheduleConfigID`);

--
-- Indexes for table `Tag`
--
ALTER TABLE `Tag`
  ADD PRIMARY KEY (`TagID`);

--
-- Indexes for table `Token`
--
ALTER TABLE `Token`
  ADD PRIMARY KEY (`RefreshToken`);

--
-- Indexes for table `Transaction`
--
ALTER TABLE `Transaction`
  ADD PRIMARY KEY (`TransactionID`),
  ADD KEY `LawyerID` (`LawyerID`),
  ADD KEY `ClientID` (`ClientID`);

--
-- Indexes for table `TransferPayment`
--
ALTER TABLE `TransferPayment`
  ADD PRIMARY KEY (`TransferPaymentID`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `UserName` (`UserName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Transaction`
--
ALTER TABLE `Transaction`
  MODIFY `TransactionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Cases`
--
ALTER TABLE `Cases`
  ADD CONSTRAINT `Cases_ibfk_1` FOREIGN KEY (`ClientID`) REFERENCES `Client` (`ClientID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Cases_ibfk_2` FOREIGN KEY (`LawyerID`) REFERENCES `Lawyer` (`LawyerID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
