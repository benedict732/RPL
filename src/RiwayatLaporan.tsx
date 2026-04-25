import React, { useState, useEffect } from "react";

interface Props {
  onBack: () => void;
  onLihatDetail: (item: any) => void;
}

const RiwayatLaporan: React.FC<Props> = ({ onBack, onLihatDetail }) => {
  const [riwayat, setRiwayat] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchLaporan = async () => {
      if (!user.id) return;
      try {
        const res = await fetch(
          `http://localhost:8080/api/laporan/user/${user.id}`,
        );
        const data = await res.json();
        setRiwayat(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Gagal ambil data laporan");
      }
    };
    fetchLaporan();
  }, [user.id]);

  return (
    <div className="min-h-screen bg-white p-10 font-sans text-left">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-blue-900 italic uppercase tracking-tighter border-l-8 border-blue-600 pl-4">
          Semua Laporan Saya
        </h2>
        <button
          onClick={onBack}
          className="bg-red-500 text-white px-8 py-2 rounded-full font-bold shadow-lg active:scale-95 transition-all uppercase text-xs"
        >
          Kembali
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {riwayat.length > 0 ? (
          riwayat.map((item) => (
            <div
              key={item.id}
              onClick={() => onLihatDetail(item)}
              className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-50 flex justify-between items-center cursor-pointer hover:border-blue-500 transition-all group"
            >
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  {item.tanggal_lapor}
                </p>
                <h4 className="text-xl font-black text-blue-900 group-hover:text-blue-600">
                  Kasus {item.kategori}
                </h4>
                <p className="text-[10px] text-gray-400 mt-2 truncate w-48">
                  {item.isi_laporan}
                </p>
              </div>
              <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
                {item.status}
              </span>
            </div>
          ))
        ) : (
          <div className="col-span-2 py-20 text-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold italic text-sm">
              Belum ada laporan yang tercatat.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiwayatLaporan;
