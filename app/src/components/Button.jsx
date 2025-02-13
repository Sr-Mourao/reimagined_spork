import { FaSearch } from "react-icons/fa";

export function Button(props) {
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    disabled: "bg-gray-200 text-gray-400 cursor-not-allowed",
  };

  const baseClasses =
    "flex items-center px-4 py-2 m-5 rounded-lg font-semibold transition-all duration-200 focus:outline-none";

  return (
    <button
      className={`${baseClasses} ${variantClasses[props.variant]}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
      <FaSearch className="ml-2" />
    </button>
  );
}
