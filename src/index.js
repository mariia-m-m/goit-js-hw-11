
import './css/styles.css';
import Notiflix from 'notiflix';
import PicturesApiService from './js/picture-service'

const gallery = document.querySelector('.gallery');
const form = document.querySelector("#search-form");
const btnLoadMore = document.querySelector('.load-more');

let currentHits = 0;

const picturesApiService = new PicturesApiService;

btnLoadMore.classList.add('is-hidden')

form.addEventListener("submit", onSearch);

async function onSearch(event) {
  event.preventDefault();
  picturesApiService.query = event.currentTarget.elements.searchQuery.value.trim();
  picturesApiService.page = 1;

  if (picturesApiService.query === '') {
  cleanGallery();
   onFetchError()
  
  }

  const response = await picturesApiService.fetchPictures(picturesApiService.query, picturesApiService.page);
  
  currentHits = response.hits.length;

  if (response.totalHits > 40) {
    btnLoadMore.classList.remove('is-hidden');
  } else {
    btnLoadMore.classList.add('is-hidden');
  }

  try {
    if (picturesApiService.query !== '') {
      Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
      cleanGallery();
     addPictures(response.hits)
    }

    if (response.totalHits === 0) {
      cleanGallery();   
      btnLoadMore.classList.add('is-hidden');
      onFetchError();
      
    }
  }
    catch (error) {
      console.log(error)
    }
  
  picturesApiService.resetPage();
  
      cleanGallery();
      addPictures(response.hits);
    }


function addPictures(pictures) {
  const markup=pictures.map(picture => {
      return `<div class="photo-card">
  <img src="${picture.webformatURL}." alt="${picture.tags}" loading="lazy" />
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
}


console.log(picturesApiService.query)

btnLoadMore.addEventListener('click', onLoadMore);


async function onLoadMore(event) {
 
  picturesApiService.page += 1;
  const response = await picturesApiService.fetchPictures(picturesApiService.query, picturesApiService.page);
  addPictures(response.hits);
  currentHits += response.hits.length;
  console.log(response);

  const totalPages = Math.ceil(response.totalHits / 40);
  if (picturesApiService.page >= totalPages) {
    btnLoadMore.classList.add('is-hidden');
    alertEndOfSearch();
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