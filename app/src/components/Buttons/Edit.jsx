import { FaEdit } from "react-icons/fa";

export function EditButton({ onEdit }) {
  return (
    <>
      <button
        className="text-white p-2 bg-blue-600 hover:bg-blue-700 rounded-full focus:outline-none transition-all duration-200"
        onClick={onEdit}
      >
        <FaEdit size={18} />
      </button>
    </>
  );
}
