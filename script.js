// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/*===== EMAIL & PHONE VALIDATION =====*/
document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.querySelector("input[type='email']");
    const contactInput = document.querySelector("input[type='tel']");

    const emailError = document.createElement("div");
    emailError.classList.add("validation-message");
    emailInput.parentNode.insertBefore(emailError, emailInput.nextSibling);

    const contactError = document.createElement("div");
    contactError.classList.add("validation-message");
    contactInput.parentNode.insertBefore(contactError, contactInput.nextSibling);

    const emailApiKey = "04ba019e8bf143f3b9bf9d98c6c0964c";
    const phoneApiKey = "0f709b8d60a844da93f124b28174ec46";

    // Email validation
    emailInput.addEventListener("blur", () => {
        const email = emailInput.value.trim();
        if (!email) {
            emailError.textContent = "";
            return;
        }

        // Basic regex validation first
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailError.textContent = "✘ Invalid email format";
            emailError.style.color = "red";
            return;
        }

        emailError.textContent = "Validating...";
        emailError.style.color = "gray";

        fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${emailApiKey}&email=${encodeURIComponent(email)}`)
            .then(res => res.json())
            .then(data => {
                if (data.deliverability === "DELIVERABLE" && data.is_valid_format.value) {
                    emailError.textContent = "✔ Valid email";
                    emailError.style.color = "green";
                } else {
                    emailError.textContent = "✘ Invalid or undeliverable email";
                    emailError.style.color = "red";
                }
            })
            .catch(() => {
                emailError.textContent = "Error checking email. Using basic validation.";
                emailError.style.color = "orange";
            });
    });

    // Phone validation
    let phoneTimeout = null;
    contactInput.addEventListener("input", () => {
        const number = contactInput.value.trim();
        clearTimeout(phoneTimeout);

        phoneTimeout = setTimeout(() => {
            if (!number) {
                contactError.textContent = "";
                return;
            }

            // Basic phone validation first
            const phoneRegex = /^\+?[\d\s\-\(\)]{8,}$/;
            if (!phoneRegex.test(number)) {
                contactError.textContent = "✘ Invalid phone number format";
                contactError.style.color = "red";
                return;
            }

            contactError.textContent = "Validating...";
            contactError.style.color = "gray";

            fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=${phoneApiKey}&phone=${encodeURIComponent(number)}`)
                .then(res => res.json())
                .then(data => {
                    if (data.valid) {
                        let locationInfo = "";
                        if (data.country && data.country.name) {
                            locationInfo = ` (${data.country.name})`;
                        } else if (data.location) {
                            locationInfo = ` (${data.location})`;
                        }
                        contactError.textContent = `✔ Valid number${locationInfo}`;
                        contactError.style.color = "green";
                    } else {
                        contactError.textContent = "✘ Invalid number";
                        contactError.style.color = "red";
                    }
                })
                .catch(() => {
                    contactError.textContent = "Error checking number. Using basic validation.";
                    contactError.style.color = "orange";
                });
        }, 600);
    });
});

document.querySelector('#contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the usual way

    // Display an alert box
    alert("Message sent successfully. Will be back shortly.");
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Simple animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
document.querySelectorAll('.skill-card, .project-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});