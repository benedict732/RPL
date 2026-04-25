import React, { useState } from "react";

interface Props {
  onBack: () => void;
  selectedData: any;
}

const AdminDetailKonsultasi: React.FC<Props> = ({ onBack, selectedData }) => {
  // State untuk menampung perubahan input dari admin
  const [fixJam, setFixJam] = useState(selectedData?.jam || "");
  const [linkMeeting, setLinkMeeting] = useState(selectedData?.link_zoom || "");
  const [catatan, setCatatan] = useState(selectedData?.pesan_admin || "");
  const [loading, setLoading] = useState(false);

  // FUNGSI 1: Simpan & Kirim (Status jadi Diterima)
  const handleSimpan = async () => {
    if (!selectedData?.id) return alert("ID Konsultasi tidak ditemukan!");
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/update-konsultasi/${selectedData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jam: fixJam,
            link_zoom: linkMeeting,
            pesan_admin: catatan,
            status: "Diterima", // Status saat admin memproses jadwal
          }),
        },
      );

      if (response.ok) {
        alert("Jadwal Berhasil Dikirim ke Siswa!");
        onBack();
      }
    } catch (error) {
      alert("Gagal memperbarui jadwal.");
    } finally {
      setLoading(false);
    }
  };

  // FUNGSI 2: Selesaikan Sesi (Status jadi Selesai agar masuk statistik)
  const handleSelesaikan = async () => {
    if (
      !window.confirm("Apakah sesi konsultasi ini sudah benar-benar selesai?")
    )
      return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/update-konsultasi/${selectedData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jam: fixJam,
            link_zoom: linkMeeting,
            pesan_admin: catatan,
            status: "Selesai", // Status FINAL untuk statistik
          }),
        },
      );

      if (response.ok) {
        alert("Konsultasi Berhasil Diselesaikan & Diarsipkan!");
        onBack();
      }
    } catch (error) {
      alert("Gagal menyelesaikan sesi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-left">
      <div className="max-w-3xl mx-auto bg-white rounded-[40px] shadow-2xl border border-orange-100 overflow-hidden">
        {/* Header Panel */}
        <div className="bg-[#1e1b4b] p-10 text-white flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">
              Proses Konsultasi
            </h2>
            <p className="text-orange-400 text-[10px] font-black uppercase tracking-[0.3em]">
              Manajemen Jadwal Siswa
            </p>
          </div>
          <button
            onClick={onBack}
            className="text-2xl hover:scale-125 transition-transform"
          >
            ✕
          </button>
        </div>

        <div className="p-10 space-y-8">
          {/* Info Siswa & Guru */}
          <div className="grid grid-cols-2 gap-6 pb-8 border-b border-gray-100">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                Nama Siswa
              </label>
              <p className="font-bold text-blue-900 text-lg uppercase">
                {selectedData?.nama || "Siswa"}
              </p>
              <p className="text-xs text-gray-400 font-bold italic">
                Kelas {selectedData?.kelas || "9"}
              </p>
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                Guru Tujuan
              </label>
              <p className="font-black text-orange-500 text-lg uppercase">
                {selectedData?.nama_guru}
              </p>
            </div>
          </div>

          {/* Form Input Admin */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
                  Atur Jam Mulai (WITA)
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
                  Link Meeting (Zoom/G-Meet)
                </label>
                <input
                  type="text"
                  value={linkMeeting}
                  onChange={(e) => setLinkMeeting(e.target.value)}
                  placeholder="https://zoom.us/j/..."
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 font-bold text-gray-600 outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
                Pesan / Catatan Untuk Siswa
              </label>
              <textarea
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Berikan instruksi tambahan atau alasan perubahan jam..."
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 font-medium text-gray-600 italic outline-none focus:ring-4 focus:ring-blue-100 transition-all h-24 resize-none"
              ></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={onBack}
                className="py-4 bg-gray-100 text-gray-400 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleSimpan}
                disabled={loading}
                className="py-4 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-orange-100 hover:bg-orange-600 transition-all active:scale-95 disabled:bg-gray-300"
              >
                {loading ? "Menyimpan..." : "Simpan & Kirim"}
              </button>
            </div>

            {/* Tombol khusus untuk merubah status ke Selesai */}
            {(selectedData.status === "Diterima" ||
              selectedData.status === "Selesai") && (
              <button
                onClick={handleSelesaikan}
                disabled={loading}
                className="w-full py-4 bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-green-100 hover:bg-green-700 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>✓</span> Tandai Sebagai Selesai
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailKonsultasi;
