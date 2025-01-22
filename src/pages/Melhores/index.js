import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "../Lancamentos/lancamentos.css";

function Melhores() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMelhores() {
      try {
        const response = await api.get("/movie/top_rated", {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            language: "pt-BR",
            page: 1, 
          },
        });

        setFilmes(response.data.results);
        setLoading(false);
      } catch (error) {
        console.log("Erro ao carregar os melhores avaliados:", error);
      }
    }

    loadMelhores();
  }, []);

  if (loading) {
    return (
      <div className="lancamentos">
        <h1>Carregando lançamentos...</h1>
      </div>
    );
  }

  return (
    <div className="lancamentos">
      <h1>Filmes com as melhores avaliações</h1>
      <div className="lista-lancamentos">
        {filmes.map((filme) => (
          <div key={filme.id} className="card-filme">
            <img
              src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}
              alt={filme.title}
            />
            <h2>{filme.title}</h2>
            <Link to={`/filme/${filme.id}`}>Detalhes</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Melhores;
