import { useEffect, useState } from "react";
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';
import '../Lancamentos/lancamentos.css'


function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilmes() {
            const response = await api.get("movie/upcoming", {
                params: {
                    api_key: process.env.REACT_APP_API_KEY,
                    language: "pt-BR",
                    page: 1,
                }
            })

            setFilmes(response.data.results.slice(0, 20));
            setLoading(false);
        }

        loadFilmes();
    }, [])

    if(loading){
        return(
           <div className="loading">
            <h2>Carregando filmes...</h2>
           </div> 
        )
    }

  return (
    <div className="filmes-home">
      <h1>Todos os Filmes</h1>
      <div className="filmes-home-lista">
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

export default Home;