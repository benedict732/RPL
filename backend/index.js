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

// 1. Konfigurasi Folder Uploads (untuk foto bukti)
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// 2. Koneksi Database
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "dbtridharma",
});

db.connect((err) => {
  if (err) return console.error("Koneksi Gagal:", err);
  console.log(`✅ Server & Database AKTIF!`);
});

// --- [ AUTH SECTION ] ---

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length > 0) {
        res.json({ success: true, user: result[0] });
      } else {
        res.json({ success: false, message: "Email atau Password salah!" });
      }
    },
  );
});

app.post("/api/register", (req, res) => {
  const { nama, email, password, kelas } = req.body;
  const role = "siswa";
  db.query(
    "INSERT INTO users (nama, email, password, kelas, role) VALUES (?, ?, ?, ?, ?)",
    [nama, email, password, kelas, role],
    (err) => {
      if (err) return res.status(500).json({ success: false, err });
      res.json({ success: true });
    },
  );
});

// --- [ FITUR LAPORAN SISWA ] ---

app.post("/api/laporan", upload.single("foto"), (req, res) => {
  const { id_siswa, kategori, isi_laporan } = req.body;
  const foto = req.file ? req.file.filename : null;
  const tanggal = new Date().toISOString().split("T")[0];

  db.query(
    "INSERT INTO laporan (id_siswa, kategori, isi_laporan, foto, tanggal_lapor, status) VALUES (?, ?, ?, ?, ?, 'Terkirim')",
    [id_siswa, kategori, isi_laporan, foto, tanggal],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    },
  );
});

app.get("/api/laporan/user/:id_siswa", (req, res) => {
  db.query(
    "SELECT * FROM laporan WHERE id_siswa = ? ORDER BY id DESC",
    [req.params.id_siswa],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    },
  );
});

// --- [ FITUR KONSULTASI SISWA ] ---

app.get("/api/guru", (req, res) => {
  db.query("SELECT * FROM guru", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/api/konsultasi", (req, res) => {
  const { id_siswa, id_guru, tanggal, jam, topik } = req.body;
  db.query(
    "INSERT INTO konsultasi (id_siswa, id_guru, tanggal, jam, topik, status) VALUES (?, ?, ?, ?, ?, 'Terkirim')",
    [id_siswa, id_guru, tanggal, jam, topik],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    },
  );
});

// ROUTE INI YANG TADI 404 (PENTING!)
app.get("/api/riwayat/:id_siswa", (req, res) => {
  const sql = `
    SELECT k.*, g.nama_guru 
    FROM konsultasi k 
    JOIN guru g ON k.id_guru = g.id_guru 
    WHERE k.id_siswa = ? 
    ORDER BY k.id DESC
  `;
  db.query(sql, [req.params.id_siswa], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// --- [ FITUR ADMIN ] ---

// Ambil semua laporan untuk admin
app.get("/api/admin/laporan", (req, res) => {
  const sql = `
    SELECT l.*, u.nama, u.kelas 
    FROM laporan l 
    JOIN users u ON l.id_siswa = u.id 
    ORDER BY l.id DESC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Update status laporan
app.put("/api/admin/update-laporan/:id", (req, res) => {
  const { status } = req.body;
  db.query(
    "UPDATE laporan SET status = ? WHERE id = ?",
    [status, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    },
  );
});

// Ambil semua permintaan konsultasi untuk admin
app.get("/api/admin/konsultasi", (req, res) => {
  const sql = `
    SELECT k.*, u.nama as nama_siswa, u.kelas, g.nama_guru 
    FROM konsultasi k 
    JOIN users u ON k.id_siswa = u.id 
    JOIN guru g ON k.id_guru = g.id_guru 
    ORDER BY k.id DESC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Update detail konsultasi (Link Zoom, Jam Fix, Pesan)
app.put("/api/admin/update-konsultasi/:id", (req, res) => {
  const { jam, link_zoom, pesan_admin, status } = req.body;
  db.query(
    "UPDATE konsultasi SET jam = ?, link_zoom = ?, pesan_admin = ?, status = ? WHERE id = ?",
    [jam, link_zoom, pesan_admin, status, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    },
  );
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
