// Variable to store the text content of the tracked element
let trackedElementText = "";

// Function to determine the path_wrapper based on trackedElementText
function handleTrackedTextContent() {
  let fetchPath_wrapper = ''; // Default path

  switch (trackedElementText) {
    case 'Playstation':
      fetchPath_wrapper = '../python/data_json/data_playstation.json';
      break;
    case 'Playstation 4':
      fetchPath_wrapper = '../python/data_json/data_ps4.json';
      break;
    case 'Playstation 5':
      fetchPath_wrapper = '../python/data_json/data_ps5.json';
      break;
    case 'Xbox':
      fetchPath_wrapper = '../python/data_json/data_xbox.json';
      break;
    case 'Xbox One':
      fetchPath_wrapper = '../python/data_json/data_one.json';
      break;
    case 'Xbox Series XS':
      fetchPath_wrapper = '../python/data_json/data_xs.json';
      break;
    case 'PC':
      fetchPath_wrapper = '../python/data_json/data_pc.json';
      break;
    case 'ALL PC':
      fetchPath_wrapper = '../python/data_json/data_pc.json';
      break;
    case 'Steam':
      fetchPath_wrapper = '../python/data_json/data_steam.json';
      break;
    case 'Epic Games Store':
      fetchPath_wrapper = '../python/data_json/data_epic.json';
      break;
    case 'GOG':
      fetchPath_wrapper = '../python/data_json/data_gog.json';
      break;
    default:
      fetchPath_wrapper = '../python/data_json/data_pc.json'
      break;
  }
  return fetchPath_wrapper;
}

// Function to fetch data based on the determined path
function fetchData_wrapper(path_wrapper) {
    fetch(path_wrapper)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((completedata_wrapper) => {

        completedata_wrapper.sort((a,b) => b.users - a.users);

        const topThree = completedata_wrapper.slice(0,3);

        let data_wrapper = "";
        topThree.forEach((values, index) => {
          data_wrapper += `<div class="carousel-item active">
          <img class="carousel_image" src="${values.image}" alt="First slide">
          <div class="carousel-caption">
              <h2 class="title-head">${values.title}</h2>
              <p>${values.type}</p>
              <p>Users number:${values.users}</p>
          </div>
        </div>`;
        });
        document.querySelector(".carousel-inner").innerHTML = data_wrapper;
  
        console.log(`Total mapped objects: ${count}`);
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
          const path_wrapper = handleTrackedTextContent();
          fetchData_wrapper(path_wrapper);
  
          // Update UI with selected option
          const selected = document.querySelector('.selected');
          selected.innerText = trackedElementText;
        }
      });
    } else {
      trackedElementText = "PC"; // Set default to PC
      const path_wrapper = handleTrackedTextContent();
      fetchData_wrapper(path_wrapper);
  
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
    
        document.getElementById("carouselExampleIndicators").innerHTML = '';
  
        const path_wrapper = handleTrackedTextContent();
        fetchData(path_wrapper);
    
        console.log('Clicked option:', trackedElementText); // Log the clicked option
        console.log('Fetching data from path_wrapper:', path_wrapper); // Log the fetch path_wrapper
    
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
                const path_wrapper = handleTrackedTextContent();
                fetchData(path_wrapper);
                
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
