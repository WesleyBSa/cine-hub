import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "../Lancamentos/lancamentos.css";

function Popular() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPopulares() {
      try {
        const response = await api.get("/movie/popular", {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            language: "pt-BR",
            page: 1, 
          },
        });

        setFilmes(response.data.results);
        setLoading(false);
      } catch (error) {
        console.log("Erro ao carregar os filmes populares:", error);
      }
    }

    loadPopulares();
  }, []);

  if (loading) {
    return (
      <div className="lancamentos">
        <h1>Carregando filmes populares...</h1>
      </div>
    );
  }

  return (
    <div className="lancamentos">
      <h1>Filmes Populares</h1>
      <div className="lista-lancamentos">
        {filmes.map((filme) => (
          <div key={filme.id} className="card-filme">
            {filme.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}
                alt={filme.title}
              />
            ) : (
              <div className="placeholder-poster">Poster indisponível</div> 
            )}
            <h2>{filme.title}</h2>
            <Link to={`/filme/${filme.id}`}>Detalhes</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popular;
