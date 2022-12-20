
const BASE_URL = 'https://pixabay.com/api/';
export default class PicturesApiService {
    constructor() { 
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchPictures() {
    console.log(this)
    const response = await fetch(`${BASE_URL}?key=32162387-0406b1794dd4cc3a4c661920a&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
        const fetchedPictures = await response.json();
        const pictures = fetchedPictures.hits
        return pictures;
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

 async function addAndRenderPictures() {
     try {
        //  const pictures = await fetchPictures();
    //   console.log(pictures)
    
    }
    catch (error){
        console.log(error.message)
    }
  }

addAndRenderPictures()