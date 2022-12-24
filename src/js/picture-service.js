import axios from 'axios'
const BASE_URL = 'https://pixabay.com/api/';
axios.defaults.baseURL = 'https://pixabay.com/api/'
const API_KEY = '32162387-0406b1794dd4cc3a4c661920a'

export default class PicturesApiService {
    constructor() { 
        this.searchQuery = '';
        this.page = 1;
    }


    async fetchPictures () {
     console.log(this)
        const filter = `?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
        const response = await axios.get(`${BASE_URL}${filter}`);
         return response.data;
}
   
   
    
get query(){
    return this.searchQuery;
};

set query(newQuery){
    this.searchQuery = newQuery;
    }
    
resetPage(){
    this.page = 1;
}
}

