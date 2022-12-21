import './css/styles.css';
import Notiflix from 'notiflix';
import PicturesApiService from './js/picture-service'

const gallery = document.querySelector('.gallery');
const form = document.querySelector("#search-form");
const btnLoadMore = document.querySelector('.load-more')


const picturesApiService = new PicturesApiService;



form.addEventListener("submit", onSearch);

function onSearch(event) {
  picturesApiService.addAndRenderPictures()
  event.preventDefault();
  cleanGallery();
  picturesApiService.query = event.currentTarget.elements.searchQuery.value.trim();
  picturesApiService.resetPage();
  if (picturesApiService.query === '') {
    gallery.innerHTML = '';
    onFetchError()
  
  }
  
  picturesApiService.fetchPictures()
    .then(pictures => {
      cleanGallery();
      appendPictures(pictures);
    
})
}
function appendPictures(pictures) {
    gallery.insertAdjacentHTML('beforeend', addPictures(pictures))
}
  
function cleanGallery() {
  gallery.innerHTML = '';
}
  // console.log(picturesApiService.query)

btnLoadMore.addEventListener('click', onLoadMore);


async function onLoadMore(event){
  picturesApiService.fetchPictures()
    .then(pictures => {{
      cleanGallery();
      appendPictures(pictures);
    
}});
  picturesApiService.page += 1;
}

function addPictures(pictures) {
return pictures.map(picture => {
      return `<div class="photo-card">
  <img src="${picture.webformatURL}." alt="${picture.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${picture.likes}likes</b>
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
  }
 

function onFetchError(error) {
  
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');

}


// function setScroll() {
// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });
// }
// setScroll()








//     fetchCountries(searchQuery)
//         .then(countries => {
//             console.log(countries)
//             if (countries.length > 10) {
//                Notiflix.Notify.info(
//           'Too many matches found. Please enter a more specific name.')
//             } else if(countries.length >= 2 && countries.length <= 10) {
//         const markUp = renderCountriesList(countries);
//         updateInfo('',markUp);
//       } else if (countries.length === 1) {
//         const markUp = renderContryCard(countries);
//         updateInfo('', markUp);
//       }
//     })
//         .catch(error => {
//             console.log(error);
//             onFetchError()
//         })
// }

// 

// function renderCountriesList(countries) {
//   return countries
//     .map(country => {
//       return `<li>
//         <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
//              <b>${country.name.official}</p>
//     </li>`;
//     })
//     .join('');
// }



// function onFetchError(error) {
//   Notiflix.Notify.failure('Oops, there is no country with that name');
// }
// input.addEventListener("keyup", onSubmit)



//    
    
