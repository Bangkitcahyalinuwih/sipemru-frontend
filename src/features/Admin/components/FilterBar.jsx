export default function FilterBar({
  query,
  onQueryChange,
  filters,
  onFilterChange,
  filterOptions,
  className = "",
}) {
  const filterOrder = ["campus", "building", "floor", "status"];
  const filterLabels = {
    campus: "Kampus",
    building: "Gedung",
    floor: "Lantai",
    status: "Status",
  };

  return (
    <div className={`rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 ${className}`}>
      <label className="flex-1 min-w-0">
        <span className="sr-only">Cari</span>
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Cari Ruangan..."
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
        />
      </label>

      {filterOrder.map((key) => (
        <select
          key={key}
          value={filters[key]}
          onChange={(e) => onFilterChange(key, e.target.value)}
          className="min-w-40 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
          aria-label={filterLabels[key]}
        >
          {filterOptions[key]?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}
