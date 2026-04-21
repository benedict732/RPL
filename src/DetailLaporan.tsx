import React from "react";

interface Props {
  onBack: () => void;
  selectedData: any;
}

const DetailLaporan: React.FC<Props> = ({ onBack, selectedData }) => {
  if (!selectedData)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Memuat data...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans flex flex-col items-center">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="text-4xl text-blue-900 hover:scale-110 transition-transform"
          >
            ↩
          </button>
          <h1 className="text-xl font-black text-blue-900 uppercase tracking-tighter">
            Detail Laporan
          </h1>
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-blue-900 p-4 text-center">
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
              Status: {selectedData.status}
            </span>
          </div>

          <div className="p-8">
            <div className="mb-6">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                ID Laporan
              </p>
              <p className="text-lg font-black text-blue-900">
                #LP-{selectedData.id}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Tanggal
                </p>
                <p className="text-xs font-bold text-gray-700">
                  {new Date(selectedData.tanggal_lapor).toLocaleDateString(
                    "id-ID",
                    { day: "numeric", month: "long", year: "numeric" },
                  )}
                </p>
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Kategori
                </p>
                <p className="text-xs font-bold text-red-500 uppercase">
                  {selectedData.kategori}
                </p>
              </div>
            </div>

            <div className="mb-6 border-t border-gray-100 pt-6">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Isi Laporan
              </p>
              <div className="bg-gray-50 p-5 rounded-3xl border border-gray-100">
                <p className="text-xs text-gray-600 italic">
                  "{selectedData.isi_laporan}"
                </p>
              </div>
            </div>

            <button
              onClick={onBack}
              className="w-full py-4 bg-gray-100 text-gray-400 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-200 transition-all active:scale-95"
            >
              Tutup Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailLaporan;
