import React, { useState, useEffect } from "react";

interface Props {
  onLogout: () => void;
  onGoLaporan: () => void;
  onGoKonsultasi: () => void;
}

const BerandaKepsek: React.FC<Props> = ({
  onLogout,
  onGoLaporan,
  onGoKonsultasi,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [stats, setStats] = useState<any>({
    totalPengaduan: 0,
    pengaduanSelesai: 0,
    totalKonsultasi: 0,
    konsultasiSelesai: 0,
    kategori: { BULLYING: 0, FASILITAS: 0, KEKERASAN: 0, LAINNYA: 0 },
  });

  useEffect(() => {
    fetch(
      `http://localhost:8080/api/admin/stats?bulan=${selectedMonth}&tahun=${selectedYear}`,
    )
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Gagal mengambil statistik:", err));
  }, [selectedMonth, selectedYear]);

  const getPercentage = (value: number) => {
    return stats.totalPengaduan > 0 ? (value / stats.totalPengaduan) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-left text-blue-900">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-[30px] shadow-sm border border-blue-50">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter text-blue-900">
            SIBY Group{" "}
          </h1>
        </div>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-8 py-2 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-lg active:scale-95 transition-all"
        >
          Log Out
        </button>
      </div>

      {/* FILTER PERIODE */}
      <div className="flex gap-4 mb-8 bg-white p-6 rounded-[30px] shadow-md border border-blue-50 items-center justify-between">
        <div>
          <h3 className="text-xs font-black uppercase italic text-gray-400">
            Pilih Periode Monitoring
          </h3>
        </div>
        <div className="flex gap-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="px-4 py-2 rounded-xl bg-gray-100 font-bold outline-none border-none text-sm"
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
                {m.toUpperCase()}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-4 py-2 rounded-xl bg-gray-100 font-bold outline-none border-none text-sm"
          >
            {[2025, 2026, 2027].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* PANEL STATISTIK UTAMA (SELESAI) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 text-center">
        <div className="bg-white p-10 rounded-[45px] shadow-xl border-b-8 border-green-500">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
            Pengaduan Selesai
          </p>
          <p className="text-6xl font-black text-green-500">
            {stats.pengaduanSelesai}
          </p>
          <p className="text-xs text-gray-400 mt-2 font-bold italic">
            Dari Total {stats.totalPengaduan} Masalah
          </p>
        </div>
        <div className="bg-white p-10 rounded-[45px] shadow-xl border-b-8 border-purple-500">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
            Konsultasi Selesai
          </p>
          <p className="text-6xl font-black text-purple-500">
            {stats.konsultasiSelesai}
          </p>
          <p className="text-xs text-gray-400 mt-2 font-bold italic">
            Dari Total {stats.totalKonsultasi} Janji
          </p>
        </div>
      </div>

      {/* GRAFIK PER KATEGORI */}
      <div className="bg-white p-10 rounded-[50px] shadow-2xl border border-blue-50 mb-10">
        <h3 className="text-xl font-black italic uppercase mb-8 border-b pb-4">
          Grafik Masalah Per Kategori
        </h3>
        <div className="space-y-8">
          {[
            {
              label: "Bullying",
              value: stats.kategori.BULLYING,
              color: "bg-red-500",
            },
            {
              label: "Fasilitas",
              value: stats.kategori.FASILITAS,
              color: "bg-blue-500",
            },
            {
              label: "Kekerasan",
              value: stats.kategori.KEKERASAN,
              color: "bg-orange-500",
            },
            {
              label: "Lainnya",
              value: stats.kategori.LAINNYA,
              color: "bg-gray-400",
            },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between items-end mb-2">
                <p className="font-black uppercase text-sm italic">
                  {item.label}
                </p>
                <p className="font-black text-lg">
                  {item.value}{" "}
                  <span className="text-[10px] text-gray-300">Kasus</span>
                </p>
              </div>
              <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
                <div
                  className={`${item.color} h-full transition-all duration-1000 ease-out`}
                  style={{ width: `${getPercentage(item.value)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NAVIGASI MONITORING */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <button
          onClick={onGoLaporan}
          className="bg-white p-8 rounded-[40px] shadow-lg border-2 border-transparent hover:border-blue-900 transition-all flex justify-between items-center group"
        >
          <div className="text-left">
            <h3 className="text-xl font-black uppercase italic">
              Monitor Pengaduan
            </h3>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              Detail Masalah Siswa
            </p>
          </div>
          <span className="text-3xl group-hover:translate-x-2 transition-transform">
            ➡️
          </span>
        </button>

        <button
          onClick={onGoKonsultasi}
          className="bg-white p-8 rounded-[40px] shadow-lg border-2 border-transparent hover:border-blue-900 transition-all flex justify-between items-center group"
        >
          <div className="text-left">
            <h3 className="text-xl font-black uppercase italic">
              Monitor Konsultasi
            </h3>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              Detail Bimbingan Guru
            </p>
          </div>
          <span className="text-3xl group-hover:translate-x-2 transition-transform">
            ➡️
          </span>
        </button>
      </div>
    </div>
  );
};

export default BerandaKepsek;
