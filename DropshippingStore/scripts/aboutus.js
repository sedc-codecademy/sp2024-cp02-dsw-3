window.onscroll = function() {
    var button = document.getElementById('contactButton');
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        button.style.display = 'block';
    } else {
        button.style.display = 'none';
    }
};
