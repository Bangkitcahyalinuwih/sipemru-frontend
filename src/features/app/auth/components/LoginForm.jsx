import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser } from "../../../Admin/Users/service/UserService";

const LoginForm = () => {
  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
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

    try {
      const user = await loginUser(
        form.email,
        form.password
      );
      if (
        user.role !== "mahasiswa"
      ) {
        logoutUser();

        setError(
          "Akses hanya untuk mahasiswa"
        );

        return;
      }

      navigate("/");
    } catch (err) {
      setError(
        err.message ||
          "Login gagal"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          Login Mahasiswa
        </h1>

        <p className="text-slate-400 mt-2">
          Sistem Informasi Kampus
        </p>
      </div>

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="block text-sm text-slate-300 mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={
              handleChange
            }
            placeholder="Masukkan email"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-2">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={
              form.password
            }
            onChange={
              handleChange
            }
            placeholder="Masukkan password"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 text-white font-semibold"
        >
          {loading
            ? "Loading..."
            : "Login"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-400">
        Belum punya akun?
        <button
          onClick={() =>
            navigate(
              "/register"
            )
          }
          className="text-blue-400 hover:text-blue-300 ml-1"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginForm;