import React, { useState, useEffect } from "react";

interface Props {
  onLogout: () => void;
  onTambahLaporan: () => void;
  onLihatDetail: (item: any) => void;
  onGoKonsultasi: () => void;
  onGoRiwayat: () => void;
}

const Beranda: React.FC<Props> = ({
  onLogout,
  onTambahLaporan,
  onLihatDetail,
  onGoKonsultasi,
  onGoRiwayat,
}) => {
  const [riwayatLaporan, setRiwayatLaporan] = useState<any[]>([]);
  const [riwayatKonsultasi, setRiwayatKonsultasi] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil Laporan
        const resLapor = await fetch(`http://localhost:8080/api/admin/laporan`);
        const dataLapor = await resLapor.json();
        setRiwayatLaporan(
          dataLapor.filter((i: any) => i.id_siswa === user.id).slice(0, 1),
        );

        // Ambil Konsultasi
        const resKonsul = await fetch(
          `http://localhost:8080/api/riwayat/${user.id}`,
        );
        const dataKonsul = await resKonsul.json();
        setRiwayatKonsultasi(dataKonsul.slice(0, 1));
      } catch (err) {
        console.error("Gagal ambil data");
      }
    };
    if (user.id) fetchData();
  }, [user.id]);

  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-100">
        <h1 className="text-2xl font-black text-blue-900 italic">SIBY Group</h1>
        <div className="flex items-center gap-8 font-bold">
          <button className="text-blue-900 border-b-2 border-blue-900">
            Beranda
          </button>
          <button
            onClick={onGoKonsultasi}
            className="text-gray-400 hover:text-blue-900 transition-all"
          >
            Konsultasi
          </button>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-full shadow-lg active:scale-95 transition-all"
          >
            Log out
          </button>
        </div>
      </nav>

      <div className="mx-10 mt-6 bg-blue-900 rounded-[40px] py-20 text-center shadow-xl">
        <h2 className="text-4xl font-black text-white mb-2 italic uppercase">
          Sistem Pengaduan Masalah
        </h2>
        <p className="text-blue-300 font-bold tracking-[0.2em] mb-10 text-[10px]">
          SMP TRIDHARMA MANADO
        </p>
        <button
          onClick={onTambahLaporan}
          className="bg-blue-500 text-white font-black px-10 py-4 rounded-2xl shadow-lg uppercase tracking-widest text-sm hover:bg-blue-400 active:scale-95 transition-all"
        >
          Laporkan Sekarang!
        </button>
      </div>

      <div className="mx-10 mt-12 mb-20 grid grid-cols-1 md:grid-cols-2 gap-10">
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-blue-900 uppercase">
              Riwayat Laporan
            </h3>
          </div>
          {riwayatLaporan.length > 0 ? (
            riwayatLaporan.map((item) => (
              <div
                key={item.id}
                onClick={() => onLihatDetail(item)}
                className="bg-white p-6 rounded-[30px] shadow-md border border-gray-100 flex justify-between items-center cursor-pointer hover:border-blue-300 transition-all"
              >
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase">
                    {new Date(item.tanggal_lapor).toLocaleDateString("id-ID")}
                  </p>
                  <p className="font-bold text-blue-900">
                    Kasus {item.kategori} - {user.nama}
                  </p>
                </div>
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase">
                  {item.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-300 italic font-bold">
              Belum ada laporan...
            </p>
          )}
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-blue-900 uppercase">
              Riwayat Konsultasi
            </h3>
          </div>
          {riwayatKonsultasi.length > 0 ? (
            riwayatKonsultasi.map((item) => (
              <div
                key={item.id}
                onClick={onGoRiwayat}
                className="bg-white p-6 rounded-[30px] shadow-md border border-gray-100 flex justify-between items-center cursor-pointer hover:border-orange-300 transition-all"
              >
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase">
                    {item.status === "Diterima" ? "Jadwal Fix" : "Menunggu"}
                  </p>
                  <p className="font-bold text-blue-900">{item.nama_guru}</p>
                </div>
                <span
                  className={`${item.status === "Diterima" ? "bg-orange-500" : "bg-blue-600"} text-white px-4 py-1 rounded-full text-[9px] font-black uppercase`}
                >
                  {item.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-300 italic font-bold">
              Belum ada konsultasi...
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Beranda;
