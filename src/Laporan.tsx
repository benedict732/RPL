import React, { useState, useEffect, useRef } from "react";

interface LaporanProps {
  onBack: () => void;
}

const Laporan: React.FC<LaporanProps> = ({ onBack }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [jenis, setJenis] = useState<string>("");
  const [deskripsi, setDeskripsi] = useState<string>("");
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    const savedDraft = localStorage.getItem(`draft_laporan_${user.id}`);
    if (savedDraft) {
      const { kategori, isi } = JSON.parse(savedDraft);
      setJenis(kategori);
      setDeskripsi(isi);
    }
  }, [user.id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFoto(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Buat preview gambar
    }
  };

  const handleKirimLaporan = async () => {
    if (!jenis || !deskripsi) return alert("Isi kategori dan deskripsi!");

    const formData = new FormData();
    formData.append("id_siswa", user.id);
    formData.append("kategori", jenis);
    formData.append("isi_laporan", deskripsi);
    formData.append("tanggal_lapor", new Date().toISOString().split("T")[0]);
    if (foto) formData.append("foto", foto);

    try {
      const response = await fetch("http://localhost:8080/api/laporan", {
        method: "POST",
        body: formData, // Gunakan FormData untuk kirim file
      });

      if (response.ok) {
        localStorage.removeItem(`draft_laporan_${user.id}`);
        alert("Laporan Berhasil Terkirim!");
        onBack();
      }
    } catch (error) {
      alert("Gagal kirim ke server!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <nav className="px-10 py-5 bg-white border-b flex justify-between items-center shadow-sm">
        <div className="text-xl font-black text-blue-900 italic">
          SIBY Group
        </div>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-bold text-sm"
        >
          Kembali
        </button>
      </nav>

      <div className="flex-grow flex justify-center items-center p-6">
        <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl border border-blue-100 p-10">
          <h1 className="text-3xl font-black text-center mb-10 text-blue-900 tracking-tight italic">
            Formulir Pelaporan
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                  Nama Pelapor
                </label>
                <input
                  type="text"
                  value={user.nama || ""}
                  disabled
                  className="w-full px-5 py-3 rounded-xl bg-gray-100 text-gray-400 border border-gray-200 font-medium"
                />
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                  Jenis Masalah
                </label>
                <select
                  value={jenis}
                  onChange={(e) => setJenis(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl border border-blue-200 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                > 
                  <option value="Akademik">Akademik</option>
                  <option value="Bullying">Bullying</option>
                  <option value="Fasilitas">Fasilitas</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                  Bukti Foto
                </label>
                {/* Area Klik Upload Sesuai Desain Kamu */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="h-32 border-2 border-dashed border-blue-200 rounded-2xl flex flex-col items-center justify-center bg-blue-50/30 text-blue-400 cursor-pointer overflow-hidden"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <span className="text-2xl">📤</span>
                      <span className="text-[10px] font-black mt-2 uppercase tracking-tighter">
                        KLIK UNTUK UPLOAD
                      </span>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                  Deskripsi
                </label>
                <textarea
                  placeholder="Detail masalah..."
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className="w-full h-32 px-5 py-3 rounded-2xl border border-blue-200 outline-none focus:ring-2 focus:ring-blue-500 resize-none font-medium"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex gap-6 mt-12">
            <button
              onClick={() => onBack()}
              className="flex-1 py-4 bg-blue-500 text-white font-black rounded-2xl shadow-lg uppercase text-sm"
            >
              SIMPAN DRAF
            </button>
            <button
              onClick={handleKirimLaporan}
              className="flex-1 py-4 bg-[#1e1b4b] text-white font-black rounded-2xl shadow-lg uppercase text-sm"
            >
              KIRIM LAPORAN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laporan;
