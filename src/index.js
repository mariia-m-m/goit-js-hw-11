
import './css/styles.css';
import Notiflix from 'notiflix';
import PicturesApiService from './js/picture-service';
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";
import "simplelightbox/dist/simple-lightbox.min.css"

const gallery = document.querySelector('.gallery');
const form = document.querySelector("#search-form");
const btnLoadMore = document.querySelector('.load-more');


const picturesApiService = new PicturesApiService;

btnLoadMore.classList.add('is-hidden')

form.addEventListener("submit", onSearch);

async function onSearch(event) {
  event.preventDefault();
  picturesApiService.query = event.currentTarget.elements.searchQuery.value.trim();
  picturesApiService.page = 1;
    
  try {
    if (picturesApiService.query === '') {
    cleanGallery();
    onFetchError();
    return 
  }
    const response = await picturesApiService.fetchPictures();
    if (response.totalHits > 40) {
      btnLoadMore.classList.remove('is-hidden');
    } else {
      btnLoadMore.classList.add('is-hidden');
    }
    if (response.totalHits === 0) {
      cleanGallery();
      onFetchError();
    }
    if (response.totalHits!==0) {
      Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
      cleanGallery();
      addPictures(response.hits)
    }
  }
  catch (error) {
    console.log(error)
  }

  picturesApiService.resetPage();
 
}


function addPictures(pictures) {
  const markup=pictures.map(picture => {
      return `<div class="photo-card">
  <a href = "${picture.largeImageURL}"><img src="${picture.webformatURL}." alt="${picture.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>${picture.likes} likes</b>
    </p>
    <p class="info-item">
      <b>${picture.views} views</b>
    </p>
    <p class="info-item">
      <b>${picture.comments} comments</b>
    </p>
    <p class="info-item">
      <b>${picture.downloads} downloads</b>
    </p>
  </div>
</div>`})
    .join('');
  
gallery.insertAdjacentHTML('beforeend', markup);
gallerys.refresh(); 
}


btnLoadMore.addEventListener('click', onLoadMore);

async function onLoadMore(event) {
 
  picturesApiService.page += 1;

  try {
    const response = await picturesApiService.fetchPictures();
    addPictures(response.hits);

    const totalPages = Math.ceil(response.totalHits / 40);
    if (picturesApiService.page >= totalPages) {
      btnLoadMore.classList.add('is-hidden');
      alertEndOfSearch();
    }
  }
  catch(error) {
    console.log(error)
  }
}


function onFetchError(error) {
  
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}
function alertEndOfSearch(error) {
  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
}
function cleanGallery() {
  gallery.innerHTML = '';
}

const gallerys = new SimpleLightbox('.gallery a');
gallerys.on('show.simplelightbox', {
  animation:FormDataEvent,
 captionDelay: 250,
  overlayOpacity: 0.5,
  close: true,
  closeText:'X',
});




