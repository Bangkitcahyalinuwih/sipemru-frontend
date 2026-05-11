import { Edit3, Eye, Trash2, Check, X, Plus } from "lucide-react";

export default function ActionButtons({
  onDelete,
  onInspect,
  onUpdate,
  onInsert,
  agreement,
  rejection,
  showInsert = false,
}) {
  return (
    <div className="flex items-center gap-2">
      {onInspect && (
        <button
          type="button"
          onClick={onInspect}
          className="inline-flex items-center justify-center rounded-full border border-slate-500 bg-slate-800 px-2.5 py-2 text-slate-200 transition hover:border-slate-400 hover:text-white"
          aria-label="Inspect room"
        >
          <Eye className="w-4 h-4" />
        </button>
      )}

      {onUpdate && (
        <button
          type="button"
          onClick={onUpdate}
          className="inline-flex items-center justify-center rounded-full border border-amber-500 bg-amber-500/10 px-2.5 py-2 text-amber-300 transition hover:bg-amber-500/20 hover:text-amber-100"
          aria-label="Update room"
        >
          <Edit3 className="w-4 h-4" />
        </button>
      )}

      {showInsert && onInsert && (
        <button
          type="button"
          onClick={onInsert}
          className="inline-flex items-center justify-center rounded-full border border-cyan-500 bg-cyan-500/10 px-2.5 py-2 text-cyan-300 transition hover:bg-cyan-500/20 hover:text-white"
          aria-label="Insert room"
        >
          <Plus className="w-4 h-4" />
        </button>
      )}

      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center justify-center rounded-full border border-red-500 bg-red-500/10 px-2.5 py-2 text-red-300 transition hover:bg-red-500/20 hover:text-white"
          aria-label="Delete room"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      {agreement && (
        <button
          type="button"
          onClick={agreement}
          className="inline-flex items-center justify-center rounded-full border border-green-500 bg-green-500/10 px-2.5 py-2 text-green-300 transition hover:bg-green-500/20 hover:text-white"
          aria-label="Setujui"
        >
          <Check className="w-4 h-4" />
        </button>
      )}

      {rejection && (
        <button
          type="button"
          onClick={rejection}
          className="inline-flex items-center justify-center rounded-full border border-red-500 bg-red-500/10 px-2.5 py-2 text-red-300 transition hover:bg-red-500/20 hover:text-white"
          aria-label="Tolak"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
