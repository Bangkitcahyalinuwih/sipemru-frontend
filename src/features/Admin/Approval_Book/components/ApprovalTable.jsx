import { useState } from "react";
import {
  CalendarDays,
  CheckCircle,
  Clock3,
  Eye,
  Mail,
  Users,
  X,
  XCircle,
} from "lucide-react";

const formatDate = (value) => {
  if (!value) return "-";

  const dateValue = String(value);
  const date = new Date(
    dateValue.length === 10 ? `${dateValue}T00:00:00` : dateValue
  );
  return Number.isNaN(date.getTime())
    ? dateValue
    : date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
};

const formatTime = (value) => (value ? String(value).slice(0, 5) : "-");

const formatBookingType = (value) => {
  if (!value) return "-";
  return String(value)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const DetailItem = ({ label, value }) => (
  <div className="min-w-0 rounded-xl bg-gray-50 p-3">
    <dt className="text-xs font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 whitespace-pre-wrap break-words text-sm text-gray-800">
      {value || "-"}
    </dd>
  </div>
);

const BookingDetail = ({ item, onClose, onUpdateStatus }) => {
  const requesterName =
    item.user?.name || item.user_name || "Pemohon tidak diketahui";
  const requesterEmail = item.user?.email || item.user_email || item.email;
  const requesterId =
    item.user?.nim || item.user?.student_id || item.nim || item.student_id;
  const roomName =
    item.room_name ||
    item.room?.name ||
    item.room?.room_name ||
    "Ruangan tidak diketahui";
  const participantCount =
    item.jumlah_peserta ?? item.total_participants ?? item.participants;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-detail-title"
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b bg-white px-5 py-4">
          <div>
            <h2
              id="booking-detail-title"
              className="text-lg font-bold text-gray-900"
            >
              Detail Booking #{item.id}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Periksa data pemohon dan informasi booking sebelum mengambil keputusan.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Tutup detail booking"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <section>
            <h3 className="mb-2 font-semibold text-gray-800">Data Pemohon</h3>
            <dl className="grid gap-3 sm:grid-cols-2">
              <DetailItem label="Nama" value={requesterName} />
              <DetailItem label="Email" value={requesterEmail} />
              <DetailItem label="NIM / ID" value={requesterId} />
              <DetailItem label="Status Booking" value={item.status} />
            </dl>
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-gray-800">
              Informasi Booking
            </h3>
            <dl className="grid gap-3 sm:grid-cols-2">
              <DetailItem label="Ruangan" value={roomName} />
              <DetailItem
                label="Gedung"
                value={item.room?.building?.name || item.building_name}
              />
              <DetailItem
                label="ID Ruangan"
                value={item.room_id || item.room?.id}
              />
              <DetailItem
                label="Jenis Peminjaman"
                value={formatBookingType(item.jenis_peminjaman)}
              />
              <DetailItem label="Keperluan" value={item.purpose} />
              <DetailItem label="Organisasi" value={item.organization} />
              <DetailItem
                label="Jumlah Peserta"
                value={
                  participantCount === null || participantCount === undefined
                    ? "-"
                    : `${participantCount} orang`
                }
              />
            </dl>
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-gray-800">
              Penanggung Jawab
            </h3>
            <dl className="grid gap-3 sm:grid-cols-2">
              <DetailItem label="Nama PIC" value={item.pic_name} />
              <DetailItem label="Nomor HP PIC" value={item.pic_phone} />
            </dl>
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-gray-800">Jadwal</h3>
            <dl className="grid gap-3 sm:grid-cols-2">
              <DetailItem
                label="Tanggal Booking"
                value={formatDate(item.booking_date)}
              />
              <DetailItem
                label="Waktu"
                value={`${formatTime(item.start_time)} - ${formatTime(item.end_time)}`}
              />
              <DetailItem
                label="Dibuat Pada"
                value={
                  item.created_at
                    ? new Date(item.created_at).toLocaleString("id-ID")
                    : "-"
                }
              />
            </dl>
          </section>

          <div className="flex flex-col-reverse justify-end gap-2 border-t pt-4 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={() => onUpdateStatus(item.id, "rejected")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              <XCircle size={16} />
              Tolak
            </button>
            <button
              type="button"
              onClick={() => onUpdateStatus(item.id, "approved")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              <CheckCircle size={16} />
              Setujui
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const ApprovalTable = ({ loading, data, onUpdateStatus }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Data Pemohon</th>
                <th className="px-5 py-4 font-semibold">Ringkasan Booking</th>
                <th className="px-5 py-4 text-center font-semibold">Detail</th>
                <th className="px-5 py-4 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-gray-500">
                    Memuat data booking...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-gray-500">
                    Tidak ada booking yang menunggu persetujuan.
                  </td>
                </tr>
              ) : (
                data.map((item) => {
                  const requesterName =
                    item.user?.name ||
                    item.user_name ||
                    item.pic_name ||
                    "Pemohon tidak diketahui";
                  const requesterEmail =
                    item.user?.email || item.user_email || item.email;
                  const requesterId =
                    item.user?.nim ||
                    item.user?.student_id ||
                    item.nim ||
                    item.student_id;
                  const roomName =
                    item.room_name ||
                    item.room?.name ||
                    item.room?.room_name ||
                    "Ruangan tidak diketahui";
                  const participantCount =
                    item.jumlah_peserta ??
                    item.total_participants ??
                    item.participants;

                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-800">
                          {requesterName}
                        </p>
                        {requesterId && (
                          <p className="mt-1 text-xs text-gray-500">
                            NIM/ID: {requesterId}
                          </p>
                        )}
                        {requesterEmail && (
                          <p className="mt-1 flex items-center gap-1.5 break-all text-xs text-gray-500">
                            <Mail size={13} className="shrink-0" />
                            {requesterEmail}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-800">{roomName}</p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                          <CalendarDays size={13} className="shrink-0" />
                          {formatDate(item.booking_date)}
                          <Clock3 size={13} className="ml-1 shrink-0" />
                          {formatTime(item.start_time)} -{" "}
                          {formatTime(item.end_time)}
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                          <Users size={13} className="shrink-0" />
                          {participantCount ?? "-"} peserta
                        </p>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedBooking(item)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 px-3 py-2 font-medium text-blue-700 hover:bg-blue-50"
                          aria-label={`Lihat detail booking ${item.id}`}
                        >
                          <Eye size={16} />
                          Detail
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => onUpdateStatus(item.id, "approved")}
                            className="rounded-lg bg-green-100 px-3 py-2 font-medium text-green-700 hover:bg-green-200"
                            aria-label={`Setujui booking ${item.id}`}
                          >
                            Setujui
                          </button>
                          <button
                            type="button"
                            onClick={() => onUpdateStatus(item.id, "rejected")}
                            className="rounded-lg bg-red-100 px-3 py-2 font-medium text-red-700 hover:bg-red-200"
                            aria-label={`Tolak booking ${item.id}`}
                          >
                            Tolak
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedBooking && (
        <BookingDetail
          item={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onUpdateStatus={(id, status) => {
            setSelectedBooking(null);
            onUpdateStatus(id, status);
          }}
        />
      )}
    </>
  );
};

export default ApprovalTable;
