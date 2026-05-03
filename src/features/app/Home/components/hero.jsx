import { motion } from "framer-motion";
import { Search, Building2, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [building, setBuilding] = useState('');

  const handleSearch = () => {
    navigate('/roomlist', { state: { searchQuery, category, building } });
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2ek0wIDQ4YzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>

      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],   
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center space-y-6">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Pesan Ruangan Kampus dengan Mudah
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-blue-100 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Temukan dan pesan ruangan kampus untuk kegiatan akademik dengan cepat dan efisien.
          </motion.p>

          {/* <motion.div
            className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    placeholder="Cari Ruangan"
                    className="w-full pl-10 h-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="flex items-center h-12 border border-gray-200 rounded-lg px-3">
                  <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                  <select
                    className="flex-1 bg-transparent focus:outline-none"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Kategori</option>
                    <option value="kelas">Ruang Kelas</option>
                    <option value="lab">Laboratorium</option>
                    <option value="meeting">Ruang Meeting</option>
                    <option value="auditorium">Auditorium</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="flex items-center h-12 border border-gray-200 rounded-lg px-3">
                  <Building2 className="mr-2 h-5 w-5 text-gray-400" />
                  <select
                    className="flex-1 bg-transparent focus:outline-none"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                  >
                    <option value="">Gedung</option>
                    <option value="gedung-a">Gedung A</option>
                    <option value="gedung-b">Gedung B</option>
                    <option value="gedung-c">Gedung C</option>
                    <option value="gedung-d">Gedung D</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-1">
                <button
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg flex items-center justify-center font-medium"
                  onClick={handleSearch}
                >
                  <Search className="mr-2 h-5 w-5" />
                  Cari Ruangan
                </button>
              </div>
            </div>
          </motion.div> */}
        </div>
      </div>
    </div>
  );
}
