import { useState } from "react";
import "./App.css";

const API = process.env.REACT_APP_ENDPOINT;

function App() {
  const [heroes, setHeroes] = useState([]);
  const [visibleHeroes, setVisibleHeroes] = useState([]);

  const fetchHeroes = async () => {
    try {
      if (heroes.length === 0) {
        const response = await fetch(`${API}/heroes`);
        const data = await response.json();
        setHeroes(data);
        setVisibleHeroes([data[0]])
      } else if (visibleHeroes.length < heroes.length) {
        setVisibleHeroes([...visibleHeroes, heroes[visibleHeroes.length]]);
      }
    } catch (error) {
      console.error("Erro ao buscar heróis:", error);
    }
  };

  return (
    <div className="App">
      <h2>Heroes</h2>
      <button disabled={visibleHeroes.length === heroes.length && heroes.length > 0}
        className="fetchBtn" onClick={fetchHeroes}>
        Fetch
      </button>
      <div className="result">
        {visibleHeroes.map((hero) => (
          <div key={hero.id}>
            <img className="heroImg" src={hero.imagem} alt={hero.name} />
            <p><strong>{hero.name}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
