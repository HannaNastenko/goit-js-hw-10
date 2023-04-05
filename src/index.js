import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { JSONPlaceholderAPI } from './js/fetchCountries';
import countryList from './templates/list-markup.hbs';
import countryInfo from './templates/card-markup.hbs';

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const placeholderApi = new JSONPlaceholderAPI();

inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  e.preventDefault();

  let countryName = e.target.value.trim();

  if (countryName === '') {
    clearMarkup(countryListEl);
    clearMarkup(countryInfoEl);
    return;
  }

  placeholderApi
    .fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        clearMarkup(countryListEl);
        Notify.info(
          `Too many matches found. Please enter a more specific name.`
        );
        return;
      }
      renderMarkup(data);
    })
    .catch(err => {
      clearMarkup(countryListEl);
      clearMarkup(countryInfoEl);
      Notify.failure('Oops, there is no country with that name');
    });
}

function createListMarkup(data) {
  countryListEl.innerHTML = countryList(data);
}

function createCardMarkup(data) {
  countryInfoEl.innerHTML = countryInfo(data);
}

function renderMarkup(data) {
  if (data.length === 1) {
    clearMarkup(countryListEl);
    createCardMarkup(data);
  } else {
    clearMarkup(countryInfoEl);
    createListMarkup(data);
  }
}

function clearMarkup(elem) {
  elem.innerHTML = '';
}
