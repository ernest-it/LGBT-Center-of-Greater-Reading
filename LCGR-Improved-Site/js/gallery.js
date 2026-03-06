/**
 * Gallery/Carousel handler
 * Activates existing Wix Pro Gallery slider markup with smooth horizontal scrolling.
 * Items are already positioned absolutely at calculated left offsets in the HTML.
 * This JS reveals them and adds continuous auto-scroll + arrow navigation.
 */
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initGalleries();
  });

  function initGalleries() {
    // Find all pro-gallery slider containers
    var sliders = document.querySelectorAll('.pro-gallery-parent-container.gallery-slider');
    sliders.forEach(function(slider) {
      initSlider(slider);
    });
  }

  function initSlider(slider) {
    // Find the horizontal scroll inner container (holds all items)
    var inner = slider.querySelector('.gallery-horizontal-scroll-inner');
    if (!inner) return;

    // Find the scroll viewport (parent of inner)
    var viewport = inner.parentElement;
    if (!viewport) return;

    // Find all gallery items
    var items = inner.querySelectorAll('.gallery-item-container');
    if (items.length === 0) return;

    // Reveal all items (Wix SSR hides them with display:none;opacity:0)
    var maxRight = 0;
    items.forEach(function(item) {
      item.style.opacity = '1';
      item.style.display = 'block';
      // Calculate total content width from item positions
      var left = parseFloat(item.style.left) || 0;
      var width = parseFloat(item.style.width) || 400;
      var margin = parseFloat(item.style.margin) || 0;
      var right = left + width + margin * 2;
      if (right > maxRight) maxRight = right;
    });

    // Set inner container width to fit all items
    inner.style.width = maxRight + 'px';
    inner.style.position = 'relative';

    // Ensure viewport clips overflow and doesn't show scrollbars
    viewport.style.overflow = 'hidden';

    // Current scroll offset (pixels)
    var currentOffset = 0;
    var viewportWidth = viewport.offsetWidth || slider.offsetWidth;
    var totalWidth = maxRight;
    var maxOffset = Math.max(0, totalWidth - viewportWidth);

    // Smooth scroll to a specific offset
    function scrollToOffset(offset, smooth) {
      offset = Math.max(0, Math.min(offset, maxOffset));
      currentOffset = offset;
      if (smooth) {
        inner.style.transition = 'transform 0.6s ease';
      } else {
        inner.style.transition = 'none';
      }
      inner.style.transform = 'translateX(' + (-offset) + 'px)';
    }

    // Calculate item width for step-scrolling (use first item)
    var itemStep = 412; // default
    if (items.length >= 2) {
      var left0 = parseFloat(items[0].style.left) || 0;
      var left1 = parseFloat(items[1].style.left) || 412;
      itemStep = left1 - left0;
    }

    // Add navigation arrows
    var prevBtn = document.createElement('button');
    prevBtn.innerHTML = '&#10094;';
    prevBtn.className = 'gallery-arrow gallery-arrow-prev';
    prevBtn.setAttribute('aria-label', 'Previous');

    var nextBtn = document.createElement('button');
    nextBtn.innerHTML = '&#10095;';
    nextBtn.className = 'gallery-arrow gallery-arrow-next';
    nextBtn.setAttribute('aria-label', 'Next');

    slider.style.position = 'relative';
    slider.appendChild(prevBtn);
    slider.appendChild(nextBtn);

    prevBtn.addEventListener('click', function(e) {
      e.preventDefault();
      stopAutoScroll();
      scrollToOffset(currentOffset - itemStep, true);
      startAutoScroll();
    });

    nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
      stopAutoScroll();
      scrollToOffset(currentOffset + itemStep, true);
      startAutoScroll();
    });

    // Continuous auto-scroll
    var autoScrollId = null;
    var scrollSpeed = 0.4; // pixels per frame (~24px/sec at 60fps)
    var lastTimestamp = null;

    function autoScrollFrame(timestamp) {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      var delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Move at consistent speed regardless of frame rate
      currentOffset += scrollSpeed * (delta / 16.67);

      // Loop: when we reach the end, wrap back to start
      if (currentOffset >= maxOffset) {
        currentOffset = 0;
      }

      inner.style.transition = 'none';
      inner.style.transform = 'translateX(' + (-currentOffset) + 'px)';
      autoScrollId = requestAnimationFrame(autoScrollFrame);
    }

    function startAutoScroll() {
      if (autoScrollId) return;
      lastTimestamp = null;
      autoScrollId = requestAnimationFrame(autoScrollFrame);
    }

    function stopAutoScroll() {
      if (autoScrollId) {
        cancelAnimationFrame(autoScrollId);
        autoScrollId = null;
      }
    }

    // Start auto-scroll
    startAutoScroll();

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoScroll);
    slider.addEventListener('mouseleave', function() {
      startAutoScroll();
    });
  }
})();
