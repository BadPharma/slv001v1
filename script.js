document.addEventListener('DOMContentLoaded', () => {
 

// === Theme Toggle ===
function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  themeToggle.addEventListener('click', () => {
    const root = document.documentElement;
    const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
  });
}

// === Active Nav Scroll Highlight ===
function setupNavScrollHighlight() {
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
      const top = window.scrollY;
      const offset = section.offsetTop;
      if (top >= offset) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  });
}

// === Scroll Reveal Animation ===
function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// === Horizontal Scroll with Mouse Wheel ===
function setupHorizontalScroll() {
  const scrollContainer = document.querySelector('.horizontal-scroll');
  if (!scrollContainer) return;

  scrollContainer.addEventListener('wheel', (e) => {
    if (e.deltaY === 0) return;
    e.preventDefault();
    
    scrollContainer.scrollBy({ left: e.deltaY, behavior: 'smooth' });
  }, { passive: false });
}

// === Smooth Scroll with Navbar Offset ===
function setupSmoothScrollWithOffset() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const contactSection = document.querySelector('#contact');
  const horizontalContainer = document.querySelector('.horizontal-container');

  const getNavbarHeight = () =>
    document.querySelector('nav')?.offsetHeight || 0;

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      e.preventDefault();
      const navbarHeight = getNavbarHeight();

      if (targetId === 'contact') {
        // Show contact section and vertical scroll
        contactSection.style.display = 'flex';
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        // Hide contact, scroll horizontally
        contactSection.style.display = 'none';

        setTimeout(() => {
          const left = targetElement.offsetLeft - navbarHeight;
          horizontalContainer.scrollTo({ left, behavior: 'smooth' });

          // Optional nudge to ensure padding renders
          targetElement.scrollTop = 1;
        }, 50);
      }
    });
  });
}




// === Photography Filter ===
function setupPhotographyFilter() {
  const photographySection = document.querySelector('#photography');
  if (!photographySection) return;

  const filterLinks = photographySection.querySelectorAll('.sub-nav a');
  const mediaItems = photographySection.querySelectorAll('.media-grid .media-item');

  filterLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = link.getAttribute('data-filter');

      mediaItems.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;

        item.style.transitionDelay = `${index * 60}ms`;

        if (shouldShow) {
          item.classList.remove('hidden');
          item.style.display = 'flex';
          void item.offsetWidth;
          item.style.opacity = '1';
        } else {
          item.classList.add('hidden');
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.display = 'none';
          }, 400);
        }
      });
    });
  });
}

// === Photo Fullscreen Modal ===
function setupPhotoModal() {
  const modal = document.getElementById('photo-modal');
  const modalImg = document.getElementById('modal-img');
  const captionText = document.getElementById('modal-caption');
  const closeBtn = document.getElementById('modal-close');

  document.querySelectorAll('#photography .media-item img').forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = 'block';
      modalImg.src = img.src;
      captionText.innerText = img.alt;
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
}

window.addEventListener('load', () => {
  const hash = window.location.hash;
  if (hash) {
    const targetElement = document.querySelector(hash);
    if (targetElement && document.querySelector('.horizontal-container')) {
      const horizontalContainer = document.querySelector('.horizontal-container');
      
      const targetOffset = targetElement.offsetLeft;

      horizontalContainer.scrollTo({
        left: targetOffset,
        behavior: 'smooth'
      });
    }
  }
});



 setupThemeToggle();
  setupNavScrollHighlight();
  setupScrollReveal();
  setupHorizontalScroll();
  setupSmoothScrollWithOffset();
  setupPhotographyFilter();
  setupPhotoModal()



});
