document.addEventListener('DOMContentLoaded', function() {
    // Create canvas for heart particles
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

    // Heart particles array
    let hearts = [];

    // Heart class
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

    // Create initial hearts
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

    // Your existing code with Valentine's colors
    const keys = [];
    const konamiCode = ['1'];
    
    document.addEventListener('keydown', function(e) {
        keys.push(e.key);
        keys = keys.slice(-10);
        
        if (JSON.stringify(keys) === JSON.stringify(konamiCode)) {
            document.body.style.background = 'linear-gradient(45deg, #FF69B4, #FFB6C1)';
            errorNumber.style.transform = 'rotate(360deg)';
            errorNumber.style.transition = 'transform 1s ease';
            
            // Create heart burst effect
            for (let i = 0; i < 20; i++) {
                hearts.push(new Heart());
            }
        }
    });
});