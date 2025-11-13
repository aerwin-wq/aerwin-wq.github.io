// Parallax effects and smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  const contentSections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('#main-nav a');
  let time = 0;
  let mouseX = 0;
  let mouseY = 0;

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Initialize layer positions and sizes
  parallaxLayers.forEach((layer, index) => {
    const position = layer.getAttribute('data-position').split(',');
    const size = layer.getAttribute('data-size');
    layer.style.left = position[0] + '%';
    layer.style.top = position[1] + '%';
    layer.style.width = size + 'px';
    layer.style.height = size + 'px';

    // Randomly flip some layers on y-axis
    const shouldFlip = Math.random() > 0.5;
    layer.dataset.flipped = shouldFlip ? '1' : '0';

    // Store initial positions and random phase offsets for varied movement
    layer.dataset.initialX = parseFloat(position[0]);
    layer.dataset.initialY = parseFloat(position[1]);
    layer.dataset.phaseX = Math.random() * Math.PI * 2;
    layer.dataset.phaseY = Math.random() * Math.PI * 2;
    layer.dataset.frequency = 0.3 + Math.random() * 0.7;
  });

  // Continuous animation loop
  function animate() {
    time += 0.01;
    const scrolled = window.pageYOffset;

    // Animate parallax layers (Rowleys)
    parallaxLayers.forEach(layer => {
      const speed = parseFloat(layer.getAttribute('data-speed'));
      const phaseX = parseFloat(layer.dataset.phaseX);
      const phaseY = parseFloat(layer.dataset.phaseY);
      const frequency = parseFloat(layer.dataset.frequency);
      const isFlipped = layer.dataset.flipped === '1';

      // Continuous floating motion using sine waves
      const floatX = Math.sin(time * frequency + phaseX) * 30 * speed;
      const floatY = Math.cos(time * frequency * 0.8 + phaseY) * 20 * speed;

      // Scroll parallax
      const scrollY = -(scrolled * speed);

      // Mouse parallax
      const mouseParallaxX = mouseX * 50 * speed;
      const mouseParallaxY = mouseY * 50 * speed;

      // Combine all movements
      const totalX = floatX + mouseParallaxX;
      const totalY = scrollY + floatY + mouseParallaxY;

      // Apply transform with optional y-axis flip
      if (isFlipped) {
        layer.style.transform = `translate(${totalX}px, ${totalY}px) scaleY(-1)`;
      } else {
        layer.style.transform = `translate(${totalX}px, ${totalY}px)`;
      }
    });

    // Content sections now use CSS animations for x-axis movement
    // JavaScript only handles y-axis parallax if needed in the future

    requestAnimationFrame(animate);
  }

  // Start the animation loop
  animate();

  // Track mouse position
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
  });
});
