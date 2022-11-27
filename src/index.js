import './css/common.css';
import PhotoApiService from './js/api-service';
import photoTpl from './templates/photoTpl.hbs';
import modalTpl from './templates/modalTpl.hbs';

//змінні
const refs = {
  galleryContainer: document.querySelector('.gallery'),
  searchForm: document.querySelector('.search-form'),
  galleryImage: '',
  //   galleryImage: document.querySelector('.gallery .gallery-image'),
  formEl: document.querySelector('form'),
  modalEl: document.querySelector('.modal'),
  pageEl: document.querySelector('body'),
  btnClose: '',
};

const photoApiService = new PhotoApiService();

//завантажити зображення без запиту користувача
fetchPhotoDefault();
async function fetchPhotoDefault() {
  const response = await photoApiService.fetchPhotoDefault();
  appendPhotoMarkup(response);
}

//відслідковувати запит, якщо є - видаємо результат
refs.formEl.addEventListener('submit', onSearchQuery);
function onSearchQuery(e) {
  e.preventDefault();

  photoApiService.searchQuery = e.currentTarget.elements.searchQuery.value;
  photoApiService.resetPage();
  clearPhotoContainer();
  fetchPhoto();
}
//завантажити зображення за запитом користувача
async function fetchPhoto() {
  const response = await photoApiService.fetchPhoto();
  appendPhotoMarkup(response);
}

//вставити розмітку фото карток
function appendPhotoMarkup(photo) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', photoTpl(photo.hits));

  refs.galleryImage = document.querySelectorAll('.gallery .gallery-image');

  refs.galleryImage.forEach(image =>
    image.addEventListener('click', () => openModal(image.dataset.id)),
  );
}
//вставити розмітку модального вікна
function appendModalMarkup(photo) {
  refs.modalEl.innerHTML = modalTpl(photo);
}

//очистити  контейнер
function clearPhotoContainer() {
  refs.galleryContainer.innerHTML = '';
}

async function openModal(id) {
  console.log(' -> openModal -> id', id);
  refs.modalEl.classList.add('modal--show');
  refs.pageEl.classList.add('stop-scrolling');

  const response = await photoApiService.fetchPhotoById(id);
  appendModalMarkup(response[0]);

  refs.btnClose = document.querySelector('.modal__button-close');
  refs.btnClose.addEventListener('click', () => closeModal());
}

function closeModal() {
  refs.modalEl.classList.remove('modal--show');
  refs.pageEl.classList.remove('stop-scrolling');
}
