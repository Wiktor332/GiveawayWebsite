const cardsElement = document.getElementById("cards");
const numberOfObjects = cardsElement.querySelectorAll(".card").length;
const wrapper = document.querySelectorAll('.wrapper');

console.log('Number of objects inside cards:', numberOfObjects);

if (numberOfObjects < 3) {
    wrapper.style.display = "none";
} else {
    wrapper.style.display = "block";
}
