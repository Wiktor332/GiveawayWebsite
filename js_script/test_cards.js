let trackedElementText = "";

// Function to determine the path based on trackedElementText
function handleTrackedTextContent() {
  let fetchPath = ''; // Default path
  switch (trackedElementText) {
    case 'Playstation':
      fetchPath = './python/data_json/data_playstation.json';
      break;
    case 'Playstation 4':
      fetchPath = './python/data_json/data_ps4.json';
      break;
    case 'Playstation 5':
      fetchPath = './python/data_json/data_ps5.json';
      break;
    case 'Xbox':
      fetchPath = './python/data_json/data_xbox.json';
      break;
    case 'Xbox One': 
      fetchPath = './python/data_json/data_one.json';
      break;
    case 'Xbox Series XS':
      fetchPath = './python/data_json/data_xs.json';
      break;
    case 'PC':
      fetchPath = './python/data_json/data_pc.json';
      break;
    case 'ALL PC':
      fetchPath = './python/data_json/data_pc.json';
      break;
    case 'Steam':
      fetchPath = './python/data_json/data_steam.json';
      break;
    case 'Epic Games Store':
      fetchPath = './python/data_json/data_epic.json';
      break;
    case 'GOG':
      fetchPath = './python/data_json/data_gog.json';
      break;
    default:
      fetchPath = './python/data_json/data_pc.json'
      break;
  }
  return fetchPath;
}

// Function to fetch data based on the determined path
function fetchData(path) {
  fetch(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((completedata) => {
      let data1 = "";
      let count = 0;
      completedata.forEach((values, index) => {
        const checkboxID = `btnControl_${index}`;
        data1 += `<div class="card">
        <input type="checkbox" id="${checkboxID}"/>
        <label class="btn" for="${checkboxID}">
          <h1 class="title">${values.title}</h1>
          <img src="${values.image}" alt="img" class="images">
          <p class="description">${values.description}</p>
          <p class="type">Type: ${values.type}</p>
          <p class="instructions">${values.instructions}</p>
          <a class="link" href="${values.gamerpower_url}" target="_blank">Click to receive</a>
          <p class="info">Click for detailed instructions</p>
        </label>
      </div>`;
      count++;
      });
      console.log(count);
      document.getElementById("cards").innerHTML = data1;
    })

    .catch((err) => {
      console.error('Error fetching data:', err);
    });
}

// Function to load data based on URL parameter or default to PC data
function loadDataFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedOption = urlParams.get('page');

  if (selectedOption) {
    const options = document.querySelectorAll('.menu li a');
    options.forEach(option => {
      if (option.getAttribute('href') === selectedOption) {
        trackedElementText = option.textContent;
        const path = handleTrackedTextContent();
        fetchData(path);
        // Update title and selected text
        selected.innerText = trackedElementText;
        // Update UI with selected option
        const selected = document.querySelector('.selected');
        selected.innerText = trackedElementText;
      }
    });
  } else {
    trackedElementText = "PC"; // Set default to PC
    const path = handleTrackedTextContent();
    fetchData(path);
    // Update UI with default option
    const selected = document.querySelector('.selected');
    selected.innerText = trackedElementText;
  }
}

// Load data on page load
window.addEventListener('load', () => {
  loadDataFromURL();
});

// Iterate through dropdown elements
const dds = document.querySelectorAll('.dropdown');

dds.forEach(dd => {
  const select = dd.querySelector('.select');
  const options = dd.querySelectorAll('.menu li a'); // Changed to select anchor tags

  const selected = dd.querySelector('.selected');

  select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
  });

  options.forEach(option => {
    option.addEventListener('click', (event) => {
      event.preventDefault();
  
      trackedElementText = option.textContent;
      selected.innerText = trackedElementText;
  
      document.getElementById("cards").innerHTML = '';

      const path = handleTrackedTextContent();
      fetchData(path);
  
      console.log('Clicked option:', trackedElementText); // Log the clicked option
      console.log('Fetching data from path:', path); // Log the fetch path
  
      // Change the URL based on the clicked option
      const page = option.getAttribute('href'); // Get the href attribute of the clicked option
      if (page) {
        const url = new URL(window.location.href);
        url.searchParams.set('page', page); // Set a URL parameter 'page' with the clicked option's href
        window.history.pushState({}, '', url); // Change the URL without reloading the page
        console.log('Changed URL:', window.location.href); // Log the changed URL
      }
  
      select.classList.remove('select-clicked');

      function loadDataFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedOption = urlParams.get('page');
      
        // If there's a selectedOption, load data accordingly
        if (selectedOption) {
          const options = document.querySelectorAll('.menu li a');
          options.forEach(option => {
            if (option.getAttribute('href') === selectedOption) {
              trackedElementText = option.textContent;
              const path = handleTrackedTextContent();
              fetchData(path);
              
              // Update UI with selected option
              const selected = document.querySelector('.selected');
              selected.innerText = trackedElementText;
            }
          });
        }
      }
      
      // Load data on page load
      window.addEventListener('load', () => {
        loadDataFromURL();
      });
    });
  });
});
return {
    loadDataFromURL,
};