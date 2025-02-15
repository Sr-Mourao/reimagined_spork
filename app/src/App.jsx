import { AvatarHeroes } from "./components/Card/AvatarHeroes";
import { ButtonDefault } from "./components/Buttons/Default";
import { ModalDefault } from "./components/Modal/Default";
import { FaSearch, FaPlus, FaRedo } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import "./App.css";

const API = process.env.REACT_APP_ENDPOINT;

function App() {
  const [heroes, setHeroes] = useState([]);
  const [visibleHeroes, setVisibleHeroes] = useState([]);
  const [openModal, setOpenModal] = useState(false);

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

  const handlerEditHero = (id) => {
    console.log(id);
  };

  const handlerRemoveHero = (item) => {
    console.log(item);
  };

  const handlerOpenModal = () => setOpenModal(true);
  const handlerCloseModal = () => setOpenModal(false);

  const cleanHooksVisibleHeroes = () => {
    setVisibleHeroes([]);
  };

  const allHeroesVisible =
    visibleHeroes.length === heroes.length && heroes.length > 0;

  return (
    <div className="flex items-center flex-col text-center p-10 bg-gray-900 rounded-lg shadow-lg w-8/12 h-[calc(100vh-100px)] mt-8 ml-auto mr-auto">
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
            onEdit={() => handlerEditHero(hero)}
            onRemove={() => handlerRemoveHero(hero.id)}
          />
        ))}
      </div>

      {visibleHeroes.length > 0 && (
        <div className="flex justify-between w-3/12 mt-5">
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
        </div>
      )}
      {openModal && (
        <ModalDefault title="Novo Herói" onClose={handlerCloseModal} />
      )}
    </div>
  );
}

export default App;
