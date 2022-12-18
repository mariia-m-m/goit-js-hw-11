import './css/styles.css';
// import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const gallery = document.querySelector('.gallery');
const form = document.querySelector("#search-form");
const input = document.querySelector("input")


form.addEventListener("submit", onSearch);

function onSearch(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  console.log(searchQuery)


  const fetchPictures = async () => {
    const response = await fetch(`${BASE_URL}?key=32162387-0406b1794dd4cc3a4c661920a&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`);
    const fetchedPictures = await response.json();
    console.log(fetchedPictures)
  }

  fetchPictures()
}
// PROSTO
  // if (searchQuery) {
  //   gallery.innerHTML = addAndRenderPicture + '';

  // }
 

// ASYNC
//   async function addAndRenderPictures(searchQuery) {
//     try {
//       const pictures = await addAndRenderPictures()
//       console.log(pictures)
//       updateInfo(pictures);
//     }
//     catch {
//       console.error(
//         console.log(error)
//       );
//     }
//   }
// }

// function addAndRenderPicture(pictures) {
//     return pictures.map(picture => {
//         return `
//   <div class="photo-card">
//   <img src="${picture.pageURL}." alt="${picture.tags}" loading="lazy" />
//   <div class="info">
//     <p class="${picture.likes}">
//       <b>Likes</b>
//     </p>
//     <p class="${picture.vievs}">
//       <b>Views</b>
//     </p>
//     <p class="${picture.comments}">
//       <b>Comments</b>
//     </p>
//     <p class="${picture.downloads}">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>`;
//     })
//       .join('');
// }











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
    
