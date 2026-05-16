import React from "react";

const ApprovalHeader = ({ count }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">
        Approval Booking
      </h1>
      <p className="text-gray-500 text-sm">
        Booking menunggu persetujuan: {count}
      </p>
    </div>
  );
};

export default ApprovalHeader;