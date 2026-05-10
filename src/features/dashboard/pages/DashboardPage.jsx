import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Download,
  RefreshCw,
  BarChart3,
  Building2,
  Sparkles,
  Eye,
  ChevronRight,
  AlertCircle,
  Star,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  LineChart,
  PieChart,
} from "lucide-react";
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { getBookings } from "../../Admin/Booking/service/BookingService";
import { getUsers } from "../../Admin/Users/service/UserService";

export default function ModernAdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Interactive States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [selectedCard, setSelectedCard] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  /* ================= REAL-TIME CLOCK ================= */
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* ================= FETCH DATA ================= */
  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [bookingData, userData] = await Promise.all([
        getBookings(),
        getUsers(),
      ]);
      setBookings(bookingData);
      setUsers(userData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= FILTERING ================= */
  const filteredBookings = useMemo(() => {
    let filtered = [...bookings];

    if (searchTerm) {
      filtered = filtered.filter(
        (b) =>
          b.room_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.pic_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.organization?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }

    if (dateRange !== "all") {
      const now = new Date();
      filtered = filtered.filter((b) => {
        const bookingDate = new Date(b.created_at || b.date);
        const diffDays = Math.floor((now - bookingDate) / (1000 * 60 * 60 * 24));
        if (dateRange === "today") return diffDays === 0;
        if (dateRange === "week") return diffDays <= 7;
        if (dateRange === "month") return diffDays <= 30;
        return true;
      });
    }

    return filtered;
  }, [bookings, searchTerm, statusFilter, dateRange]);

  /* ================= ADVANCED ANALYTICS ================= */
  const analytics = useMemo(() => {
    const total = filteredBookings.length;
    const pending = filteredBookings.filter((b) => b.status === "pending").length;
    const approved = filteredBookings.filter((b) => b.status === "approved").length;
    const rejected = filteredBookings.filter((b) => b.status === "rejected").length;
    const ongoing = filteredBookings.filter((b) => b.status === "ongoing").length;

    // Today's bookings
    const today = filteredBookings.filter((b) => {
      const date = new Date(b.created_at || b.date);
      return date.toDateString() === new Date().toDateString();
    }).length;

    // Weekly trend
    const thisWeek = bookings.filter((b) => {
      const date = new Date(b.created_at || b.date);
      const diffDays = (new Date() - date) / (1000 * 60 * 60 * 24);
      return diffDays <= 7;
    }).length;

    const lastWeek = bookings.filter((b) => {
      const date = new Date(b.created_at || b.date);
      const diffDays = (new Date() - date) / (1000 * 60 * 60 * 24);
      return diffDays > 7 && diffDays <= 14;
    }).length;

    const weeklyChange = lastWeek === 0 ? 0 : Math.round(((thisWeek - lastWeek) / lastWeek) * 100);

    // Approval rate
    const approvalRate = total === 0 ? 0 : Math.round((approved / total) * 100);

    // Top rooms
    const roomCounts = {};
    bookings.forEach((b) => {
      roomCounts[b.room_name] = (roomCounts[b.room_name] || 0) + 1;
    });
    const topRooms = Object.entries(roomCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Top organizations
    const orgCounts = {};
    bookings.forEach((b) => {
      orgCounts[b.organization] = (orgCounts[b.organization] || 0) + 1;
    });
    const topOrgs = Object.entries(orgCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Generate chart data for booking trends (last 7 days)
    const trendData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const count = bookings.filter((b) => {
        try {
          const bookingDate = new Date(b.created_at || b.date);
          if (isNaN(bookingDate.getTime())) return false;
          const bDate = bookingDate.toISOString().split('T')[0];
          return bDate === dateStr;
        } catch {
          return false;
        }
      }).length;
      trendData.push({ date: dayName, bookings: count, timestamp: dateStr });
    }

    // Status distribution data for pie chart
    const statusData = [
      { name: "Approved", value: approved, color: "#10b981" },
      { name: "Pending", value: pending, color: "#f59e0b" },
      { name: "Ongoing", value: ongoing, color: "#3b82f6" },
      { name: "Rejected", value: rejected, color: "#ef4444" },
    ].filter(item => item.value > 0);

    // Room usage data for bar chart
    const roomData = topRooms.map(([name, count]) => ({
      name,
      bookings: count,
    }));

    // Organization data
    const orgData = topOrgs.map(([name, count]) => ({
      name,
      bookings: count,
    }));

    return {
      total,
      pending,
      approved,
      rejected,
      ongoing,
      today,
      thisWeek,
      weeklyChange,
      approvalRate,
      userCount: users.length,
      topRooms,
      topOrgs,
      trendData,
      statusData,
      roomData,
      orgData,
    };
  }, [filteredBookings, bookings, users]);

  /* ================= LOADING STATE ================= */
  if (loading) {
    return <LoadingState />;
  }

  /* ================= MAIN DASHBOARD ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* ================= HERO HEADER ================= */}
        <HeroHeader 
          currentTime={currentTime}
          onRefresh={fetchData}
          refreshing={refreshing}
          todayCount={analytics.today}
        />

        {/* ================= FILTERS ================= */}
        <FilterSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateRange={dateRange}
          setDateRange={setDateRange}
          onClearAll={() => {
            setSearchTerm("");
            setStatusFilter("all");
            setDateRange("all");
            setSelectedCard(null);
          }}
        />

        {/* ================= KPI CARDS ================= */}
        <KpiSection 
          analytics={analytics}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          setStatusFilter={setStatusFilter}
        />

        {/* ================= CHART ANALYTICS GRID ================= */}
        <div className="grid lg:grid-cols-2 gap-6">
          <BookingTrendChart data={analytics.trendData} />
          <StatusDistributionChart data={analytics.statusData} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <RoomUsageChart data={analytics.roomData} />
          <OrganizationActivityChart data={analytics.orgData} />
        </div>

        {/* ================= ANALYTICS GRID ================= */}
        <div className="grid lg:grid-cols-3 gap-6">
          <ApprovalRateCard analytics={analytics} />
          <WeeklyTrendCard analytics={analytics} />
          <QuickInsightCard analytics={analytics} />
        </div>

        {/* ================= TOP PERFORMERS ================= */}
        <div className="grid lg:grid-cols-2 gap-6">
          <TopRoomsCard topRooms={analytics.topRooms} />
          <TopOrganizationsCard topOrgs={analytics.topOrgs} />
        </div>

        {/* ================= RECENT BOOKINGS ================= */}
        <RecentBookingsTable 
          bookings={filteredBookings.slice(0, 10)}
          total={filteredBookings.length}
        />
      </div>
    </div>
  );
}

/* ================= LOADING STATE ================= */
function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-slate-200 border-t-blue-600 rounded-full mx-auto"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Loading Dashboard</h3>
          <p className="text-sm text-slate-500 mt-1">Preparing your analytics...</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ================= HERO HEADER ================= */
function HeroHeader({ currentTime, onRefresh, refreshing, todayCount }) {
  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-6 lg:p-8 shadow-xl shadow-slate-200/50"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                {greeting()}, Admin 👋
              </h1>
              <p className="text-sm text-slate-500">
                {currentTime.toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="font-medium">Live</span>
            </div>
            <div className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200 font-medium">
              {todayCount} bookings today
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 group"
          >
            <RefreshCw className={`w-4 h-4 text-slate-600 ${refreshing ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
            <span className="font-medium text-slate-700">Refresh</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
          >
            <Download className="w-4 h-4" />
            <span className="font-medium">Export</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ================= FILTER SECTION ================= */
function FilterSection({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, dateRange, setDateRange, onClearAll }) {
  const hasActiveFilters = searchTerm || statusFilter !== "all" || dateRange !== "all";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl shadow-slate-200/50"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="relative group">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="ongoing">Ongoing</option>
          </select>
        </div>

        <div className="relative group">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>
      </div>

      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 flex flex-wrap items-center gap-2"
          >
            <span className="text-sm font-medium text-slate-600">Active filters:</span>
            {searchTerm && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium border border-blue-200">
                "{searchTerm}"
              </span>
            )}
            {statusFilter !== "all" && (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-200">
                {statusFilter}
              </span>
            )}
            {dateRange !== "all" && (
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium border border-amber-200">
                {dateRange === "today" ? "Today" : dateRange === "week" ? "7 days" : "30 days"}
              </span>
            )}
            <button
              onClick={onClearAll}
              className="ml-auto px-3 py-1 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Clear all
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ================= KPI SECTION ================= */
function KpiSection({ analytics, selectedCard, setSelectedCard, setStatusFilter }) {
  const kpiCards = [
    {
      id: "total",
      label: "Total Bookings",
      value: analytics.total,
      icon: Calendar,
      gradient: "from-slate-500 to-slate-700",
      change: analytics.weeklyChange,
    },
    {
      id: "approved",
      label: "Approved",
      value: analytics.approved,
      icon: CheckCircle,
      gradient: "from-emerald-500 to-emerald-700",
      status: "approved",
    },
    {
      id: "pending",
      label: "Pending",
      value: analytics.pending,
      icon: Clock,
      gradient: "from-amber-500 to-amber-700",
      status: "pending",
      pulse: true,
    },
    {
      id: "ongoing",
      label: "Ongoing",
      value: analytics.ongoing,
      icon: Activity,
      gradient: "from-blue-500 to-blue-700",
      status: "ongoing",
    },
    {
      id: "rejected",
      label: "Rejected",
      value: analytics.rejected,
      icon: XCircle,
      gradient: "from-rose-500 to-rose-700",
      status: "rejected",
    },
    {
      id: "users",
      label: "Active Users",
      value: analytics.userCount,
      icon: Users,
      gradient: "from-indigo-500 to-indigo-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {kpiCards.map((card, index) => (
        <KpiCard
          key={card.id}
          {...card}
          index={index}
          selected={selectedCard === card.id}
          onClick={() => {
            if (selectedCard === card.id) {
              setSelectedCard(null);
              setStatusFilter("all");
            } else {
              setSelectedCard(card.id);
              if (card.status) setStatusFilter(card.status);
            }
          }}
        />
      ))}
    </div>
  );
}

function KpiCard({ id, label, value, icon: Icon, gradient, change, selected, onClick, index, pulse }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative bg-white/60 backdrop-blur-xl border rounded-2xl p-5 cursor-pointer
        transition-all duration-300 overflow-hidden group
        ${selected 
          ? "ring-2 ring-blue-500 shadow-xl shadow-blue-500/20 border-blue-200" 
          : "border-white/50 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50"
        }
      `}
    >
      {/* Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      {/* Icon Badge */}
      <div className={`
        absolute -top-2 -right-2 p-3 rounded-xl shadow-lg
        bg-gradient-to-br ${gradient} opacity-90
        group-hover:scale-110 transition-transform duration-300
        ${pulse ? "animate-pulse" : ""}
      `}>
        <Icon className="w-5 h-5 text-white" />
      </div>

      <div className="relative space-y-2">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-3xl font-bold text-slate-900">
          {value.toLocaleString()}
        </p>
        
        {change !== undefined && change !== 0 && (
          <div className={`flex items-center gap-1 text-xs font-semibold ${
            change > 0 ? "text-emerald-600" : "text-rose-600"
          }`}>
            {change > 0 ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ================= APPROVAL RATE CARD ================= */
function ApprovalRateCard({ analytics }) {
  const sparklineData = [65, 70, 68, 75, 78, 82, analytics.approvalRate];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl shadow-slate-200/50"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl shadow-lg">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Approval Rate</h3>
          <p className="text-xs text-slate-500">Success percentage</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-4xl font-bold text-slate-900">{analytics.approvalRate}%</p>
            <p className="text-sm text-slate-500 mt-1">{analytics.total} total bookings</p>
          </div>
        </div>

        <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${analytics.approvalRate}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full relative overflow-hidden"
          >
            <motion.div
              animate={{ x: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </motion.div>
        </div>

        {/* Sparkline */}
        <div className="flex items-end gap-1 h-12">
          {sparklineData.map((value, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${(value / 100) * 100}%` }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
              className="flex-1 bg-gradient-to-t from-emerald-400 to-emerald-500 rounded-t hover:from-emerald-500 hover:to-emerald-600 transition-all cursor-pointer"
              title={`${value}%`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ================= WEEKLY TREND CARD ================= */
function WeeklyTrendCard({ analytics }) {
  const isPositive = analytics.weeklyChange >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl shadow-slate-200/50"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 bg-gradient-to-br ${isPositive ? "from-blue-500 to-blue-700" : "from-rose-500 to-rose-700"} rounded-xl shadow-lg`}>
          {isPositive ? <TrendingUp className="w-5 h-5 text-white" /> : <TrendingDown className="w-5 h-5 text-white" />}
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Weekly Trend</h3>
          <p className="text-xs text-slate-500">vs last week</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-4xl font-bold text-slate-900">{analytics.thisWeek}</p>
            <p className="text-sm text-slate-500 mt-1">bookings this week</p>
          </div>
          <div className={`px-4 py-2 rounded-xl font-bold ${
            isPositive 
              ? "bg-emerald-100 text-emerald-700 border border-emerald-200" 
              : "bg-rose-100 text-rose-700 border border-rose-200"
          }`}>
            {isPositive ? "+" : ""}{analytics.weeklyChange}%
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <p className="text-xs text-slate-500 mb-1">This Week</p>
            <p className="text-2xl font-bold text-slate-900">{analytics.thisWeek}</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <p className="text-xs text-slate-500 mb-1">Today</p>
            <p className="text-2xl font-bold text-blue-600">{analytics.today}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ================= QUICK INSIGHT CARD ================= */
function QuickInsightCard({ analytics }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl shadow-slate-200/50"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl shadow-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Quick Insights</h3>
          <p className="text-xs text-slate-500">Key metrics</p>
        </div>
      </div>

      <div className="space-y-3">
        <InsightRow
          icon={<CheckCircle className="w-4 h-4 text-emerald-600" />}
          label="Approved"
          value={analytics.approved}
          total={analytics.total}
          color="emerald"
        />
        <InsightRow
          icon={<Clock className="w-4 h-4 text-amber-600" />}
          label="Pending"
          value={analytics.pending}
          total={analytics.total}
          color="amber"
        />
        <InsightRow
          icon={<Activity className="w-4 h-4 text-blue-600" />}
          label="Ongoing"
          value={analytics.ongoing}
          total={analytics.total}
          color="blue"
        />
        <InsightRow
          icon={<XCircle className="w-4 h-4 text-rose-600" />}
          label="Rejected"
          value={analytics.rejected}
          total={analytics.total}
          color="rose"
        />
      </div>
    </motion.div>
  );
}

function InsightRow({ icon, label, value, total, color }) {
  const percentage = total === 0 ? 0 : Math.round((value / total) * 100);
  const colors = {
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    blue: "bg-blue-500",
    rose: "bg-rose-500",
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium text-slate-700">{label}</span>
        </div>
        <span className="text-sm font-bold text-slate-900">{value}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8 }}
          className={`h-full ${colors[color]} rounded-full`}
        />
      </div>
    </div>
  );
}

/* ================= TOP ROOMS CARD ================= */
function TopRoomsCard({ topRooms }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl shadow-slate-200/50"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-violet-500 to-violet-700 rounded-xl shadow-lg">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Top Rooms</h3>
            <p className="text-xs text-slate-500">Most booked</p>
          </div>
        </div>
        <Star className="w-5 h-5 text-amber-500" />
      </div>

      <div className="space-y-3">
        {topRooms.length === 0 ? (
          <p className="text-center text-slate-400 py-8">No data available</p>
        ) : (
          topRooms.map(([room, count], index) => (
            <motion.div
              key={room}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm
                  ${index === 0 ? "bg-gradient-to-br from-amber-400 to-amber-600" : ""}
                  ${index === 1 ? "bg-gradient-to-br from-slate-400 to-slate-600" : ""}
                  ${index === 2 ? "bg-gradient-to-br from-orange-400 to-orange-600" : ""}
                  ${index > 2 ? "bg-gradient-to-br from-slate-300 to-slate-500" : ""}
                `}>
                  {index + 1}
                </div>
                <span className="font-medium text-slate-900">{room}</span>
              </div>
              <span className="text-sm font-bold text-slate-600">{count} bookings</span>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

/* ================= TOP ORGANIZATIONS CARD ================= */
function TopOrganizationsCard({ topOrgs }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl shadow-slate-200/50"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-xl shadow-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Top Organizations</h3>
            <p className="text-xs text-slate-500">Most active</p>
          </div>
        </div>
        <Activity className="w-5 h-5 text-cyan-500" />
      </div>

      <div className="space-y-3">
        {topOrgs.length === 0 ? (
          <p className="text-center text-slate-400 py-8">No data available</p>
        ) : (
          topOrgs.map(([org, count], index) => (
            <motion.div
              key={org}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + index * 0.05 }}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full group-hover:scale-125 transition-transform" />
                <span className="font-medium text-slate-900 truncate">{org}</span>
              </div>
              <span className="text-sm font-bold text-slate-600 ml-3">{count}</span>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

/* ================= RECENT BOOKINGS TABLE ================= */
function RecentBookingsTable({ bookings, total }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden"
    >
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Recent Bookings</h3>
              <p className="text-xs text-slate-500">{total} total bookings</p>
            </div>
          </div>
          <Eye className="w-5 h-5 text-slate-400" />
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {bookings.length === 0 ? (
          <div className="text-center py-16">
            <AlertCircle className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-slate-500 font-medium">No bookings found</p>
            <p className="text-sm text-slate-400 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          bookings.map((booking, index) => (
            <BookingRow key={booking.id} booking={booking} index={index} />
          ))
        )}
      </div>
    </motion.div>
  );
}

function BookingRow({ booking, index }) {
  const statusConfig = {
    approved: { color: "emerald", label: "Approved", icon: CheckCircle },
    pending: { color: "amber", label: "Pending", icon: Clock },
    rejected: { color: "rose", label: "Rejected", icon: XCircle },
    ongoing: { color: "blue", label: "Ongoing", icon: Activity },
  };

  const config = statusConfig[booking.status] || statusConfig.pending;
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className="p-5 hover:bg-slate-50/50 transition-all group cursor-pointer"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
              {booking.room_name}
            </h4>
            <ChevronRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              {booking.pic_name}
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              {booking.organization}
            </span>
            {booking.date && (
              <>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(booking.date).toLocaleDateString("id-ID")}
                </span>
              </>
            )}
          </div>
        </div>

        <div className={`
          flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm
          bg-${config.color}-50 text-${config.color}-700 border border-${config.color}-200
          group-hover:shadow-md transition-all
        `}>
          <StatusIcon className="w-4 h-4" />
          {config.label}
        </div>
      </div>
    </motion.div>
  );
}

/* ================= BOOKING TREND CHART ================= */
function BookingTrendChart({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl shadow-slate-200/50"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg">
          <LineChart className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Booking Trends</h3>
          <p className="text-xs text-slate-500">Last 7 days</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip 
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <Area type="monotone" dataKey="bookings" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBookings)" strokeWidth={2} />
          </AreaChart>
          <Line 
            type="monotone" 
            dataKey="bookings" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: "#3b82f6", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

/* ================= STATUS DISTRIBUTION CHART ================= */
function StatusDistributionChart({ data }) {
  const COLORS = {
    Approved: "#10b981",
    Pending: "#f59e0b",
    Ongoing: "#3b82f6",
    Rejected: "#ef4444",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl shadow-slate-200/50"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-violet-500 to-violet-700 rounded-xl shadow-lg">
          <PieChart className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Status Distribution</h3>
          <p className="text-xs text-slate-500">Booking breakdown</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        <ResponsiveContainer width="100%" height={250}>
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `${entry.name}: ${entry.value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
          </RechartsPieChart>
        </ResponsiveContainer>
        
        <div className="space-y-3 min-w-max">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[item.name] }}
              />
              <span className="text-sm text-slate-600">{item.name}</span>
              <span className="text-sm font-bold text-slate-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ================= ROOM USAGE CHART ================= */
function RoomUsageChart({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl shadow-slate-200/50"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl shadow-lg">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Room Usage</h3>
          <p className="text-xs text-slate-500">Top booked rooms</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="name" 
            stroke="#94a3b8"
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
          />
          <YAxis stroke="#94a3b8" />
          <Tooltip 
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Bar dataKey="bookings" fill="#f59e0b" radius={[8, 8, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

/* ================= ORGANIZATION ACTIVITY CHART ================= */
function OrganizationActivityChart({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl shadow-slate-200/50"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-xl shadow-lg">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Organization Activity</h3>
          <p className="text-xs text-slate-500">Top active organizations</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <RechartsBarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" stroke="#94a3b8" />
          <YAxis dataKey="name" type="category" stroke="#94a3b8" width={140} />
          <Tooltip 
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Bar dataKey="bookings" fill="#06b6d4" radius={[0, 8, 8, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}