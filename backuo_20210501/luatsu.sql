-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 19, 2021 at 03:56 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql12385909`
--

-- --------------------------------------------------------

--
-- Table structure for table `administrators`
--

CREATE TABLE `administrators` (
  `id` varchar(10) NOT NULL,
  `password` varchar(70) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `role` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `administrators`
--

INSERT INTO `administrators` (`id`, `password`, `fullname`, `email`, `role`, `created_at`, `updated_at`) VALUES
('AD001', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'Administrator 1', 'admin1@gmail.com', 'R0001', '2021-01-01 12:20:08', '2021-01-01 12:20:08'),
('AD002', '*87AB814E5B89C7BFC390F4CD7BB93D716DE7EDA9', 'Administrator 2', 'admin1@gmail.com', 'R0002', '2021-01-01 12:20:24', '2021-01-01 12:20:24'),
('AD003', '*2A82E0B505337211BF5A7F793A1DF2C20A08520C', 'Administrator 3', 'admin1@gmail.com', 'R0003', '2021-01-01 12:20:24', '2021-01-01 12:20:24'),
('AD004', '*C3CBF32EEDE1770E879C0E47FDA7FD7D42FD0BD9', 'Administrator 4', 'admin1@gmail.com', 'R0004', '2021-01-01 12:20:24', '2021-01-01 12:20:24'),
('AD005', '*D71F86EE9556FCCBB2D4712CEC78BEAA33E4DB63', 'Administrator 5', 'admin1@gmail.com', 'R0005', '2021-01-01 12:20:24', '2021-01-01 12:20:24'),
('AD006', '*A59BF68EDBBFCCB4DEF822FC7BCCF3B2D122ACD8', 'Administrator 6', 'admin1@gmail.com', 'R0006', '2021-01-01 12:20:24', '2021-01-01 12:20:24'),
('AD7', '$2b$10$Mgn.koitXyxjSD.yM662Iu3zzL4oFNInXsotDyHFl68Cusro9xkvW', 'Admin 7', 'admin@gmail.com', 'R0001', '2021-01-19 14:55:42', '2021-01-19 14:55:42');

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

CREATE TABLE `cases` (
  `id` varchar(10) NOT NULL,
  `practice_area_id` varchar(50) DEFAULT NULL,
  `lawyer` varchar(50) DEFAULT NULL,
  `guest` varchar(50) DEFAULT NULL,
  `brief` varchar(300) NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cases`
--

INSERT INTO `cases` (`id`, `practice_area_id`, `lawyer`, `guest`, `brief`, `datetime`) VALUES
('C0001', 'PA001', 'L0001', 'G0001', 'Brief of case 0001', '2021-01-01 18:23:53'),
('C0002', 'PA002', 'L0002', 'G0002', 'Brief of case 0002', '2021-01-01 18:24:01'),
('C0003', 'PA003', 'L0003', 'G0003', 'Brief of case 0003', '2021-01-01 18:24:01'),
('C0004', 'PA004', 'L0004', 'G0004', 'Brief of case 0004', '2021-01-01 18:24:01'),
('C0005', 'PA005', 'L0005', 'G0005', 'Brief of case 0005', '2021-01-01 18:24:01');

-- --------------------------------------------------------

--
-- Table structure for table `common_properties`
--

CREATE TABLE `common_properties` (
  `id` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `kind` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `common_properties`
--

INSERT INTO `common_properties` (`id`, `name`, `kind`) VALUES
('MD', 'Divorced', 'Guest Marial Status'),
('MM', 'Maried', 'Guest Marial Status'),
('MS', 'Single', 'Guest Marial Status'),
('PA001', 'PA 001', 'Pratice Area'),
('PA002', 'PA 002', 'Pratice Area'),
('PA003', 'PA 003', 'Pratice Area'),
('PA004', 'PA 004', 'Pratice Area'),
('PA005', 'PA 005', 'Pratice Area'),
('R0001', 'Role 1', 'Administrator Role'),
('R0002', 'Role 2', 'Administrator Role'),
('R0003', 'Role 3', 'Administrator Role'),
('R0004', 'Role 4', 'Administrator Role'),
('R0005', 'Role 5', 'Administrator Role'),
('RG', 'Gold', 'Guest Rank'),
('RN', 'Normal', 'Guest Rank'),
('RS', 'Silver', 'Guest Rank'),
('RV', 'VIP', 'Guest Rank'),
('SF', 'Female', 'Guest Sex'),
('SM', 'Male', 'Guest Sex'),
('SO', 'Other', 'Guest Sex'),
('T0001', 'Tag 0001', 'Tag of cases'),
('T0002', 'Tag 0002', 'Tag of cases'),
('T0003', 'Tag 0003', 'Tag of cases'),
('T0004', 'Tag 0004', 'Tag of cases'),
('T0005', 'Tag 0005', 'Tag of cases'),
('T0006', 'Tag 0006', 'Tag of cases'),
('T0007', 'Tag 0007', 'Tag of cases');

-- --------------------------------------------------------

--
-- Table structure for table `guest`
--

CREATE TABLE `guest` (
  `id` varchar(10) NOT NULL,
  `password` varchar(70) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `phone` int(11) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(300) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `company` varchar(150) DEFAULT NULL,
  `career` varchar(50) DEFAULT NULL,
  `sex` varchar(10) NOT NULL,
  `marital_status` varchar(10) NOT NULL,
  `rank` varchar(5) DEFAULT 'RN',
  `lawyer_id` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `guest`
--

INSERT INTO `guest` (`id`, `password`, `fullname`, `phone`, `email`, `address`, `birthday`, `company`, `career`, `sex`, `marital_status`, `rank`, `lawyer_id`, `created_at`, `updated_at`) VALUES
('G0001', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'Guest 1', 123456789, 'guest1@gmail.com', '268 Lý Thường Kiệt, Phường 14, Quận 10268 Lý Thường Kiệt, Phường 14, Quận 10268 Lý Thường Kiệt, Phường 14, Quận 10268 Lý Thường Kiệt, Phường 14, Quận 10', '2021-01-11', 'ABC Company', 'Worker', 'SM', 'MS', 'RS', 'L0005', '2021-01-01 10:26:49', '2021-01-10 23:07:20'),
('G0002', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'Guest 2', 0, 'guest1@gmail.com', NULL, NULL, NULL, NULL, 'SM', 'MS', 'RS', 'L0002', '2021-01-01 10:26:49', '2021-01-01 10:26:49'),
('G0003', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'Guest 3', 0, 'guest3@gmail.com', NULL, NULL, NULL, NULL, 'SF', 'MD', 'RV', 'L0003', '2021-01-01 10:54:04', '2021-01-01 10:54:04'),
('G0004', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'Guest 4', 0, 'guest4@gmail.com', NULL, NULL, NULL, NULL, 'SM', '', 'RN', 'L0004', '2021-01-01 10:54:04', '2021-01-01 10:54:04'),
('G0005', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'Guest 5', 0, 'guest5@gmail.com', NULL, NULL, NULL, NULL, 'SO', '', 'RN', 'L0005', '2021-01-01 10:54:04', '2021-01-01 10:54:04'),
('G0006', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'Guest 6', 0, 'guest6@gmail.com', NULL, NULL, NULL, NULL, 'SM', 'MS', 'RN', 'L0005', '2021-01-06 16:18:50', '2021-01-06 16:18:50'),
('G0007', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'Khách số 7', 901000123, 'guest1@gmail.com', '268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh', '1990-01-08', 'XYZ Hospital', 'Nurse', 'SF', 'MS', 'RG', 'L0001', '2021-01-08 17:22:23', '2021-01-10 23:12:00');

-- --------------------------------------------------------

--
-- Table structure for table `lawyer`
--

CREATE TABLE `lawyer` (
  `id` varchar(10) NOT NULL,
  `password` varchar(70) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `practice_area_id` varchar(10) NOT NULL,
  `cases` varchar(15) DEFAULT NULL,
  `guest_id` varchar(30) DEFAULT NULL,
  `rating` int(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lawyer`
--

INSERT INTO `lawyer` (`id`, `password`, `fullname`, `phone`, `email`, `practice_area_id`, `cases`, `guest_id`, `rating`, `created_at`, `updated_at`) VALUES
('L0001', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'Lawyer 1', NULL, 'lawyer1@gmail.com', 'PA001', 'C0001', 'G0001,G000', 8, '2021-01-06 16:18:50', '2021-01-06 16:18:50'),
('L0002', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'Lawyer 2', NULL, 'lawyer2@gmail.com', 'PA002', 'C0002', 'G0002,G000', 9, '2021-01-06 16:18:50', '2021-01-06 16:18:50'),
('L0003', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'Lawyer 3', NULL, 'lawyer3@gmail.com', 'PA003', '', 'G0001,G000', 10, '2021-01-06 16:18:50', '2021-01-06 16:18:50'),
('L0004', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'Lawyer 4', NULL, 'lawyer4@gmail.com', 'PA004', 'C0004', '', 10, '2021-01-06 16:18:50', '2021-01-06 16:18:50'),
('L0005', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'Lawyer 5', NULL, 'lawyer5@gmail.com', 'PA005', 'C0005', 'G0005,G000', 2, '2021-01-06 16:18:50', '2021-01-06 16:18:50');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` varchar(10) NOT NULL,
  `title` varchar(150) NOT NULL,
  `content` varchar(5000) NOT NULL,
  `author` varchar(10) NOT NULL,
  `tag` varchar(300) NOT NULL,
  `publishied` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `title`, `content`, `author`, `tag`, `publishied`, `updated`) VALUES
('Po0001', 'Post 1', 'Content of post 1', 'Au0011', '', '2021-01-01 18:52:07', '2021-01-01 18:52:07'),
('Po0002', 'Post 2', 'Content of post 2', 'Au0012', '', '2021-01-01 18:52:07', '2021-01-01 18:52:07'),
('Po0003', 'Post 3', 'Content of post 3', 'Au0013', '', '2021-01-01 18:52:07', '2021-01-01 18:52:07'),
('Po0004', 'Post 4', 'Content of post 4', 'Au0014', '', '2021-01-01 18:52:07', '2021-01-01 18:52:07'),
('Po0005', 'Post 5', 'Content of post 5', 'Au0015', '', '2021-01-01 18:52:07', '2021-01-01 18:52:07'),
('Po0006', 'Post 6', 'Content of post 6', 'Au0016', '', '2021-01-01 18:52:07', '2021-01-01 18:52:07');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` varchar(10) NOT NULL,
  `title` varchar(150) NOT NULL,
  `content` varchar(5000) NOT NULL,
  `author` varchar(10) NOT NULL,
  `publishied` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrators`
--
ALTER TABLE `administrators`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `common_properties`
--
ALTER TABLE `common_properties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guest`
--
ALTER TABLE `guest`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lawyer`
--
ALTER TABLE `lawyer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
