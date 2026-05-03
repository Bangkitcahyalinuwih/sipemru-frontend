import { QRCodeCanvas } from "qrcode.react";

export function BookingQR({ booking }) {
  // ambil URL verify dari backend
  const qrValue =
    booking.qr_ticket?.qr_url || booking.qr_url;

  const isUsed =
    booking.qr_ticket?.is_used ?? booking.is_used ?? false;

  const expiredAt =
    booking.qr_ticket?.expires_at;

  if (booking.status !== "approved") return null;

  return (
    <div className="mt-4">
      <p className="font-medium mb-2">QR Ticket</p>

      {/* QR GENERATE */}
      {qrValue ? (
        <div className="p-3 border rounded w-fit bg-white">
          <QRCodeCanvas
            value={qrValue}
            size={150}
          />
        </div>
      ) : (
        <div className="w-40 h-40 flex items-center justify-center border rounded text-gray-400 text-sm">
          QR belum tersedia
        </div>
      )}

      {/* STATUS */}
      <p
        className={`text-xs mt-2 ${
          isUsed ? "text-red-500" : "text-green-500"
        }`}
      >
        {isUsed ? "Sudah digunakan" : "Belum digunakan"}
      </p>

      {/* EXPIRED */}
      {expiredAt && (
        <p className="text-xs text-gray-400 mt-1">
          Berlaku sampai:{" "}
          {new Date(expiredAt).toLocaleString("id-ID")}
        </p>
      )}
    </div>
  );
}