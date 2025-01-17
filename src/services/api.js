import axios from "axios";

//Base da URL: https://api.themoviedb.org/3
//URL da API: https://api.themoviedb.org/3/movie/now_playing?api_key=bbdc9ce8fa2594ce47106774beb04d7b&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default api;