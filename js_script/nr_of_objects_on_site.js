const cardsWrapper = document.getElementById("cards");
      const carouselWrapper = document.querySelector(".containers");

      if (count <= 3) {
        cardsWrapper.style.display = 'block'; // Show cards
        carouselWrapper.style.display = 'none'; // Hide carousel wrapper
        cardsWrapper.innerHTML = data1; // Update cards content
      } else {
        cardsWrapper.style.display = 'flex'; // Show cards
        carouselWrapper.style.display = 'flex'; // Show carousel wrapper
        cardsWrapper.innerHTML = data1;
      }