import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme-info.css'

import api from '../../services/api';

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

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
                console.log("Filme não encontrado");
                navigate("../Erro", { replace: true });
                return;
            })
        }

        LoadFilme();

        return () => {
            console.log("COMPONENTE DESMONTADO");
        }

    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@cinehub");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id)
        
        if(hasFilme){
            alert("Esse filme já está na lista!");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@cinehub", JSON.stringify(filmesSalvos));
        alert("Filme salvo com sucesso!")
    }

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
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target="blank" rel="external">
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;