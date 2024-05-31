
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