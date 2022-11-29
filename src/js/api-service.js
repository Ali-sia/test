import axios from 'axios';

const API_KEY = '13420675-ac3576debf8258c428cd202e5';
const BASE_URL = 'https://pixabay.com/api/';

export default class PhotoApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 8;
  }

  async fetchPhoto() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=${this.per_page}&image_type=photo&orientation=horizontal&safesearch=true`;

    return await axios
      .get(url)
      .then(response => {
        return response.data;
      })
      .catch(error => console.error(error))
      .then(photo => {
        this.incrementPage();
        return photo;
      });
  }

  async fetchPhotoDefault() {
    const url = `${BASE_URL}?key=${API_KEY}&q=tree&page=${this.page}&per_page=${this.per_page}&image_type=photo&orientation=horizontal&safesearch=true`;

    return await axios
      .get(url)
      .then(response => {
        return response.data;
      })
      .catch(error => console.error(error))
      .then(photo => {
        this.incrementPage();
        return photo;
      });
  }

  async fetchPhotoById(id) {
    const url = `${BASE_URL}?key=${API_KEY}&id=${id}`;

    return await axios
      .get(url)
      .then(response => {
        return response.data;
      })
      .catch(error => console.error(error))
      .then(photo => {
        return photo.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
