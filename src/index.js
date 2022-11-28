import './css/common.css';
import PhotoApiService from './js/api-service';
import photoTpl from './templates/photoTpl.hbs';
import modalTpl from './templates/modalTpl.hbs';

//змінні
const refs = {
  galleryContainer: document.querySelector('.gallery'),
  searchForm: document.querySelector('.search-form'),
  galleryImage: '',
  formEl: document.querySelector('form'),
  modalEl: document.querySelector('.modal'),
  pageEl: document.querySelector('body'),
  btnClose: '',
  modalFavorites: '',
  modalShow: '',
};

const localStorageIdFav = [];
const localStorageIdShow = [];
let isAddedFav = false;
let isAddedShow = false;

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

//відкрити модальне вікно, підвантажити туди інфо про обране фото
async function openModal(id) {
  console.log(' -> openModal -> id', id);
  refs.modalEl.classList.add('modal--show');
  refs.pageEl.classList.add('stop-scrolling');

  const response = await photoApiService.fetchPhotoById(id);
  appendModalMarkup(response[0]);

  refs.btnClose = document.querySelector('.modal__button-close');
  refs.btnClose.addEventListener('click', () => closeModal());

  refs.modalFavorites = document.querySelector('.modal__button-favorites');
  refs.modalShow = document.querySelector('.modal__button-show');
  refs.modalFavorites.addEventListener('click', () => addToFavourite(id));
  refs.modalShow.addEventListener('click', () => addToShow(id));
}
//закрити модальне вікно
function closeModal() {
  refs.modalEl.classList.remove('modal--show');
  refs.pageEl.classList.remove('stop-scrolling');
}

//додавання до списків
function addToFavourite(id) {
  if (isAddedFav === true) {
    refs.modalFavorites.classList.remove('added');
    isAddedFav = false;

    console.log(`DELETE FROM addToFavourite`);
    //якщо містить id
    // const idFavorites = JSON.parse(localStorage.getItem('idFavorites'));
    // const indexDelete = idFavorites.indexOf(id);
    // console.log('🌺 -> addToFavourite -> indexDelete', indexDelete);
    // idFavorites.splice(idFavorites, indexDelete);
    // localStorage.removeItem('idFavorites', JSON.stringify(idFavorites));
  } else {
    refs.modalFavorites.classList.add('added');
    isAddedFav = true;

    console.log(`ADD TO addToFavourite`);
    //#TODO
    //доддати перевірку на існування такого запису
    localStorageIdFav.push(id);
    const serializedState = JSON.stringify(localStorageIdFav);
    localStorage.setItem('idFavorites', serializedState);
  }
}

function addToShow(id) {
  //   if (!isAddedShow) {
  //     refs.modalShow.classList.remove('added');
  //     isAddedShow = false;

  //     console.log(`DELETE FROM addToFavourite`);
  //   }

  refs.modalShow.classList.add('added');
  //   isAddedShow = true;

  console.log(`ADD TO addToShow`);

  localStorageIdShow.push(id);
  const serializedState = JSON.stringify(localStorageIdShow);
  localStorage.setItem('idShow', serializedState);
}
