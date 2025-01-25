document.addEventListener('DOMContentLoaded', () => {
  // Create flying umbrellas
  const umbrellaAnimation = document.querySelector('.umbrella-animation');
  const numUmbrellas = 10;
  
  const umbrellaColors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#ff9a9e', '#fad0c4'];
  
  for (let i = 0; i < numUmbrellas; i++) {
    const umbrella = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    umbrella.setAttribute('viewBox', '0 0 100 100');
    umbrella.classList.add('flying-umbrella');
    
    const color = umbrellaColors[Math.floor(Math.random() * umbrellaColors.length)];
    
    umbrella.innerHTML = `
      <circle cx="50" cy="50" r="45" fill="${color}" stroke="#e67700" stroke-width="2"/>
      <path d="M50 10 L50 90" stroke="#e67700" stroke-width="4"/>
      <path d="M20 30 Q50 10 80 30" fill="none" stroke="#e67700" stroke-width="4"/>
    `;
    
    // Randomize animation
    umbrella.style.animationDelay = `-${Math.random() * 15}s`;
    umbrella.style.left = `${Math.random() * 100}%`;
    umbrella.style.animationDuration = `${15 + Math.random() * 10}s`;
    
    umbrellaAnimation.appendChild(umbrella);
  }

  // Animate stats when they come into view
  const stats = document.querySelectorAll('.number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateValue(entry.target, 0, parseInt(entry.target.textContent), 2000);
        observer.unobserve(entry.target);
      }
    });
  });

  stats.forEach(stat => observer.observe(stat));

  // Handle form submission
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    // Simulate form submission
    const button = form.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Sending Alert...';
    button.disabled = true;
    
    setTimeout(() => {
      button.textContent = 'Alert Sent!';
      form.reset();
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 2000);
    }, 1500);
  });

  // Add rainbow effect to the logo on hover
  const logo = document.querySelector('.logo h1');
  logo.addEventListener('mouseover', () => {
    logo.style.animation = 'rainbow 2s linear infinite';
  });

  logo.addEventListener('mouseout', () => {
    logo.style.animation = 'none';
  });
});

function animateValue(element, start, end, duration) {
  const range = end - start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    element.textContent = current;
    if (current === end) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const headerOffset = 80;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrolled = window.pageYOffset;
  hero.style.backgroundPosition = `50% ${scrolled * 0.5}px`;
});