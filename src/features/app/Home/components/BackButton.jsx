import { ArrowLeft } from "lucide-react";

export function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 mb-4 text-gray-600 cursor-pointer"
    >
      <ArrowLeft size={18} />
      Kembali
    </button>
  );
}