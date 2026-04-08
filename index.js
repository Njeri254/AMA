//Main JavaScript File for AMA Website


// Navigation and Dropdown Logic

document.addEventListener("DOMContentLoaded", function () {

  const dropdowns = document.querySelectorAll(".dropdown");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("mobileMenuOverlay");
  const menuBtn = document.getElementById("menuBtn");

  /* ==============================
     MOBILE SUBMENU TOGGLE
  ============================== */
  window.toggleMobileSubMenu = function(menuId, button) {

    const submenu = document.getElementById(menuId);
    if (!submenu) return;

    if (submenu.style.maxHeight && submenu.style.maxHeight !== "0px") {
      submenu.style.maxHeight = "0px";
    } else {
      submenu.style.maxHeight = submenu.scrollHeight + "px";
    }

    const arrow = button.querySelector("svg");
    if (arrow) arrow.classList.toggle("rotate-180");
  };


  /* ==============================
     MOBILE MENU TOGGLE
  ============================== */

  menuBtn.addEventListener("click", toggleMobileMenu);
  overlay.addEventListener("click", closeMobileMenu);

  function toggleMobileMenu() {

    mobileMenu.classList.toggle("-translate-x-full");
    overlay.classList.toggle("hidden");

    toggleHamburger();
  }

  function closeMobileMenu() {

    mobileMenu.classList.add("-translate-x-full");
    overlay.classList.add("hidden");

    resetHamburger();
    resetMobileSubmenus();
  }


  /* ==============================
     HAMBURGER ANIMATION
  ============================== */

  function toggleHamburger() {

    const bars = menuBtn.querySelectorAll(".bar");

    bars[0].classList.toggle("rotate-45");
    bars[0].classList.toggle("translate-y-2");

    bars[1].classList.toggle("opacity-0");

    bars[2].classList.toggle("-rotate-45");
    bars[2].classList.toggle("-translate-y-2");
  }

  function resetHamburger() {

    const bars = menuBtn.querySelectorAll(".bar");

    bars[0].classList.remove("rotate-45","translate-y-2");
    bars[1].classList.remove("opacity-0");
    bars[2].classList.remove("-rotate-45","-translate-y-2");
  }


  /* ==============================
     RESET MOBILE SUBMENUS
  ============================== */

  function resetMobileSubmenus() {

    const mobileSubmenus = mobileMenu.querySelectorAll("[id^='mobile']");

    mobileSubmenus.forEach(sub => {
      sub.style.maxHeight = "0px";
    });

    const arrows = mobileMenu.querySelectorAll("button svg");

    arrows.forEach(svg => {
      svg.classList.remove("rotate-180");
    });
  }


  /* ==============================
     DESKTOP DROPDOWN HOVER
  ============================== */

  if (window.innerWidth >= 768) {

    dropdowns.forEach(dropdown => {

      const toggle = dropdown.querySelector(".dropdown-toggle");
      const menu = dropdown.querySelector(".dropdown-menu");
      const arrow = toggle ? toggle.querySelector("svg") : null;

      if (!menu) return;

      dropdown.addEventListener("mouseenter", () => {

        menu.classList.remove("hidden","opacity-0","translate-y-2");

        if (arrow) arrow.classList.add("rotate-180");
      });

      dropdown.addEventListener("mouseleave", () => {

        menu.classList.add("opacity-0","translate-y-2");

        setTimeout(() => {
          menu.classList.add("hidden");
        },200);

        if (arrow) arrow.classList.remove("rotate-180");
      });

    });

  }


  /* ==============================
     CLOSE DROPDOWN WHEN CLICK OUTSIDE
  ============================== */

  document.addEventListener("click", function (e) {

    dropdowns.forEach(dropdown => {

      if (!dropdown.contains(e.target)) {

        const menu = dropdown.querySelector(".dropdown-menu");
        const arrow = dropdown.querySelector(".dropdown-toggle svg");

        if (!menu) return;

        menu.classList.add("opacity-0","translate-y-2");

        setTimeout(() => {
          menu.classList.add("hidden");
        },200);

        if (arrow) arrow.classList.remove("rotate-180");
      }

    });

  });

});




// COUNTER SCRIPT 

document.addEventListener("DOMContentLoaded", function() {

  const counters = document.querySelectorAll('.counter');

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const update = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      counter.innerText = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => observer.observe(counter));

});




// Slider Initialization and Animation Logic

document.addEventListener("DOMContentLoaded", function() {
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 1500,
    autoplay: { delay: 6000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    on: {
      init: function() { animateSlideText(this.slides[this.activeIndex]); },
      slideChangeTransitionStart: function() { resetSlideText(this.slides); },
      slideChangeTransitionEnd: function() { animateSlideText(this.slides[this.activeIndex]); },
    }
  });

  function animateSlideText(slide) {
    slide.querySelectorAll('.slide-text').forEach((el, i) => {
      el.style.opacity = 0;
      setTimeout(() => { el.classList.add('animate-fadeUp'); }, i * 200);
    });
  }

  function resetSlideText(slides) {
    slides.forEach(slide => {
      slide.querySelectorAll('.slide-text').forEach(el => {
        el.classList.remove('animate-fadeUp');
        el.style.opacity = 0;
      });
    });
  }
});



  /* ==== Tailwind Custom Animation Extension ==== */

module.exports = {
  theme: {
    extend: {
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.08' },
          '50%': { transform: 'scale(1.05)', opacity: '0.12' },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 6s ease-in-out infinite',
      },
    },
  },
}



  function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

// Optional: close modal when clicking outside the content
document.querySelectorAll('[id^="modal"]').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal.id);
  });
});