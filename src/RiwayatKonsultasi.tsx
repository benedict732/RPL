import React, { useState } from "react";

interface Props {
  onBack: () => void;
}

const RiwayatKonsultasi: React.FC<Props> = ({ onBack }) => {
  const [selectedDetail, setSelectedDetail] = useState<any>(null);

  // SIMULASI DATA: Nantinya data ini datang dari Database (hasil input Admin)
  const listRiwayat = [
    {
      id: 1,
      guru: "Ibu Maria S.Psi",
      tgl: "22 April 2026",
      jam: "10:30 WITA",
      topik: "Masalah kedisiplinan di kelas",
      status: "DITERIMA", // Ini yang akan diubah Admin nanti
      link: "https://zoom.us/j/12345",
    },
    {
      id: 2,
      guru: "Pak Yohanes",
      tgl: "25 April 2026",
      jam: "09:00 WITA",
      topik: "Konsultasi Beasiswa Kuliah",
      status: "MENUNGGU", // Ini yang akan diubah Admin nanti
      link: "",
    },
  ];

  // Fungsi otomatis untuk warna status dari Admin
  const getStatusColor = (status: string) => {
    if (status === "DITERIMA") return "bg-orange-500";
    if (status === "SELESAI") return "bg-green-500";
    return "bg-blue-600"; // Default untuk MENUNGGU atau PROSES
  };

  if (selectedDetail) {
    const isAccepted = selectedDetail.status === "DITERIMA";
    return (
      <div className="min-h-screen bg-white font-sans p-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <button
              onClick={() => setSelectedDetail(null)}
              className="text-4xl text-blue-900"
            >
              ↩
            </button>
            <h2 className="text-2xl font-black text-blue-900 uppercase italic tracking-tighter">
              Detail Konsultasi
            </h2>
          </div>

          <div className="bg-blue-900 rounded-[40px] p-12 shadow-2xl relative">
            <div className="relative z-10">
              <p className="text-blue-300 font-black text-[10px] uppercase tracking-[0.4em] mb-2">
                {selectedDetail.tgl}
              </p>
              <h3 className="text-5xl font-black text-white italic mb-8">
                {selectedDetail.jam}
              </h3>

              <div className="grid grid-cols-2 gap-6 mb-10 text-left">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="text-[9px] font-black text-blue-300 uppercase mb-1 tracking-widest">
                    Guru Pembimbing
                  </p>
                  <p className="text-white font-bold">{selectedDetail.guru}</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="text-[9px] font-black text-blue-300 uppercase mb-1 tracking-widest">
                    Status Saat Ini
                  </p>
                  <p
                    className={`${selectedDetail.status === "DITERIMA" ? "text-orange-400" : "text-blue-300"} font-black uppercase italic`}
                  >
                    {selectedDetail.status}
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-3xl p-6 border border-white/10 mb-10 text-left">
                <p className="text-[9px] font-black text-blue-300 uppercase mb-2 italic">
                  Topik Anda:
                </p>
                <p className="text-white font-medium italic text-sm">
                  "{selectedDetail.topik}"
                </p>
              </div>

              {isAccepted ? (
                <a
                  href={selectedDetail.link}
                  target="_blank"
                  className="inline-block bg-blue-500 text-white font-black px-12 py-4 rounded-2xl shadow-xl hover:scale-105 transition-transform uppercase tracking-widest text-sm text-center"
                >
                  Gabung Pertemuan Zoom
                </a>
              ) : (
                <div className="bg-white/10 py-4 rounded-2xl text-center border border-white/10">
                  <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.2em] italic">
                    Admin belum memberikan Link Zoom
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-100">
        <h1 className="text-2xl font-black text-blue-900 tracking-tighter">
          SIBY Group
        </h1>
        <button
          onClick={onBack}
          className="bg-red-500 text-white px-8 py-2 rounded-full font-bold shadow-lg shadow-red-100 active:scale-95 transition-all"
        >
          Kembali
        </button>
      </nav>

      <div className="mx-10 mt-12 max-w-4xl text-left">
        <h2 className="text-4xl font-black text-blue-900 uppercase italic tracking-tighter mb-10">
          Riwayat Konsultasi
        </h2>

        <div className="space-y-5">
          {listRiwayat.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedDetail(item)}
              className="bg-white p-8 rounded-[35px] shadow-md border border-gray-100 flex justify-between items-center cursor-pointer hover:border-blue-500 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner italic font-black text-blue-900">
                  {item.status === "DITERIMA" ? "✓" : "!"}
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                    {item.tgl}
                  </p>
                  <p className="font-black text-blue-900 text-xl leading-tight">
                    {item.guru}
                  </p>
                  <p className="text-[9px] text-blue-400 font-black uppercase mt-1 tracking-tighter">
                    Klik untuk lihat status & link →
                  </p>
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-2">
                <span
                  className={`${getStatusColor(item.status)} text-white px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md`}
                >
                  {item.status}
                </span>
                <p className="text-[10px] font-bold text-gray-300 italic">
                  {item.jam}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiwayatKonsultasi;
