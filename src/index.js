import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetch-api';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY))

function onInputChange(e) {
    const searchCountry = e.target.value.trim();
    cleanHtml();

    if (searchCountry !== '') {
        fetchCountries(searchCountry).then(data => {
            
            // console.log(data)

            // if (data.length > 10) {
            //     Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            // }

            // else if (data.length >= 2 && data.length <= 10) {
            //     createCountriesListMarkup(data);
            // }

            // else if (data.length === 1) {
            //     createCountryInfoMarkup(data);
            // }

            // else if (data !== 0) {
            //     Notiflix.Notify.failure("Oops, there is no country with that name");
            // }

            switch (true) {
                case data.length > 10:
                    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                    break;
                case data.length >= 2 && data.length <= 10:
                    createCountriesListMarkup(data);
                    break;
                case data.length === 1:
                    createCountryInfoMarkup(data);
                    break;
                case data !== 0:
                    Notiflix.Notify.failure("Oops, there is no country with that name");
                    break;
                default:
                    break;
            }

        })
            .catch((error) => {
                
                console.log('error', error)
            })  
    }
}

function createCountriesListMarkup(countries) {
    const markupCountriesList = countries.map(country =>
    { return `<li class="list-item">
    <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="10">
    <p>${country.name.official}</p></li>`
    }).join('');

    refs.list.insertAdjacentHTML('beforeend', markupCountriesList);
}

function createCountryInfoMarkup(countries) {
    const markupCountryInfo = countries.map(country => {
        return `<div>
        <img
          src="${country.flags.svg}"
          alt="Flag of ${country.name.official}"
          width="40"
          hight="20"
        />
        <p class="country">${country.name.official}</p>
        <p><span class="country-desc">Capital:</span> ${country.capital}</p>
        <p><span class="country-desc">Population:</span> ${country.population}</p>
        <p><span class="country-desc">Languages:</span> ${Object.values(country.languages)}</p>
      </div>`
    }).join('');
    
    refs.info.innerHTML = markupCountryInfo;
}

function cleanHtml() {
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';
}
