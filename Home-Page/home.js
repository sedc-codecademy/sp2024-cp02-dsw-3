
  function scrollR() {
    const container = document.getElementById('mz-gallery');
    container.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }

  function scrollL() {
    const container = document.getElementById('mz-gallery');
    container.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
  }


let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;
    currentSlide = (index + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function changeSlide(step) {
    showSlide(currentSlide + step);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
});
