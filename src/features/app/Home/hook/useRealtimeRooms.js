import { useEffect } from "react";
import { toast } from "sonner";
import echo from "../lib/echo";
import { clearApiCache } from "../api/api";

export function useRealtimeRooms({ setRooms }) {
  useEffect(() => {
    if (!echo) return;

    const channel = echo.channel("rooms");

    channel.listen(".room.status.updated", (event) => {
      clearApiCache();

      setRooms((prev) =>
        prev.map((room) =>
          room.id === event.room_id
            ? { ...room, current_status: event.current_status }
            : room
        )
      );

      toast.info(`${event.name} - ${event.current_status}`);
    });

    return () => {
      echo.leave("rooms");
    };
  }, [setRooms]);
}