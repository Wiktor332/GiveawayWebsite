  
const dropdowns = document.querySelectorAll('.dropdown');

document.addEventListener('click', (event) => {
  dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
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
  const caret = dropdown.querySelector('.caret');

  select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
    menu.classList.toggle('menu-open');
    caret.classList.toggle('caret-rotate');
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      selected.innerText = option.innerText;
      select.classList.remove('select-clicked');
      menu.classList.remove('menu-open');
      caret.classList.remove('caret-rotate');
      options.forEach(option => {
        option.classList.remove('active');
      });
    });
  });
});


const dropdownsFilter = document.querySelectorAll('.dropdown-filter');

dropdownsFilter.forEach(dropdownFilter => {
  const selectFilter = dropdownFilter.querySelector('.select-filter');
  const caret = dropdownFilter.querySelector('.caret');
  const menuFilter = dropdownFilter.querySelector('.menu-filter');
  const optionsFilter = dropdownFilter.querySelectorAll('.menu-filter li');
  const selectedFilter = dropdownFilter.querySelector('.selected-filter');

  // Event listener for clicking on the select filter
  selectFilter.addEventListener('click', () => {
    selectFilter.classList.toggle('select-filter-clicked');
    caret.classList.toggle('caret-rotate');
    menuFilter.classList.toggle('menu-filter-open');
  });

  // Event listener for clicking on the list items
  optionsFilter.forEach(option => {
    option.addEventListener('click', () => {
      selectedFilter.innerText = option.innerText;
      selectFilter.classList.remove('select-filter-clicked');
      caret.classList.remove('caret-rotate');
      menuFilter.classList.remove('menu-filter-open');
      optionsFilter.forEach(opt => {
        opt.classList.remove('active');
      });
      option.classList.add('active');
    });
  });

  // Event listener for clicking outside the menu box
  document.addEventListener('click', (event) => {
    if (!dropdownFilter.contains(event.target)) {
      selectFilter.classList.remove('select-filter-clicked');
      caret.classList.remove('caret-rotate');
      menuFilter.classList.remove('menu-filter-open');
    }
  });
});


// Get references to the elements
const dropdownFilter = document.querySelector('.dropdown-filter');
const selectedFilter = document.querySelector('.selected-filter');
const menuFilter = document.querySelector('.menu-filter');

// Function to filter cards based on selected category
function filterCards(selectedCategory) {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const type = card.querySelector('.type').textContent.split(':')[1].trim();
    card.style.display = selectedCategory === 'All' ? 'block' : type === selectedCategory ? 'block' : 'none';
  });
}

// Event listener for clicking on menu-filter items
menuFilter.addEventListener('click', event => {
  const selectedListItem = event.target;

  // Check if clicked element is a list item
  if (selectedListItem.tagName !== 'LI') return;

  // Update selected filter text and filter cards
  selectedFilter.textContent = selectedListItem.textContent;

  const cardsSection = document.querySelector(".cards-title");
  if (cardsSection) {
    cardsSection.scrollIntoView({ behavior: 'smooth'});
  }

  filterCards(selectedListItem.textContent);


});

// Event listener for clicking on the dropdown (to close it)
dropdownFilter.addEventListener('click', () => {
  menuFilter.classList.toggle('active'); 
});

// Function to reset the filter
function resetFilter() {
  selectedFilter.textContent = 'Category'; // Reset selected text
  filterCards('All'); // Apply the default filter
  window.scrollTo({ top: 0, behavior: 'smooth'});
}

window.addEventListener('load', resetFilter); // Reset filter on page load

// Event listeners for filtering and resetting
window.addEventListener('load', () => {
  // Check for existing filter parameter in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get('filter');

  if (filterParam) {
    // Set selected filter based on URL parameter
    selectedFilter.textContent = filterParam;
    filterCards(filterParam);
  } else {
    // No filter parameter found, use default behavior (e.g., resetFilter)
    resetFilter(); // Or handle the default case differently
  }
});

window.addEventListener('popstate', () => {
  // Handle URL changes (back/forward navigation or URL manipulation)
  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get('filter');

  if (filterParam) {
    // Update selected filter and filter cards based on the parameter
    selectedFilter.textContent = filterParam;
    filterCards(filterParam);
  } else {
    // No filter parameter found in the new URL, potentially reset
    resetFilter(); // Or handle the reset case differently
  }
});