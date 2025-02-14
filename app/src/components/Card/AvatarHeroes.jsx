import { EditButton } from "../Buttons/Edit";
import { RemoveButton } from "../Buttons/Remove";

export function AvatarHeroes({ hero, onRemove, onEdit }) {
  return (
    <div className="relative p-4 w-40 bg-gray-800 rounded-2xl shadow-lg flex flex-col items-center">
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-600 bg-gray-700">
        <img
          className="w-full h-full object-cover"
          src={hero.imagem}
          alt={hero.name}
        />
      </div>
      <div className="absolute top-2 right-2 flex flex-col gap-2">
        <RemoveButton onRemove={onRemove} />
        <EditButton onEdit={onEdit} />
      </div>
      <p className="mt-3 text-gray-200 font-semibold">{hero.name}</p>
    </div>
  );
}
