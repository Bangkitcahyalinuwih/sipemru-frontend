import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import { logoutUser } from "../../../Admin/Users/service/UserService";

const LogoutButton = ({
  className = "",
}) => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const handleLogout = async () => {
    const user =
      localStorage.getItem("user");

    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Anda sudah logout",
        text: "Silakan login kembali untuk mengakses akun.",
        confirmButtonColor:
          "#6366f1",
        background: "#0f172a",
        color: "#fff",
      });

      return;
    }

    const result =
      await Swal.fire({
        title: "Logout?",
        text: "Apakah anda yakin ingin logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText:
          "Ya, Logout",
        cancelButtonText:
          "Batal",
        confirmButtonColor:
          "#ef4444",
        cancelButtonColor:
          "#475569",
        background: "#0f172a",
        color: "#fff",
      });

    if (!result.isConfirmed)
      return;

    setLoading(true);
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    logoutUser();

    localStorage.removeItem(
      "token"
    );

    await Swal.fire({
      icon: "success",
      title:
        "Berhasil Logout",
      text: "Anda telah keluar dari sistem.",
      timer: 1800,
      showConfirmButton: false,
      background: "#0f172a",
      color: "#fff",
    });

    navigate("/", {
      replace: true,
    });
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`
        flex w-full items-center gap-3
        rounded-xl
        border border-red-500/30
        bg-red-500/10
        px-4 py-3
        text-sm font-medium text-red-400
        transition-all duration-300
        hover:bg-red-500/20
        hover:text-red-300
        disabled:cursor-not-allowed
        disabled:opacity-70
        ${className}
      `}
    >
      <LogOut
        size={18}
        className={
          loading
            ? "animate-spin"
            : ""
        }
      />

      {loading
        ? "Logging out..."
        : "Logout"}
    </button>
  );
};

export default LogoutButton;