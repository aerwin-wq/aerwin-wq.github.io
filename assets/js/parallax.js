// Simple parallax effect
document.addEventListener('DOMContentLoaded', function() {
  const parallaxLayers = document.querySelectorAll('.parallax-layer');

  // Initialize layer positions
  parallaxLayers.forEach(layer => {
    const position = layer.getAttribute('data-position').split(',');
    layer.style.left = position[0] + '%';
    layer.style.top = position[1] + '%';
  });

  // Parallax on scroll
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;

    parallaxLayers.forEach(layer => {
      const speed = parseFloat(layer.getAttribute('data-speed'));
      const yPos = -(scrolled * speed);
      layer.style.transform = `translateY(${yPos}px)`;
    });

    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  // Parallax on mouse move
  document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    parallaxLayers.forEach(layer => {
      const speed = parseFloat(layer.getAttribute('data-speed'));
      const xMove = mouseX * 50 * speed;
      const yMove = mouseY * 50 * speed;
      const scrolled = window.pageYOffset;
      const yPos = -(scrolled * speed);

      layer.style.transform = `translate(${xMove}px, ${yPos + yMove}px)`;
    });
  });
});
