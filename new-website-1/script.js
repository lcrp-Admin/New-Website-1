document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // Add your search logic here
            console.log('Searching for:', searchTerm);
        });
    }

    // Add animation to cards on scroll
    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const getStartedBtn = document.querySelector('.get-started-btn');
    const inputSection = document.querySelector('.input-section');
    const submitBtn = inputSection.querySelector('.btn-primary');
    const textarea = document.querySelector('.about-me');
    const aboutMeDisplay = document.querySelector('.post');

    getStartedBtn.addEventListener('click', () => {
        getStartedBtn.style.display = 'none';
        inputSection.style.display = 'block';
        textarea.focus();
    });

    submitBtn.addEventListener('click', () => {
        const aboutMeText = textarea.value.trim();
        if (aboutMeText) {
            aboutMeDisplay.textContent = aboutMeText;
            inputSection.style.display = 'none';
        }
    });
});