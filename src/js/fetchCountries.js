const API_URL = 'https://restcountries.com/v3.1';

export class JSONPlaceholderAPI {
  fetchCountries(name) {
    return fetch(
      `${API_URL}/name/${name}?fields=name,capital,population,flags,languages`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}
