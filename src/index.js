import './css/common.css';
import PhotoApiService from './js/api-service';
import photoTpl from './templates/photoTpl.hbs';
import photoCardTpl from './templates/photoCardTpl.hbs';
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
  favBtn: document.querySelector('.link_favorites'),
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

  addEvtOnModal();
}

function addEvtOnModal() {
  refs.galleryImage = document.querySelectorAll('.gallery .gallery-image');
  refs.galleryImage.forEach(image =>
    image.addEventListener('click', () => openModal(image.dataset.id)),
  );
}

// //вставити розмітку карток "улюбленого"
function appendPhotoCardMarkup(photo) {
  // refs.galleryContainer.insertAdjacentHTML('beforeend', photoCardTpl(photo));
  refs.galleryContainer.insertAdjacentHTML('beforeend', photoTpl(photo));
  addEvtOnModal();
}
//вставити розмітку модального вікна
function appendModalMarkup(photo) {
  refs.modalEl.innerHTML = '';
  refs.modalEl.innerHTML = modalTpl(photo);
}

//очистити  контейнер
export function clearPhotoContainer() {
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
  refs.modalFavorites.addEventListener('click', () => toggleToFavourite(id));
}
//закрити модальне вікно
function closeModal() {
  refs.modalEl.classList.remove('modal--show');
  refs.pageEl.classList.remove('stop-scrolling');
}

//додавання до списків
let localStorageData = JSON.parse(localStorage.getItem('idFavorites'));
if (localStorageData === null) {
  localStorage.setItem('idFavorites', JSON.stringify([]));
}

// добавить проверку на уже добавленые
function toggleToFavourite(id) {
  localStorageData = JSON.parse(localStorage.getItem('idFavorites'));
  if (!localStorageData.includes(id)) {
    console.log('-> ADD');
    refs.modalFavorites.classList.add('added');
    localStorageData.push(id);
    localStorage.setItem('idFavorites', JSON.stringify(localStorageData));
  } else {
    console.log('--> DELETE');
    refs.modalFavorites.classList.remove('added');
    let indexlocalStorageData = localStorageData.indexOf(id);
    if (indexlocalStorageData !== -1) {
      localStorageData.splice(indexlocalStorageData, 1);
    }
    localStorage.setItem('idFavorites', JSON.stringify(localStorageData));
  }
}

//завантаження обраних фото

refs.favBtn.addEventListener('click', appendFavouritesMarkup);
async function appendFavouritesMarkup(e) {
  e.preventDefault();
  console.log('!!!!!!!!!!!!!');

  //якщо пусто - то показати повідомлення
  if (localStorageData.length === 0) {
    console.log('- ничего((');

    refs.galleryContainer.innerHTML = `
      <h2 class="title_favourites">ooooops! you dont like anything</h2>`;
    return;
  }

  clearPhotoContainer();

  let respData = [];

  for (let i = 0; i < localStorageData.length; i++) {
    const response = await photoApiService.fetchPhotoById(localStorageData[i]);
    refs.galleryContainer.insertAdjacentHTML(
      'beforeend',
      `
    <div class='gallery-image' data-id='${response[0].id}'>
      <div class='img-box'>
        <img src='${response[0].previewURL}' alt='' />
        <div class='transparent-box'>
          <div class='caption'>
            <p>${response[0].tags}</p>
            <p class='opacity-low'>${response[0].id}</p>
          </div>
        </div>
      </div>
    </div>
    `,
    );
  }
}
