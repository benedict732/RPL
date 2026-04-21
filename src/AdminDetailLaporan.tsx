import React, { useState } from "react";

interface AdminDetailProps {
  onBack: () => void;
  selectedData: any; // WAJIB ADA AGAR APP.TSX TIDAK ERROR
}

const AdminDetailLaporan: React.FC<AdminDetailProps> = ({
  onBack,
  selectedData,
}) => {
  const [status, setStatus] = useState(selectedData?.status || "Terkirim");

  const handleUpdateStatus = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/admin/update-laporan/${selectedData?.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: status }),
        },
      );
      if (res.ok) {
        alert("Status berhasil diperbarui!");
        onBack();
      }
    } catch (err) {
      alert("Gagal update status.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="text-4xl hover:scale-110 transition-transform text-blue-900"
          >
            ↩
          </button>
          <div className="text-right">
            <h1 className="text-xl font-black text-blue-900 tracking-tighter uppercase">
              SIBY Group
            </h1>
            <span className="text-[10px] font-black bg-blue-900 text-white px-3 py-1 rounded-full uppercase tracking-widest">
              Admin Mode
            </span>
          </div>
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl p-10 border border-gray-100">
          <h2 className="text-2xl font-black text-blue-900 mb-10 uppercase tracking-tighter border-b pb-4">
            Update Status Laporan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
                  Nama Pelapor
                </label>
                <div className="w-full px-6 py-3 rounded-xl bg-gray-50 border border-gray-200 font-bold text-gray-700 italic">
                  {selectedData?.nama} - Kelas {selectedData?.kelas}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-2 underline">
                  Ubah Status Laporan
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-6 py-4 rounded-2xl bg-blue-50 border-2 border-blue-600 font-black text-blue-900 outline-none cursor-pointer shadow-lg transition-all focus:ring-4 focus:ring-blue-100"
                >
                  <option value="Terkirim">Terkirim</option>
                  <option value="Diterima">Diterima</option>
                  <option value="Diproses">Diproses</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
                Bukti Foto
              </label>
              <div className="w-full h-44 border-2 border-dashed border-gray-200 rounded-[30px] flex items-center justify-center bg-gray-50 text-gray-400 font-bold italic text-xs">
                Gambar_Bukti_Laporan.jpg
              </div>
            </div>
          </div>

          <div className="mb-10">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
              Deskripsi Laporan
            </label>
            <div className="w-full px-8 py-6 rounded-[30px] bg-gray-50 border border-gray-200 text-sm text-gray-600 leading-relaxed italic">
              "{selectedData?.isi_laporan}"
            </div>
          </div>

          <button
            onClick={handleUpdateStatus}
            className="w-full mt-10 py-4 bg-blue-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all active:scale-95"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailLaporan;
