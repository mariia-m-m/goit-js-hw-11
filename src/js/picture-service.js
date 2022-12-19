
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
        console.log(fetchedPictures)
        return fetchedPictures
      
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



// async function fetchPictures() {
//     const response = await fetch(`${BASE_URL}?key=32162387-0406b1794dd4cc3a4c661920a&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`);
//     const fetchedPictures = await response.json();
//     console.log(fetchedPictures)

    // fetchPictures()
    
 async function addAndRenderPictures() {
     try {
    //   const pictures = await addPictures()
    //   console.log(pictures)
    //   if (pictures.length === ) {
    //   Notiflix.Notify.info(
    //       'Too many matches found. Please enter a more specific name.')
    }
    catch (error){
        console.log(error)
    }
  }

