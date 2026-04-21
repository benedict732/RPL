import { useState } from "react";

interface Props {
  onBack: () => void;
  onSent: () => void;
}

const Konsultasi: React.FC<Props> = ({ onBack, onSent }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [guru, setGuru] = useState("Ibu Maria S.Psi (BK)");
  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");
  const [topik, setTopik] = useState("");

  const handleKirim = async () => {
    // 1. VALIDASI JAM OPERASIONAL (08.00 - 16.00)
    if (!jam) {
      alert("Silakan pilih jam terlebih dahulu!");
      return;
    }

    const jamTerpilih = parseInt(jam.split(":")[0]); // Ambil angka jamnya saja

    if (jamTerpilih < 8 || jamTerpilih >= 16) {
      alert(
        "Maaf, layanan konsultasi hanya tersedia pada jam operasional: 08.00 - 16.00 WITA.",
      );
      return;
    }

    if (!tanggal || !topik) {
      alert("Harap isi semua formulir!");
      return;
    }

    // 2. LOGIKA KIRIM KE BACKEND
    try {
      const response = await fetch("http://localhost:8080/api/konsultasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_siswa: user.id,
          id_guru: guru === "Ibu Maria S.Psi (BK)" ? 1 : 2, // Simulasi ID Guru
          tanggal: tanggal,
          jam: jam,
          topik: topik,
        }),
      });

      if (response.ok) {
        alert(
          "Permintaan terkirim! Silakan cek status secara berkala di Riwayat.",
        );
        onSent();
      }
    } catch (error) {
      alert("Gagal menghubungi server!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 border border-blue-50">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="text-4xl text-blue-900 hover:scale-110 transition-transform"
          >
            ↩
          </button>
          <h1 className="text-xl font-black text-blue-900 uppercase tracking-tighter">
            Janji Konsultasi
          </h1>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Pilih Guru
            </label>
            <select
              value={guru}
              onChange={(e) => setGuru(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-200 font-bold text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Ibu Maria S.Psi (BK)</option>
              <option>Pak Yohanes (Kesiswaan)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Tanggal
              </label>
              <input
                type="date"
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-200 font-bold text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Jam (08-16)
              </label>
              <input
                type="time"
                onChange={(e) => setJam(e.target.value)}
                className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-200 font-bold text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Topik Masalah
            </label>
            <textarea
              placeholder="Apa yang ingin dikonsultasikan?"
              onChange={(e) => setTopik(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-200 font-medium text-gray-600 outline-none h-32 resize-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            onClick={handleKirim}
            className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-black transition-all active:scale-95"
          >
            Kirim Permintaan
          </button>
        </div>

        <p className="text-center mt-6 text-[9px] font-black text-gray-300 uppercase tracking-widest">
          Jam Operasional: 08.00 - 16.00 WITA
        </p>
      </div>
    </div>
  );
};

export default Konsultasi;
