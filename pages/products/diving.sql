-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-11-01 09:05:16
-- 伺服器版本： 8.0.37
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `diving`
--

-- --------------------------------------------------------

--
-- 資料表結構 `cart_list`
--

CREATE TABLE `cart_list` (
  `cart_id` int NOT NULL,
  `user_id` int NOT NULL,
  `product_variant_id` int NOT NULL,
  `quantity` int NOT NULL,
  `created_time` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL,
  `order_id` int NOT NULL,
  `product_variant_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `order_list`
--

CREATE TABLE `order_list` (
  `order_id` int NOT NULL,
  `user_id` int NOT NULL,
  `is_paid` tinyint(1) DEFAULT '0',
  `created_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `payment_method` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `shipping_method` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `shipping_address` text COLLATE utf8mb4_general_ci NOT NULL,
  `recipent_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `recipent_email` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `recipent_phone` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `product_categories`
--

CREATE TABLE `product_categories` (
  `product_category_id` int NOT NULL,
  `product_category_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `product_categories`
--

INSERT INTO `product_categories` (`product_category_id`, `product_category_name`) VALUES
(1, '面鏡'),
(2, '防寒衣'),
(3, '蛙鞋'),
(4, '套鞋'),
(5, '調節器'),
(6, '潛水配件');

-- --------------------------------------------------------

--
-- 資料表結構 `product_images`
--

CREATE TABLE `product_images` (
  `image_id` int NOT NULL,
  `product_id` int NOT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `product_images`
--

INSERT INTO `product_images` (`image_id`, `product_id`, `img_url`) VALUES
(1, 13, '/products/mask/1.webp'),
(2, 13, '/products/mask/1-1.webp'),
(3, 13, '/products/mask/1-2.webp'),
(4, 13, '/products/mask/1-3.webp'),
(5, 13, '/products/mask/1-4.webp'),
(6, 14, '/products/mask/2.webp'),
(7, 14, '/products/mask/2-1.webp'),
(8, 14, '/products/mask/2-2.webp'),
(9, 14, '/products/mask/2-3.webp'),
(10, 14, '/products/mask/2-4.webp'),
(11, 15, '/products/mask/3.webp'),
(12, 15, '/products/mask/3-1.webp'),
(13, 15, '/products/mask/3-2.webp'),
(14, 15, '/products/mask/3-3.webp'),
(15, 15, '/products/mask/3-4.webp'),
(16, 15, '/products/mask/3-5.webp'),
(17, 16, '/products/mask/4.webp'),
(18, 16, '/products/mask/4-1.webp'),
(19, 17, '/products/mask/5.webp'),
(20, 17, '/products/mask/5-1.webp'),
(21, 17, '/products/mask/5-2.webp'),
(22, 18, '/products/mask/6.webp'),
(23, 19, '/products/wetsuit/1.webp'),
(24, 20, '/products/wetsuit/2.webp'),
(25, 21, '/products/wetsuit/3.webp'),
(26, 22, '/products/wetsuit/4.webp'),
(27, 23, '/products/wetsuit/5.webp'),
(28, 24, '/products/wetsuit/6.webp'),
(29, 25, '/products/fins/1.webp'),
(30, 26, '/products/fins/2.webp'),
(31, 27, '/products/fins/3.webp'),
(32, 28, '/products/fins/4.webp'),
(33, 29, '/products/fins/5.webp'),
(34, 30, '/products/fins/6.webp'),
(35, 31, '/products/boots/1.webp'),
(36, 32, '/products/boots/2.webp'),
(37, 33, '/products/boots/3.webp'),
(38, 34, '/products/boots/4.webp'),
(39, 35, '/products/boots/5.webp'),
(40, 36, '/products/boots/6.webp'),
(41, 37, '/products/regulator/1.webp'),
(42, 38, '/products/regulator/2.webp'),
(43, 39, '/products/regulator/3.webp'),
(44, 40, '/products/regulator/4.webp'),
(45, 41, '/products/regulator/5.webp'),
(46, 42, '/products/regulator/6.webp'),
(47, 43, '/products/accessory/1.webp'),
(48, 44, '/products/accessory/2.webp'),
(49, 45, '/products/accessory/3.webp'),
(50, 46, '/products/accessory/4.webp'),
(51, 47, '/products/accessory/5.webp'),
(52, 48, '/products/accessory/6.webp'),
(53, 49, '/products/accessory/7.webp');

-- --------------------------------------------------------

--
-- 資料表結構 `product_list`
--

CREATE TABLE `product_list` (
  `product_id` int NOT NULL,
  `title` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `product_category_id` int DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `price` int NOT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_time` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `product_list`
--

INSERT INTO `product_list` (`product_id`, `title`, `product_category_id`, `description`, `price`, `img_url`, `created_time`) VALUES
(13, '鋼製專業潛水面鏡', 1, '單鏡片、低容量的 STEEL PRO 提供廣闊的水下世界視野。非常適合自由潛水或水肺潛水，無框設計既流線又輕巧，柔軟的矽膠鏡裙適合各種臉型。旋轉式搭扣搭配微調式錶帶，可將水密性發揮到極致，而裙邊可非常有效地阻隔深處的光線反射。低容量的設計讓 STEEL PRO 成為適合各種潛水的最佳面鏡。', 1400, '/products/mask/1.webp', '2024-11-01 15:14:42'),
(14, '鬼魅潛水面鏡', 1, '單鏡片、低容量的無框架 Ghost 面鏡提供舒適的佩戴感，透過耐用的超清晰鏡片提供極佳的視野，超柔軟的矽膠裙可阻隔光線反射 - 這對攝影師而言是一大優勢。面鏡織帶有按鈕式釋放裝置和易調桿，可輕鬆穿脫和調整長度。靈活的易調式搭扣可讓您調整多種背帶角度，讓您戴得更合身，而且還可將面鏡摺疊平整，方便包裝。', 1700, '/products/mask/2.webp', '2024-11-01 15:14:42'),
(15, 'D-面鏡', 1, '與全新 D 系列 D420 調節器的設計方案相同，全新 D-Mask 是一款時尚、優質的面鏡，非常適合各種類型的潛水活動。D-Mask受益於SCUBAPRO的第二代Trufit技術。這種設計方法的特色是面鏡裙部靠近面鏡框架的部分採用較厚、較堅固的矽膠，以提供支撐和剛性，而較薄的矽膠則圍繞臉部，以提供舒適性，並確保防水密封性。面鏡採用真彩紫外線防護鏡片，在表面防護與水下清晰度之間取得最佳平衡。它還具有可替換鏡片系統，可選購光學鏡片。D 型面鏡提供舒適的佩戴感和寬闊的視野，有黑色和藍色兩種顏色可供選擇，與 D420 調節器的配色方案相匹配。它有兩種尺寸，可選擇黑色或透明裙邊： 中號和小號，還有只有黑色的寬裙。', 3200, '/products/mask/3.webp', '2024-11-01 15:14:42'),
(16, 'Synergy 2 Trufit 潛水面鏡，附綁帶', 1, '被稱為市場上最舒適的潛水面鏡，您只需試戴 Synergy 2 Trufit 單鏡片就能感受到它的與眾不同。它的 Trufit 技術設計結合了兩個獨立的矽膠裙 - 纖薄柔軟的內裙提供貼合與舒適，較厚的外裙提供面鏡框附近的支撐。這種創新的雙裙設計使其有別於原來的 Syngery，並經證實可在長時間的水下活動時提供全新等級的舒適度，同時確保幾乎適用於所有臉型的可靠防水密封性。這款低容量的單鏡片面鏡也提供了寬廣無阻的視野，而且搭扣系統使用方便。面鏡外框經過噴漆處理，展現優質外觀。', 2500, '/products/mask/4.webp', '2024-11-01 15:14:42'),
(17, 'Zoom 潛水面鏡', 1, 'Zoom 是一款低容量的雙鏡頭面鏡，適合所有潛水員，但特別適合使用光學鏡片的潛水員。面鏡擁有全新的鏡片更換系統能讓您在一分鐘內自行更換鏡片，不需任何工具。Zoom 配備噴漆副框架，顏色與 Seawing Nova 魚鰭、HYDROS PRO BCDs 以及 UPF 系列的防曬衣、蒸氣衣和緊身衣相搭配，提供通用的貼合度，並採用與 Comfort Strap 相容的整合式搭扣設計。', 2800, '/products/mask/5.webp', '2024-11-01 15:14:42'),
(18, 'Crystal Vu Plus 潛水面鏡，附刮水裝置', 1, 'CRYSTAL VU PLUS 的大型單鏡片設計加上無縫側窗，讓水下視野更廣闊，無色玻璃讓視野更清晰。水晶般透明的雙層密封矽膠裙提供了既舒適又防水的密封性，同時產生一種非常開闊、透氣的感覺，在較暗的水域潛水時尤其舒適。旋轉扣可讓您完美貼合，獨特的塗裝製程讓您在潛水時更有型。', 2750, '/products/mask/6.webp', '2024-11-01 15:14:42'),
(19, 'Definition Steamer，男用，3mm', 2, 'Definition 3mm提供了任何暖水潛水員都會喜歡的保暖性和舒適度。它採用 SCUBAPRO 的 Body Map System 製造，這種製造方法使用 3D 剪裁、特殊剪裁和材料插入，製造出像手套一樣合身的潛水衣，在最需要的地方提供額外的伸展性，並提供絕佳的保暖性、舒適性和耐用性。久經考驗的 N2S (Nylon 2 Sides) 結構，為溫水潛水提供完美的保暖性與舒適度。紅外線羊毛內裡可反射體溫，讓保暖效果更佳，而且貼身舒適。它是任何潛水員的完美保溫保護。', 7500, '/products/wetsuit/1.webp', '2024-11-01 15:14:42'),
(20, 'Definition Steamer，女用，3mm', 2, 'Definition 3mm提供了任何暖水潛水員都會喜歡的保暖性和舒適度。它採用 SCUBAPRO 的 Body Map System 製造，這種製造方法使用 3D 剪裁、特殊剪裁和材料插入，製造出像手套一樣合身的潛水衣，在最需要的地方提供額外的伸展性，並提供絕佳的保暖性、舒適性和耐用性。久經考驗的 N2S (Nylon 2 Sides) 結構，為溫水潛水提供完美的保暖性與舒適度。紅外線羊毛內裡可反射體溫，讓保暖效果更佳，而且貼身舒適。它是任何潛水員的完美保溫保護。', 7500, '/products/wetsuit/2.webp', '2024-11-01 15:14:42'),
(21, 'Sport Steamer，女用，3mm', 2, 'Sport 潛水衣系列新增了這款超舒適的 3mm 蒸氣潛水衣。Sport 3mm專為喜歡中度至淺度溫水潛水的新潛水員、休閒潛水員和首次購買潛水衣的潛水員所設計，採用極為柔軟而有彈性的氯丁橡膠製成，並採用三項鐵人剪裁。Sport 3mm 採用非常柔軟且具彈性的氯丁橡膠製成，並採用三項鐵人剪裁，讓肩膀和手臂區域有更大的活動範圍，提供在船上和水中最大的活動自由度。這款潛水衣的特色是平縫線、垂直後拉鍊和舒適的毛絨內腕。它易於穿脫，就像第二層肌膚一樣合身，而且看起來很棒。', 8200, '/products/wetsuit/3.webp', '2024-11-01 15:14:42'),
(22, 'Oneflex Steamer，男用，7mm', 2, 'Oneflex 賽服的設計風格簡單直接，採用三項鐵人剪裁，讓肩膀和手臂區域的活動範圍更大。此外，Oneflex 賽服採用 Pure Design 概念，使用較少的接縫和面板以達到最大的彈性，其雙面聚酯襯裡超耐用且具彈性且舒適。手臂和腋下增加了外部彈性布料，使潛水衣更容易穿脫，同時增加了舒適度和活動自由度，這些設計元素深受初學潛水者的喜愛。對角線的後YKK拉鍊設計是大多數潛水員所熟悉且容易使用的。', 9500, '/products/wetsuit/4.webp', '2024-11-01 15:14:42'),
(23, 'Everflex YULEX® Dive 長袖潛水上衣，男用，3mm', 2, '這款3mm長袖上衣可搭配3mm褲子，作為Everflex YULEX® 3/2mm蒸氣褲外的另一種選擇。此款上衣採用純粹設計概念，使用較少的接縫與面板，以達到最大的舒適度與活動範圍，接縫採用盲縫技術，並搭配黑色彈性聚酯外裡襯。超彈性的前方垂直拉鍊設計，腕部袖口則採用保險絲剪裁，超彈性的袖口設計讓穿著更輕鬆。上衣提供耐磨布料，肩部有額外的印花襯墊，可防止 BCD 的磨損。', 11200, '/products/wetsuit/5.webp', '2024-11-01 15:14:43'),
(24, 'Hybrid Cargo 短褲，男用，1mm', 2, 'Hybrid Cargo Shorts \"提供了 Hybrid Cargo Pants 的所有功能，在短款設計中保持了功能性。合身的 Hybrid Cargo Shorts 採用高品質的 1mm X-Foam 氯丁橡膠和彈性尼龍製成。在內裡，微長絨襯裡讓短褲更加溫暖舒適。這種毛絨襯裡吸水率較低，可增加整體保暖性，而且乾得快。Hybrid Cargo Shorts 配備大型鉤環口袋，口袋內有繩索和 D 形環，還有快速排水的大孔眼和額外的拉鍊口袋，可存放小件貴重物品。短褲配有可調整腰帶，腰帶穿過一系列腰帶環並包括一個易於使用的男性/女性擠壓扣開合。座板上的抗磨損織物提高了耐用性。Hybrid Cargo Shorts 既可單獨穿著，也可套在潛水衣外，是享受水上樂趣的最佳選擇。', 3800, '/products/wetsuit/6.webp', '2024-11-01 15:14:43'),
(25, 'Jet 蛙鞋，附彈簧腳跟帶\n', 3, 'SCUBAPRO的JET FIN是著名的。這種獨特的鰭片設計在 50 年前首次推出時，就為其動力和耐用性樹立了標準。其耐用的橡膠結構和強壯的外形至今仍可在潛水船、研究船和世界上最偏遠的潛水地點看到。科技潛水員、深海潛水員、軍事潛水員、商業潛水員和潛水教練，以及老派的休閒潛水員，在下水前仍會繫上一對 JET FINS。仿造品眾多，但 JET FIN 只有一個。', 4200, '/products/fins/1.webp', '2024-11-01 15:14:43'),
(26, 'GO Sport 蛙鞋\n', 3, 'SCUBAPRO的GO Sport魚鰭採用 」靴型 「設計，讓穿著靴子的潛水員在冷水中或在岩石嶙峋的岸上潛水時，也能受惠於原來獲得測試者之選獎項的 」裸型 \"GO魚鰭所具備的踢水性能。此款蛙鞋重量輕，但幾乎堅不可摧，在水中表現快速靈活。鰭片在原來的基礎上做了輕微的修改；它現在提供了安裝點來安裝可減少側滑、最大化穩定性的鰭腳。可自行調節的彈性腳跟帶可提供多樣化的配戴方式。這條綁帶也讓穿脫更加容易。GO Sport 的設計可放入符合 IATA 規範的隨身行李中，無論是旅行或在當地潛水，都是一款絕佳的蛙鞋。', 3200, '/products/fins/2.webp', '2024-11-01 15:14:43'),
(27, '橡膠蛙鞋', 3, '經典的 SCUBAPRO 蛙鞋，適用於潛水和浮潛。全橡膠材質的結構提供最大的耐用性，開趾、全腳管的設計提供極佳的舒適性，同時為熱帶水上運動提供穩固的踢水性能。有多種尺寸可供選擇。', 1800, '/products/fins/3.webp', '2024-11-01 15:14:43'),
(28, 'Jet Club 蛙鞋，全腳型\n', 3, 'Jet Club 魚鰭是一款性能優異的輕量全足式魚鰭。符合人體工學的腳袋讓您享受非凡的舒適感，並有助於提高鰭片的整體效率。透氣設計和三種材質結構有助於最大化操控性，並將腿部勞損降至最低。', 3850, '/products/fins/4.webp', '2024-11-01 15:14:43'),
(29, 'Jet Sport 蛙鞋，全腳型\n', 3, 'JET SPORT FULL FOOT 擁有輕巧的重量，卻能提供強大的推進力和優異的操控性，而且光腳踩上去感覺非常舒適。其略硬的葉片採用三材質設計，包括一對以半硬塑膠製成的軟橡膠面板，以及兩側的薄側軌，可產生恰到好處的彎曲度。球板與腳袋之間還有減阻通氣孔，可減少上下衝程時的阻力。這樣的組合能產生推進的踢球力量，提供良好的穩定性，並能有效率地進行蛙式和海豚式踢球。橡膠全腳袋可舒適地貼合您的腳部，防滑花紋在潮濕的甲板上也很有效。是在熱帶地區釣魚的最佳選擇。', 3700, '/products/fins/5.webp', '2024-11-01 15:14:43'),
(30, 'Dolphin 蛙鞋', 3, '這款多功能蛙鞋採用開放式鞋跟設計，適合喜歡穿氯丁橡膠靴的浮潛者。然而，它的腳袋非常柔軟且具有支撐性，您可以輕鬆地赤腳使用', 1600, '/products/fins/6.webp', '2024-11-01 15:14:43'),
(31, 'Delta 短筒套鞋，3mm', 4, '超舒適的 DELTA 3mm SHORT BOOT 專為熱帶潛水和浮潛而設計。低帮、轻便，恰到好处的保护，无需拉链即可穿脱。它是使用可調式蛙鞋在溫水中潛水的完美鞋款。', 1950, '/products/boots/1.webp', '2024-11-01 15:14:43'),
(32, 'Delta 套鞋，5mm', 4, 'Delta 5mm潛水靴備受歡迎，於2019年更新，維持其堅固但有彈性的外底和橡膠保護裝甲，但穿在腳上仍感覺非常輕盈。經修訂的腳踝直徑和新的輪廓頂部改善了合腳性，並使 YKK 拉鍊的上下滑動更加容易。全剪裁設計創造出舒適、不抽筋的貼合感，即使是寬腳型的人也能輕鬆穿著。腳掌上方的加固設計既能提供緩衝，又能保護腳掌抵擋鰭袋的邊緣。靴子的防滑胎面不會留下痕跡，船主總是很欣賞這項功能。提供強大的保護與舒適性，下次當您潛入冷水或穿過岩石海岸線時，您會很高興穿上 Deltas。', 2150, '/products/boots/2.webp', '2024-11-01 15:14:43'),
(33, 'Hybrid Sock，2.5mm', 4, '新款 Hybrid 襪子由柔軟的 2.5mm 氯丁橡膠製成，織紋鞋底可在潮濕的船甲板上行走時提供一點防滑保護。100% 高彈性 Everflex 尼龍外層和毛絨內襯提供保暖和舒適，您可以將 Hybrid 襪子穿在潛水靴內增加保暖性，也可以當作全套腳蹼的內襯，或是單獨穿著在寒冷的船甲板上走動。無論您選擇哪一種，您的雙腳都會愛上您。', 1200, '/products/boots/3.webp', '2024-11-01 15:14:43'),
(34, 'Heavy-Duty 套鞋，6.5mm\n', 4, '如果您曾經腳冷，或是在前往海灘的途中被尖銳的石頭絆倒，您一定會喜歡 HEAVY-DUTY 6.5mm 潛水靴。HEAVY-DUTY 6.5mm 是為了應付嚴苛的環境而打造，鞋頭和鞋跟都經過強化處理，鞋底則採用厚實的模壓橡膠材質，既耐用又舒適，是冷水和惡劣環境下的理想潛水靴。Diamond Span 內裡可提升舒適度與保暖性。', 1800, '/products/boots/4.webp', '2024-11-01 15:14:43'),
(35, 'Everflex拱形套鞋，5mm', 4, 'Everflex Arch Boot 可能是您穿過最舒適的潛水靴。採用創新的足弓設計，緊貼腳部的自然解剖結構，靴子的腳袋剪裁寬大，即使是寬腳型的人也不會感到侷促。靴子的大部分區域都提供 5mm 的熱保護，但在腳踝上方區域的氯丁橡膠則較薄，以避免與潛水衣腿部重疊的部分變得臃腫。Diamond Span 內裡超舒適，乾得也快。', 3200, '/products/boots/5.webp', '2024-11-01 15:14:43'),
(36, '基本款套鞋，4mm', 4, '4mm Base boot 是專為溫帶水域潛水和租賃市場打造的經濟耐用型靴子。全新設計的輕量橡膠鞋底既耐用又有彈性，同時提供有效的防滑效果。鞋頭和鞋跟蓋的橡膠護甲提供了大量的保護，同時又不犧牲舒適度。全新的標誌設計，以顏色區分尺寸，是潛水作業和租賃應用的理想選擇。', 890, '/products/boots/6.webp', '2024-11-01 15:14:43'),
(37, 'MK11 EVO/C370 潛水調節器', 5, 'MK11 EVO/C370 是一款小巧、可靠的送氣系統，無論您旅行到哪裡，它都能為您帶來潛水樂趣。新型平衡膜片 MK11 EVO 採用創新的雙彈簧布局，鍛造的黃銅機身配有隔熱鰭片和保護性塑料防撞墊，可防止刮傷。小巧的 C370 提供方便的使用者控制功能，包括可由潛水員調整的吸氣力度旋鈕、同軸潛水/預潛水控制桿，以及容易啟動的大型吹氣按鈕。', 22400, '/products/regulator/1.webp', '2024-11-01 15:14:43'),
(38, 'MK25 EVO/S620Ti 潛水調節器，60 週年紀念版', 5, 'SCUBAPRO慶祝其作為潛水行業創新者60週年，推出了標誌性的限量版調節器--MK25 EVO/S620 Ti Carbon BT。MK25 EVO的第一階段採用特殊的Black Tech、DLC塗層，提供光亮的深黑色表面，具有更高的耐刮傷和抗氧化性。保護性端蓋包括一個獨特的紅色「60 Year Anniversary」字樣。從補償腔孔中可以看到的彈簧也採用了相同的紅色。S620 Ti Carbon BT 二級調節器的特色在於鈦金屬發條管與旋鈕環及發條管螺帽，前蓋上裝有手工製作的碳纖維零件，外殼上的紅色「60 Year Anniversary」字樣與一級調節器上的紅色點綴相呼應。這款特別限量版的調整器裝在一個FSC認證的木盒中，木盒上刻有SCUBAPRO和60週年紀念的標誌。黑色陽極鐳射雕刻鋁製標籤上印有與調整器相匹配的漸進式序號，突顯了這款限量版調整器對收藏家的獨特性。', 72000, '/products/regulator/2.webp', '2024-11-01 15:14:43'),
(39, 'MK2 EVO/R105 潛水調節器', 5, 'MK2 EVO/R105 是出租、潛水學校或尋求基本備用呼吸系統的潛水員的首選調節系統。它提供平穩可靠的空氣輸送，而且經久耐用。R105 與 SCUBAPRO 經典的 MK2 EVO 搭配使用，MK2 EVO 是唯一一款下游活塞式第一級調壓器，其內部元件經過特別設計，可在極度寒冷的水域條件下抗凍。', 15700, '/products/regulator/3.webp', '2024-11-01 15:14:43'),
(40, 'R105 Octopus', 5, 'R105 Octopus 採用經典的順流設計，配備潛水/預潛水 VIVA 開關和可翻轉軟管附件，提供可靠的呼吸性能。', 8100, '/products/regulator/4.webp', '2024-11-01 15:14:43'),
(41, 'MK25 Evo BT/G260 碳纖維潛水調節器', 5, 'MK25 EVO BT/G260 Carbon BT 調節器系統是我們廣受歡迎的 G260 技術潛水系統的升級版，採用碳纖維外殼和 Black Tech 表面處理，具有更高的耐用性。平衡活塞式 MK25 EVO BT 具備優異的抗凍能力、絕佳的吸入靈敏度，並可依需求即時送氣。G260 Carbon BT 配備大型隔膜、內部金屬組件和高流量排氣閥，可提供絕佳的呼吸靈敏度和抗凍性。', 42600, '/products/regulator/5.webp', '2024-11-01 15:14:43'),
(42, 'MK19 Evo/A700 潛水調節器', 5, 'MK19 EVO / A700 採用了我們非凡的呼吸式 A700，並搭配環境密封的 MK19 EVO 第一級，其內部機構具有極強的抗凍和抗污能力。MK19 EVO 提供配備雙彈簧的乾式環境壓力腔，以達到最佳可靠性，而 LP 端口旋轉轉塔則可最大化軟管路由選擇。肌肉感十足的 A700 配備精密手工打造的全金屬外殼、前蓋和閥門外殼，提供同級產品中最佳的呼吸效能，包括毫不費力的吸氣和無與倫比的輕易呼氣。', 35200, '/products/regulator/6.webp', '2024-11-01 15:14:43'),
(43, 'Nova 850 Tec', 6, 'Nova 850 Tec 是一款堅固耐用的單模潛水燈，可提供強烈的 850 流明照明，光束集中，是照亮沉船暗室和深水珊瑚礁隱蔽縫隙的理想之選。這款堅固耐用的單模式潛水燈可提供強烈的 850 流明照明，光束集中，非常適合照亮沉船中的黑暗隔間和深水珊瑚礁中的隱蔽縫隙。此燈由重型鋁合金製成，重量輕且堅固耐用。它也很容易使用，只需簡單的扭開/扭關即可啟動。該燈附有一個方便的連接點，可連接栓扣（通常是一條短的洞穴繩），因此在不使用時，可將其牢固地夾在 D 形環上。無論是在夜間潛水還是白天潛水，如果潛水員需要簡單而嚴謹的水下照明，Nova 850 Tec 都是您明智的選擇。', 5100, '/products/accessory/1.webp', '2024-11-01 15:14:43'),
(44, '潛水面鏡帶，2.5mm', 6, '戴上氯丁橡膠背帶的面鏡，享受潛水的樂趣。這些背帶使用方便，而且非常舒適。', 250, '/products/accessory/2.webp', '2024-11-01 15:14:43'),
(45, 'HYDROS PRO 大腿雜物袋\n', 6, '當您的 HYDROS PRO 配備了大腿儲物袋，就能提供大量容易拿取的貨物攜帶空間。', 300, '/products/accessory/3.webp', '2024-11-01 15:14:43'),
(46, '迷你卷軸，100 英尺', 6, '這款方便的手指捲軸非常適合輕負荷的潛水工作。重量輕、超小巧，可輕鬆放入 BCD 口袋。', 200, '/products/accessory/4.webp', '2024-11-01 15:14:43'),
(47, 'S-Tek 雙頭螺栓卡扣', 6, 'SCUBAPRO的S-Tek不銹鋼螺栓卡扣帶有鐳射蝕刻標誌，是將裝備夾在潛水安全帶和固定舞台水箱的完美選擇。', 170, '/products/accessory/5.webp', '2024-11-01 15:14:43'),
(48, '潛水清潔油，30cc', 6, '使用SCUBAPRO的100%有機SCUBA CLEAR防霧凝膠，以健康的方式保持您的面罩鏡片清澈無霧。只需輕輕一抹，一瓶就能讓您的鏡片使用多次。SCUBA CLEAR 的生物配方不含甲醛，不會刺激眼睛或皮膚，也不會對環境造成傷害。', 80, '/products/accessory/6.webp', '2024-11-01 15:14:43'),
(49, 'Mako 鈦合金潛水刀，3.5 吋', 6, 'MAKO TITANIUM 輕巧的刀身讓您不覺得它的存在，但它的鈦合金刀刃卻有著令人難以置信的強韌度、防鏽性以及可保持銳利刀刃的硬度。MAKO TITANIUM 提供多功能刃口，包括鋸齒刃口可鋸斷繩索、常規刃口可切出乾淨的切口、切線缺口和開瓶器。Tanto 刀尖具有一定的角度，是目前最堅固的刀尖之一。刀柄提供充足的握持區域以及拇指護板，以防止刀子滑落。附有鎖緊式刀鞘。這是一款出色的耐腐蝕、免維護的通用潛水刀。', 2700, '/products/accessory/7.webp', '2024-11-01 15:14:43');

-- --------------------------------------------------------

--
-- 資料表結構 `product_variants`
--

CREATE TABLE `product_variants` (
  `product_variant_id` int NOT NULL,
  `product_id` int NOT NULL,
  `size` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `color` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `stock` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `product_variants`
--

INSERT INTO `product_variants` (`product_variant_id`, `product_id`, `size`, `color`, `stock`) VALUES
(1, 13, 'S', '藍色', 10),
(2, 13, 'M', '藍色', 10),
(3, 13, 'L', '黑色', 20),
(4, 14, 'S', '紅色', 5),
(5, 14, 'M', '綠色', 10),
(6, 14, 'L', '藍色', 3),
(7, 14, 'S', '黃色', 7),
(8, 14, 'M', '黑色', 12),
(9, 15, 'S', '紫色', 4),
(10, 15, 'M', '橙色', 6),
(11, 15, 'L', '白色', 0),
(12, 15, 'S', '粉色', 9),
(13, 16, 'S', '灰色', 8),
(14, 16, 'M', '紅色', 15),
(15, 16, 'L', '藍色', 2),
(16, 17, 'S', '綠色', 10),
(17, 17, 'M', '紫色', 3),
(18, 17, 'L', '黑色', 11),
(19, 18, 'S', '黃色', 5),
(20, 18, 'M', '橙色', 0),
(21, 18, 'L', '白色', 7),
(22, 18, 'S', '粉色', 12),
(23, 18, 'M', '灰色', 4),
(24, 19, 'ONE SIZE', 'ONE COLOR', 12),
(25, 20, 'S', '紅色', 10),
(26, 20, 'M', '紅色', 10),
(27, 20, 'L', '紅色', 5),
(28, 20, 'XL', '紅色', 3),
(29, 21, 'S', '藍色', 7),
(30, 21, 'M', '黑色', 4),
(31, 21, 'L', '黃色', 2),
(32, 21, 'XL', '白色', 6),
(33, 22, 'ONE SIZE', '藍色', 8),
(34, 22, 'ONE SIZE', '黑色', 5),
(35, 23, 'S', '白色', 6),
(36, 23, 'M', '藍色', 2),
(37, 23, 'L', '黑色', 4),
(38, 24, 'ONE SIZE', 'ONE COLOR', 9),
(39, 25, 'S', '藍色', 10),
(40, 25, 'M', '黃色', 5),
(41, 25, 'L', '黑色', 3),
(42, 25, 'XL', '白色', 7),
(43, 26, 'ONE SIZE', '藍色', 12),
(44, 26, 'ONE SIZE', '黑色', 8),
(45, 27, 'S', '白色', 6),
(46, 27, 'M', '藍色', 4),
(47, 27, 'L', '黃色', 2),
(48, 28, 'S', '黑色', 9),
(49, 28, 'M', '白色', 5),
(50, 28, 'L', '藍色', 3),
(51, 28, 'XL', '黃色', 1),
(52, 29, 'ONE SIZE', 'ONE COLOR', 11),
(53, 30, 'S', '藍色', 8),
(54, 30, 'M', '黑色', 6),
(55, 30, 'L', '黃色', 4),
(56, 31, 'ONE SIZE', '藍色', 10),
(57, 31, 'ONE SIZE', '黑色', 5),
(58, 32, 'S', '白色', 8),
(59, 32, 'M', '黃色', 4),
(60, 32, 'L', '藍色', 6),
(61, 32, 'XL', '黑色', 3),
(62, 33, 'S', '黑色', 7),
(63, 33, 'M', '白色', 5),
(64, 33, 'L', '藍色', 2),
(65, 34, 'ONE SIZE', '黃色', 12),
(66, 35, 'S', '藍色', 6),
(67, 35, 'M', '黑色', 3),
(68, 35, 'L', '白色', 9),
(69, 35, 'XL', '黃色', 1),
(70, 36, 'ONE SIZE', 'ONE COLOR', 8),
(71, 37, 'ONE SIZE', 'ONE COLOR', 15),
(72, 38, 'ONE SIZE', 'ONE COLOR', 10),
(73, 39, 'ONE SIZE', 'ONE COLOR', 12),
(74, 40, 'ONE SIZE', 'ONE COLOR', 8),
(75, 41, 'ONE SIZE', 'ONE COLOR', 14),
(76, 42, 'ONE SIZE', 'ONE COLOR', 11),
(77, 43, 'ONE SIZE', 'ONE COLOR', 9),
(78, 44, 'ONE SIZE', 'ONE COLOR', 13),
(79, 45, 'ONE SIZE', 'ONE COLOR', 7),
(80, 46, 'ONE SIZE', 'ONE COLOR', 15),
(81, 47, 'ONE SIZE', 'ONE COLOR', 11),
(82, 48, 'ONE SIZE', 'ONE COLOR', 5),
(83, 49, 'ONE SIZE', 'ONE COLOR', 12);

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`user_id`) VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `cart_list`
--
ALTER TABLE `cart_list`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_variant_id` (`product_variant_id`);

--
-- 資料表索引 `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_variant_id` (`product_variant_id`);

--
-- 資料表索引 `order_list`
--
ALTER TABLE `order_list`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- 資料表索引 `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`product_category_id`);

--
-- 資料表索引 `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `product_id` (`product_id`);

--
-- 資料表索引 `product_list`
--
ALTER TABLE `product_list`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `product_category_id` (`product_category_id`);

--
-- 資料表索引 `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`product_variant_id`),
  ADD KEY `product_id` (`product_id`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `cart_list`
--
ALTER TABLE `cart_list`
  MODIFY `cart_id` int NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` int NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order_list`
--
ALTER TABLE `order_list`
  MODIFY `order_id` int NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `product_category_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product_images`
--
ALTER TABLE `product_images`
  MODIFY `image_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product_list`
--
ALTER TABLE `product_list`
  MODIFY `product_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `product_variant_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `cart_list`
--
ALTER TABLE `cart_list`
  ADD CONSTRAINT `cart_list_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `cart_list_ibfk_2` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`product_variant_id`);

--
-- 資料表的限制式 `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order_list` (`order_id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`product_variant_id`);

--
-- 資料表的限制式 `order_list`
--
ALTER TABLE `order_list`
  ADD CONSTRAINT `order_list_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- 資料表的限制式 `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_list` (`product_id`);

--
-- 資料表的限制式 `product_list`
--
ALTER TABLE `product_list`
  ADD CONSTRAINT `product_list_ibfk_1` FOREIGN KEY (`product_category_id`) REFERENCES `product_categories` (`product_category_id`);

--
-- 資料表的限制式 `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_list` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
