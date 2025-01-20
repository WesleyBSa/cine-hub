import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './filme-info.css'

import api from '../../services/api';

function Filme(){
    const { id } = useParams();
    const [filme, setFilme] = useState({}); 
    const [loading, setLoading] = useState(true); 

    useEffect(()=> {
        async function LoadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: process.env.REACT_APP_API_KEY,
                    language: "pt-BR",
                }
            })
            .then((response)=> {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=> {
                console.log("Filme não encontrado")
            })
        }

        LoadFilme();

        return () => {
            console.log("COMPONENTE DESMONTADO");
        }

    }, [])

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}></img>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            <strong>{`País: (${filme.origin_country})`}</strong>

            <div className="area-buttons">
                <button>Salvar</button>
                <button>
                    <a href="#">
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;