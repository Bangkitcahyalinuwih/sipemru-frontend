import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  Phone,
  GraduationCap,
  BadgeInfo,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";

import { createUser } from "../../../Admin/Users/service/UserService";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    nim: "",
    jurusan: "",
    phone: "",
    role: "mahasiswa",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[!@#$%^&*(),.?":{}|<>]/)) score++;

    if (score <= 1) {
      return {
        text: "Lemah",
        color: "bg-red-500",
        width: "w-1/4",
        textColor: "text-red-400",
      };
    }

    if (score <= 3) {
      return {
        text: "Sedang",
        color: "bg-yellow-500",
        width: "w-2/4",
        textColor: "text-yellow-400",
      };
    }

    return {
      text: "Kuat",
      color: "bg-green-500",
      width: "w-full",
      textColor: "text-green-400",
    };
  };

  const passwordStrength = getPasswordStrength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (confirmPassword !== form.password) {
      return setError("Konfirmasi password tidak cocok");
    }

    setLoading(true);

    try {
      await createUser(form);

      setSuccess("Register berhasil, silakan login");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Register gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 py-6">
      <div className="absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="absolute bottom-[-120px] right-[-120px] h-80 w-80 rounded-full bg-blue-600/20 blur-[140px]" />

        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:35px_35px]" />
      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:grid-cols-2">
        <div className="relative hidden overflow-hidden border-r border-white/10 p-8 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-indigo-500/10" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur-xl">
              <GraduationCap size={16} />
              Sistem Akademik Modern
            </div>

            <h1 className="mt-8 text-4xl font-black leading-tight tracking-tight xl:text-5xl">
              Register
              <br />
              Mahasiswa
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-300 xl:text-base">
              Platform modern untuk mahasiswa mengakses sistem akademik, booking
              ruangan, jadwal, dan layanan kampus digital.
            </p>
          </div>

          <div className="relative z-10 mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
              <h3 className="text-lg font-bold">24/7</h3>

              <p className="mt-1 text-xs text-slate-300">Access</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
              <h3 className="text-lg font-bold">99%</h3>

              <p className="mt-1 text-xs text-slate-300">Secure</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
              <h3 className="text-lg font-bold">Fast</h3>

              <p className="mt-1 text-xs text-slate-300">System</p>
            </div>
          </div>
        </div>

        <div className="relative p-5 sm:p-7 lg:p-8">
          <div className="absolute inset-0 bg-white/[0.02]" />
          <div className="relative z-10">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300 backdrop-blur-xl">
                <ShieldCheck size={14} />
                Secure Register
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-white">
                Buat Akun
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Lengkapi data untuk membuat akun mahasiswa
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300 backdrop-blur-xl">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300 backdrop-blur-xl">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Nama Lengkap
                  </label>

                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Nama lengkap"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 backdrop-blur-xl outline-none transition-all focus:border-cyan-400/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    NIM
                  </label>

                  <div className="relative">
                    <BadgeInfo
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="nim"
                      value={form.nim}
                      onChange={handleChange}
                      placeholder="NIM mahasiswa"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 backdrop-blur-xl outline-none transition-all focus:border-cyan-400/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@gmail.com"
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 backdrop-blur-xl outline-none transition-all focus:border-cyan-400/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Minimal 6 karakter"
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-11 pr-12 text-sm text-white placeholder:text-slate-500 backdrop-blur-xl outline-none transition-all focus:border-cyan-400/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-cyan-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {form.password && (
                  <div className="mt-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        Kekuatan Password
                      </span>

                      <span
                        className={`text-xs font-semibold ${passwordStrength.textColor}`}
                      >
                        {passwordStrength.text}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${passwordStrength.color} ${passwordStrength.width}`}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Konfirmasi Password
                </label>

                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi password"
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-11 pr-12 text-sm text-white placeholder:text-slate-500 backdrop-blur-xl outline-none transition-all focus:border-cyan-400/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-cyan-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative mt-2 flex w-full items-center justify-center overflow-hidden rounded-xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-cyan-500/25"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <span className="relative flex items-center gap-2">
                  {loading ? "Loading..." : "Register Sekarang"}

                  {!loading && (
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  )}
                </span>
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-400">
              Sudah punya akun?
              <button
                onClick={() => navigate("/login")}
                className="ml-2 font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                Login sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
