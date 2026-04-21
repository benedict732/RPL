import React, { useState, useEffect } from "react";

interface Props {
  onBack: () => void;
  onDetail: (laporan: any) => void;
}

const AdminLihatLaporan: React.FC<Props> = ({ onBack, onDetail }) => {
  const [dataLaporan, setDataLaporan] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/admin/laporan");
        const data = await response.json();
        setDataLaporan(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Terkirim":
        return "bg-gray-500";
      case "Diterima":
        return "bg-orange-400";
      case "Diproses":
        return "bg-blue-600";
      case "Selesai":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="text-4xl hover:scale-110 transition-transform text-blue-900 active:scale-95"
          >
            ↩
          </button>
          <div className="text-right">
            <h1 className="text-2xl font-black text-blue-900 tracking-tighter uppercase">
              SIBY Group
            </h1>
            <p className="text-[10px] font-black text-blue-400 tracking-[0.3em] uppercase">
              Laporan Masuk
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
          <div className="p-10">
            <h2 className="text-2xl font-black text-blue-900 text-center mb-10 tracking-tight uppercase">
              Daftar Seluruh Laporan
            </h2>

            <div className="rounded-[30px] overflow-hidden border border-gray-100 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#a8def0]/30 text-blue-900">
                  <tr className="text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="px-8 py-5 border-r border-white">Tanggal</th>
                    <th className="px-8 py-5 border-r border-white text-center">
                      Nama Pelapor
                    </th>
                    <th className="px-8 py-5 border-r border-white text-center">
                      Jenis Masalah
                    </th>
                    <th className="px-8 py-5 text-center">Status Laporan</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-bold text-gray-600">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="text-center py-10">
                        Memuat data...
                      </td>
                    </tr>
                  ) : (
                    dataLaporan.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => onDetail(item)}
                        className="border-t border-gray-50 hover:bg-blue-50 cursor-pointer transition-all group"
                      >
                        <td className="px-8 py-6 group-hover:text-blue-900 font-black tracking-tighter">
                          {new Date(item.tanggal_lapor).toLocaleDateString(
                            "id-ID",
                            { day: "numeric", month: "long", year: "numeric" },
                          )}
                        </td>
                        <td className="px-8 py-6 text-center group-hover:text-blue-900">
                          {item.nama}
                        </td>
                        <td className="px-8 py-6 text-center italic text-gray-400 font-medium">
                          {item.kategori}
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span
                            className={`px-4 py-1.5 ${getStatusColor(item.status)} text-white rounded-full text-[9px] font-black uppercase tracking-wider shadow-md inline-block w-24`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLihatLaporan;
