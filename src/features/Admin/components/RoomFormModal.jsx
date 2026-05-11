import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyForm = {
  code: "",
  name: "",
  campus: "Serayu",
  building: "M. Nuh",
  floor: "Lantai 1",
  capacity: "",
  status: "Tersedia",
  facilities: "",
  image: null,
};

export default function RoomFormModal({
  open,
  onClose,
  onSubmit,
  campusOptions,
  buildingOptions,
  floorOptions,
  statusOptions,
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (open) {
      setForm(emptyForm);
    }
  }, [open]);

  const handleChange = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setForm((current) => ({ ...current, image: file }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ ...form, id: Date.now() });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-white">Form Tambah Ruangan</h2>
            <p className="text-sm text-slate-400">Isi detail ruangan sebelum menyimpan.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-700 bg-slate-900 p-2 text-slate-300 transition hover:border-slate-500 hover:text-white"
            aria-label="Close form"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-300">
              <span>Kode Ruangan</span>
              <input
                value={form.code}
                onChange={(e) => handleChange("code", e.target.value)}
                placeholder="Kode Ruangan"
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-slate-500"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              <span>Nama Ruangan</span>
              <input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Nama Ruangan"
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-slate-500"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="space-y-2 text-sm text-slate-300">
              <span>Pilihan Kampus</span>
              <select
                value={form.campus}
                onChange={(e) => handleChange("campus", e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none"
              >
                {campusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              <span>Pilihan Gedung</span>
              <select
                value={form.building}
                onChange={(e) => handleChange("building", e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none"
              >
                {buildingOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              <span>Pilihan Lantai</span>
              <select
                value={form.floor}
                onChange={(e) => handleChange("floor", e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none"
              >
                {floorOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-300">
              <span>Kapasitas Ruangan</span>
              <input
                value={form.capacity}
                onChange={(e) => handleChange("capacity", e.target.value)}
                placeholder="Kapasitas Ruangan"
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-slate-500"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              <span>Pilih Status Ruangan</span>
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="space-y-2 text-sm text-slate-300">
            <span>Fasilitas</span>
            <input
              value={form.facilities}
              onChange={(e) => handleChange("facilities", e.target.value)}
              placeholder="Fasilitas Ruangan"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-slate-500"
            />
          </label>

          <div className="space-y-2 text-sm text-slate-300">
            <span>Gambar Ruangan</span>
            <label className="flex min-h-40 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-900 px-4 py-10 text-center text-slate-400 transition hover:border-slate-500">
              <span className="text-base font-medium text-slate-200">Tarik dan taruh dokumen di sini</span>
              <span className="text-xs text-slate-500">Mendukung File: JPG, PNG</span>
              <span className="mt-4 inline-flex rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700">
                Upload
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>
            {form.image && <p className="text-xs text-slate-400">File terpilih: {form.image.name}</p>}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-red-500 px-6 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
