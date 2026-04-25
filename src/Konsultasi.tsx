import { useState, useEffect } from "react";

interface Props {
  onBack: () => void;
  onSent: () => void;
}

const Konsultasi: React.FC<Props> = ({ onBack, onSent }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [listGuru, setListGuru] = useState<any[]>([]);
  const [idGuru, setIdGuru] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");
  const [topik, setTopik] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/guru")
      .then((res) => res.json())
      .then((data) => {
        setListGuru(data);
        if (data.length > 0) setIdGuru(data[0].id_guru);
      });
  }, []);

  const handleKirim = async () => {
    if (!jam) return alert("Pilih jam!");
    const jamTerpilih = parseInt(jam.split(":")[0]);
    if (jamTerpilih < 8 || jamTerpilih >= 16) {
      alert("Maaf, layanan konsultasi hanya jam 08.00 - 16.00.");
      return;
    }

    const res = await fetch("http://localhost:8080/api/konsultasi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_siswa: user.id,
        id_guru: idGuru,
        tanggal,
        jam,
        topik,
      }),
    });
    if (res.ok) {
      alert("Berhasil Terkirim!");
      onSent();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 border border-blue-50">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="text-4xl text-blue-900">
            ↩
          </button>
          <h1 className="text-xl font-black text-blue-900 uppercase">
            Janji Konsultasi
          </h1>
        </div>
        <div className="space-y-5">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Pilih Guru
            </label>
            <select
              value={idGuru}
              onChange={(e) => setIdGuru(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-200 font-bold text-gray-600 outline-none"
            >
              {listGuru.map((g) => (
                <option key={g.id_guru} value={g.id_guru}>
                  {g.nama_guru}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-200 font-bold text-gray-600 outline-none"
            />
            <input
              type="time"
              onChange={(e) => setJam(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-200 font-bold text-gray-600 outline-none"
            />
          </div>
          <textarea
            placeholder="Topik masalah..."
            onChange={(e) => setTopik(e.target.value)}
            className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-200 font-medium text-gray-600 h-32 outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            onClick={handleKirim}
            className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all hover:bg-black"
          >
            Kirim Permintaan
          </button>
        </div>
        <p className="text-center mt-6 text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">
          Operasional: 08.00 - 16.00 WITA
        </p>
      </div>
    </div>
  );
};

export default Konsultasi;
