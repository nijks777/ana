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

function filterBlogPosts(filter) {
    const blogCards = document.querySelectorAll('.blog-card');

    blogCards.forEach(card => {
        // Get all tags in the current card
        const tags = card.querySelectorAll('.blog-tag');
        const tagTexts = Array.from(tags).map(tag => tag.textContent.trim());

        if (filter === 'View all') {
            card.style.display = 'block';
        } else {
            // Check if the filter matches any of the card's tags
            if (tagTexts.includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}