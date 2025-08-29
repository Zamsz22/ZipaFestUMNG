const header = document.querySelector('header');
const scrollDistance = 25;
window.addEventListener('scroll', () => {
    if (window.scrollY > scrollDistance) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    } 
});
