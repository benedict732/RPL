import "dotenv/config";
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// Pastikan folder uploads ada, jika tidak, buat otomatis
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Konfigurasi akses file statis agar foto bisa dipanggil di frontend
app.use("/uploads", express.static("uploads"));

// Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Nama file unik: timestamp + ekstensi asli
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Batas 5MB
});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) return console.error("Koneksi Gagal:", err);
  console.log(
    `✅ Database ${process.env.DB_NAME} Siap Tempur dengan Fitur Upload!`,
  );
});

// --- API LAPORAN (DENGAN UPLOAD FOTO) ---
app.post("/api/laporan", upload.single("foto"), (req, res) => {
  const { id_siswa, kategori, isi_laporan, tanggal_lapor } = req.body;
  const foto = req.file ? req.file.filename : null;

  const sql =
    "INSERT INTO laporan (id_siswa, kategori, isi_laporan, tanggal_lapor, foto, status) VALUES (?, ?, ?, ?, ?, 'Terkirim')";
  db.query(
    sql,
    [id_siswa, kategori, isi_laporan, tanggal_lapor, foto],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false });
      }
      res.json({ success: true });
    },
  );
});

// --- API AUTH, GURU, & KONSULTASI (TETAP SAMA) ---
app.post("/api/register", (req, res) => {
  const { nama, email, password, kelas } = req.body;
  db.query(
    "INSERT INTO users (nama, email, password, kelas, role) VALUES (?, ?, ?, ?, 'siswa')",
    [nama, email, password, kelas],
    (err) => {
      if (err) res.json({ success: false });
      else res.json({ success: true });
    },
  );
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (result.length > 0) res.json({ success: true, user: result[0] });
      else res.json({ success: false, message: "Email/Password salah" });
    },
  );
});

app.get("/api/guru", (req, res) => {
  db.query("SELECT * FROM guru", (err, result) => res.json(result));
});

app.get("/api/admin/laporan", (req, res) => {
  db.query(
    "SELECT l.*, u.nama, u.kelas FROM laporan l JOIN users u ON l.id_siswa = u.id ORDER BY l.id DESC",
    (err, result) => res.json(result),
  );
});

app.post("/api/konsultasi", (req, res) => {
  const { id_siswa, id_guru, tanggal, jam, topik } = req.body;
  db.query(
    "INSERT INTO konsultasi (id_siswa, id_guru, tanggal, jam, topik, status) VALUES (?,?,?,?,?,'Terkirim')",
    [id_siswa, id_guru, tanggal, jam, topik],
    () => res.json({ success: true }),
  );
});

app.get("/api/riwayat/:id_siswa", (req, res) => {
  db.query(
    "SELECT k.*, g.nama_guru FROM konsultasi k JOIN guru g ON k.id_guru = g.id_guru WHERE k.id_siswa = ? ORDER BY k.id DESC",
    [req.params.id_siswa],
    (err, result) => res.json(result),
  );
});

app.listen(8080, () => console.log(`🚀 Server Berjalan di Port 8080`));
