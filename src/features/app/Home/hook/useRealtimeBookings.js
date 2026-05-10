import { useEffect } from "react";

import { toast } from "sonner";

import echo from "../services/echo";

export function useRealtimeBookings({
  currentUser,
  setBookingHistory,
}) {
  useEffect(() => {
    if (!echo) {
      return;
    }

    const channel =
      echo.channel(
        "bookings"
      );

    channel.listen(
      ".status.updated",
      (event) => {
        const updatedBooking =
          event.booking;

        if (
          updatedBooking.user_id !==
          currentUser.id
        ) {
          return;
        }

        setBookingHistory(
          (prev) =>
            prev.map((item) =>
              item.id ===
              updatedBooking.id
                ? {
                    ...item,
                    ...updatedBooking,
                  }
                : item
            )
        );

        toast.success(
          "Status booking diperbarui"
        );
      }
    );

    return () => {
      echo.leave(
        "bookings"
      );
    };
  }, [
    currentUser.id,
    setBookingHistory,
  ]);
}