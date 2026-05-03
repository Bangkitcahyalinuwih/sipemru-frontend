export function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mb-4 text-gray-600 cursor-pointer"
    >
      ← Kembali
    </button>
  );
}