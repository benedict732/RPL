import React, { useState } from "react";

interface Props {
  onSwitch: () => void;
}

const Register: React.FC<Props> = ({ onSwitch }) => {
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, email, password, kelas }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Akun berhasil dibuat! Silakan Login.");
        onSwitch();
      } else {
        alert("Pendaftaran gagal. Pastikan database dbtridharma sudah siap.");
      }
    } catch (err) {
      alert("Server tidak merespon di port 8080.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1e1b4b]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-black/50 -z-10"></div>
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-[50px] shadow-2xl w-[90%] max-w-[450px] border border-white/20 flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-white font-bold text-3xl tracking-tight">
            Daftar Akun
          </h1>
        </div>
        <form className="w-full space-y-4" onSubmit={handleRegister}>
          <div className="space-y-1">
            <label className="text-white/80 text-xs font-semibold ml-4">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-6 py-3.5 rounded-2xl bg-white/20 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
              required
            />
          </div>

          {/* PERBAIKAN: Input Kelas diganti menjadi Select agar hanya 7-9 */}
          <div className="space-y-1">
            <label className="text-white/80 text-xs font-semibold ml-4">
              Kelas
            </label>
            <select
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              className="w-full px-6 py-3.5 rounded-2xl bg-white/20 text-white outline-none focus:ring-2 focus:ring-blue-400/50 transition-all appearance-none cursor-pointer"
              required
            >
              <option value="" disabled className="bg-indigo-900">
                Pilih Kelas
              </option>
              <option value="7" className="bg-indigo-900">
                Kelas 7
              </option>
              <option value="8" className="bg-indigo-900">
                Kelas 8
              </option>
              <option value="9" className="bg-indigo-900">
                Kelas 9
              </option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-white/80 text-xs font-semibold ml-4">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-3.5 rounded-2xl bg-white/20 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-white/80 text-xs font-semibold ml-4">
              Password (min 8 karakter)
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-3.5 rounded-2xl bg-white/20 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
              required
              minLength={8}
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 mt-6 bg-[#1e1b4b] hover:bg-indigo-900 text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95"
          >
            Daftar
          </button>
        </form>
        <p className="mt-8 text-sm text-white/80">
          Sudah memiliki akun?{" "}
          <button
            onClick={onSwitch}
            className="text-blue-400 font-bold hover:underline"
          >
            Masuk
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
