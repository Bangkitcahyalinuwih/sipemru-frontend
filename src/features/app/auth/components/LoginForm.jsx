import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

import Swal from "sweetalert2";

import {
  loginUser,
  logoutUser,
} from "../../../Admin/Users/service/UserService";

const LoginForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const user = await loginUser(form.email, form.password);

      if (user.role !== "mahasiswa") {
        logoutUser();

        Swal.fire({
          icon: "error",
          title: "Akses Ditolak",
          text: "Akses hanya untuk mahasiswa",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#06b6d4",
        });

        return;
      }

      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: `Selamat datang ${user.name}`,
        timer: 1800,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#fff",
      });

      setTimeout(() => {
        navigate("/");
      }, 1800);
    } catch (err) {
      const message = err.message || "Login gagal";

      setError(message);

      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: message,
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 py-8">
      <div className="absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="absolute bottom-[-120px] right-[-100px] h-96 w-96 rounded-full bg-blue-600/20 blur-[140px]" />

        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="relative z-10 grid w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-2xl lg:grid-cols-2">
        <div className="relative hidden overflow-hidden border-r border-white/10 p-8 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-indigo-500/10" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-xl">
              <GraduationCap size={16} />
              Sistem Akademik
            </div>

            <h1 className="mt-8 text-5xl font-black leading-[1.05] tracking-tight">
              Login
              <br />
              Mahasiswa
            </h1>

            <p className="mt-5 max-w-sm text-base leading-relaxed text-slate-300">
              Masuk ke platform akademik modern untuk mengakses booking ruangan,
              jadwal, informasi kampus, dan layanan digital lainnya.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="h-12 w-12 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-xl" />

                <div className="h-12 w-12 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-xl" />

                <div className="h-12 w-12 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-xl" />
              </div>

              <div>
                <h3 className="font-semibold">Secure Access</h3>

                <p className="text-sm text-slate-300">Modern Campus System</p>
              </div>
            </div>
          </div>
          <div className="relative z-10 mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
              <h3 className="text-xl font-bold">24/7</h3>

              <p className="mt-1 text-xs text-slate-300">Access</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
              <h3 className="text-xl font-bold">Secure</h3>

              <p className="mt-1 text-xs text-slate-300">Login</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
              <h3 className="text-xl font-bold">Fast</h3>

              <p className="mt-1 text-xs text-slate-300">System</p>
            </div>
          </div>
        </div>

        <div className="relative p-6 sm:p-8 lg:p-9">
          <div className="absolute inset-0 bg-white/[0.02]" />
          <div className="relative z-10">
            <div className="mb-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 backdrop-blur-xl">
                <ShieldCheck size={15} />
                Secure Login
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-white">
                Selamat Datang
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Login menggunakan akun mahasiswa
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@gmail.com"
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 backdrop-blur-xl outline-none transition-all focus:border-cyan-400/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Masukkan password"
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 backdrop-blur-xl outline-none transition-all focus:border-cyan-400/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/10"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative mt-3 flex w-full items-center justify-center overflow-hidden rounded-xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <span className="relative flex items-center gap-2 text-sm">
                  {loading ? "Loading..." : "Login Sekarang"}

                  {!loading && (
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  )}
                </span>
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-400">
              Belum punya akun?
              <button
                onClick={() => navigate("/register")}
                className="ml-2 font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                Register sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
