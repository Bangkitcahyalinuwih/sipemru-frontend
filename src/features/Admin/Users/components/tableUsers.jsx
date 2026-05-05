import { useEffect, useState } from "react";

const TableUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers([
      {
        id: 10,
        name: "Septian Angga",
        email: "septian@gmail.com",
        role: "admin",
        nim: "12345678",
        jurusan: "Informatika",
        phone: "08123456789",
        email_verified_at: "2025-01-01",
      },
      {
        id: 25,
        name: "Budi Santoso",
        email: "budi@gmail.com",
        role: "mahasiswa",
        nim: "87654321",
        jurusan: "Sistem Informasi",
        phone: "08987654321",
        email_verified_at: null,
      },
    ]);
  }, []);

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Data Users
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">No</th>
                <th className="px-6 py-3 text-left">Nama</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">NIM</th>
                <th className="px-6 py-3 text-left">Jurusan</th>
                <th className="px-6 py-3 text-left">Phone</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* NO AUTO */}
                  <td className="px-6 py-3 text-gray-600">
                    {index + 1}
                  </td>

                  <td className="px-6 py-3 font-medium text-gray-800">
                    {user.name}
                  </td>

                  <td className="px-6 py-3 text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-3 text-gray-600">
                    {user.nim || "-"}
                  </td>

                  <td className="px-6 py-3 text-gray-600">
                    {user.jurusan || "-"}
                  </td>

                  <td className="px-6 py-3 text-gray-600">
                    {user.phone || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default TableUsers;