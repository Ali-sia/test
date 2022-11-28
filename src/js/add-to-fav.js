import clearPhotoContainer from '../index';

console.log('-->');

const refs = {
  favBtn: document.querySelector('.link_favorites'),
  test: document.querySelector('.test'),
};

appendFavouritesMarkup();

function appendFavouritesMarkup() {
  clearPhotoContainer();
  if (localStorageData === null) {
    console.log('- ничего((');

    refs.test.innerHTML = `
    <h2 class="title_favourites">ooooops! you dont like anything</h2>`;
    return;
  }

  console.log('чтото есть');
}
