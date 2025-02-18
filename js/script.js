
    let slideIndex = 1;
    showSlides(slideIndex);

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let slides = document.getElementsByClassName("carousel-slide");
        let dots = document.getElementsByClassName("dot");

        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}

        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[i].classList.remove("active");
            dots[i].classList.remove("active");
        }

        // Show current slide
        slides[slideIndex-1].style.display = "block";
        setTimeout(() => {
            slides[slideIndex-1].classList.add("active");
        }, 10);
        dots[slideIndex-1].classList.add("active");
    }

    // Auto advance slides every 5 seconds
    setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 5000);

    document.addEventListener('DOMContentLoaded', function() {
        const serviceTabs = document.querySelectorAll('.service-tab');
        const serviceContents = document.querySelectorAll('.service-content');

        serviceTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                serviceTabs.forEach(t => t.classList.remove('active'));
                serviceContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                serviceContents[index].classList.add('active');
            });
        });
    });

    // Optional: Pause animation on hover
    document.querySelector('.carousel-track').addEventListener('mouseover', function() {
        document.querySelector('.logo-carousel').style.animationPlayState = 'paused';
    });

    document.querySelector('.carousel-track').addEventListener('mouseout', function() {
        document.querySelector('.logo-carousel').style.animationPlayState = 'running';
    });

    function toggleService(element) {
        const content = element.nextElementSibling;
        const chevron = element.querySelector('.chevron-icon');

        // Close all other service contents
        document.querySelectorAll('.service-content').forEach(item => {
            if (item !== content) {
                item.classList.remove('active');
            }
        });

        document.querySelectorAll('.chevron-icon').forEach(icon => {
            if (icon !== chevron) {
                icon.style.transform = 'rotate(0deg)';
            }
        });

        // Toggle the clicked service
        content.classList.toggle('active');
        chevron.style.transform = content.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
    }
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
        document.addEventListener('DOMContentLoaded', function() {
            const filterButtons = document.querySelectorAll('.filter-btn');
     
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
     
                    // Add active class to clicked button
                    this.classList.add('active');
     
                    // Get the filter value
                    const filterValue = this.getAttribute('data-filter');
     
                    // You can add your filtering logic here
                    console.log('Filter selected:', filterValue);
                    // Example: filterBlogPosts(filterValue);
                });
            });
        });
     
        // Example filter function - implement based on your needs
        function filterBlogPosts(filter) {
            const blogCards = document.querySelectorAll('.blog-card');
     
            blogCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    // Add logic to show/hide based on categories
                    // You'll need to add data attributes to your blog cards
                    const categories = card.getAttribute('data-categories');
                    if (categories && categories.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        }
        document.addEventListener('DOMContentLoaded', function() {
            const filterButtons = document.querySelectorAll('.filter-btn');
    
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
    
                    // Add active class to clicked button
                    this.classList.add('active');
    
                    // Get the filter value from button text
                    const filterValue = this.textContent.trim();
    
                    // Call filter function
                    filterBlogPosts(filterValue);
                });
            });
        });
    
