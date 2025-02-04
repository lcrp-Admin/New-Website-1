// Heart Particles System
class HeartParticle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 5;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `rgba(255, ${Math.random() * 105 + 150}, ${Math.random() * 105 + 150}, 0.7)`;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        const topCurveHeight = this.size * 0.3;
        ctx.bezierCurveTo(
            this.x - this.size/2, this.y - topCurveHeight,
            this.x - this.size, this.y + this.size/3,
            this.x, this.y + this.size
        );
        ctx.bezierCurveTo(
            this.x + this.size, this.y + this.size/3,
            this.x + this.size/2, this.y - topCurveHeight,
            this.x, this.y
        );
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > this.canvas.height || this.y < 0) this.speedY *= -1;
    }
}

// Initialize particles system
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let hearts = [];
let isParticlesEnabled = true;

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    hearts = [];
    for (let i = 0; i < 50; i++) {
        hearts.push(new HeartParticle(canvas));
    }
}

function animate() {
    if (!isParticlesEnabled) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(heart => {
        heart.update();
        heart.draw(ctx);
    });
    requestAnimationFrame(animate);
}

// Settings Panel
const toggleSettings = document.getElementById('toggleSettings');
const settingsPanel = document.getElementById('settingsPanel');
const particleToggle = document.getElementById('particleToggle');

toggleSettings.addEventListener('click', () => {
    settingsPanel.style.display = settingsPanel.style.display === 'none' ? 'block' : 'none';
});

particleToggle.addEventListener('change', (e) => {
    isParticlesEnabled = e.target.checked;
    if (isParticlesEnabled) {
        animate();
    }
});

// Initialize
window.addEventListener('resize', initCanvas);
initCanvas();
animate();

// Keep your existing JavaScript code below this


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

    // Load saved content on page load
    const savedContent = localStorage.getItem('aboutMeContent');
    if (savedContent) {
        aboutMeDisplay.textContent = savedContent;
        getStartedBtn.style.display = 'none';
    }

    getStartedBtn.addEventListener('click', () => {
        getStartedBtn.style.display = 'none';
        inputSection.style.display = 'block';
        textarea.focus();
        
        // Load saved draft if exists
        const savedDraft = localStorage.getItem('aboutMeDraft');
        if (savedDraft) {
            textarea.value = savedDraft;
        }
    });

    // Auto-save draft while typing
    textarea.addEventListener('input', () => {
        localStorage.setItem('aboutMeDraft', textarea.value);
    });

    submitBtn.addEventListener('click', () => {
        const aboutMeText = textarea.value.trim();
        if (aboutMeText) {
            aboutMeDisplay.textContent = aboutMeText;
            inputSection.style.display = 'none';
            
            // Save the final content
            localStorage.setItem('aboutMeContent', aboutMeText);
            // Clear the draft
            localStorage.removeItem('aboutMeDraft');
        }
    });

    // Add a reset button to clear saved content
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset Content';
    resetBtn.className = 'btn btn-danger mt-3';
    resetBtn.addEventListener('click', () => {
        localStorage.removeItem('aboutMeContent');
        localStorage.removeItem('aboutMeDraft');
        aboutMeDisplay.textContent = '';
        textarea.value = '';
        getStartedBtn.style.display = 'block';
        inputSection.style.display = 'none';
    });
    inputSection.appendChild(resetBtn);
});
