// import { Pencil, Search, Shield, Trash2 } from "lucide-react";
// import React, { useEffect, useMemo, useState } from "react";
// import { getUsers } from "../service/UserService";

// const TableUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     const data = await getUsers();
//     setUsers(data);
//   };

//   const filteredUsers = useMemo(() => {
//     return users.filter((item) => {
//       const name = item.name?.toLowerCase() || "";
//       const email = item.email?.toLowerCase() || "";
//       const keyword = search.toLowerCase();

//       return name.includes(keyword) || email.includes(keyword);
//     });
//   }, [users, search]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">

//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             Data Users
//           </h1>

//           <p className="text-sm text-gray-500 mt-1">
//             Total Users: {filteredUsers.length}
//           </p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

//           {/* SEARCH */}
//           <div className="p-5 border-b">
//             <div className="relative w-full md:w-80">
//               <Search
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 size={18}
//               />

//               <input
//                 type="text"
//                 placeholder="Cari User..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm"
//               />
//             </div>
//           </div>

//           {/* TABLE */}
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="bg-gray-50 text-gray-600">
//                 <tr>
//                   <th className="px-6 py-4 text-left">No</th>
//                   <th className="px-6 py-4 text-left">Nama</th>
//                   <th className="px-6 py-4 text-left">Email</th>
//                   <th className="px-6 py-4 text-left">Role</th>
//                   <th className="px-6 py-4 text-left">NIM</th>
//                   <th className="px-6 py-4 text-left">Jurusan</th>
//                   <th className="px-6 py-4 text-left">Phone</th>
//                   <th className="px-6 py-4 text-center">Aksi</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredUsers.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="py-10 text-center">
//                       Data user kosong
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredUsers.map((user, index) => (
//                     <tr key={user.id} className="border-t hover:bg-gray-50">

//                       <td className="px-6 py-4">{index + 1}</td>

//                       <td className="px-6 py-4 font-medium">
//                         {user.name}
//                       </td>

//                       <td className="px-6 py-4">
//                         {user.email}
//                       </td>

//                       <td className="px-6 py-4">
//                         <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-gray-100">
//                           <Shield size={14} />
//                           {user.role}
//                         </span>
//                       </td>

//                       <td className="px-6 py-4">
//                         {user.nim || "-"}
//                       </td>

//                       <td className="px-6 py-4">
//                         {user.jurusan || "-"}
//                       </td>

//                       <td className="px-6 py-4">
//                         {user.phone || "-"}
//                       </td>

//                       <td className="px-6 py-4 text-center">
//                         <div className="flex justify-center gap-2">
//                           <button className="p-2 bg-yellow-100 rounded">
//                             <Pencil size={16} />
//                           </button>

//                           <button className="p-2 bg-red-100 rounded">
//                             <Trash2 size={16} />
//                           </button>
//                         </div>
//                       </td>

//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default TableUsers;