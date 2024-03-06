// const cardsElement = document.getElementById("cards");
// const numberOfObjects = cardsElement.querySelectorAll("*").length;
// const wrapper = document.querySelectorAll('.wrapper');
// console.log('Number of objects inside cards:', numberOfObjects);

window.addEventListener('DOMContentLoaded', () => {
    const cardsElement = document.getElementById("cards");
    numberOfObjects = cardsElement.childElementCount;
    if (numberOfObjects > 3) {
        wrapper.style.display = 'none';
    } else {
        wrapper.style.display = 'flex';
    }
})