export const parseTimeString = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export const formatTime = (date) => {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const isTimeInRange = (currentTime, startTime, endTime) => {
  let start = startTime instanceof Date ? startTime : parseTimeString(startTime);
  let end = endTime instanceof Date ? endTime : parseTimeString(endTime);

  // Set tanggal sama dengan current time untuk perbandingan
  start.setFullYear(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
  end.setFullYear(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());

  return currentTime >= start && currentTime <= end;
};

export const getRoomStatus = (schedules, roomId, currentTime) => {
  if (!schedules || schedules.length === 0) {
    return "available";
  }

  // Cari jadwal yang aktif untuk ruangan ini
  const activeSchedule = schedules.find((schedule) => {
    if (schedule.room_id !== roomId) return false;

    const startTime = new Date(schedule.start_time);
    const endTime = new Date(schedule.end_time);

    return currentTime >= startTime && currentTime <= endTime;
  });

  if (activeSchedule) {
    return "occupied";
  }

  // Cek apakah ada jadwal yang akan datang hari ini
  const upcomingSchedule = schedules.find((schedule) => {
    if (schedule.room_id !== roomId) return false;
    const startTime = new Date(schedule.start_time);
    return (
      startTime > currentTime &&
      startTime.toDateString() === currentTime.toDateString()
    );
  });

  if (upcomingSchedule) {
    return "scheduled";
  }

  return "available";
};

export const formatTimeShort = (date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const getTimeRemaining = (endTime, currentTime) => {
  const diff = endTime - currentTime;
  return Math.ceil(diff / 1000 / 60);
};

export const getElapsedTime = (startTime, currentTime) => {
  const diff = currentTime - startTime;
  return Math.floor(diff / 1000 / 60);
};

export const groupSchedulesByRoom = (schedules) => {
  return schedules.reduce((acc, schedule) => {
    const roomId = schedule.room_id;
    if (!acc[roomId]) {
      acc[roomId] = [];
    }
    acc[roomId].push(schedule);
    return acc;
  }, {});
};

export const sortSchedulesByTime = (schedules) => {
  return [...schedules].sort(
    (a, b) => new Date(a.start_time) - new Date(b.start_time)
  );
};
