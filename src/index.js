import './css/styles.css';
import Notiflix from 'notiflix';
import PicturesApiService from './js/picture-service'

const gallery = document.querySelector('.gallery');
const form = document.querySelector("#search-form");
const input = document.querySelector("input");
const btnLoadMore = document.querySelector('.load-more')


const picturesApiService = new PicturesApiService;



form.addEventListener("submit", onSearch);

function onSearch(event) {
  event.preventDefault();
  picturesApiService.query = event.currentTarget.elements.searchQuery.value.trim();
  picturesApiService.resetPage();
  picturesApiService.fetchPictures()
    .then(pictures => gallery.insertAdjacentHTML('beforeend', addPictures(pictures)))
  }

  // console.log(picturesApiService.query)

btnLoadMore.addEventListener('click', onLoadMore)

async function onLoadMore(event){
  picturesApiService.fetchPictures()
    .then(pictures => gallery.insertAdjacentHTML('beforeend', addPictures(pictures)));
  picturesApiService.page+=1
}

function addPictures(pictures) {
return pictures.map(picture => {
      return `<div class="photo-card">
  <img src="${picture.webformatURL}." alt="${picture.tags}" loading="lazy" />
  <div class="info">
    <p class="${picture.likes}">
      <b>Likes</b>
    </p>
    <p class="${picture.vievs}">
      <b>Views</b>
    </p>
    <p class="${picture.comments}">
      <b>Comments</b>
    </p>
    <p class="${picture.downloads}">
      <b>Downloads</b>
    </p>
  </div>
</div>`})
    .join('');
  }
 












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
    
