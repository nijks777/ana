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
const jobs = [
    {
        title: "Senior Developer (Microsoft Tech Stack)",
        category: "Development",
        type: "Full Time",
        location: "Noida",
        subCategory: "Senior Developer"
    },
    {
        title: "UI/UX Designer",
        category: "Design",
        type: "Full Time",
        location: "Delhi",
        subCategory: "Senior Designer"
    },
    {
        title: "Marketing Specialist",
        category: "Marketing",
        type: "Contract",
        location: "Remote",
        subCategory: "Digital Marketing"
    },
    // Add more job listings as needed
];

// Function to create job card HTML
function createJobCard(job) {
    return `
        <div class="job-card">
            <h3 class="job-title">${job.title}</h3>
            <div class="job-meta">
                <span class="job-category">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path fill="#0047CC" d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                    </svg>
                    ${job.category}, ${job.subCategory}
                </span>
                <span class="job-location">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path fill="#0047CC" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    ${job.location}
                </span>
            </div>
        </div>
    `;
}

// Function to filter jobs
function filterJobs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;
    const selectedType = document.getElementById('typeFilter').value;
    const selectedLocation = document.getElementById('locationFilter').value;

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm) ||
                            job.category.toLowerCase().includes(searchTerm) ||
                            job.subCategory.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || job.category === selectedCategory;
        const matchesType = !selectedType || job.type === selectedType;
        const matchesLocation = !selectedLocation || job.location === selectedLocation;

        return matchesSearch && matchesCategory && matchesType && matchesLocation;
    });

    const jobListings = document.getElementById('jobListings');
    jobListings.innerHTML = filteredJobs.map(job => createJobCard(job)).join('');
}

// Add event listeners
document.getElementById('searchInput').addEventListener('input', filterJobs);
document.getElementById('categoryFilter').addEventListener('change', filterJobs);
document.getElementById('typeFilter').addEventListener('change', filterJobs);
document.getElementById('locationFilter').addEventListener('change', filterJobs);

// Initial load of all jobs
filterJobs();