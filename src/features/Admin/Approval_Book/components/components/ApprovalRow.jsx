import React from "react";
import {
  CheckCircle,
  XCircle,
  Building2,
  CalendarDays,
  Clock3,
} from "lucide-react";

const ApprovalRow = ({ item, onUpdateStatus }) => {
  return (
    <tr className="border-t hover:bg-gray-50">

      {/* ROOM */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Building2 className="text-blue-600" size={18} />
          <div>
            <p className="font-medium">{item.room_name}</p>
            <p className="text-xs text-gray-500">{item.purpose}</p>
          </div>
        </div>
      </td>

      {/* PIC */}
      <td className="px-6 py-4">
        <p className="font-medium">{item.pic_name}</p>
        <p className="text-xs text-gray-500">{item.pic_phone}</p>
      </td>

      {/* ORGANIZATION */}
      <td className="px-6 py-4">{item.organization}</td>

      {/* DATE */}
      <td className="px-6 py-4 flex items-center gap-2">
        <CalendarDays size={14} className="text-gray-400" />
        {item.booking_date}
      </td>

      {/* TIME */}
      <td className="px-6 py-4 flex items-center gap-2">
        <Clock3 size={14} className="text-gray-400" />
        {item.start_time} - {item.end_time}
      </td>

      {/* ACTION */}
      <td className="px-6 py-4">
        <div className="flex justify-center gap-2">

          <button
            onClick={() => onUpdateStatus(item.id, "approved")}
            className="p-2 rounded-xl bg-green-100 text-green-600 hover:bg-green-200"
          >
            <CheckCircle size={18} />
          </button>

          <button
            onClick={() => onUpdateStatus(item.id, "rejected")}
            className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
          >
            <XCircle size={18} />
          </button>

        </div>
      </td>

    </tr>
  );
};

export default ApprovalRow;