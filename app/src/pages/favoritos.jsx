import { useFavoritesContext } from "../context/Favorites";
import { AvatarHeroes } from "../components/Card/AvatarHeroes";
import { useNavigate } from "react-router-dom";
import { ButtonDefault } from "../components/Buttons/Default";
import { FaPlus, FaArrowAltCircleLeft } from "react-icons/fa";

export function Favoritos() {
  const { favorite } = useFavoritesContext();

  const navigate = useNavigate();

  const redirectToHome = () => navigate("/");

  return (
    <>
      <h2 className="text-4xl mt-8 font-bold text-white mb-6">
        Meus Favoritos
      </h2>

      {favorite.length === 0 ? (
        <p className="text-lg text-gray-300 text-center mb-3">
          Você ainda não tem nenhum favorito. Adicione seus heróis favoritos!
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {favorite.map((hero) => (
            <AvatarHeroes
              key={hero.id}
              hero={hero}
              onEdit={() => {}}
              onRemove={() => {}}
            />
          ))}
        </div>
      )}
      <div className="flex flex-col items-center justify-center mt-8">
        <ButtonDefault
          onClick={redirectToHome}
          variant="primary"
          icon={<FaArrowAltCircleLeft size={15} />}
        >
          Ir para o menu principal
        </ButtonDefault>
      </div>
    </>
  );
}
