import { useEffect, useState } from "react";
import { fetchRooms } from "../services/dashboardService";

export function useDashboard() {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* FETCH DATA */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRooms();
        setRooms(data);
      } catch (err) {
        setError("Gagal ambil data");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  /* FILTER */
  const filteredRooms = rooms.filter((r) => {
    const campusMatch = filter === "ALL" || r.campus === filter;
    const searchMatch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.building.toLowerCase().includes(search.toLowerCase());
    return campusMatch && searchMatch;
  });

  /* STATS */
  const stats = {
    total: rooms.length,
    used: rooms.filter((r) =>
      ["occupied", "ongoing"].includes(r.status)
    ).length,
    pending: rooms.filter((r) => r.status === "pending").length,
    capacity: rooms.reduce((acc, r) => acc + r.capacity, 0),
  };

  return {
    filteredRooms,
    stats,
    filter,
    setFilter,
    search,
    setSearch,
    loading,
    error,
  };
}