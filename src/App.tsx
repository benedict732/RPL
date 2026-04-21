import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Beranda from "./Beranda";
import Laporan from "./Laporan";
import DetailLaporan from "./DetailLaporan";
import Konsultasi from "./Konsultasi";
import RiwayatKonsultasi from "./RiwayatKonsultasi";

function App() {
  const [page, setPage] = useState<string>("login");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Fungsi navigasi ke detail
  const handleGoToDetail = (item: any) => {
    setSelectedItem(item);
    setPage("detail");
  };

  return (
    <main>
      {/* AUTH SECTION */}
      {page === "login" && (
        <Login
          onSwitch={() => setPage("register")}
          onLogin={() => setPage("beranda")}
        />
      )}
      {page === "register" && <Register onSwitch={() => setPage("login")} />}

      {/* SISWA SECTION */}
      {page === "beranda" && (
        <Beranda
          onLogout={() => {
            localStorage.removeItem("user");
            setPage("login");
          }}
          onTambahLaporan={() => setPage("laporan")}
          onLihatDetail={handleGoToDetail} // Menerima data dari Beranda
          onGoKonsultasi={() => setPage("konsultasi")}
          onGoRiwayat={() => setPage("riwayat-konsultasi")}
        />
      )}

      {page === "laporan" && <Laporan onBack={() => setPage("beranda")} />}

      {page === "detail" && (
        <DetailLaporan
          onBack={() => setPage("beranda")}
          selectedData={selectedItem}
        />
      )}

      {page === "konsultasi" && (
        <Konsultasi
          onBack={() => setPage("beranda")}
          onSent={() => setPage("riwayat-konsultasi")}
        />
      )}

      {page === "riwayat-konsultasi" && (
        <RiwayatKonsultasi onBack={() => setPage("beranda")} />
      )}
    </main>
  );
}

export default App;
