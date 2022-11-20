import { modal, overlay, openModalBtn, closeModalBtn, modalContent } from '../refs';
import modalTpl from '../../templates/modal.hbs';

// open modal event
// openModalBtn.addEventListener('click', openModal);
document.querySelector('.photo-card__container').addEventListener('click', openModal);
// document.querySelector('.test').addEventListener('click', openModal);

// close the modal when the close button and overlay is clicked
// closeModalBtn.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);

// open modal function
function openModal() {
  console.log(' WORK!!!!!!!!!!!!');
  //   e.preventDefault();
  //   if (e.target.nodeName !== 'IMG') {
  //     return;
  //   }

  // modal.classList.remove('hide');
  // overlay.classList.remove('hide');

  // try {
  //   photoApiService.fetchPhoto().then(photo => {
  //     if (
  //       document.querySelector('photo-card__img').dataset.id ===
  //       document.querySelector('modal_img').dataset.id
  //     ) {
  //       appendContentMarkup(photo);
  //     }
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
}
// close modal function
// function closeModal() {
//   modal.classList.add('hide');
//   overlay.classList.add('hide');
// }

// function appendContentMarkup(photo) {
//   modalContent.insertAdjacentHTML('beforeend', modalTpl(photo.hits));
// }
