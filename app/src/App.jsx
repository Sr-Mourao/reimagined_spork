import { AvatarHeroes } from "./components/AvatarHeroes";
import { Button } from "./components/Button";
import { useState } from "react";
import axios from "axios";
import "./App.css";

const API = process.env.REACT_APP_ENDPOINT;

function App() {
  const [heroes, setHeroes] = useState([]);
  const [visibleHeroes, setVisibleHeroes] = useState([]);

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
      console.error("Erro ao buscar heróis:", error);
    }
  };

  const handlerEditHero = (id) => () => {
    console.log(id);
  };

  const handlerRemoveHero = (id) => () => {
    console.log(id);
  };

  const allHeroesVisible =
    visibleHeroes.length === heroes.length && heroes.length > 0;

  return (
    <div className="flex justify-center items-center flex-col text-center p-10 bg-gray-900 rounded-lg shadow-lg w-11/12 mt-8 ml-auto mr-auto">
      <h2 className="text-4xl font-bold text-white mb-6">Heroes</h2>
      <Button
        onClick={fetchAndShowHeroes}
        variant={allHeroesVisible ? "disabled" : "primary"}
        disabled={allHeroesVisible}
      >
        Buscar Heroes
      </Button>

      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {visibleHeroes.map((hero) => (
          <AvatarHeroes
            key={hero.id}
            hero={hero}
            onEdit={handlerEditHero(hero.id)}
            onRemove={handlerRemoveHero(hero.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
