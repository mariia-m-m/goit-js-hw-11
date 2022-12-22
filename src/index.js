
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



function cleanGallery() {
  gallery.innerHTML = '';
}
  // console.log(picturesApiService.query)

btnLoadMore.addEventListener('click', onLoadMore);


async function onLoadMore(event) {
 
  const response = await picturesApiService.fetchPictures(picturesApiService.query, picturesApiService.page += 1);
  addPictures(response.hits);
  currentHits += response.hits.length;
  console.log(response);

  //  const page = picturesApiService.page += 1;
  // const totalPages = Math.ceil(response.totalHits / 40);
  //    if (page>=totalPages&&totalPages===1) {
  //   btnLoadMore.classList.add('is-hidden');
  //   alert("We're sorry, but you've reached the end of search results.");
  //   alertEndOfSearch();
  
    
    if (currentHits>response.totalHits) {
    btnLoadMore.classList.add('is-hidden');
    alertEndOfSearch();
    alert("We're sorry, but you've reached the end of search results.")
    gallery.insertAdjacentHTML('beforeend',`<p> We're sorry, but you've reached the end of search results.</p>`.join(''))
  }
}

function onFetchError(error) {
  
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}
function alertEndOfSearch(error) {
  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
}
