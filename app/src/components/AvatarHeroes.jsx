import { FaTimes, FaEdit } from "react-icons/fa";
export function AvatarHeroes({ hero, onRemove, onEdit }) {
  return (
    <div className="relative p-2 m-2 border rounded-lg shadow-lg text-center">
      <img
        className="max-w-[120px] rounded-full mx-[50px] bg-white shadow-lg"
        src={hero.imagem}
        alt={hero.name}
      />
      <p className="mt-2 text-lg font-bold text-white">{hero.name}</p>
      <div className="absolute top-2 right-2 flex flex-col gap-2">
      <button
          className="text-white p-2 bg-red-600 hover:bg-red-700 rounded-full focus:outline-none transition-all duration-200"
          onClick={onRemove}
        >
          <FaTimes size={18} />
        </button>
        <button
          className="text-white p-2 bg-blue-600 hover:bg-blue-700 rounded-full focus:outline-none transition-all duration-200"
          onClick={onEdit}
        >
          <FaEdit size={18} />
        </button>
      </div>
    </div>
  );
}
