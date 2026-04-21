import React from "react";

// DI SINI KUNCINYA: Tambahkan kedua fungsi ini ke interface
interface AdminProps {
  onLogout: () => void;
  onLihatLaporan: () => void; // <-- Tambahkan ini
  onLihatKonsultasi: () => void; // <-- Tambahkan ini
}

const BerandaAdmin: React.FC<AdminProps> = ({
  onLogout,
  onLihatLaporan,
  onLihatKonsultasi,
}) => {
  const stats = [
    {
      title: "Laporan Diterima",
      value: "12",
      borderColor: "border-blue-500",
      action: onLihatLaporan,
    },
    {
      title: "Laporan Selesai",
      value: "08",
      borderColor: "border-green-500",
      action: onLihatLaporan,
    },
    {
      title: "Konsultasi Baru",
      value: "05",
      borderColor: "border-yellow-500",
      action: onLihatKonsultasi,
    },
    {
      title: "Konsultasi Selesai",
      value: "03",
      borderColor: "border-pink-500",
      action: onLihatKonsultasi,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-[#1e1b4b]">
      <nav className="flex justify-between items-center px-10 py-5 bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold">
            A
          </div>
          <div className="text-xl font-black text-blue-900 tracking-tighter uppercase">
            SIBY Group
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-bold text-blue-900 border-b-2 border-blue-900 px-2 pb-1">
            Dashboard
          </button>
          <button
            onClick={onLogout}
            className="px-8 py-2 bg-[#ef4444] text-white rounded-full text-sm font-bold hover:bg-red-600 transition-all shadow-md active:scale-95"
          >
            LOG OUT
          </button>
        </div>
      </nav>

      <div className="bg-gradient-to-r from-[#1e1b4b] via-blue-800 to-[#1e1b4b] pt-16 pb-24 text-center text-white relative shadow-lg">
        <h1 className="text-4xl font-black mb-3 tracking-tight text-white">
          Sistem Pengaduan Masalah
        </h1>
        <p className="text-sm font-light mb-10 text-blue-100 uppercase tracking-[0.3em] opacity-80 font-bold">
          SMP TRIDHARMA MANADO
        </p>

        <div className="flex justify-center gap-6">
          <button
            onClick={onLihatLaporan}
            className="bg-[#60a5fa] hover:bg-blue-400 text-blue-950 font-black px-12 py-3.5 rounded-2xl shadow-xl transition-all active:scale-95 border-b-4 border-blue-600 uppercase tracking-widest text-xs"
          >
            Lihat Laporan
          </button>
          <button
            onClick={onLihatKonsultasi}
            className="bg-[#60a5fa] hover:bg-blue-400 text-blue-950 font-black px-12 py-3.5 rounded-2xl shadow-xl transition-all active:scale-95 border-b-4 border-blue-600 uppercase tracking-widest text-xs"
          >
            Konsultasi
          </button>
        </div>
      </div>

      <div className="px-10 py-20 flex-grow">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => (
            <div
              key={item.title}
              onClick={item.action}
              className="group transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer active:scale-95"
            >
              <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] text-center mb-3 group-hover:text-blue-900 transition-colors">
                {item.title}
              </h3>
              <div
                className={`bg-white h-32 rounded-[25px] shadow-xl border-b-[6px] ${item.borderColor} flex items-center justify-center`}
              >
                <span className="text-4xl font-black text-[#1e1b4b] tracking-tighter">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="py-10 text-center">
        <p className="text-gray-300 text-[10px] font-bold uppercase tracking-[0.4em]">
          &copy; 2026{" "}
          <span className="text-blue-900">SMP TRIDHARMA MANADO</span> • SIBY
          Group
        </p>
      </footer>
    </div>
  );
};

export default BerandaAdmin;
