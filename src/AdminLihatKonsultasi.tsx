import React, { useState, useEffect } from "react";

interface Props {
  onBack: () => void;
  onDetail: (item: any) => void;
}

const AdminLihatKonsultasi: React.FC<Props> = ({ onBack, onDetail }) => {
  const [daftarKonsultasi, setDaftarKonsultasi] = useState<any[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const statusOptions = ["Terkirim", "Diterima", "Diproses", "Selesai"];

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/konsultasi") // Pastikan endpoint ini ada di backend
      .then((res) => res.json())
      .then((data) => setDaftarKonsultasi(data));
  }, []);

  const handleStatusChange = async (
    id: number,
    newStatus: string,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    try {
      await fetch(`http://localhost:8080/api/admin/update-konsultasi/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setDaftarKonsultasi((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item,
        ),
      );
    } catch (err) {
      alert("Gagal update status");
    }
    setOpenDropdownId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="text-4xl text-blue-900 hover:scale-110 transition-all"
        >
          ↩
        </button>
        <h1 className="text-xl font-black text-blue-900 uppercase tracking-tighter">
          SIBY Group Admin
        </h1>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold text-blue-900 border-b-4 border-blue-900 inline-block pb-1 uppercase tracking-tight">
          Daftar Konsultasi Siswa
        </h2>
      </div>

      <div className="bg-white rounded-[35px] shadow-2xl overflow-visible border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-100">
              <th className="px-6 py-5">Siswa</th>
              <th className="px-4 py-5 text-center">Tgl</th>
              <th className="px-4 py-5 text-center">Jam</th>
              <th className="px-4 py-5">Kategori</th>
              <th className="px-6 py-5 text-center">Aksi Status</th>
            </tr>
          </thead>

          <tbody className="text-xs font-bold text-gray-700">
            {daftarKonsultasi.map((item) => (
              <tr
                key={item.id}
                onClick={() => onDetail(item)}
                className="border-t border-gray-100 hover:bg-blue-50/50 transition-colors relative cursor-pointer group"
              >
                <td className="px-6 py-6 font-black text-blue-900 group-hover:underline">
                  {item.nama}
                </td>
                <td className="px-4 py-6 text-center">
                  {new Date(item.tanggal).toLocaleDateString("id-ID")}
                </td>
                <td className="px-4 py-6 text-center text-blue-600 font-black">
                  {item.jam}
                </td>
                <td className="px-4 py-6 italic text-gray-400 font-medium">
                  {item.topik}
                </td>
                <td className="px-6 py-6 text-center relative">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(
                          openDropdownId === item.id ? null : item.id,
                        );
                      }}
                      className="bg-[#4b5563] hover:bg-black text-white px-4 py-2 rounded-lg flex items-center justify-between gap-2 w-32 shadow-md transition-all mx-auto"
                    >
                      <span className="text-[9px] uppercase tracking-tighter">
                        {item.status}
                      </span>
                      <span className="text-[8px]">▼</span>
                    </button>
                    {openDropdownId === item.id && (
                      <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-32 bg-[#4b5563] rounded-lg shadow-2xl z-50 overflow-hidden border border-white/10">
                        {statusOptions.map((opt) => (
                          <div
                            key={opt}
                            onClick={(e) => handleStatusChange(item.id, opt, e)}
                            className="px-4 py-2.5 text-[9px] text-white hover:bg-blue-600 cursor-pointer border-b border-white/5 uppercase tracking-tighter"
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLihatKonsultasi;
