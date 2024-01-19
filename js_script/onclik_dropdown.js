  
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

