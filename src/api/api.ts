import axios from 'axios';

const API_KEY = 'gTJAO48YcpmrADUyo4opy4ES4g7iDBxx';
const URL = 'https://api.giphy.com/v1/gifs/random';


export const getImageApi = (tag: string) => {
    return axios.get(`${URL}?api_key=${API_KEY}&tag=${tag}`).then(response => response.data);
};