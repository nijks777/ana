document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.services-slider');
    const slides = document.querySelectorAll('.service-slide');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');

    // Clone first and last slides for infinite effect
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[slides.length - 1].cloneNode(true);
    slider.appendChild(firstSlideClone);
    slider.insertBefore(lastSlideClone, slides[0]);

    let currentIndex = 1; // Start from 1 because of the cloned slide
    const slidesToShow = window.innerWidth < 768 ? 1 : 3;

    function updateSliderPosition(transition = true) {
        const slideWidth = slides[0].offsetWidth + 30; // 30px for margins
        const offset = -currentIndex * slideWidth;

        slider.style.transition = transition ? 'transform 0.5s ease' : 'none';
        slider.style.transform = `translateX(${offset}px)`;
    }

    function handleInfiniteScroll() {
        const totalSlides = slides.length;

        if (currentIndex === 0) { // If we're at the cloned last slide
            slider.addEventListener('transitionend', function jumpToEnd() {
                slider.style.transition = 'none';
                currentIndex = totalSlides;
                updateSliderPosition(false);
                slider.removeEventListener('transitionend', jumpToEnd);
            });
        }

        if (currentIndex === totalSlides + 1) { // If we're at the cloned first slide
            slider.addEventListener('transitionend', function jumpToStart() {
                slider.style.transition = 'none';
                currentIndex = 1;
                updateSliderPosition(false);
                slider.removeEventListener('transitionend', jumpToStart);
            });
        }
    }

    // Add click handlers
    prevBtn.addEventListener('click', function() {
        currentIndex--;
        updateSliderPosition();
        handleInfiniteScroll();
    });

    nextBtn.addEventListener('click', function() {
        currentIndex++;
        updateSliderPosition();
        handleInfiniteScroll();
    });

    // Initial setup
    updateSliderPosition(false);

    // Handle window resize
    window.addEventListener('resize', function() {
        updateSliderPosition(false);
    });

    // Add touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener('touchmove', e => {
        touchEndX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
        const touchDiff = touchStartX - touchEndX;
        if (Math.abs(touchDiff) > 50) { // Minimum swipe distance
            if (touchDiff > 0) {
                nextBtn.click();
            } else {
                prevBtn.click();
            }
        }
    });
});