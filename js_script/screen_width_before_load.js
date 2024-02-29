// Get the initial screen width
const screenWidth = window.innerWidth;

// Select the containers element
const containersElement = document.querySelector(".containers");

// Function to update the display style based on the screen width
function updateDisplayStyle() {
  // Select the carousel item
  const carouselitem = document.querySelector(".carousel-item");

  // Set the initial display style based on the screen width
  if (screenWidth < 1300) {
    containersElement.style.display = 'none';
  } else {
    containersElement.style.display = 'flex';
  }

  // Listen for window resize events to update display style
  window.addEventListener('resize', () => {
    if (window.innerWidth < 1600) {
      carouselitem.style.height = '500px'; // Set height
      carouselitem.style.width = '450px'; // Set width
    } else {
      carouselitem.style.height = ''; // Reset height to default
      carouselitem.style.width = ''; // Reset width to default
    }

    if (window.innerWidth < 1300) {
      containersElement.style.display = 'none';
    } else {
      containersElement.style.display = 'flex';
    }
  });
}

// Call the function to update the display style initially
updateDisplayStyle();
