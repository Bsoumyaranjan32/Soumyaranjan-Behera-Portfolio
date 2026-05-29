// ==========================================
// SCROLL TO TOP BUTTON LOGIC
// ==========================================
const scrolltotop = document.querySelector('.scroll-to-top');

// Show or hide the scroll-to-top button based on scroll position
window.addEventListener('scroll', () => {
    // If scrolled down more than 100px, show the button
    if (window.pageYOffset > 100) {
        scrolltotop.classList.add('active');
    } else {
        // Otherwise, hide it
        scrolltotop.classList.remove('active');
    }
});

// Scroll smoothly back to the top when the button is clicked
scrolltotop.addEventListener('click', () => {
    window.scrollTo(0, 0);
});


// ==========================================
// TYPING EFFECT LOGIC (HERO SECTION)
// ==========================================
const description = document.querySelector('#description');

// Set up the initial HTML structure for the typing effect
description.innerHTML = 'I am into <span id="typed-text"></span><span class="cursor">&nbsp;</span>';

// Initialize Typed.js to cycle through developer roles
const typed = new Typed('#typed-text', {
    strings: ['Frontend Developer.'], // Text strings to type
    // strings: ['Web Developer.', 'Frontend Developer.'], // Text strings to type
    typeSpeed: 100,  // Typing speed in milliseconds
    backSpeed: 100,  // Deleting speed in milliseconds
    backDelay: 1000, // Time to wait before deleting
    loop: true       // Loop the animation infinitely
});


// ==========================================
// LIGHT & DARK THEME TOGGLE LOGIC
// ==========================================
const html = document.querySelector("html");
const themeBtn = document.getElementById("theme-toggle");

// Check the user's previously saved theme preference on page load
if (localStorage.getItem("mode") == "dark") {
    darkMode();
} else {
    lightMode();
}

// Add click listener to the theme toggle button (moon/sun icon)
if (themeBtn) {
    themeBtn.addEventListener("click", (e) => {
        // Toggle theme based on current mode in localStorage
        if (localStorage.getItem("mode") == "light") {
            darkMode();
        } else {
            lightMode();
        }
    });
}

// Function to activate Dark Mode
function darkMode() {
    html.classList.add("dark");
    document.body.classList.remove("light-theme"); // Remove light theme overrides
    if (themeBtn) themeBtn.classList.replace("ri-sun-fill", "ri-moon-fill"); // Update icon to Moon
    localStorage.setItem("mode", "dark"); // Save preference
}

// Function to activate Light Mode
function lightMode() {
    html.classList.remove("dark");
    document.body.classList.add("light-theme"); // Apply light theme overrides via CSS
    if (themeBtn) themeBtn.classList.replace("ri-moon-fill", "ri-sun-fill"); // Update icon to Sun
    localStorage.setItem("mode", "light"); // Save preference
}

// (Legacy commented out theme code was removed for cleanliness)


// ==========================================
// ACTIVE NAVIGATION LINK LOGIC ON SCROLL
// ==========================================
// Select all main sections and navigation links
// Include the tailwind contact section selector so the Contact section is detected
const sections = document.querySelectorAll('.section, .about-section, .skills-section, .projects-section, .tw-contact-section, #contact');
const navLinks = document.querySelectorAll('.navbar li a');

function updateActiveNav() {
    let current = '';
    
    // Determine which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Trigger point is 250px above the section
        if (window.scrollY >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    // Special check: If user has scrolled to the absolute bottom, activate the last section (Contact)
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 10) {
        current = sections[sections.length - 1].getAttribute('id');
    }

    // Update active class on navigation links
    navLinks.forEach(link => {
        link.classList.remove('active'); // Remove active from all
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active'); // Add active to the currently viewed section
        }
    });
}

// Run the active nav check on scroll and on initial page load
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);
updateActiveNav();


// ==========================================
// MOBILE NAVIGATION MENU TOGGLE
// ==========================================
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu visibility when hamburger icon is clicked
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        
        // Swap hamburger and close icons based on menu state
        if (navbar.classList.contains('active')) {
            icon.classList.replace('ri-menu-3-line', 'ri-close-line');
        } else {
            icon.classList.replace('ri-close-line', 'ri-menu-3-line');
        }
    });
}

// Automatically close the mobile menu when any navigation link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Make clicked link active immediately
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // If it's an internal anchor, smoothly scroll to the section
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        // Close mobile menu (if open) and reset icon
        navbar.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.replace('ri-close-line', 'ri-menu-3-line'); // Revert icon to hamburger
        }
    });
});

const resumeBtnEl = document.querySelector('.resume-btn');
// Open the resume PDF in a new tab when the resume button is clicked.
// Path: ./assets/Soumyaranjan_Behera Resume.pdf
// Use encodeURI to handle spaces and set opener to null for security.
if (resumeBtnEl) {
    resumeBtnEl.addEventListener('click', () => {
        const url = './assets/Soumyaranjan_Behera Resume.pdf';
        const win = window.open(encodeURI(url), '_blank');
        if (win) win.opener = null;
    });
}

// ==========================================
// TAILWIND CONTACT FORM FEEDBACK
// ==========================================
const twForm = document.getElementById('tailwind-contact-form');
const twStatus = document.getElementById('tw-form-status');
if (twForm) {
    twForm.addEventListener('submit', (e) => {
        // If form is invalid, prevent submission and show validation UI
        if (!twForm.checkValidity()) {
            e.preventDefault();
            if (twStatus) twStatus.textContent = 'Please complete the required fields.';
            // show browser validation messages
            twForm.reportValidity();
            return;
        }

        // show immediate feedback while the form opens in a new tab
        if (twStatus) twStatus.textContent = 'Sending...';
        const btn = twForm.querySelector('button[type="submit"]');
        if (btn) {
            btn.disabled = true;
            btn.classList.add('opacity-60', 'cursor-not-allowed');
        }
        // re-enable button after a short delay (user will be on the same page because form opens in new tab)
        setTimeout(() => {
            if (twStatus) twStatus.textContent = 'Message submitted — thank you!';
            if (btn) {
                btn.disabled = false;
                btn.classList.remove('opacity-60', 'cursor-not-allowed');
            }
        }, 1400);
    });
}
