import React, { useState, useEffect } from "react";

// Perbaikan 1: Interface harus sama persis dengan yang dipanggil di App.tsx
interface Props {
  onLogout: () => void;
  onTambahLaporan: () => void;
  onLihatDetail: (item: any) => void;
  onGoKonsultasi: () => void;
  onGoRiwayat: () => void;
  // Jika di App.tsx kamu tidak mengirim onGoRiwayatLapor,
  // maka di sini kita buat opsional pakai '?' agar tidak error.
  onGoRiwayatLapor?: () => void;
}

const Beranda: React.FC<Props> = ({
  onLogout,
  onTambahLaporan,
  onLihatDetail,
  onGoKonsultasi,
  onGoRiwayat,
  onGoRiwayatLapor,
}) => {
  const [riwayatLaporan, setRiwayatLaporan] = useState<any[]>([]);
  const [riwayatKonsultasi, setRiwayatKonsultasi] = useState<any[]>([]);

  // Perbaikan 2: Ambil user dengan aman
  const [user] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        const resLapor = await fetch(
          `http://localhost:8080/api/laporan/user/${user.id}`,
        );
        if (resLapor.ok) {
          const dataLapor = await resLapor.json();
          setRiwayatLaporan(Array.isArray(dataLapor) ? dataLapor : []);
        }

        const resKonsul = await fetch(
          `http://localhost:8080/api/riwayat/${user.id}`,
        );
        if (resKonsul.ok) {
          const dataKonsul = await resKonsul.json();
          setRiwayatKonsultasi(Array.isArray(dataKonsul) ? dataKonsul : []);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-white font-sans text-left">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-100">
        <h1 className="text-2xl font-black text-blue-900 italic tracking-tighter uppercase">
          SIBY Group
        </h1>
        <div className="flex items-center gap-8 font-bold text-sm">
          <button className="text-blue-900 border-b-2 border-blue-900 pb-1">
            Beranda
          </button>
          <button
            onClick={onGoKonsultasi}
            className="text-gray-400 hover:text-blue-900 transition-all uppercase"
          >
            Konsultasi
          </button>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-full shadow-lg active:scale-95 transition-all uppercase tracking-widest text-[10px]"
          >
            Log out
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="mx-10 mt-6 bg-blue-900 rounded-[40px] py-20 text-center shadow-xl">
        <h2 className="text-4xl font-black text-white mb-2 italic uppercase tracking-tight">
          Sistem Pengaduan Masalah
        </h2>
        <p className="text-blue-300 font-bold tracking-[0.3em] mb-10 text-[10px]">
          SMP TRIDHARMA MANADO
        </p>
        <button
          onClick={onTambahLaporan}
          className="bg-blue-500 text-white font-black px-10 py-4 rounded-2xl shadow-lg uppercase text-sm hover:bg-blue-400 active:scale-95 transition-all"
        >
          Laporkan Sekarang!
        </button>
      </div>

      <div className="mx-10 mt-12 mb-20 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Riwayat Laporan */}
        <section>
          <div className="flex justify-between items-center mb-6 border-l-4 border-blue-500 pl-4">
            <h3 className="text-xl font-black text-blue-900 uppercase italic">
              Riwayat Laporan
            </h3>
            <button
              onClick={onGoRiwayatLapor} // Menghubungkan ke fungsi detail laporan jika ada
              className="text-[10px] font-black text-blue-500 underline uppercase"
            >
              Lihat Semua ↩
            </button>
          </div>
          <div className="space-y-4">
            {riwayatLaporan.length > 0 ? (
              riwayatLaporan.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onLihatDetail(item)}
                  className="bg-white p-6 rounded-[30px] shadow-md border border-gray-100 flex justify-between items-center cursor-pointer hover:border-blue-300 group transition-all"
                >
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                      {item.tanggal_lapor}
                    </p>
                    <p className="font-bold text-blue-900 uppercase">
                      Kasus {item.kategori}
                    </p>
                  </div>
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase">
                    {item.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-300 font-bold italic ml-4 text-sm">
                Belum ada laporan...
              </p>
            )}
          </div>
        </section>

        {/* Riwayat Konsultasi */}
        <section>
          <div className="flex justify-between items-center mb-6 border-l-4 border-orange-500 pl-4">
            <h3 className="text-xl font-black text-blue-900 uppercase italic">
              Riwayat Konsultasi
            </h3>
            <button
              onClick={onGoRiwayat}
              className="text-[10px] font-black text-orange-500 underline uppercase"
            >
              Lihat Semua ↩
            </button>
          </div>
          <div className="space-y-4">
            {riwayatKonsultasi.length > 0 ? (
              riwayatKonsultasi.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  onClick={onGoRiwayat}
                  className="bg-white p-6 rounded-[30px] shadow-md border border-gray-100 flex justify-between items-center cursor-pointer hover:border-orange-300 transition-all"
                >
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                      {item.tanggal}
                    </p>
                    <p className="font-bold text-blue-900 uppercase">
                      {item.nama_guru || "Guru BK"}
                    </p>
                  </div>
                  <span
                    className={`text-white px-4 py-1 rounded-full text-[9px] font-black uppercase ${item.status === "Diterima" ? "bg-orange-500" : "bg-blue-600"}`}
                  >
                    {item.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-300 font-bold italic ml-4 text-sm">
                Belum ada jadwal...
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Beranda;
