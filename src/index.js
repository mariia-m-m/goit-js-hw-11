import './css/styles.css';
// import debounce from 'lodash.debounce'
// import { fetchCountries } from "./js/fetchCountries";
// import Notiflix from 'notiflix';

// const DEBOUNCE_DELAY = 300;
// const countryList = document.querySelector('.country-list');
// const countryInfo = document.querySelector('.country-info');
// const input = document.querySelector("input#search-box");

// input.addEventListener(
//   'input',
//     debounce(onSearch, DEBOUNCE_DELAY)
// );

// function onSearch(event) {
//      event.preventDefault()
//     const searchQuery = event.target.value.trim();
//     updateInfo();
//     if (!searchQuery) {
//         return;
//     }

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

// function renderContryCard(countries) {
//   return countries
//     .map(country => {
//       return `
//       <li>
//         <img src="${country.flags.svg}" alt="Flag of ${
//         country.name.official}" width="30" hight="20">
//            <b>${country.name.official}</b></p>
//               <p><b>Capital</b>: ${country.capital}</p>
//               <p><b>Population</b>: ${country.population}</p>
//               <p><b>Languages</b>: ${Object.values(
//                 country.languages)} </p></li>`;
//     })
//       .join('');
// }

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

// function updateInfo(list = '', info = '') {
//   countryList.innerHTML = list;
//   countryInfo.innerHTML = info;
// }

// function onFetchError(error) {
//   Notiflix.Notify.failure('Oops, there is no country with that name');
// }
// input.addEventListener("keyup", onSubmit)



//    
    
