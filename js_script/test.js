
// Cards Module
const CardsModule = (() => {
    // Variable to store the text content of the tracked element
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
      console.log("test objects:",count);
      document.getElementById("cards").innerHTML = data1;
    })

    .catch((err) => {
      console.error('Error fetching data:', err);
    });
}

function updateTitleHeader(newText) {
    if (window.innerWidth < 1300) {
        trackedElementText = newText; // Update trackedElementText first
        const titleHeader = document.querySelector('.cards-title');
        if (titleHeader) {
          const newTitle = `${newText} Games and DLC available to download:`;
          titleHeader.textContent = newTitle;
        }
      }
}

function getCount() {
  const cardsElement = document.getElementById("cards");
  const cardElements = cardsElement.querySelectorAll(".card");
  const count = cardElements.length;
  console.log('Count:', count); // Log the count
  return count;
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
        updateCardsHeader();
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
  getCount();
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

      const clickedText = option.textContent;
      updateTitleHeader(clickedText);

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
})();

// Carousel Module 
const CarouselModule = (() => {
  // Variable to store the text content of the tracked element

let trackedElementText = "";

// Function to determine the path_wrapper based on trackedElementText
function handleTrackedTextContent() {
let fetchPath_wrapper = ''; // Default path

switch (trackedElementText) {
  case 'Playstation':
    fetchPath_wrapper = './python/data_json/data_playstation.json';
    break;
  case 'Playstation 4':
    fetchPath_wrapper = './python/data_json/data_ps4.json';
    break;
  case 'Playstation 5':
    fetchPath_wrapper = './python/data_json/data_ps5.json';
    break;
  case 'Xbox':
    fetchPath_wrapper = './python/data_json/data_xbox.json';
    break;
  case 'Xbox One':
    fetchPath_wrapper = './python/data_json/data_one.json';
    break;
  case 'Xbox Series XS':
    fetchPath_wrapper = './python/data_json/data_xs.json';
    break;
  case 'PC':
    fetchPath_wrapper = './python/data_json/data_pc.json';
    break;
  case 'ALL PC':
    fetchPath_wrapper = './python/data_json/data_pc.json';
    break;
  case 'Steam':
    fetchPath_wrapper = './python/data_json/data_steam.json';
    break;
  case 'Epic Games Store':
    fetchPath_wrapper = './python/data_json/data_epic.json';
    break;
  case 'GOG':
    fetchPath_wrapper = './python/data_json/data_gog.json';
    break;
  default:
    fetchPath_wrapper = './python/data_json/data_pc.json'
    break;
}
return fetchPath_wrapper;
}



function fetchData_wrapper(path_wrapper) {
fetch(path_wrapper)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((completedata_wrapper) => {
    completedata_wrapper.sort((a, b) => b.users - a.users);

    const topThree = completedata_wrapper.slice(0, 3);

    let data_wrapper = "";
    topThree.forEach((values, index) => {
      const topThree = completedata_wrapper.slice(0,3);

      let data_wrapper = "";
      topThree.forEach((values, index) => {
      const checkboxID = `btnControl_${index}`;
      data_wrapper +=
        `
          <div class="inner-top">
            <div class="carousel-item">
              <img class="carousel_image" src="${values.image}" alt="0">
              <div class="carousel-caption">
                  <h2 class="title-head">${values.title}</h2>
                  <p class="type">Type: ${values.type}</p>
                  <p>Users number: ${values.users}</p>
                  <a class="link" href="${values.gamerpower_url}" target="_blank">Click to receive</a>
              </div>
            </div>
        </div>
      `;
    });
      document.querySelector(".containers").innerHTML = data_wrapper;
    })
    .catch((err) => {
      console.error('Error fetching data:', err);
    });
  })
}

function updateTitleHeader(newText) {
  trackedElementText = newText; // Update trackedElementText first
  const titleHeader = document.querySelector('.top3-title');
  if (titleHeader) {
    const newTitle = `${newText} Top 3 Users' Choices`;
    titleHeader.textContent = newTitle;
  }
}

function displayWrapper_width() {
  const wrapper = document.querySelector(".wrapper");
  if (window.innerWidth < 1300) {
    wrapper.style.display = 'none'
  } else {
    wrapper.style.display = 'flex'
  }
} 



// Initial fetch when the page loads
fetchData_wrapper('your_path_here');
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


function getCount() {
    const cardsElement = document.getElementById("cards");
    const cardElements = cardsElement.querySelectorAll(".card");
    console.log('Count:', count);
    return cardElements.length;
}

// Load data on page load
window.addEventListener('load', () => {
  loadDataFromURL();
  window.addEventListener('load', () => {
    const cardCount = CardsModule.getCount(); // Call getCount() from CardsModule
    // Use cardCount to determine the display style of the wrapper element
    if (cardCount > 0) {
        // Set display style to flex if there are cards
        document.querySelector(".wrapper").style.display = 'flex';
    } else {
        // Set display style to none if there are no cards
        document.querySelector(".wrapper").style.display = 'none';
    }
});
});

window.addEventListener('resize', () => {
  displayWrapper_width();
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
  
      const clickedText = option.textContent;
      updateTitleHeader(clickedText);

      trackedElementText = option.textContent;
      selected.innerText = trackedElementText;
  
      document.getElementById("cards").innerHTML = '';

      const path_wrapper = handleTrackedTextContent();
      fetchData_wrapper(path_wrapper);
  
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
return {
  loadDataFromURL, 
};
})();



