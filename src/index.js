import './css/common.css';

import '../src/js/dom/theme-switch';
import PhotoApiService from './js/api-service';
import { form, photoContainer } from './js/refs';
import photoTpl from './templates/photo.hbs';
import LoadMoreBtn from './js/components/load-more-btn';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import './js/dom/modal';

const photoApiService = new PhotoApiService();
//налаштування для кнопки завантаження LoadMoreBtn
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

form.addEventListener('submit', onSearchQuery);
//при кліку - викликати продовження отриманих фото
loadMoreBtn.refs.button.addEventListener('click', fetchPhoto);

function onSearchQuery(e) {
  e.preventDefault();

  // отримати та записати в клас запит користувача
  photoApiService.searchQuery = e.currentTarget.elements.searchQuery.value;

  //перевірити отриманий  запит на пустоту
  if (photoApiService.query.trim() === '') {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }

  //оновити лічильник сторінок
  photoApiService.resetPage();
  //очистити поле дяля результатів
  clearPhotoContainer();
  //отримати результат (фото)
  fetchPhoto();
}

function appendPhotoMarkup(photo) {
  photoContainer.insertAdjacentHTML('beforeend', photoTpl(photo.hits));
}

async function fetchPhoto() {
  try {
    loadMoreBtn.show();
    loadMoreBtn.disable();

    await photoApiService.fetchPhoto().then(photo => {
      //чи є результат за запитом?
      if (photo.totalHits === 0) {
        loadMoreBtn.hide();
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
      }
      //вставити отримані фото
      appendPhotoMarkup(photo);
      loadMoreBtn.enable();
      Notify.success(`"Hooray! We found ${photo.totalHits} images."`);

      //скільки сторінок результату
      let totalPages = photo.totalHits / photoApiService.per_page;
      //інформуваня про закінчення фото за запитом
      if (photoApiService.page > totalPages) {
        loadMoreBtn.hide();
        return Notify.info("We're sorry, but you've reached the end of search results.");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function clearPhotoContainer() {
  photoContainer.innerHTML = '';
}
