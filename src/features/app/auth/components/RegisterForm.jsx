import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUser } from "../../../Admin/Users/service/UserService";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      nim: "",
      jurusan: "",
      phone: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await createUser(form);

      setSuccess(
        "Register berhasil, silakan login"
      );

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data
          ?.message ||
          err.message ||
          "Register gagal"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Register Mahasiswa
          </h1>

          <p className="text-slate-400 mt-2">
            Buat akun mahasiswa baru
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-xl border border-green-500 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Nama Lengkap
            </label>

            <input
              type="text"
              name="name"
              placeholder="Masukkan nama lengkap"
              value={form.name}
              onChange={
                handleChange
              }
              disabled={loading}
              autoComplete="name"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Masukkan email"
              value={form.email}
              onChange={
                handleChange
              }
              disabled={loading}
              autoComplete="email"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              NIM
            </label>

            <input
              type="text"
              name="nim"
              placeholder="Masukkan NIM"
              value={form.nim}
              onChange={
                handleChange
              }
              disabled={loading}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Jurusan
            </label>

            <input
              type="text"
              name="jurusan"
              placeholder="Masukkan jurusan"
              value={form.jurusan}
              onChange={
                handleChange
              }
              disabled={loading}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Nomor HP
            </label>

            <input
              type="text"
              name="phone"
              placeholder="Masukkan nomor HP"
              value={form.phone}
              onChange={
                handleChange
              }
              disabled={loading}
              autoComplete="tel"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Minimal 6 karakter"
              value={
                form.password
              }
              onChange={
                handleChange
              }
              disabled={loading}
              autoComplete="new-password"
              minLength={6}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Sudah punya akun?
          <button
            onClick={() =>
              navigate("/login")
            }
            className="ml-1 font-medium text-blue-400 transition hover:text-blue-300"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;