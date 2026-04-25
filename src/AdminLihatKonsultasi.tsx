import React, { useState, useEffect } from "react";

interface Props {
  onBack: () => void;
  onDetail: (item: any) => void;
}

const AdminLihatKonsultasi: React.FC<Props> = ({ onBack, onDetail }) => {
  const [daftarKonsultasi, setDaftarKonsultasi] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/konsultasi")
      .then((res) => res.json())
      .then((data) => setDaftarKonsultasi(Array.isArray(data) ? data : []))
      .catch(() => setDaftarKonsultasi([]));
  }, []);

  // Fungsi untuk merapikan format tanggal (Menghilangkan .000Z)
  const formatTanggal = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans text-left">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-orange-600 italic uppercase">
          Panel Konsultasi
        </h1>
        <button
          onClick={onBack}
          className="bg-slate-500 text-white px-8 py-2 rounded-full font-bold uppercase text-xs shadow-md active:scale-95 transition-all"
        >
          Kembali
        </button>
      </div>

      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-orange-100">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#1e1b4b] text-white uppercase text-[10px] tracking-widest font-black">
              <th className="px-8 py-6">Siswa</th>
              <th className="px-8 py-6">Guru Tujuan</th>
              <th className="px-8 py-6">Waktu</th>
              <th className="px-8 py-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {daftarKonsultasi.length > 0 ? (
              daftarKonsultasi.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-orange-50/50 transition-all"
                >
                  <td className="px-8 py-6">
                    <p className="font-bold text-blue-900">
                      {item.nama || "Siswa"}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase italic tracking-tighter">
                      "{item.topik}"
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-black text-orange-600 text-[11px] uppercase">
                      {item.nama_guru}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    {/* TANGGAL DIRAPIKAN DISINI */}
                    <p className="text-[10px] font-bold text-gray-600 uppercase">
                      {formatTanggal(item.tanggal)}
                    </p>
                    <p className="text-[9px] font-bold text-gray-400">
                      {item.jam} WITA
                    </p>
                  </td>
                  <td className="px-8 py-6 text-center">
                    {/* LOGIKA AKSI DINAMIS BERDASARKAN STATUS */}
                    {item.status === "Selesai" ? (
                      <div className="flex items-center justify-center">
                        <span className="bg-green-100 text-green-600 px-5 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest border border-green-200 shadow-sm">
                          ✓ Selesai
                        </span>
                      </div>
                    ) : item.status === "Diterima" ? (
                      <button
                        onClick={() => onDetail(item)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-[10px] uppercase shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        onClick={() => onDetail(item)}
                        className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold text-[10px] uppercase shadow-lg hover:bg-orange-600 active:scale-95 transition-all"
                      >
                        Proses
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-8 py-20 text-center text-gray-400 italic font-bold"
                >
                  Belum ada permintaan konsultasi...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLihatKonsultasi;
