document.addEventListener('DOMContentLoaded', function() {
    // Canvas setup for heart particles
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let hearts = [];

    class Heart {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 20 + 5;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `rgba(${Math.random() * 255}, ${Math.random() * 50}, ${Math.random() * 150}, 0.7)`;
        }

        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.bezierCurveTo(
                this.x - this.size/2, this.y - this.size/2,
                this.x - this.size, this.y + this.size/3,
                this.x, this.y + this.size
            );
            ctx.bezierCurveTo(
                this.x + this.size, this.y + this.size/3,
                this.x + this.size/2, this.y - this.size/2,
                this.x, this.y
            );
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
    }

    // Initialize hearts
    for (let i = 0; i < 50; i++) {
        hearts.push(new Heart());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach(heart => {
            heart.update();
            heart.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();

    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Team member animations
    const teamMembers = document.querySelectorAll('.team-member');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    teamMembers.forEach(member => {
        member.style.opacity = 0;
        member.style.transform = 'translateY(20px)';
        member.style.transition = 'all 0.5s ease-in-out';
        observer.observe(member);
        
        member.addEventListener('click', function() {
            this.classList.add('pulse');
            // Create heart burst effect on click
            for (let i = 0; i < 10; i++) {
                hearts.push(new Heart());
            }
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 1000);
        });
    });
});