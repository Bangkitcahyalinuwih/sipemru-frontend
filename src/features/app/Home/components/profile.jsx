import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  ShieldCheck,
  BadgeCheck,
  Pencil,
  Save,
  X,
} from "lucide-react";

import { useState } from "react";

import Swal from "sweetalert2";

import { getCurrentUser } from "../../../Admin/Users/service/UserService";

export function Profile() {
  const currentUser = getCurrentUser();

  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    jurusan: currentUser?.jurusan || "",
    nim: currentUser?.nim || "",
    role: currentUser?.role || "",
  });

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        User tidak ditemukan
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    const result = await Swal.fire({
      title: "Simpan Perubahan?",
      text: "Data profile akan diperbarui",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",
      background: "#0f172a",
      color: "#fff",
      confirmButtonColor: "#06b6d4",
      cancelButtonColor: "#ef4444",
      borderRadius: 20,
    });

    if (!result.isConfirmed) return;

    const updatedUser = {
      ...currentUser,
      ...formData,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    await Swal.fire({
      title: "Berhasil",
      text: "Profile berhasil diperbarui",
      icon: "success",
      background: "#0f172a",
      color: "#fff",
      confirmButtonColor: "#06b6d4",
      borderRadius: 20,
    });

    setIsEdit(false);

    window.location.reload();
  };

  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Batalkan Edit?",
      text: "Perubahan tidak akan disimpan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      background: "#0f172a",
      color: "#fff",
      confirmButtonColor: "#06b6d4",
      cancelButtonColor: "#ef4444",
      borderRadius: 20,
    });

    if (!result.isConfirmed) return;

    setFormData({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      jurusan: currentUser?.jurusan || "",
      nim: currentUser?.nim || "",
      role: currentUser?.role || "",
    });

    setIsEdit(false);
  };

  const profileItems = [
    {
      icon: User,
      label: "Nama",
      name: "name",
      value: formData.name,
    },
    {
      icon: Mail,
      label: "Email",
      name: "email",
      value: formData.email,
    },
    {
      icon: Phone,
      label: "No HP",
      name: "phone",
      value: formData.phone,
    },
    {
      icon: GraduationCap,
      label: "Jurusan",
      name: "jurusan",
      value: formData.jurusan,
    },
    {
      icon: BadgeCheck,
      label: "NIM",
      name: "nim",
      value: formData.nim,
    },
    {
      icon: ShieldCheck,
      label: "Role",
      name: "role",
      value: formData.role,
      disabled: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            overflow-hidden
            shadow-2xl
          "
        >
          <div
            className="
              relative
              px-8
              py-10
              border-b
              border-white/10
              bg-gradient-to-r
              from-cyan-500/10
              to-indigo-500/10
            "
          >
            <div className="absolute top-6 right-6 flex items-center gap-3">
              {isEdit ? (
                <>
                  <button
                    onClick={handleSave}
                    className="
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-xl
                      bg-cyan-500
                      hover:bg-cyan-400
                      text-white
                      transition
                    "
                  >
                    <Save className="w-4 h-4" />
                    Simpan
                  </button>

                  <button
                    onClick={handleCancel}
                    className="
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-xl
                      bg-red-500/20
                      hover:bg-red-500/30
                      text-red-300
                      transition
                    "
                  >
                    <X className="w-4 h-4" />
                    Batal
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-xl
                    bg-white/10
                    hover:bg-white/20
                    text-white
                    transition
                  "
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>

            <div className="flex flex-col items-center text-center">
              <div
                className="
                  w-28
                  h-28
                  rounded-full
                  bg-gradient-to-br
                  from-cyan-500
                  to-indigo-600
                  flex
                  items-center
                  justify-center
                  text-white
                  text-4xl
                  font-bold
                  shadow-lg
                "
              >
                {formData.name?.charAt(0)}
              </div>

              <h1 className="mt-5 text-3xl font-bold text-white">
                {formData.name}
              </h1>

              <p className="text-cyan-300 mt-2 capitalize">
                {formData.role}
              </p>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {profileItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-2xl
                    p-5
                    hover:bg-white/10
                    transition-all
                  "
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="
                        w-12
                        h-12
                        rounded-xl
                        bg-cyan-500/10
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>

                    <div className="w-full">
                      <p className="text-sm text-white/50 mb-2">
                        {item.label}
                      </p>

                      {isEdit && !item.disabled ? (
                        <input
                          type="text"
                          name={item.name}
                          value={item.value}
                          onChange={handleChange}
                          className="
                            w-full
                            bg-white/10
                            border
                            border-white/10
                            rounded-xl
                            px-4
                            py-3
                            text-white
                            outline-none
                            focus:ring-2
                            focus:ring-cyan-400
                          "
                        />
                      ) : (
                        <h3 className="text-white font-semibold break-all">
                          {item.value || "-"}
                        </h3>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}