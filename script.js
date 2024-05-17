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

document.querySelectorAll('.link-box').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetUrl = link.getAttribute('href');
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 500);
    });
});

