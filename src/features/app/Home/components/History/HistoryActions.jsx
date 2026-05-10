import { Eye, Loader2 } from "lucide-react";

const STATUS = {
  PENDING: "pending",
};

export function HistoryActions({ booking, cancelLoading, onDetail, onCancel }) {
  return (
    <div className="flex lg:flex-col gap-3">
      <button
        onClick={() => onDetail(booking)}
        className="
          px-4
          py-2.5
          rounded-xl
          border
          border-blue-200
          text-blue-600
          hover:bg-blue-50
          transition
          text-sm
          font-medium
          flex
          items-center
          justify-center
          gap-2
          cursor-pointer
        "
      >
        <Eye size={16} />
        Detail
      </button>

      {/* CANCEL */}

      {booking.status === STATUS.PENDING && (
        <button
          disabled={cancelLoading === booking.id}
          onClick={() => onCancel(booking.id)}
          className={`
            px-4
            py-2.5
            rounded-xl
            border
            text-sm
            font-medium
            transition
            flex
            items-center
            justify-center
            gap-2

            ${
              cancelLoading === booking.id
                ? `
                  border-gray-200
                  text-gray-400
                  cursor-not-allowed
                `
                : `
                  border-red-200
                  text-red-600
                  hover:bg-red-50
                  cursor-pointer
                `
            }
          `}
        >
          {cancelLoading === booking.id ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Membatalkan...
            </>
          ) : (
            "Batalkan"
          )}
        </button>
      )}
    </div>
  );
}
