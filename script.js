/* ============================================ */
/* script.js — Harbour Leaf Café                */
/* JavaScript Feature: Menu Category Filter     */
/*                                              */
/* Allows users to filter featured dishes by   */
/* category (All / Brunch / Coffee / Sweets).   */
/* Supports a direct user goal: finding the     */
/* type of dish they want quickly without       */
/* scrolling through unrelated items.           */
/* ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ==========================================
       FEATURE 1: Menu Category Filter
       ========================================== */

    const filterButtons = document.querySelectorAll('.cs-filter-btn');
    const menuItems = document.querySelectorAll('#services-2437 .cs-item');

    if (filterButtons.length > 0 && menuItems.length > 0) {

        filterButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {

                // Update active button state
                filterButtons.forEach(function (b) {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-pressed', 'true');

                const selectedFilter = this.getAttribute('data-filter');

                // Show or hide menu items based on category
                menuItems.forEach(function (item) {
                    const itemCategory = item.getAttribute('data-category');

                    if (selectedFilter === 'all' || itemCategory === selectedFilter) {
                        item.classList.remove('hidden');
                        // Animate items in
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(12px)';
                        setTimeout(function () {
                            item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.classList.add('hidden');
                        item.style.transition = 'none';
                    }
                });
            });
        });
    }

    /* ==========================================
       FEATURE 2: Contact Form Validation
       ========================================== */

    const contactForm = document.getElementById('cs-form-1388');
    const formFeedback = document.getElementById('cs-form-feedback');

    if (contactForm && formFeedback) {

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name-1388').value.trim();
            const email = document.getElementById('email-1388').value.trim();
            const phone = document.getElementById('phone-1388').value.trim();
            const message = document.getElementById('message-1388').value.trim();

            // Basic validation
            if (!name || !email || !message) {
                formFeedback.className = 'cs-form-feedback error';
                formFeedback.textContent = 'Please fill in all required fields before sending.';
                formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                return;
            }

            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formFeedback.className = 'cs-form-feedback error';
                formFeedback.textContent = 'Please enter a valid email address.';
                return;
            }

            // Success state — in production this would POST to a backend
            formFeedback.className = 'cs-form-feedback success';
            formFeedback.textContent = 'Thank you, ' + name + '! Your reservation request has been received. We\'ll be in touch shortly.';
            formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Reset form
            contactForm.reset();
        });
    }

    /* ==========================================
       FEATURE 3: Smooth scroll for nav links
       ========================================== */

    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);

            if (targetEl) {
                e.preventDefault();
                const navHeight = document.getElementById('cs-navigation') ? 
                    document.getElementById('cs-navigation').offsetHeight : 0;
                const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

});
