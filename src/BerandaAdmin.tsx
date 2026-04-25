import React, { useState, useEffect, useCallback } from "react";

interface AdminProps {
  onLogout: () => void;
  onGoLaporan: () => void;
  onGoKonsultasi: () => void;
}

const BerandaAdmin: React.FC<AdminProps> = ({
  onLogout,
  onGoLaporan,
  onGoKonsultasi,
}) => {
  const [stats, setStats] = useState({
    totalLaporan: 0,
    laporanSelesai: 0,
    totalKonsultasi: 0,
    konsultasiSelesai: 0,
  });

  const [bulan, setBulan] = useState<number>(new Date().getMonth() + 1);
  const [tahun, setTahun] = useState<number>(new Date().getFullYear());

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/admin/stats?bulan=${bulan}&tahun=${tahun}`,
      );
      if (!res.ok) throw new Error("Gagal memuat data");
      const data = await res.json();
      setStats({
        totalLaporan: data.totalLaporan || 0,
        laporanSelesai: data.laporanSelesai || 0,
        totalKonsultasi: data.totalKonsultasi || 0,
        konsultasiSelesai: data.konsultasiSelesai || 0,
      });
    } catch (err) {
      console.error("Gagal ambil stats:", err);
    }
  }, [bulan, tahun]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="min-h-screen bg-white font-sans text-left pb-20">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-100 bg-white sticky top-0 z-50">
        <h1 className="text-2xl font-black text-blue-900 italic tracking-tighter uppercase">
          SIBY Group
        </h1>

        <div className="flex items-center gap-8 font-bold text-sm">
          <button className="text-blue-900 border-b-2 border-blue-900 pb-1 uppercase">
            Beranda
          </button>
          <button
            onClick={onGoLaporan}
            className="text-gray-400 hover:text-blue-900 uppercase transition-colors"
          >
            Laporan
          </button>
          <button
            onClick={onGoKonsultasi}
            className="text-gray-400 hover:text-blue-900 uppercase transition-colors"
          >
            Konsultasi
          </button>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-full shadow-lg text-[10px] uppercase hover:bg-red-600 transition-all"
          >
            Log out
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="mx-10 mt-6 bg-[#1e1b4b] rounded-[40px] py-20 text-center shadow-xl">
        <h2 className="text-4xl font-black text-white mb-2 italic uppercase tracking-tight">
          SISTEM PENGADUAN MASALAH
        </h2>
        <p className="text-blue-300 font-bold tracking-[0.3em] text-[10px]">
          SMP TRIDHARMA MANADO
        </p>
      </div>

      {/* FILTER SECTION */}
      <div className="mx-10 mt-10 flex flex-col md:flex-row items-center justify-between gap-4 p-8 bg-gray-50 rounded-[30px] border border-gray-100 shadow-sm">
        <div className="text-left">
          <h3 className="text-sm font-black text-blue-900 uppercase">
            Statistik
          </h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase">
            Pilih Periode Tertentu
          </p>
        </div>
        <div className="flex gap-4">
          <select
            value={bulan}
            onChange={(e) => setBulan(Number(e.target.value))}
            className="px-6 py-3 rounded-2xl bg-white border border-gray-200 text-xs font-black uppercase outline-none focus:border-blue-500"
          >
            {[
              "Januari",
              "Februari",
              "Maret",
              "April",
              "Mei",
              "Juni",
              "Juli",
              "Agustus",
              "September",
              "Oktober",
              "November",
              "Desember",
            ].map((m, i) => (
              <option key={i} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
          <select
            value={tahun}
            onChange={(e) => setTahun(Number(e.target.value))}
            className="px-6 py-3 rounded-2xl bg-white border border-gray-200 text-xs font-black uppercase outline-none focus:border-blue-500"
          >
            {[2024, 2025, 2026, 2027].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4 PANEL STATISTIK */}
      <div className="mx-10 mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          onClick={onGoLaporan}
          className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 flex flex-col items-center cursor-pointer hover:bg-blue-50 transition-all"
        >
          <p className="text-[9px] font-black text-gray-400 uppercase mb-2 tracking-widest text-center">
            Total Laporan
          </p>
          <h4 className="text-4xl font-black text-blue-900">
            {stats.totalLaporan}
          </h4>
        </div>

        <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 flex flex-col items-center">
          <p className="text-[9px] font-black text-gray-400 uppercase mb-2 tracking-widest text-center">
            Laporan Selesai
          </p>
          <h4 className="text-4xl font-black text-green-500">
            {stats.laporanSelesai}
          </h4>
        </div>

        <div
          onClick={onGoKonsultasi}
          className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 flex flex-col items-center cursor-pointer hover:bg-orange-50 transition-all"
        >
          <p className="text-[9px] font-black text-gray-400 uppercase mb-2 tracking-widest text-center">
            Total Konsultasi
          </p>
          <h4 className="text-4xl font-black text-orange-500">
            {stats.totalKonsultasi}
          </h4>
        </div>

        <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 flex flex-col items-center">
          <p className="text-[9px] font-black text-gray-400 uppercase mb-2 tracking-widest text-center">
            Konsultasi Selesai
          </p>
          <h4 className="text-4xl font-black text-blue-500">
            {stats.konsultasiSelesai}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default BerandaAdmin;
