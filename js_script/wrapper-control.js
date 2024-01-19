// Slider 
const track = document.querySelector('.carousel-inner');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-control-next');
const prevButton = document.querySelector('.carousel-control-prev');
const dotsNav = document.querySelector('.carousel-indicators');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);
   
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('active');
    targetSlide.classList.add('active');

    // const lastIndex = slides.length - 1;

    // If (slides[lastIndex] === targetSlide) {
    //     track.style.transform = 'translateX(0)';
    //     currentSlide.classList.remove('active');
    //     slides[0].classList.add('active');
    // } 
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('active');
    targetDot.classList.add('active');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if(targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.lenght -1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    } 
}

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.active');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.active');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.active');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.active');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.active');
    const currentDot = dotsNav.querySelector('.active');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);

    if(targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.lenght -1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    } 
})

