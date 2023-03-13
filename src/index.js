import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetch-api'

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

    if (searchCountry !== 0) {
        fetchCountries(searchCountry).then(data => {
            if (data.length > 10) {
                alert("Too many matches found. Please enter a more specific name.");
            }

            else if (data.length >= 2 || data.length <= 10) {
                createCountriesListMarkup(data);
            }

            else if (data === 0) {
                alert("Oops, there is no country with that name")
            }

            else if (data.length === 1) {
                createCountryInfoMarkup(data);
            }
            console.log(data)
        })
        .catch((error) => {console.log('error', error)})  
    }
}

function createCountriesListMarkup(countries) {
    const markupCountriesList = countries.map(country =>
    { return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official
        }" width="30" hight="20">
         <p>${country.name.official}</p>
                </li>` }).join('');

    refs.list.insertAdjacentHTML('beforeend', markupCountriesList);
}

function createCountryInfoMarkup(countries) {
    const markupCountryInfo = countries.map(country => {
        return `<div>
        <img
          src="${country.flags.svg}"
          alt="Flag of ${country.name.official}"
          width="30"
          hight="20"
        />
        <p>${country.name.official}</p>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Languages: ${Object.values(country.languages)}</p>
      </div>`
    }).join('');
    
    refs.info.innerHTML = markupCountryInfo;
}

function cleanHtml() {
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';
}
