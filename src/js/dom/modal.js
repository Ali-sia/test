import { photoContainer, modal, overlay, openModalBtn, closeModalBtn, modalContent } from '../refs';
import modalTpl from '../../templates/modal.hbs';
import PhotoApiService from '../api-service';
const photoApiService = new PhotoApiService();
// open modal event
// openModalBtn.addEventListener('click', openModal);
// document.querySelector('.photo-card__container').addEventListener('click', openModal);
// document.querySelector('.test').addEventListener('click', openModal);
photoContainer.addEventListener('click', openModal);

// close the modal when the close button and overlay is clicked
closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// open modal function
function openModal(e) {
  e.preventDefault();
  if (
    !e.target.classList.contains('photo-card__img') &&
    !e.target.classList.contains('photo-card__container')
  ) {
    return;
  }

  modal.classList.remove('hide');
  overlay.classList.remove('hide');

  try {
    const id = e.target.dataset.id;
    // console.log('🌺 -> openModal -> id', id);

    fetch(`
    https://pixabay.com/api/?key=13420675-ac3576debf8258c428cd202e5&id=${id}`)
      .then(data => data.json())
      .then(photo => {
        // console.log('🌺 -> openModal -> photo', photo.hits);
        console.log('modalContent-> ', modalContent);
        console.log(appendContentMarkup(photo.hits));
        appendContentMarkup(photo);
      });
  } catch (error) {
    console.log(error);
  }
}
// close modal function
function closeModal() {
  modal.classList.add('hide');
  overlay.classList.add('hide');
}

function appendContentMarkup(photo) {
  //   modalContent.insertAdjacentHTML('beforeend', modalTpl(photo));
  modalContent.innerHTML = modalTpl(photo);
}
