export const fetchRooms = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: 1,
      name: "Auditorium M.Nuh",
      campus: "Kampus 1",
      building: "Gedung M.Nuh",
      capacity: 200,
      status: "ongoing",
      timeStart: "07:00",
      timeEnd: "09:00",
      activity: "Praktikum Web",
    },
    {
      id: 2,
      name: "Lab Komputer A",
      campus: "Kampus 2",
      building: "Gedung A",
      capacity: 30,
      status: "occupied",
      timeStart: "09:00",
      timeEnd: "11:00",
      activity: "Ujian Jaringan",
    },
    {
      id: 3,
      name: "Lab Multimedia C",
      campus: "Kampus 2",
      building: "Gedung C",
      capacity: 40,
      status: "available",
    },
    {
      id: 4,
      name: "Auditorium Gedung D",
      campus: "Kampus 2",
      building: "Gedung D",
      capacity: 150,
      status: "scheduled",
    },
    {
      id: 5,
      name: "Lab Jaringan B",
      campus: "Kampus 2",
      building: "Gedung B",
      capacity: 25,
      status: "pending",
    },
  ];
};