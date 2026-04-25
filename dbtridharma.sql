-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versi server:                 8.4.3 - MySQL Community Server - GPL
-- OS Server:                    Win64
-- HeidiSQL Versi:               12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- membuang struktur untuk table dbtridharma.guru
CREATE TABLE IF NOT EXISTS `guru` (
  `id_guru` int NOT NULL AUTO_INCREMENT,
  `nama_guru` varchar(100) NOT NULL,
  `spesialisasi` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_guru`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Membuang data untuk tabel dbtridharma.guru: ~1 rows (lebih kurang)
DELETE FROM `guru`;
INSERT INTO `guru` (`id_guru`, `nama_guru`, `spesialisasi`) VALUES
	(1, '', NULL);

-- membuang struktur untuk table dbtridharma.konsultasi
CREATE TABLE IF NOT EXISTS `konsultasi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_siswa` int NOT NULL,
  `id_guru` int NOT NULL,
  `tanggal` date NOT NULL,
  `jam` time NOT NULL,
  `topik` text NOT NULL,
  `status` enum('MENUNGGU','DITERIMA','SELESAI','DITOLAK') DEFAULT 'MENUNGGU',
  `link_zoom` varchar(255) DEFAULT NULL,
  `pesan_admin` text,
  PRIMARY KEY (`id`),
  KEY `fk_konsultasi_siswa` (`id_siswa`),
  KEY `fk_konsultasi_guru` (`id_guru`),
  CONSTRAINT `fk_konsultasi_guru` FOREIGN KEY (`id_guru`) REFERENCES `guru` (`id_guru`) ON DELETE CASCADE,
  CONSTRAINT `fk_konsultasi_siswa` FOREIGN KEY (`id_siswa`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Membuang data untuk tabel dbtridharma.konsultasi: ~0 rows (lebih kurang)
DELETE FROM `konsultasi`;

-- membuang struktur untuk table dbtridharma.laporan
CREATE TABLE IF NOT EXISTS `laporan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_siswa` int NOT NULL,
  `kategori` varchar(50) NOT NULL,
  `isi_laporan` text NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `tanggal_lapor` date NOT NULL,
  `status` enum('DIPROSES','SELESAI') DEFAULT 'DIPROSES',
  `catatan_admin` text,
  PRIMARY KEY (`id`),
  KEY `fk_laporan_siswa` (`id_siswa`),
  CONSTRAINT `fk_laporan_siswa` FOREIGN KEY (`id_siswa`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Membuang data untuk tabel dbtridharma.laporan: ~0 rows (lebih kurang)
DELETE FROM `laporan`;

-- membuang struktur untuk table dbtridharma.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `kelas` varchar(50) DEFAULT NULL,
  `role` enum('siswa','admin','kepala sekolah') DEFAULT 'siswa',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Membuang data untuk tabel dbtridharma.users: ~1 rows (lebih kurang)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `nama`, `email`, `password`, `kelas`, `role`, `created_at`) VALUES
	(1, 'Rafael Siby', 'rafaelsiby12@gmail.com', 'rafael#123', '9', 'siswa', '2026-04-21 19:09:30');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
