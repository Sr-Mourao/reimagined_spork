import { FaTrash } from "react-icons/fa";

export function RemoveButton({ onRemove }) {
  return (
    <>
      <button
        className="text-white p-2 bg-red-600 hover:bg-red-700 rounded-full focus:outline-none transition-all duration-200"
        onClick={onRemove}
      >
        <FaTrash size={18} />
      </button>
    </>
  );
}
