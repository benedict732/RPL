import React, { useState } from "react";

interface AdminDetailProps {
  onBack: () => void;
  selectedData: any;
}

const AdminDetailLaporan: React.FC<AdminDetailProps> = ({
  onBack,
  selectedData,
}) => {
  // Mengambil status awal dari data yang dipilih
  const [status, setStatus] = useState(selectedData?.status || "TERKIRIM");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!selectedData?.id) return alert("ID Laporan tidak valid");

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/api/admin/update-laporan/${selectedData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: status }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        alert("Status Laporan Berhasil Diperbarui!");
        onBack();
      } else {
        alert(`Gagal: ${data.message || "Terjadi kesalahan server"}`);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Kesalahan koneksi ke server. Pastikan backend menyala.");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menangani URL gambar yang mengandung spasi
  const getImageUrl = (filename: string) => {
    const baseUrl = "http://localhost:8080/uploads/";
    // encodeURI akan mengubah spasi menjadi %20 agar browser bisa membaca file
    return encodeURI(`${baseUrl}${filename}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="text-4xl mb-6 text-blue-900 hover:scale-110 transition-transform active:scale-90 outline-none"
        >
          ↩
        </button>

        <div className="bg-white rounded-[40px] shadow-2xl p-10 border border-gray-100">
          <h2 className="text-2xl font-black text-blue-900 mb-10 uppercase italic border-b pb-4">
            Kelola Laporan Siswa
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            {/* Bagian Kiri: Info Pelapor */}
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                  Pelapor
                </label>
                <p className="font-bold text-blue-900 text-lg">
                  {selectedData?.nama_pelapor || "Siswa"} (
                  {selectedData?.kelas || "-"})
                </p>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                  Isi Laporan
                </label>
                <div className="bg-gray-50 p-6 rounded-3xl italic text-gray-600 text-sm border border-gray-100 leading-relaxed min-h-[100px]">
                  "{selectedData?.isi_laporan}"
                </div>
              </div>
            </div>

            {/* Bagian Kanan: Input Status & Foto */}
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
                  Update Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-blue-50 border-2 border-blue-600 font-black text-blue-900 outline-none focus:ring-4 ring-blue-100 transition-all cursor-pointer"
                >
                  <option value="TERKIRIM">TERKIRIM</option>
                  <option value="DITERIMA">DITERIMA</option>
                  <option value="DIPROSES">DIPROSES</option>
                  <option value="SELESAI">SELESAI</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
                  Bukti Foto
                </label>
                {selectedData?.foto ? (
                  <div className="relative overflow-hidden rounded-3xl border shadow-sm h-44 bg-gray-100">
                    <img
                      src={getImageUrl(selectedData.foto)}
                      alt="Bukti Laporan"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const parent = e.currentTarget.parentElement;
                        if (parent && !parent.querySelector(".err-msg")) {
                          const div = document.createElement("div");
                          div.className =
                            "err-msg h-full w-full flex items-center justify-center text-gray-400 text-[10px] font-bold uppercase border-2 border-dashed rounded-3xl text-center px-4";
                          div.innerText =
                            "File foto tidak ditemukan / Error Koneksi";
                          parent.appendChild(div);
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-44 bg-gray-50 rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-200">
                    <span className="text-gray-300 font-bold text-[10px] uppercase">
                      Tidak ada foto terlampir
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-900 text-white hover:bg-blue-800"
            }`}
          >
            {loading ? "Sedang Memproses..." : "Simpan Perubahan Status"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailLaporan;
