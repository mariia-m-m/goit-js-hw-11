
import './css/styles.css';
import Notiflix from 'notiflix';
import PicturesApiService from './js/picture-service'

const gallery = document.querySelector('.gallery');
const form = document.querySelector("#search-form");
const btnLoadMore = document.querySelector('.load-more');

let currentPage = 1;
let currentHits = 0;

const picturesApiService = new PicturesApiService;

form.addEventListener("submit", onSearch);

async function onSearch(event) {
  event.preventDefault();
  picturesApiService.query = event.currentTarget.elements.searchQuery.value.trim();
  currentPage = 1;

 if (picturesApiService.query === '') {
    onFetchError()
  }

  const response = await picturesApiService.fetchPictures(picturesApiService.query, currentPage);
  
  currentHits = response.hits.length;

  if (response.totalHits > 40) {
    btnLoadMore.classList.remove('is-hidden');
  } else {
    btnLoadMore.classList.add('is-hidden');
  }

  try {
    if (response.totalHits > 0) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
      cleanGallery();
      picturesApiService.addAndRenderPictures(response.hits)
    
    }

    if (response.totalHits === 0) {
      cleanGallery();
      onFetchError();
      btnLoadMore.classList.add('is-hidden');
    }
  }
    catch (error) {
      console.log(error)
    }
  
  picturesApiService.resetPage();
  
  picturesApiService.fetchPictures()
    .then(pictures => {
      cleanGallery();
      appendPictures(response.hits);
    })
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

function appendPictures(pictures) {
addPictures(pictures)
}


function cleanGallery() {
  gallery.innerHTML = '';
}
  // console.log(picturesApiService.query)

btnLoadMore.addEventListener('click', onLoadMore);


async function onLoadMore(event) {
  currentPage += 1;
  const response = await picturesApiService.fetchPictures(picturesApiService.query, currentPage);
  picturesApiService.resetPage();
  picturesApiService.fetchPictures().then(pictures => {appendPictures(response.hits)})
  currentHits += response.hits.length;
  if (currentHits === response.totalHits) {
    btnLoadMore.classList.add('is-hidden');
    alertEndOfSearch();
    alert("We're sorry, but you've reached the end of search results.")
    gallery.insertAdjacentHTML('beforeend',(`<p> We're sorry, but you've reached the end of search results.</p>`).join(''))
  }
}

function onFetchError(error) {
  
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}
function alertEndOfSearch() {
  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
}
