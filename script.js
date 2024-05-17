document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('mousemove', (event) => {
        const boxRect = box.getBoundingClientRect();
        const mouseX = event.clientX - boxRect.left;
        const mouseY = event.clientY - boxRect.top;
        const rotateY = (mouseX / boxRect.width - 0.5) * 5;
        const rotateX = (mouseY / boxRect.height - 0.5) * -5; 
        box.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`; 
    });

    box.addEventListener('mouseleave', () => {
        box.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)'; 
    });
});

document.addEventListener("DOMContentLoaded", function() {
    function handleResize() {
        const boxes = document.querySelectorAll('.box');
        if (window.innerWidth <= 768) {
            boxes.forEach(box => {
                box.style.width = '90%';
                box.style.margin = '10px auto';
            });
        } else if (window.innerWidth <= 480) {
            boxes.forEach(box => {
                box.style.width = '100%';
                box.style.margin = '5px auto';
            });
        } else {
            boxes.forEach(box => {
                box.style.width = '';
                box.style.margin = '10px';
            });
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
});
// script.js
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.box');

    function navigateToSection(event) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove('hidden');
                setTimeout(() => {
                    section.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                section.classList.add('hidden');
            }
        });
    }

    links.forEach(link => {
        link.addEventListener('click', navigateToSection);
    });

    // Hide all sections except the first one initially
    sections.forEach((section, index) => {
        if (index !== 0) {
            section.classList.add('hidden');
        }
    });
});
