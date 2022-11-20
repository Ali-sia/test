let getElement = element => document.querySelector(element);
const refs = {
  page: getElement('.page'),
  themeButton: getElement('.theme-button'),
  form: getElement('#search-form'),
  photoContainer: getElement('.gallery'),
  modal: getElement('.modal'),
  overlay: getElement('.overlay'),
  openModalBtn: getElement('.btn-modal-open'),
  closeModalBtn: getElement('.btn-modal-close'),
  modalContent: getElement('.modal-wrap'),
};

export const {
  page,
  themeButton,
  form,
  photoContainer,
  modal,
  overlay,
  openModalBtn,
  closeModalBtn,
} = refs;
