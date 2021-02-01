import axios from 'axios';

const API_KEY = 'gTJAO48YcpmrADUyo4opy4ES4g7iDBxx';
const URL = 'https://api.giphy.com/v1/gifs/random';

type apiResponseType = {
    data: {
        id: string,
        image_url: string
    }
}

export const getGifsApi = (tag: string) => {
    return axios.get<apiResponseType>(`${URL}?api_key=${API_KEY}&tag=${tag}`).then(response => response.data);
};