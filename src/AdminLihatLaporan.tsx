import React, { useState, useEffect } from "react";

interface Props {
  onBack: () => void;
  onDetail: (item: any) => void;
}

const AdminLihatLaporan: React.FC<Props> = ({ onBack, onDetail }) => {
  const [laporan, setLaporan] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/laporan")
      .then((res) => res.json())
      .then((data) => {
        // Pastikan data yang diterima adalah Array supaya .map() tidak error
        setLaporan(Array.isArray(data) ? data : []);
      })
      .catch(() => setLaporan([]));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans text-left">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-blue-900 italic uppercase">
          Panel Laporan
        </h1>
        <button
          onClick={onBack}
          className="bg-slate-500 text-white px-8 py-2 rounded-full font-bold uppercase text-xs"
        >
          Kembali
        </button>
      </div>

      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-blue-100">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-blue-900 text-white uppercase text-[10px] tracking-widest font-black">
              <th className="px-8 py-6">Pelapor</th>
              <th className="px-8 py-6">Kategori</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {laporan.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50/50 transition-all">
                <td className="px-8 py-6">
                  <p className="font-bold text-blue-900">{item.nama_pelapor}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Kelas {item.kelas}
                  </p>
                </td>
                <td className="px-8 py-6">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                    {item.kategori}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase">
                    {item.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-center">
                  <button
                    onClick={() => onDetail(item)}
                    className="bg-blue-900 text-white px-6 py-2 rounded-xl font-bold text-[10px] uppercase"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLihatLaporan;
