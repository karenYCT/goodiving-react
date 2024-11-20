-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2024 年 11 月 16 日 03:24
-- 伺服器版本： 10.4.28-MariaDB
-- PHP 版本： 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `goodiving`
--

-- --------------------------------------------------------

--
-- 資料表結構 `log_img`
--

CREATE TABLE `log_img` (
  `img_id` int(11) NOT NULL,
  `log_id` int(11) NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `is_main` tinyint(1) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `log_img`
--

INSERT INTO `log_img` (`img_id`, `log_id`, `img_url`, `is_main`, `create_at`) VALUES
(47, 19, '/img/b1012da8-8293-47f3-af7f-b6ee0f90a008.jpg', 1, '2024-11-11 21:02:48'),
(48, 19, '/img/a4a01685-f237-4f8f-9d30-5e5ee59f4fdd.jpg', 0, '2024-11-11 21:02:48'),
(49, 19, '/img/df27a474-d450-48d2-8d90-a137d7194109.jpg', 0, '2024-11-11 21:02:48'),
(50, 20, '/img/8f28db50-fcd1-41ec-bea2-660c92cb294e.jpg', 1, '2024-11-11 21:49:26'),
(51, 20, '/img/49399624-af30-4b7d-8c22-6f514730b306.jpg', 0, '2024-11-11 21:49:26'),
(52, 20, '/img/0254b2eb-8a35-4b95-9e4a-a665a0f20b54.jpg', 0, '2024-11-11 21:49:26'),
(74, 25, '/img/4f7c69ed-173c-4ff9-b256-339a1f45206e.jpg', 1, '2024-11-14 13:43:18'),
(75, 25, '/img/884f7375-6860-43bf-96d0-38149818a50e.jpg', 0, '2024-11-14 13:43:18'),
(76, 25, '/img/46a9d450-99b9-4865-a306-b9c599338119.jpg', 0, '2024-11-14 13:43:18'),
(77, 18, '/img/eab88d0e-28e7-49e3-95d3-9460cb631cd9.jpg', 0, '2024-11-14 13:59:24'),
(78, 18, '/img/931ab49d-2aa1-4e39-a35a-bbc6fe0cfbad.jpg', 1, '2024-11-14 13:59:24'),
(79, 18, '/img/374a465c-e389-40ad-89b9-57a38884b61f.jpg', 0, '2024-11-14 13:59:24'),
(80, 24, '/img/73260823-8219-487e-81aa-6ed68e4fd187.jpg', 1, '2024-11-14 14:26:33'),
(81, 24, '/img/e206e4a4-f7ca-4a69-8fe1-944ec8468a36.jpg', 0, '2024-11-14 14:26:33'),
(82, 24, '/img/833a97e4-23de-4879-bf66-1908b2c96f00.jpg', 0, '2024-11-14 14:26:33'),
(86, 27, '/img/3437330a-8a7e-4ad4-8d9c-35f4c7761b4e.jpg', 0, '2024-11-14 16:39:10'),
(87, 27, '/img/5ee38ec8-6a77-4b63-99d2-5d65cdb7fa62.jpg', 0, '2024-11-14 16:39:10'),
(88, 27, '/img/1907522a-b21f-48c1-9bb1-1752f1ebfc7e.jpg', 1, '2024-11-14 16:39:10'),
(110, 17, '/img/34b60a51-6e8b-4736-81c2-ad53dfb089a5.jpg', 1, '2024-11-14 17:27:13'),
(111, 17, '/img/05deada6-3403-450d-9c4b-b915ce68edfb.jpg', 0, '2024-11-14 17:27:13'),
(112, 17, '/img/8d8e0610-0997-4982-a54a-d77a8e2b84b1.jpg', 0, '2024-11-14 17:27:13'),
(122, 28, '/img/a88578a9-ae3f-43d7-8d56-3bf380d1815a.jpg', 1, '2024-11-14 18:51:05'),
(123, 28, '/img/0312ff1f-0904-4204-baba-1edab5871fc1.jpg', 0, '2024-11-14 18:51:05'),
(124, 28, '/img/1d28503f-87c0-4fb8-bfc7-fdbc9d88dbe3.jpg', 0, '2024-11-14 18:51:05'),
(128, 29, '/img/b9d78729-adbb-424a-803d-6545fd6421c5.jpg', 1, '2024-11-14 19:18:41'),
(129, 29, '/img/e5e3ad2c-112a-4830-84ed-d1c0f10c1dc9.jpg', 0, '2024-11-14 19:18:41'),
(130, 29, '/img/e8413cd3-ebf2-4916-a2e0-3b0c0414c410.jpg', 0, '2024-11-14 19:18:41'),
(134, 32, '/img/ba4719ec-1fa5-47db-8875-21039ab73f46.jpg', 1, '2024-11-14 23:52:12'),
(135, 33, '/img/af539837-e0e7-4cdd-9b5d-5988dcabc728.jpg', 1, '2024-11-15 00:30:54'),
(136, 33, '/img/6b85de45-42a7-43dd-baf7-474bde8842bc.jpg', 0, '2024-11-15 00:30:54');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `log_img`
--
ALTER TABLE `log_img`
  ADD PRIMARY KEY (`img_id`),
  ADD KEY `log_id` (`log_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `log_img`
--
ALTER TABLE `log_img`
  MODIFY `img_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
