import { page, themeButton } from '../refs';

// Выбираем настройки темы из localStorage
const currentTheme = localStorage.getItem('theme');
const currentBtnTheme = localStorage.getItem('btnTheme');
// Если текущая тема в localStorage равна "dark"…
if (currentTheme == 'dark') {
  // …тогда мы используем класс .dark-theme
  page.classList.add('dark-theme');
  themeButton.classList.add('dark-theme-button');
}

themeButton.addEventListener('click', onThemeSwich);

function onThemeSwich() {
  page.classList.toggle('dark-theme');
  page.classList.toggle('ligth-theme');
  themeButton.classList.toggle('dark-theme-button');

  let theme = 'light';
  let btnTheme = 'ligth';
  // Если <body> содержит класс .dark-theme…
  if (page.classList.contains('dark-theme')) {
    // …тогда делаем тему тёмной
    theme = 'dark';
    btnTheme = 'dark';
  }
  // После чего сохраняем выбор в localStorage
  localStorage.setItem('theme', theme);
  localStorage.setItem('btnTheme', btnTheme);
}
