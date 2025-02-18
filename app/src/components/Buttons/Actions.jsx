import { FaEdit, FaTrash, FaTimes, FaHeart, FaRegHeart } from "react-icons/fa";

export function ButtonAction(props) {
  const colors = {
    edit: " bg-blue-600 hover:bg-blue-700 ",
    remove: "bg-red-600 hover:bg-red-700 ",
    close: "bg-gray-600 hover:bg-gray-700 ",
    favorite: "bg-pink-500 hover:bg-pink-600",
    unfavorite: "bg-gray-400 hover:bg-gray-500",
  };
  const icons = {
    edit: <FaEdit size={15} />,
    remove: <FaTrash size={15} />,
    close: <FaTimes size={15} />,
    favorite: <FaHeart size={15} />,
    unfavorite: <FaRegHeart size={15} />,
  };
  const baseClasses =
    "text-white p-2 rounded-full focus:outline-non ransition-all duration-200";
  return (
    <>
      <button
        className={`${baseClasses} ${colors[props.variant]}`}
        onClick={props.onClick}
      >
        {icons[props.variant]}
      </button>
    </>
  );
}
