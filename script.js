// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');

function setTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '☀️ Light';
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.remove('light-mode');
    themeToggle.textContent = '🌙 Dark';
    localStorage.setItem('theme', 'dark');
  }
}

setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  setTheme(currentTheme === 'light' ? 'dark' : 'light');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(card);
});
