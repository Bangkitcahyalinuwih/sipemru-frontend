import { useLocation, useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Hash, 
  Activity, 
  DoorOpen, 
  Layers, 
  CheckCircle2,
  AlertCircle,
  XCircle,
  Info,
  User,
  ShieldCheck,
  Timer,
  FileText,
  Mail,
  Phone
} from "lucide-react";

import { BackButton } from "../components/BackButton";

// 💡 JIKA KAMU MENGGUNAKAN AUTH CONTEXT, IMPORT DISINI:
// import { useAuth } from "../context/AuthContext"; 

export function HistoryDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // -------------------------------------------------------------
  // SIMULASI PENGAMBILAN DATA USER DARI ENDPOINT /ME
  // (Silakan ganti dengan custom hook auth milikmu, misal: const { user } = useAuth())
  // -------------------------------------------------------------
  const userFromMe = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user")) || {
    name: state?.user?.name || state?.borrower_name || "Nama Tidak Terdaftar",
    email: state?.user?.email || "email.tidakada@database.com",
    phone: state?.user?.phone || state?.user?.no_hp || "+62 ----------"
  };

  // 1. HALAMAN ERROR (Jika data state kosong)
  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl px-8 py-8 text-center max-w-sm w-full shadow-2xl">
          <AlertCircle className="h-12 w-12 text-rose-500 mx-auto mb-4 animate-pulse" />
          <h1 className="text-xl font-bold mb-2 text-white">Data Tidak Ditemukan</h1>
          <p className="text-sm text-white/60 mb-6">Detail atau data manifest booking tidak tersedia atau sesi kedaluwarsa.</p>
          <button 
            onClick={() => navigate('/history')}
            className="w-full py-2.5 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 text-sm font-medium transition-all"
          >
            Kembali ke Riwayat
          </button>
        </div>
      </div>
    );
  }

  // 2. EKSTRAKSI DATA RESERVASI DARI DATABASE
  const id = state?.id;
  const organization = state?.organization || "Umum / Non-Instansi";
  const booking_date = state?.booking_date;
  const start_time = state?.start_time || "--:--";
  const end_time = state?.end_time || "--:--";
  const purpose = state?.purpose || "Tidak ada agenda spesifik yang dilampirkan.";
  const status = state?.status || "Pending";
  const description = state?.description || "Tidak ada catatan atau deskripsi tambahan dari admin selaku validator.";
  
  // Metadata Penunjang Ruangan
  const room_category = state?.room?.category || state?.room_type || "Fasilitas Umum";
  const created_at = state?.created_at ? new Date(state.created_at).toLocaleDateString("id-ID", { hour: "2-digit", minute: "2-digit" }) : "Waktu sistem tidak terekam";
  const room_name = state?.room_name || state?.room?.name || state?.room || "Nama Ruangan";

  // 3. FUNGSI UTILITAS KALKULATOR DATA
  const formatDateFull = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const calculateDuration = (start, end) => {
    if (!start || !end || start === "--:--" || end === "--:--") return "Durasi tidak terhitung";
    try {
      const [startHour, startMin] = start.split(":").map(Number);
      const [endHour, endMin] = end.split(":").map(Number);
      
      let totalMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
      if (totalMinutes < 0) return "Format Sesi Waktu Salah";
      
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      
      return `${hours > 0 ? `${hours} Jam ` : ""}${minutes > 0 ? `${minutes} Menit` : ""}`.trim();
    } catch (e) {
      return "Gagal memproses durasi";
    }
  };

  const getDaysRemaining = (targetDate) => {
    if (!targetDate) return null;
    const today = new Date();
    today.setHours(0,0,0,0);
    const eventDate = new Date(targetDate);
    eventDate.setHours(0,0,0,0);
    
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Hari Ini";
    if (diffDays < 0) return "Sudah Terlaksana";
    return `${diffDays} Hari Menuju Pelaksanaan`;
  };

  const getStatusDetails = (bookingStatus) => {
    switch (bookingStatus?.toLowerCase()) {
      case "approved":
      case "success":
      case "disetujui":
        return {
          label: "Disetujui Admin",
          color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
          glow: "bg-emerald-500/10",
          accentBorder: "border-emerald-500/30",
          icon: <CheckCircle2 className="h-4 w-4" />
        };
      case "cancelled":
      case "rejected":
      case "ditolak":
        return {
          label: "Dibatalkan / Ditolak",
          color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
          glow: "bg-rose-500/10",
          accentBorder: "border-rose-500/30",
          icon: <XCircle className="h-4 w-4" />
        };
      default:
        return {
          label: "Menunggu Persetujuan",
          color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
          glow: "bg-amber-500/10",
          accentBorder: "border-amber-500/30",
          icon: <AlertCircle className="h-4 w-4" />
        };
    }
  };

  const currentStatus = getStatusDetails(status);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-10 md:py-14 text-white">
      
      {/* Background Glow */}
      <div className={`absolute top-10 left-10 w-96 h-96 ${currentStatus.glow} rounded-full blur-[140px] pointer-events-none transition-all duration-700`} />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-6">
        
        {/* ACTION BAR ATAS */}
        <div className="mb-8 flex items-center justify-between">
          <BackButton onClick={() => navigate(-1)} />
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1 bg-white/5 border border-white/5 text-xs text-white/40">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Dibuat: {created_at}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full px-3 py-1 bg-white/5 border border-white/5 text-xs font-mono text-purple-300">
              <Hash className="h-3 w-3" />
              <span>BKG-{String(id || 0).padStart(5, '0')}</span>
            </div>
          </div>
        </div>

        {/* CONTAINER UTAMA MANIFEST DATA */}
        <div className="rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-3xl p-6 md:p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
          
          {/* 1. HEADER & STATUS OVERVIEW */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-6">
            <div>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-purple-400 block mb-1">
                Data Dokumen Elektronik Resmi
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-white/90">
                Manifest Lengkap Reservasi
              </h1>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-sm font-medium self-start sm:self-auto shadow-inner ${currentStatus.color}`}>
              {currentStatus.icon}
              <span>{currentStatus.label}</span>
            </div>
          </div>

          {/* 2. BARU: PROFILE DATA PEMINJAM DARI ENDPOINT /ME */}
          <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-5 mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
              <User className="h-3.5 w-3.5 text-cyan-400" />
              <span>Informasi Peminjam (Akun Terautentikasi /me)</span>
            </h3>

            <div className="grid gap-4 sm:grid-cols-3">
              {/* Nama Pemohon */}
              <div className="flex items-center gap-3 bg-black/20 rounded-xl p-3 border border-white/[0.02]">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <User className="h-4 w-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] text-white/30 block uppercase tracking-wider">Nama Lengkap</span>
                  <span className="text-sm font-medium text-white/90 block truncate">{userFromMe.name}</span>
                </div>
              </div>

              {/* Email Pemohon */}
              <div className="flex items-center gap-3 bg-black/20 rounded-xl p-3 border border-white/[0.02]">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] text-white/30 block uppercase tracking-wider">Alamat Email</span>
                  <span className="text-sm font-medium text-white/90 block truncate">{userFromMe.email}</span>
                </div>
              </div>

              {/* No HP Pemohon */}
              <div className="flex items-center gap-3 bg-black/20 rounded-xl p-3 border border-white/[0.02]">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] text-white/30 block uppercase tracking-wider">No. Handphone</span>
                  <span className="text-sm font-medium text-white/90 block truncate">{userFromMe.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. LOGISTIK RUANGAN & DETAIL INSTANSI */}
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <div className="flex gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.01]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <DoorOpen className="h-6 w-6" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-medium uppercase tracking-wider text-white/30">Fasilitas / Ruangan</p>
                <p className="text-lg font-semibold text-white/90 mt-0.5 truncate">{room_name}</p>
                <span className="text-xs text-purple-300/70 block mt-0.5 font-mono">{room_category}</span>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.01]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-medium uppercase tracking-wider text-white/30">Unit / Instansi Peminjam</p>
                <p className="text-lg font-semibold text-white/90 mt-0.5 truncate">{organization}</p>
              </div>
            </div>
          </div>

          {/* 4. ALOKASI WAKTU & METRIK HARI */}
          <div className="border border-white/5 bg-black/20 rounded-2xl p-5 mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-purple-400" />
              <span>Alokasi Penjadwalan Waktu Nyata</span>
            </h3>

            <div className="grid gap-6 md:grid-cols-3 split-elements">
              <div>
                <span className="text-[11px] text-white/30 block uppercase tracking-wider">Tanggal Pemakaian</span>
                <span className="text-base font-medium text-white/90 mt-1 block">
                  {formatDateFull(booking_date)}
                </span>
              </div>
              
              <div className="md:border-l md:border-white/5 md:pl-6">
                <span className="text-[11px] text-white/30 block uppercase tracking-wider">Jam Operasional</span>
                <span className="text-base font-semibold text-cyan-400 mt-1 block tracking-wide">
                  {start_time} - {end_time}
                </span>
                <span className="text-xs text-white/40 flex items-center gap-1 mt-1 font-mono">
                  <Timer className="h-3 w-3" /> Total: {calculateDuration(start_time, end_time)}
                </span>
              </div>

              <div className="md:border-l md:border-white/5 md:pl-6">
                <span className="text-[11px] text-white/30 block uppercase tracking-wider">Metrik Status Hari</span>
                <div className="mt-1.5">
                  <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 ${
                    getDaysRemaining(booking_date) === "Sudah Terlaksana" ? "text-white/40" : "text-purple-300"
                  }`}>
                    {getDaysRemaining(booking_date) || "Tidak Diketahui"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. DESKRIPSI AGENDA ACARA */}
          <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-5 mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-amber-400" />
              <span>Deskripsi Agenda / Urgensi Peminjaman</span>
            </h3>
            <div className="flex gap-3 bg-black/20 rounded-xl p-4 border border-white/[0.02]">
              <FileText className="h-4 w-4 text-gray-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 leading-relaxed font-normal">
                {purpose}
              </p>
            </div>
          </div>

          {/* 6. CATATAN PENINJAU SISTEM */}
          <div className={`border rounded-2xl p-5 transition-all duration-500 bg-white/[0.01] ${currentStatus.accentBorder}`}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span>Verifikasi & Catatan Peninjau Sistem</span>
            </h3>
            <div className="flex items-start gap-3 bg-blue-500/5 rounded-xl p-4 border border-blue-500/10">
              <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs text-gray-400 leading-relaxed font-normal">
                {description}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}