import { FaSearch, FaPlus, FaRedo, FaHeart } from "react-icons/fa";
import { AvatarHeroes } from "../components/Card/AvatarHeroes";
import { ButtonDefault } from "../components/Buttons/Default";
import { ModalDefault } from "../components/Modal/Default";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../App.css";

const API = process.env.REACT_APP_ENDPOINT;

function App() {
  const [heroes, setHeroes] = useState([]);
  const [visibleHeroes, setVisibleHeroes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [selectedHero, setSelectedHero] = useState(null);

  const navigate = useNavigate();

  /**
   * Fetches heroes from the API and updates the state with the new data.
   * - If no heroes are loaded, it fetches the data and sets the first hero as visible.
   * - If heroes are already loaded, it progressively displays more heroes one by one.
   *
   * @async
   * @function fetchAndShowHeroes
   * @returns {Promise<void>} A promise that resolves when the heroes are fetched and state is updated.
   * @throws {Error} Logs an error and displays an alert if the API request fails.
   */
  const fetchAndShowHeroes = async () => {
    try {
      if (heroes.length === 0) {
        const { data } = await axios.get(`${API}/heroes`);
        if (data.length === 0) {
          alert("Nenhum herói encontrado.");
          handlerOpenModal();
          return;
        }
        setHeroes(data);
        setVisibleHeroes([data[0]]);
      } else if (visibleHeroes.length < heroes.length) {
        setVisibleHeroes([...visibleHeroes, heroes[visibleHeroes.length]]);
      }
    } catch (error) {
      alert(`Erro ao buscar heróis: ${error}`);
      console.error(error);
    }
  };

  const handleHeroAdded = (newHero) => {
    setHeroes((prevHeroes) => [...prevHeroes, newHero]);
  };

  const handleHeroUpdated = (updatedHero) => {
    const updatedHeroesSelected = visibleHeroes.map((hero) =>
      hero.id === updatedHero.id ? { ...hero, ...updatedHero } : hero
    );
    setHeroes(updatedHeroesSelected);
    setVisibleHeroes(updatedHeroesSelected);
  };

  const handlerRemoveHero = async (id) => {
    try {
      await axios.delete(`${API}/heroes`, { data: { id } });
      const updatedHeroes = visibleHeroes.filter((hero) => hero.id !== id);
      setHeroes(updatedHeroes);
      setVisibleHeroes(updatedHeroes);
    } catch (error) {
      console.error(error);
      alert(`Erro ao deletar herói: ${error}`);
    }
  };

  const handlerOpenModal = () => setOpenModal(true);
  const handlerCloseModal = () => setOpenModal(false);

  const handlerOpenModalUpdate = async (item) => {
    setSelectedHero(item);
    setOpenModalUpdate(true);
  };
  const handlerCloseModalUpdate = () => setOpenModalUpdate(false);

  const cleanHooksVisibleHeroes = () => {
    setVisibleHeroes([]);
  };

  const redirectToFavoritos = () => navigate("/favoritos");

  const allHeroesVisible =
    visibleHeroes.length === heroes.length && heroes.length > 0;

  return (
    <>
      <h2 className="text-4xl mt-8 font-bold text-white mb-6">Heróis</h2>

      <ButtonDefault
        onClick={fetchAndShowHeroes}
        variant={allHeroesVisible ? "disabled" : "secondary"}
        disabled={allHeroesVisible}
        icon={<FaSearch size={15} />}
      >
        Buscar Herói
      </ButtonDefault>

      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {visibleHeroes.map((hero) => (
          <AvatarHeroes
            key={hero.id}
            hero={hero}
            onEdit={() => handlerOpenModalUpdate(hero)}
            onRemove={() => handlerRemoveHero(hero.id)}
          />
        ))}
      </div>

      {visibleHeroes.length > 0 && (
        <div className="flex justify-between w-2/4 mt-5">
          <ButtonDefault
            onClick={handlerOpenModal}
            variant="primary"
            icon={<FaPlus size={15} />}
          >
            Criar
          </ButtonDefault>
          <ButtonDefault
            onClick={cleanHooksVisibleHeroes}
            variant="warning"
            icon={<FaRedo size={15} />}
          >
            Limpar
          </ButtonDefault>
          <ButtonDefault
            onClick={redirectToFavoritos}
            variant="favorites"
            icon={<FaHeart size={15} />}
          >
            Favoritos
          </ButtonDefault>
        </div>
      )}
      {openModal && (
        <ModalDefault
          title="Cadastrar novo herói"
          onClose={handlerCloseModal}
          onSuccess={handleHeroAdded}
        />
      )}
      {openModalUpdate && (
        <ModalDefault
          title="Editar herói"
          hero={selectedHero}
          onClose={handlerCloseModalUpdate}
          onSuccess={handleHeroUpdated}
        />
      )}
    </>
  );
}

export default App;
