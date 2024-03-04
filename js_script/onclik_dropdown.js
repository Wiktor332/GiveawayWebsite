  
const dropdowns = document.querySelectorAll('.dropdown');

document.addEventListener('click', (event) => {
  dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    const isClickInsideDropdown = dropdown.contains(event.target);

    if (!isClickInsideDropdown) {
      select.classList.remove('select-clicked');
      menu.classList.remove('menu-open');
      options.forEach(option => {
        option.classList.remove('active');
      });
    }
  });
});

dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector('.select');
  const menu = dropdown.querySelector('.menu');
  const options = dropdown.querySelectorAll('.menu li');
  const selected = dropdown.querySelector('.selected');

  select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
    menu.classList.toggle('menu-open');
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      selected.innerText = option.innerText;
      select.classList.remove('select-clicked');
      menu.classList.remove('menu-open');
      options.forEach(option => {
        option.classList.remove('active');
      });
    });
  });
});


const dropdowns_filter = document.querySelectorAll('.dropdown-filter');

dropdowns_filter.forEach(dropdown_filter => {
  const select_filter = dropdown_filter.querySelector('.select-filter');
  const caret = dropdown_filter.querySelector('.caret');
  const menu_filter = dropdown_filter.querySelector('.menu-filter');
  const options_filter = dropdown_filter.querySelectorAll('.menu-filter li');
  const selected_filter = dropdown_filter.querySelector('.selected-filter');

  select_filter.addEventListener('click', () => {
    select_filter.classList.toggle('select-filter-clicked');
    caret.classList.toggle('caret-rotate');
    menu_filter.classList.toggle('menu-filter-open');
  });

  options_filter.forEach(option => {
    option.addEventListener('click', () => {
      selected_filter.innerText = option.innerText;
      select_filter.classList.remove('select-filter-clicked');
      caret.classList.remove('caret-rotate');
      menu_filter.classList.remove('menu-filter-open');
      options_filter.forEach(opt => {
        opt.classList.remove('active');
      });
      option.classList.add('active');
    });
  });
});

const filterButtons = document.querySelectorAll('.menu-filter');
const filterableCards = document.getElementById("cards");
