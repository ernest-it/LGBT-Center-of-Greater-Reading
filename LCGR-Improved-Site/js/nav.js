/**
 * Navigation dropdown handler
 * Replaces Wix Thunderbolt JS for dropdown menu functionality
 */
(function() {
  'use strict';

  // Wait for DOM
  document.addEventListener('DOMContentLoaded', function() {
    initDropdowns();
  });

  function initDropdowns() {
    // Find all menu items with dropdowns (aria-haspopup="true")
    var menuItems = document.querySelectorAll('[aria-haspopup="true"]');

    menuItems.forEach(function(trigger) {
      var wrapper = trigger.closest('.itemDepth02233374943__itemWrapper') ||
                    trigger.closest('li');
      if (!wrapper) return;

      var positionBox = wrapper.querySelector('.itemDepth02233374943__positionBox') ||
                        wrapper.querySelector('[role="group"]');
      if (!positionBox) return;

      // Show on hover (desktop)
      wrapper.addEventListener('mouseenter', function() {
        showDropdown(trigger, positionBox);
      });

      wrapper.addEventListener('mouseleave', function() {
        hideDropdown(trigger, positionBox);
      });

      // Toggle on click/keyboard
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var isOpen = trigger.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
          hideDropdown(trigger, positionBox);
        } else {
          // Close all other dropdowns first
          closeAllDropdowns();
          showDropdown(trigger, positionBox);
        }
      });

      // Keyboard support
      trigger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger.click();
        }
        if (e.key === 'Escape') {
          hideDropdown(trigger, positionBox);
          trigger.focus();
        }
      });

      // Also handle the accessibility toggle button
      var toggleBtn = wrapper.querySelector('.itemShared2352141355__accessibilityIcon');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          var isOpen = trigger.getAttribute('aria-expanded') === 'true';
          if (isOpen) {
            hideDropdown(trigger, positionBox);
          } else {
            closeAllDropdowns();
            showDropdown(trigger, positionBox);
          }
        });
      }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.itemDepth02233374943__itemWrapper')) {
        closeAllDropdowns();
      }
    });
  }

  function showDropdown(trigger, positionBox) {
    trigger.setAttribute('aria-expanded', 'true');
    positionBox.style.display = 'block';
    positionBox.style.visibility = 'visible';
    positionBox.style.opacity = '1';
    positionBox.style.pointerEvents = 'auto';
  }

  function hideDropdown(trigger, positionBox) {
    trigger.setAttribute('aria-expanded', 'false');
    positionBox.style.display = '';
    positionBox.style.visibility = '';
    positionBox.style.opacity = '';
    positionBox.style.pointerEvents = '';
  }

  function closeAllDropdowns() {
    var allTriggers = document.querySelectorAll('[aria-haspopup="true"][aria-expanded="true"]');
    allTriggers.forEach(function(trigger) {
      var wrapper = trigger.closest('.itemDepth02233374943__itemWrapper') ||
                    trigger.closest('li');
      if (!wrapper) return;
      var positionBox = wrapper.querySelector('.itemDepth02233374943__positionBox') ||
                        wrapper.querySelector('[role="group"]');
      if (positionBox) {
        hideDropdown(trigger, positionBox);
      }
    });
  }
})();
