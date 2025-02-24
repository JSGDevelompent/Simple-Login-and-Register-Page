
    const container = document.getElementById('container');
    const blueTransition = document.getElementById('blueTransition');
    const redTransition = document.getElementById('redTransition');
    
    function toggleForm() {
      if (window.matchMedia("(max-width: 768px)").matches) {
        if (container.classList.contains('active')) {
          blueTransition.style.animation = 'fillFullBlue 1.2s forwards';
          setTimeout(() => {
            container.classList.remove('active');
          }, 600);
          setTimeout(() => {
            blueTransition.style.animation = '';
          }, 1200);
        } else {
          redTransition.style.animation = 'fillFullRed 1.2s forwards';
          setTimeout(() => {
            container.classList.add('active');
          }, 600);
          setTimeout(() => {
            redTransition.style.animation = '';
          }, 1200);
        }
      } else {
        container.classList.toggle('active');
      }
    }
  
    const canvas = document.querySelector('.particles');
    const ctx = canvas.getContext('2d');
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const particles = [];
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }
  
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
  
      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  
    function init() {
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
      }
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }
  
    init();
    animate();
  
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      particles.forEach(particle => {
        const dx = particle.x - mouseX;
        const dy = particle.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          particle.speedX += (dx / distance) * 0.1;
          particle.speedY += (dy / distance) * 0.1;
        }
      });
    });