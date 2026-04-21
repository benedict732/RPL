import React, { useState } from "react";

interface Props {
  onBack: () => void;
  selectedData: any; // WAJIB ADA AGAR APP.TSX TIDAK ERROR
}

const AdminDetailKonsultasi: React.FC<Props> = ({ onBack, selectedData }) => {
  const [fixJam, setFixJam] = useState(selectedData?.jam || "09:00");
  const [linkMeeting, setLinkMeeting] = useState(selectedData?.link_zoom || "");
  const [catatan, setCatatan] = useState(selectedData?.pesan_admin || "");

  const handleSimpan = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/update-konsultasi/${selectedData?.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jam: fixJam,
            link_zoom: linkMeeting,
            pesan_admin: catatan,
            status: "Diterima",
          }),
        },
      );

      if (response.ok) {
        alert("Data Berhasil Disimpan!");
        onBack();
      }
    } catch (error) {
      alert("Gagal memperbarui data.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-[50px] shadow-2xl p-12 border border-gray-50 relative">
        <button
          onClick={onBack}
          className="absolute top-8 left-8 text-3xl text-blue-900 hover:scale-110 transition-all"
        >
          ↩
        </button>

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
            Atur Jadwal Konsultasi
          </h2>
          <p className="text-xs text-gray-400 italic">
            Sesuaikan waktu untuk {selectedData?.nama}
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
            <p className="text-[10px] font-black text-blue-400 uppercase mb-1">
              Siswa Pelapor
            </p>
            <p className="font-bold text-blue-900">
              {selectedData?.nama} - Kelas {selectedData?.kelas}
            </p>
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
              Tetapkan Jam Pertemuan
            </label>
            <input
              type="time"
              value={fixJam}
              onChange={(e) => setFixJam(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 font-bold text-blue-900 outline-none focus:ring-4 focus:ring-blue-100 transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
              Link Google Meet / Zoom
            </label>
            <input
              type="text"
              value={linkMeeting}
              onChange={(e) => setLinkMeeting(e.target.value)}
              placeholder="Masukkan link meeting..."
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 font-bold text-gray-600 outline-none focus:ring-4 focus:ring-blue-100 transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
              Pesan Untuk Siswa
            </label>
            <textarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 font-medium text-gray-600 italic outline-none focus:ring-4 focus:ring-blue-100 transition-all h-24 resize-none"
            ></textarea>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <button
            onClick={onBack}
            className="py-4 bg-gray-100 text-gray-400 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
          >
            Batal
          </button>
          <button
            onClick={handleSimpan}
            className="py-4 bg-[#2e4a9e] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-900 transition-all active:scale-95"
          >
            Simpan & Kirim
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailKonsultasi;
