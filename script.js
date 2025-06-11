document.addEventListener('DOMContentLoaded', function() {
    const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero .btn');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate');
        }, index * 80);
    });

    setTimeout(handleScrollAnimations, 150);
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= window.innerHeight * 0.85 && 
        rect.bottom >= -100 
    );
}

function handleScrollAnimations() {
    const elements = document.querySelectorAll(
        '.section-title, .feature-card, .step, .cta h2, .cta p, ' +
        '.cta-phone, .cta-image, .phone-mockup, .brands-image, ' +
        '.cities-grid, .brands-label, .hero h1, .hero p, .hero .btn, ' +
        '.steps-line, .about p, .cities-container p, .cta-messenger'
    );

    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('animate');
            
            if (element.classList.contains('cities-grid')) {
                element.querySelectorAll('.city').forEach(city => {
                    city.classList.add('animate');
                });
            }
            
            if (element.classList.contains('steps-line')) {
                element.classList.add('animate-line');
            }
            
            if (element.classList.contains('cities-container')) {
                const p = element.querySelector('p');
                if (p) p.classList.add('animate');
            }
        }
    });
}

let ticking = false;
let lastScroll = 0;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScrollAnimations();
            ticking = false;
        });
        ticking = true;
    }

    const currentScroll = window.pageYOffset;
    const header = document.getElementById('main-header');
    
    if (currentScroll <= 0) {
        header.classList.remove('hidden');
    } else if (currentScroll > lastScroll && !header.classList.contains('hidden')) {
        header.classList.add('hidden');
    } else if (currentScroll < lastScroll && header.classList.contains('hidden')) {
        header.classList.remove('hidden');
    }
    lastScroll = currentScroll;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
