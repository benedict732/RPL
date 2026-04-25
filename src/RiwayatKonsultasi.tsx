import React, { useState, useEffect } from "react";

interface Props {
  onBack: () => void;
}

const RiwayatKonsultasi: React.FC<Props> = ({ onBack }) => {
  const [riwayat, setRiwayat] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchRiwayat = async () => {
      if (!user.id) return;
      try {
        // Mengambil data asli dari database dbtridharma
        const res = await fetch(`http://localhost:8080/api/riwayat/${user.id}`);
        const data = await res.json();
        setRiwayat(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Gagal mengambil riwayat konsultasi");
      }
    };
    fetchRiwayat();
  }, [user.id]);

  return (
    <div className="min-h-screen bg-white p-10 font-sans text-left">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-blue-900 italic uppercase tracking-tighter">
          Riwayat Konsultasi
        </h2>
        <button
          onClick={onBack}
          className="bg-red-500 text-white px-8 py-2 rounded-full font-bold shadow-lg active:scale-95 transition-all"
        >
          Kembali
        </button>
      </div>

      <div className="space-y-6">
        {riwayat.length > 0 ? (
          riwayat.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-50 flex justify-between items-center relative overflow-hidden"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-2xl">
                  {item.status === "Diterima" ? "✓" : "!"}
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    {item.tanggal}
                  </p>
                  <h4 className="text-xl font-black text-blue-900">
                    {item.nama_guru}
                  </h4>
                  <p className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter">
                    Klik untuk lihat status & link →
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-md ${
                    item.status === "Diterima" ? "bg-orange-500" : "bg-blue-600"
                  }`}
                >
                  {item.status}
                </span>
                <p className="mt-2 text-[10px] font-bold text-gray-300 italic">
                  {item.jam} WITA
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold italic">
              Belum ada data konsultasi. Silakan buat janji terlebih dahulu.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiwayatKonsultasi;
